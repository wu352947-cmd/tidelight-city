import {
  ROAD_SPECS,
  ZONE_CELL_SIZE,
  ZONE_MAX_DEPTH,
  type ZoneType,
} from './types.ts';
import {
  closestPointOnBezier,
  evalBezier,
  evalBezierTangent,
  lutTAtDistance,
  rightNormalFromTangent,
} from './bezier.ts';
import type { RoadNetwork, RoadSegment } from './roads.ts';
import type { Terrain } from './terrain.ts';

export interface ZoneCell {
  id: number;
  segmentId: number;
  side: 1 | -1;
  col: number;
  depth: number; // 0..ZONE_MAX_DEPTH-1 (0 = road frontage)
  x: number;
  y: number;
  z: number;
  yaw: number; // aligned with road tangent (heading along road)
  normalX: number; // outward from road
  normalZ: number;
  zone: ZoneType;
  buildingId: number; // 0 if vacant
}

export type ZoneAreaShape =
  | { shape: 'circle'; x: number; z: number; radius: number }
  | { shape: 'rect'; x0: number; z0: number; x1: number; z1: number }
  | { shape: 'segment'; segmentId: number; side?: 1 | -1 };

export interface SerializedZones {
  painted: Array<{ x: number; z: number; zone: ZoneType }>;
}

const BUCKET_SIZE = 16;

function bucketKey(bx: number, bz: number): number {
  return ((bx + 512) << 12) | (bz + 512);
}

export class ZoneGrid {
  readonly cells = new Map<number, ZoneCell>();
  private readonly buckets = new Map<number, ZoneCell[]>();
  /** Fast lookup by `${segmentId}:${side}:${col}:${depth}` */
  private readonly slotIndex = new Map<string, ZoneCell>();
  private nextCellId = 1;
  revision = 1;

  private insertBucket(cell: ZoneCell): void {
    const bx = Math.floor(cell.x / BUCKET_SIZE);
    const bz = Math.floor(cell.z / BUCKET_SIZE);
    const key = bucketKey(bx, bz);
    const list = this.buckets.get(key);
    if (list) {
      list.push(cell);
    } else {
      this.buckets.set(key, [cell]);
    }
  }

  private hasOverlapCell(x: number, z: number, minDistSq: number): boolean {
    const bx = Math.floor(x / BUCKET_SIZE);
    const bz = Math.floor(z / BUCKET_SIZE);
    for (let dz = -1; dz <= 1; dz++) {
      for (let dx = -1; dx <= 1; dx++) {
        const list = this.buckets.get(bucketKey(bx + dx, bz + dz));
        if (!list) continue;
        for (let i = 0; i < list.length; i++) {
          const c = list[i];
          const ddx = c.x - x;
          const ddz = c.z - z;
          if (ddx * ddx + ddz * ddz < minDistSq) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private overlapsAnyRoad(
    x: number,
    z: number,
    ownSegmentId: number,
    roads: RoadNetwork
  ): boolean {
    const p = { x, z };
    for (const seg of roads.segments.values()) {
      const spec = ROAD_SPECS[seg.type];
      const halfW = spec.width * 0.5;
      const clearance = seg.id === ownSegmentId ? halfW + ZONE_CELL_SIZE * 0.42 : halfW + ZONE_CELL_SIZE * 0.46;
      if (
        x < seg.lut.minX - clearance ||
        x > seg.lut.maxX + clearance ||
        z < seg.lut.minZ - clearance ||
        z > seg.lut.maxZ + clearance
      ) {
        continue;
      }
      const cp = closestPointOnBezier(seg.lut, p);
      if (cp.dist < clearance) {
        return true;
      }
    }
    return false;
  }

  getSlotCell(segmentId: number, side: 1 | -1, col: number, depth: number): ZoneCell | undefined {
    return this.slotIndex.get(`${segmentId}:${side}:${col}:${depth}`);
  }

  /**
   * Rebuilds all 8m×8m×4-deep curved zone cells from current road geometry,
   * preserving previously painted zones spatially.
   */
  rebuildFromRoads(roads: RoadNetwork, terrain: Terrain, extraSavedZones?: Array<{ x: number; z: number; zone: ZoneType }>): void {
    // Snapshot previously painted zones
    const savedBuckets = new Map<number, Array<{ x: number; z: number; zone: ZoneType }>>();
    const addSaved = (x: number, z: number, zone: ZoneType) => {
      if (zone === 'none') return;
      const key = bucketKey(Math.floor(x / BUCKET_SIZE), Math.floor(z / BUCKET_SIZE));
      const list = savedBuckets.get(key);
      if (list) list.push({ x, z, zone });
      else savedBuckets.set(key, [{ x, z, zone }]);
    };

    for (const c of this.cells.values()) {
      if (c.zone !== 'none') addSaved(c.x, c.z, c.zone);
    }
    if (extraSavedZones) {
      for (const s of extraSavedZones) addSaved(s.x, s.z, s.zone);
    }

    this.cells.clear();
    this.buckets.clear();
    this.slotIndex.clear();
    this.nextCellId = 1;

    // Precompute columns per zoneable road segment
    interface ColSample {
      segment: RoadSegment;
      col: number;
      cx: number;
      cz: number;
      rnx: number;
      rnz: number;
      yaw: number;
    }

    const colSamples: ColSample[] = [];
    for (const seg of roads.segments.values()) {
      const spec = ROAD_SPECS[seg.type];
      if (!spec.zoneable || seg.isBridge) continue;

      const endMargin = Math.min(seg.lut.length * 0.25, spec.width * 0.5 + 1.5);
      const usable = seg.lut.length - 2 * endMargin;
      if (usable < ZONE_CELL_SIZE * 0.85) continue;

      const cols = Math.floor(usable / ZONE_CELL_SIZE);
      const leftover = usable - cols * ZONE_CELL_SIZE;
      const startS = endMargin + leftover * 0.5;

      for (let col = 0; col < cols; col++) {
        const s = startS + (col + 0.5) * ZONE_CELL_SIZE;
        const t = lutTAtDistance(seg.lut, s);
        const pt = evalBezier(seg.bezier, t);
        const tan = evalBezierTangent(seg.bezier, t);
        const rn = rightNormalFromTangent(tan);
        const yaw = Math.atan2(tan.x, tan.z);
        colSamples.push({
          segment: seg,
          col,
          cx: pt.x,
          cz: pt.z,
          rnx: rn.x,
          rnz: rn.z,
          yaw,
        });
      }
    }

    const overlapDistSq = (ZONE_CELL_SIZE * 0.84) ** 2;

    // Generate layer-by-layer (depth 0 frontage first) so frontage always wins overlap priority
    for (let depth = 0; depth < ZONE_MAX_DEPTH; depth++) {
      for (let i = 0; i < colSamples.length; i++) {
        const sample = colSamples[i];
        const spec = ROAD_SPECS[sample.segment.type];
        const offset = spec.width * 0.5 + (depth + 0.5) * ZONE_CELL_SIZE;

        for (const side of [1, -1] as const) {
          // Require parent cell closer to the road so zone blocks stay contiguous
          if (depth > 0 && !this.getSlotCell(sample.segment.id, side, sample.col, depth - 1)) {
            continue;
          }

          const nx = sample.rnx * side;
          const nz = sample.rnz * side;
          const x = sample.cx + nx * offset;
          const z = sample.cz + nz * offset;

          if (!terrain.isBuildable(x, z, 0.25)) continue;
          if (this.overlapsAnyRoad(x, z, sample.segment.id, roads)) continue;
          if (this.hasOverlapCell(x, z, overlapDistSq)) continue;

          // Restore prior zone painting if present near this spot
          let zone: ZoneType = 'none';
          const bx = Math.floor(x / BUCKET_SIZE);
          const bz = Math.floor(z / BUCKET_SIZE);
          let bestDistSq = 4.2 * 4.2;
          for (let dz = -1; dz <= 1; dz++) {
            for (let dx = -1; dx <= 1; dx++) {
              const list = savedBuckets.get(bucketKey(bx + dx, bz + dz));
              if (!list) continue;
              for (let j = 0; j < list.length; j++) {
                const s = list[j];
                const d2 = (s.x - x) ** 2 + (s.z - z) ** 2;
                if (d2 < bestDistSq) {
                  bestDistSq = d2;
                  zone = s.zone;
                }
              }
            }
          }

          const cell: ZoneCell = {
            id: this.nextCellId++,
            segmentId: sample.segment.id,
            side,
            col: sample.col,
            depth,
            x,
            y: terrain.sampleHeight(x, z),
            z,
            yaw: sample.yaw,
            normalX: nx,
            normalZ: nz,
            zone,
            buildingId: 0,
          };

          this.cells.set(cell.id, cell);
          this.insertBucket(cell);
          this.slotIndex.set(`${cell.segmentId}:${side}:${sample.col}:${depth}`, cell);
        }
      }
    }

    this.revision++;
  }

  paintArea(zone: ZoneType, area: ZoneAreaShape): number {
    let changed = 0;

    if (area.shape === 'segment') {
      for (const cell of this.cells.values()) {
        if (cell.segmentId !== area.segmentId) continue;
        if (area.side !== undefined && cell.side !== area.side) continue;
        if (cell.zone !== zone) {
          cell.zone = zone;
          changed++;
        }
      }
    } else if (area.shape === 'circle') {
      const rSq = area.radius * area.radius;
      const minBx = Math.floor((area.x - area.radius) / BUCKET_SIZE);
      const maxBx = Math.floor((area.x + area.radius) / BUCKET_SIZE);
      const minBz = Math.floor((area.z - area.radius) / BUCKET_SIZE);
      const maxBz = Math.floor((area.z + area.radius) / BUCKET_SIZE);

      for (let bz = minBz; bz <= maxBz; bz++) {
        for (let bx = minBx; bx <= maxBx; bx++) {
          const list = this.buckets.get(bucketKey(bx, bz));
          if (!list) continue;
          for (const cell of list) {
            const d2 = (cell.x - area.x) ** 2 + (cell.z - area.z) ** 2;
            if (d2 <= rSq && cell.zone !== zone) {
              cell.zone = zone;
              changed++;
            }
          }
        }
      }
    } else {
      const minX = Math.min(area.x0, area.x1);
      const maxX = Math.max(area.x0, area.x1);
      const minZ = Math.min(area.z0, area.z1);
      const maxZ = Math.max(area.z0, area.z1);
      const minBx = Math.floor(minX / BUCKET_SIZE);
      const maxBx = Math.floor(maxX / BUCKET_SIZE);
      const minBz = Math.floor(minZ / BUCKET_SIZE);
      const maxBz = Math.floor(maxZ / BUCKET_SIZE);

      for (let bz = minBz; bz <= maxBz; bz++) {
        for (let bx = minBx; bx <= maxBx; bx++) {
          const list = this.buckets.get(bucketKey(bx, bz));
          if (!list) continue;
          for (const cell of list) {
            if (
              cell.x >= minX &&
              cell.x <= maxX &&
              cell.z >= minZ &&
              cell.z <= maxZ &&
              cell.zone !== zone
            ) {
              cell.zone = zone;
              changed++;
            }
          }
        }
      }
    }

    if (changed > 0) {
      this.revision++;
    }
    return changed;
  }

  queryNear(x: number, z: number, radius: number): ZoneCell[] {
    const out: ZoneCell[] = [];
    const rSq = radius * radius;
    const minBx = Math.floor((x - radius) / BUCKET_SIZE);
    const maxBx = Math.floor((x + radius) / BUCKET_SIZE);
    const minBz = Math.floor((z - radius) / BUCKET_SIZE);
    const maxBz = Math.floor((z + radius) / BUCKET_SIZE);

    for (let bz = minBz; bz <= maxBz; bz++) {
      for (let bx = minBx; bx <= maxBx; bx++) {
        const list = this.buckets.get(bucketKey(bx, bz));
        if (!list) continue;
        for (const cell of list) {
          if ((cell.x - x) ** 2 + (cell.z - z) ** 2 <= rSq) {
            out.push(cell);
          }
        }
      }
    }
    return out;
  }

  serialize(): SerializedZones {
    const painted: Array<{ x: number; z: number; zone: ZoneType }> = [];
    for (const c of this.cells.values()) {
      if (c.zone !== 'none') {
        painted.push({ x: Math.round(c.x * 10) / 10, z: Math.round(c.z * 10) / 10, zone: c.zone });
      }
    }
    return { painted };
  }
}
