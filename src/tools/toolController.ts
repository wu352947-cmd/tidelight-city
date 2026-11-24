import * as THREE from 'three';
import {
  buildBezierLUT,
  closestPointOnBezier,
  makeQuadraticAsCubic,
  makeStraightBezier,
  vec2Dist,
  type BezierLUT,
} from '../sim/bezier.ts';
import {
  BUILDING_STRIDE,
  ROAD_NODE_STRIDE,
  ROAD_SEGMENT_STRIDE,
  UTILITY_LINE_STRIDE,
  ZONE_CELL_STRIDE,
  type BuildingSnapshotPayload,
  type RoadSnapshotPayload,
  type SimCommand,
  type SimSnapshot,
  type UtilitySnapshotPayload,
  type ZoneSnapshotPayload,
} from '../sim/protocol.ts';
import {
  INT_TO_ZONE,
  PLOPPABLE_SPECS,
  PLOPPABLE_TO_INT,
  ROAD_SPECS,
  ROAD_TYPE_LIST,
  WATER_LEVEL,
  ZONE_SPECS,
  type CubicBezier,
  type PloppableKind,
  type RoadType,
  type Vec2,
  type ZoneType,
} from '../sim/types.ts';
import type { TerrainMeshLayer } from '../render/terrainMesh.ts';
import type { ToolPreviewLayer } from '../render/previewMesh.ts';
import {
  ZONE_BRUSH_RADIUS,
  type ActiveTool,
  type ToolReadout,
} from './toolTypes.ts';

const INT_TO_PLOPPABLE = new Map<number, PloppableKind>(
  (Object.entries(PLOPPABLE_TO_INT) as Array<[PloppableKind, number]>).map(([k, v]) => [v, k])
);

export interface CachedRoadSegment {
  id: number;
  type: RoadType;
  bezier: CubicBezier;
  lut: BezierLUT;
  width: number;
}

export interface CachedRoadNode {
  id: number;
  x: number;
  z: number;
}

export interface CachedZoneCell {
  x: number;
  y: number;
  z: number;
  yaw: number;
  zone: ZoneType;
  occupied: boolean;
}

export interface CachedBuilding {
  id: number;
  kind: 'growable' | 'ploppable';
  zone: ZoneType;
  ploppableKind?: PloppableKind;
  level: number;
  x: number;
  y: number;
  z: number;
  yaw: number;
  width: number;
  depth: number;
  height: number;
  progress: number;
  problems: number;
}

export interface CachedUtilityLine {
  id: number;
  kind: 'power_line' | 'water_pipe';
  x0: number;
  z0: number;
  x1: number;
  z1: number;
}

export interface ToolControllerCallbacks {
  sendCommand: (cmd: SimCommand) => void;
  onReadout: (readout: ToolReadout) => void;
  onToolCleared: () => void;
  onInspectBuilding: (building: CachedBuilding | null) => void;
  onToast: (message: string, tone?: 'info' | 'warn' | 'success') => void;
}

interface SnapResult {
  point: Vec2;
  kind: 'none' | 'node' | 'segment';
  angleDeg?: number;
}

function pointToSegDist(px: number, pz: number, x0: number, z0: number, x1: number, z1: number): number {
  const dx = x1 - x0;
  const dz = z1 - z0;
  const lenSq = dx * dx + dz * dz;
  if (lenSq < 1e-6) return Math.hypot(px - x0, pz - z0);
  const t = Math.max(0, Math.min(1, ((px - x0) * dx + (pz - z0) * dz) / lenSq));
  return Math.hypot(px - (x0 + dx * t), pz - (z0 + dz * t));
}

export class ToolController {
  private tool: ActiveTool = { kind: 'none' };
  private money = 120000;

  // Cached client-side geometry from snapshots
  roads: CachedRoadSegment[] = [];
  nodes: CachedRoadNode[] = [];
  zoneCells: CachedZoneCell[] = [];
  buildings: CachedBuilding[] = [];
  utilityLines: CachedUtilityLine[] = [];

  // Road stroke state
  private roadStart: Vec2 | null = null;
  private roadStartSnap: 'none' | 'node' | 'segment' = 'none';
  private roadControl: Vec2 | null = null;
  private freeformPts: Vec2[] = [];
  private isDraggingTool = false;

  // Utility line stroke state
  private utilStart: Vec2 | null = null;

  // Zone drag-paint throttling
  private lastZonePaintPos: Vec2 | null = null;

  // Last known hover screen & world coords
  private lastScreenX = 0;
  private lastScreenY = 0;
  private lastWorldPt: Vec2 | null = null;

  private readonly raycaster = new THREE.Raycaster();
  private readonly ndc = new THREE.Vector2();
  private readonly fallbackPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -6);
  private readonly tmpVec = new THREE.Vector3();

  constructor(
    private readonly domElement: HTMLElement,
    private readonly camera: THREE.PerspectiveCamera,
    private readonly terrain: TerrainMeshLayer,
    private readonly preview: ToolPreviewLayer,
    private readonly callbacks: ToolControllerCallbacks
  ) {}

  getTool(): ActiveTool {
    return this.tool;
  }

  isToolActive(): boolean {
    return this.tool.kind !== 'none' && this.tool.kind !== 'info';
  }

  hasActiveStroke(): boolean {
    return this.roadStart !== null || this.utilStart !== null || this.freeformPts.length > 0;
  }

  setTool(next: ActiveTool): void {
    this.resetStroke();
    this.tool = next;
    if (this.lastWorldPt && this.isToolActive()) {
      this.updateHoverVisuals(this.lastWorldPt, this.lastScreenX, this.lastScreenY);
    } else {
      this.preview.clearPreview();
      this.hideReadout();
    }
  }

  rotatePloppable(stepRad = Math.PI / 4): void {
    if (this.tool.kind !== 'ploppable') return;
    this.tool = {
      ...this.tool,
      yaw: (this.tool.yaw + stepRad) % (Math.PI * 2),
    };
    if (this.lastWorldPt) {
      this.updateHoverVisuals(this.lastWorldPt, this.lastScreenX, this.lastScreenY);
    }
  }

  resetStroke(): void {
    this.roadStart = null;
    this.roadStartSnap = 'none';
    this.roadControl = null;
    this.freeformPts = [];
    this.utilStart = null;
    this.lastZonePaintPos = null;
    this.isDraggingTool = false;
    this.preview.clearPreview();
    this.hideReadout();
  }

  cancelOrExit(): void {
    if (this.hasActiveStroke()) {
      this.resetStroke();
      if (this.lastWorldPt && this.isToolActive()) {
        this.updateHoverVisuals(this.lastWorldPt, this.lastScreenX, this.lastScreenY);
      }
      return;
    }
    if (this.isToolActive()) {
      this.tool = { kind: 'none' };
      this.preview.clearPreview();
      this.hideReadout();
      this.callbacks.onToolCleared();
    } else {
      this.preview.clearSelection();
      this.callbacks.onInspectBuilding(null);
    }
  }

  syncSnapshot(snap: SimSnapshot): void {
    this.money = snap.stats.money;
    if (snap.roads) this.unpackRoads(snap.roads);
    if (snap.zones) this.unpackZones(snap.zones);
    if (snap.buildings) this.unpackBuildings(snap.buildings);
    if (snap.utilities) this.unpackUtilities(snap.utilities);
  }

  private unpackRoads(payload: RoadSnapshotPayload): void {
    const out: CachedRoadSegment[] = [];
    const data = payload.segments;
    const count = Math.floor(data.length / ROAD_SEGMENT_STRIDE);
    for (let i = 0; i < count; i++) {
      const b = i * ROAD_SEGMENT_STRIDE;
      const bez: CubicBezier = {
        p0: { x: data[b + 2], z: data[b + 3] },
        c0: { x: data[b + 4], z: data[b + 5] },
        c1: { x: data[b + 6], z: data[b + 7] },
        p1: { x: data[b + 8], z: data[b + 9] },
      };
      const type = ROAD_TYPE_LIST[Math.round(data[b + 1])] ?? 'small_2lane';
      out.push({
        id: Math.round(data[b]),
        type,
        bezier: bez,
        lut: buildBezierLUT(bez, 24),
        width: data[b + 10] || ROAD_SPECS[type].width,
      });
    }
    this.roads = out;

    const nodes: CachedRoadNode[] = [];
    const nData = payload.nodes;
    const nCount = Math.floor(nData.length / ROAD_NODE_STRIDE);
    for (let i = 0; i < nCount; i++) {
      const b = i * ROAD_NODE_STRIDE;
      nodes.push({
        id: Math.round(nData[b]),
        x: nData[b + 1],
        z: nData[b + 2],
      });
    }
    this.nodes = nodes;
  }

  private unpackZones(payload: ZoneSnapshotPayload): void {
    const data = payload.cells;
    const count = Math.floor(data.length / ZONE_CELL_STRIDE);
    const cells: CachedZoneCell[] = new Array(count);
    for (let i = 0; i < count; i++) {
      const b = i * ZONE_CELL_STRIDE;
      cells[i] = {
        x: data[b],
        y: data[b + 1],
        z: data[b + 2],
        yaw: data[b + 3],
        zone: INT_TO_ZONE[Math.round(data[b + 4])] ?? 'none',
        occupied: data[b + 5] >= 0.5,
      };
    }
    this.zoneCells = cells;
  }

  private unpackBuildings(payload: BuildingSnapshotPayload): void {
    const data = payload.buildings;
    const count = Math.floor(data.length / BUILDING_STRIDE);
    const out: CachedBuilding[] = new Array(count);
    for (let i = 0; i < count; i++) {
      const b = i * BUILDING_STRIDE;
      const kindInt = Math.round(data[b + 1]);
      const code = Math.round(data[b + 2]);
      out[i] = {
        id: Math.round(data[b]),
        kind: kindInt === 1 ? 'ploppable' : 'growable',
        zone: kindInt === 0 ? INT_TO_ZONE[code] ?? 'res_low' : 'none',
        ploppableKind: kindInt === 1 ? INT_TO_PLOPPABLE.get(code) : undefined,
        level: Math.max(1, Math.round(data[b + 3])),
        x: data[b + 4],
        y: data[b + 5],
        z: data[b + 6],
        yaw: data[b + 7],
        width: data[b + 8],
        depth: data[b + 9],
        height: data[b + 10],
        progress: data[b + 11],
        problems: Math.round(data[b + 12]),
      };
    }
    this.buildings = out;
  }

  private unpackUtilities(payload: UtilitySnapshotPayload): void {
    const data = payload.lines;
    const count = Math.floor(data.length / UTILITY_LINE_STRIDE);
    const out: CachedUtilityLine[] = new Array(count);
    for (let i = 0; i < count; i++) {
      const b = i * UTILITY_LINE_STRIDE;
      out[i] = {
        id: Math.round(data[b]),
        kind: Math.round(data[b + 1]) === 0 ? 'power_line' : 'water_pipe',
        x0: data[b + 2],
        z0: data[b + 3],
        x1: data[b + 4],
        z1: data[b + 5],
      };
    }
    this.utilityLines = out;
  }

  raycastWorld(clientX: number, clientY: number): Vec2 | null {
    const rect = this.domElement.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    this.ndc.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(this.ndc, this.camera);

    const terrainMesh = this.terrain.getTerrainMesh();
    if (terrainMesh) {
      const hits = this.raycaster.intersectObject(terrainMesh, false);
      if (hits.length > 0) {
        return { x: hits[0].point.x, z: hits[0].point.z };
      }
    }
    const hit = this.raycaster.ray.intersectPlane(this.fallbackPlane, this.tmpVec);
    return hit ? { x: hit.x, z: hit.z } : null;
  }

  projectWorldToScreen(x: number, y: number, z: number): { x: number; y: number; visible: boolean } {
    this.tmpVec.set(x, y, z).project(this.camera);
    const rect = this.domElement.getBoundingClientRect();
    const visible =
      this.tmpVec.z >= -1 &&
      this.tmpVec.z <= 1 &&
      this.tmpVec.x >= -1.05 &&
      this.tmpVec.x <= 1.05 &&
      this.tmpVec.y >= -1.05 &&
      this.tmpVec.y <= 1.05;
    return {
      x: rect.left + (this.tmpVec.x * 0.5 + 0.5) * rect.width,
      y: rect.top + (-this.tmpVec.y * 0.5 + 0.5) * rect.height,
      visible,
    };
  }

  /**
   * Snap a terrain point to road nodes (15m), road segments (13m T-junction),
   * or 15° angle increments relative to an optional anchor point.
   */
  private snapRoadPoint(raw: Vec2, anchor: Vec2 | null, enableSnap: boolean): SnapResult {
    if (enableSnap) {
      // 1. Existing node snap
      let bestNode: CachedRoadNode | null = null;
      let bestNodeDist = 15;
      for (const n of this.nodes) {
        const d = Math.hypot(n.x - raw.x, n.z - raw.z);
        if (d < bestNodeDist) {
          bestNodeDist = d;
          bestNode = n;
        }
      }
      if (bestNode) {
        return { point: { x: bestNode.x, z: bestNode.z }, kind: 'node' };
      }

      // 2. Existing segment T-junction snap
      let bestSegPt: Vec2 | null = null;
      let bestSegDist = 13;
      for (const seg of this.roads) {
        if (
          raw.x < seg.lut.minX - 14 ||
          raw.x > seg.lut.maxX + 14 ||
          raw.z < seg.lut.minZ - 14 ||
          raw.z > seg.lut.maxZ + 14
        ) {
          continue;
        }
        const cp = closestPointOnBezier(seg.lut, raw);
        if (cp.dist < bestSegDist && cp.s > 6 && cp.s < seg.lut.length - 6) {
          bestSegDist = cp.dist;
          bestSegPt = cp.point;
        }
      }
      if (bestSegPt) {
        return { point: bestSegPt, kind: 'segment' };
      }

      // 3. 15-degree angle snap from anchor
      if (anchor) {
        const dx = raw.x - anchor.x;
        const dz = raw.z - anchor.z;
        const dist = Math.hypot(dx, dz);
        if (dist > 4) {
          const rawAngle = Math.atan2(dz, dx);
          const step = Math.PI / 12; // 15°
          const snappedAngle = Math.round(rawAngle / step) * step;
          const deg = ((Math.round((snappedAngle * 180) / Math.PI) % 360) + 360) % 360;
          return {
            point: {
              x: anchor.x + Math.cos(snappedAngle) * dist,
              z: anchor.z + Math.sin(snappedAngle) * dist,
            },
            kind: 'none',
            angleDeg: deg,
          };
        }
      }
    }

    return { point: raw, kind: 'none' };
  }

  private snapUtilityPoint(raw: Vec2): Vec2 {
    let best: Vec2 | null = null;
    let bestDist = 18;
    for (const l of this.utilityLines) {
      const d0 = Math.hypot(l.x0 - raw.x, l.z0 - raw.z);
      if (d0 < bestDist) {
        bestDist = d0;
        best = { x: l.x0, z: l.z0 };
      }
      const d1 = Math.hypot(l.x1 - raw.x, l.z1 - raw.z);
      if (d1 < bestDist) {
        bestDist = d1;
        best = { x: l.x1, z: l.z1 };
      }
    }
    for (const b of this.buildings) {
      if (b.kind !== 'ploppable') continue;
      const d = Math.hypot(b.x - raw.x, b.z - raw.z);
      if (d < bestDist + 8) {
        bestDist = d;
        best = { x: b.x, z: b.z };
      }
    }
    return best ?? raw;
  }

  pickBuildingAtWorld(pt: Vec2): CachedBuilding | null {
    let best: CachedBuilding | null = null;
    let bestDist = Infinity;
    for (const b of this.buildings) {
      const dx = pt.x - b.x;
      const dz = pt.z - b.z;
      const maxR = Math.hypot(b.width, b.depth) * 0.58 + 3;
      if (dx * dx + dz * dz > maxR * maxR) continue;
      const cos = Math.cos(-b.yaw);
      const sin = Math.sin(-b.yaw);
      const lx = dx * cos - dz * sin;
      const lz = dx * sin + dz * cos;
      if (Math.abs(lx) <= b.width * 0.56 + 2 && Math.abs(lz) <= b.depth * 0.56 + 2) {
        const d = Math.hypot(dx, dz);
        if (d < bestDist) {
          bestDist = d;
          best = b;
        }
      }
    }
    return best;
  }

  private pickRoadAtWorld(pt: Vec2, maxExtra = 4): CachedRoadSegment | null {
    let best: CachedRoadSegment | null = null;
    let bestDist = Infinity;
    for (const seg of this.roads) {
      const hitR = seg.width * 0.5 + maxExtra;
      if (
        pt.x < seg.lut.minX - hitR ||
        pt.x > seg.lut.maxX + hitR ||
        pt.z < seg.lut.minZ - hitR ||
        pt.z > seg.lut.maxZ + hitR
      ) {
        continue;
      }
      const cp = closestPointOnBezier(seg.lut, pt);
      if (cp.dist <= hitR && cp.dist < bestDist) {
        bestDist = cp.dist;
        best = seg;
      }
    }
    return best;
  }

  private pickUtilityLineAtWorld(pt: Vec2): CachedUtilityLine | null {
    let best: CachedUtilityLine | null = null;
    let bestDist = 11;
    for (const l of this.utilityLines) {
      const d = pointToSegDist(pt.x, pt.z, l.x0, l.z0, l.x1, l.z1);
      if (d < bestDist) {
        bestDist = d;
        best = l;
      }
    }
    return best;
  }

  private validatePloppable(kind: PloppableKind, x: number, z: number): { valid: boolean; reason?: string } {
    const spec = PLOPPABLE_SPECS[kind];
    if (this.money < spec.cost) {
      return { valid: false, reason: `资金不足 (需要 ¥${spec.cost.toLocaleString('zh-CN')})` };
    }
    if (!this.terrain.isInBounds(x, z, 24)) {
      return { valid: false, reason: '超出地图边界' };
    }
    const h = this.terrain.sampleHeight(x, z);
    if (spec.needsWaterEdge) {
      if (!this.terrain.isNearWater(x, z, 72)) {
        return { valid: false, reason: '需放置在河岸或海岸附近' };
      }
      if (h < WATER_LEVEL - 1.2) {
        return { valid: false, reason: '水深过深，请靠近岸边' };
      }
    } else {
      if (!this.terrain.isBuildable(x, z, 0.32)) {
        return { valid: false, reason: '地形过陡或位于水域' };
      }
    }

    const halfDiag = Math.hypot(spec.width, spec.depth) * 0.45;
    for (const b of this.buildings) {
      if (b.kind !== 'ploppable') continue;
      const otherHalf = Math.hypot(b.width, b.depth) * 0.45;
      if (Math.hypot(b.x - x, b.z - z) < (halfDiag + otherHalf) * 0.85) {
        return { valid: false, reason: '与现有设施重叠' };
      }
    }
    return { valid: true };
  }

  handleHover(clientX: number, clientY: number): void {
    this.lastScreenX = clientX;
    this.lastScreenY = clientY;
    if (!this.isToolActive()) return;
    const pt = this.raycastWorld(clientX, clientY);
    if (!pt) return;
    this.lastWorldPt = pt;
    this.updateHoverVisuals(pt, clientX, clientY);
  }

  handleTapSelect(clientX: number, clientY: number): void {
    const pt = this.raycastWorld(clientX, clientY);
    if (!pt) return;
    const b = this.pickBuildingAtWorld(pt);
    if (b) {
      this.preview.showSelectedBuilding(b.x, b.y, b.z, b.yaw, b.width, b.depth, b.height);
      this.callbacks.onInspectBuilding(b);
    } else {
      this.preview.clearSelection();
      this.callbacks.onInspectBuilding(null);
    }
  }

  handleToolDown(clientX: number, clientY: number, _pointerType: string): void {
    this.lastScreenX = clientX;
    this.lastScreenY = clientY;
    const pt = this.raycastWorld(clientX, clientY);
    if (!pt) return;
    this.lastWorldPt = pt;
    this.isDraggingTool = true;

    const tool = this.tool;
    if (tool.kind === 'road') {
      if (tool.mode === 'upgrade') {
        const seg = this.pickRoadAtWorld(pt, 5);
        if (seg) {
          if (seg.type === tool.roadType) {
            this.callbacks.onToast('该路段已是此类型道路', 'info');
          } else {
            this.callbacks.sendCommand({
              type: 'upgradeRoad',
              segmentId: seg.id,
              roadType: tool.roadType,
            });
          }
        }
        return;
      }

      if (tool.mode === 'freeform') {
        const snapped = this.snapRoadPoint(pt, null, tool.snap);
        this.freeformPts = [snapped.point];
        this.roadStart = snapped.point;
        this.roadStartSnap = snapped.kind;
        this.updateHoverVisuals(pt, clientX, clientY);
        return;
      }

      if (tool.mode === 'straight') {
        if (!this.roadStart) {
          const snapped = this.snapRoadPoint(pt, null, tool.snap);
          this.roadStart = snapped.point;
          this.roadStartSnap = snapped.kind;
          this.updateHoverVisuals(pt, clientX, clientY);
        } else {
          // Second click commits straight road
          const snappedEnd = this.snapRoadPoint(pt, this.roadStart, tool.snap);
          this.commitRoad(this.roadStart, snappedEnd.point, undefined, undefined, tool.roadType);
          this.resetStroke();
          this.updateHoverVisuals(pt, clientX, clientY);
        }
        return;
      }

      if (tool.mode === 'curve') {
        if (!this.roadStart) {
          const snapped = this.snapRoadPoint(pt, null, tool.snap);
          this.roadStart = snapped.point;
          this.roadStartSnap = snapped.kind;
          this.updateHoverVisuals(pt, clientX, clientY);
        } else if (!this.roadControl) {
          const snappedCtrl = this.snapRoadPoint(pt, this.roadStart, tool.snap);
          if (vec2Dist(this.roadStart, snappedCtrl.point) < 8) {
            this.callbacks.onToast('控制点距起点太近', 'warn');
            return;
          }
          this.roadControl = snappedCtrl.point;
          this.updateHoverVisuals(pt, clientX, clientY);
        } else {
          const snappedEnd = this.snapRoadPoint(pt, this.roadControl, tool.snap);
          const bez = makeQuadraticAsCubic(this.roadStart, this.roadControl, snappedEnd.point);
          this.commitRoad(bez.p0, bez.p1, bez.c0, bez.c1, tool.roadType);
          this.resetStroke();
          this.updateHoverVisuals(pt, clientX, clientY);
        }
        return;
      }
    }

    if (tool.kind === 'zone') {
      this.applyZonePaint(pt, tool.zone, tool.brush);
      this.lastZonePaintPos = pt;
      this.updateHoverVisuals(pt, clientX, clientY);
      return;
    }

    if (tool.kind === 'ploppable') {
      const check = this.validatePloppable(tool.ploppable, pt.x, pt.z);
      if (!check.valid) {
        this.callbacks.onToast(check.reason ?? '无法在此处放置', 'warn');
        this.updateHoverVisuals(pt, clientX, clientY);
        return;
      }
      this.callbacks.sendCommand({
        type: 'placeBuilding',
        kind: tool.ploppable,
        x: pt.x,
        z: pt.z,
        yaw: tool.yaw,
      });
      return;
    }

    if (tool.kind === 'utility_line') {
      const snapped = this.snapUtilityPoint(pt);
      if (!this.utilStart) {
        this.utilStart = snapped;
        this.updateHoverVisuals(pt, clientX, clientY);
      } else {
        this.commitUtilityLine(tool.lineKind, this.utilStart, snapped);
        this.resetStroke();
        this.updateHoverVisuals(pt, clientX, clientY);
      }
      return;
    }

    if (tool.kind === 'bulldoze') {
      this.commitBulldoze(pt);
      return;
    }
  }

  handleToolMove(clientX: number, clientY: number, _pointerType: string): void {
    this.lastScreenX = clientX;
    this.lastScreenY = clientY;
    const pt = this.raycastWorld(clientX, clientY);
    if (!pt) return;
    this.lastWorldPt = pt;

    const tool = this.tool;
    if (tool.kind === 'zone' && this.isDraggingTool) {
      if (!this.lastZonePaintPos || vec2Dist(this.lastZonePaintPos, pt) >= 6) {
        this.applyZonePaint(pt, tool.zone, tool.brush);
        this.lastZonePaintPos = pt;
      }
    } else if (tool.kind === 'road' && tool.mode === 'freeform' && this.isDraggingTool && this.freeformPts.length > 0) {
      const last = this.freeformPts[this.freeformPts.length - 1];
      if (vec2Dist(last, pt) >= 32) {
        this.freeformPts.push(pt);
      }
    }

    this.updateHoverVisuals(pt, clientX, clientY);
  }

  handleToolUp(clientX: number, clientY: number, _pointerType: string, dragged: boolean): void {
    this.isDraggingTool = false;
    const pt = this.raycastWorld(clientX, clientY) ?? this.lastWorldPt;
    if (!pt) return;
    this.lastWorldPt = pt;

    const tool = this.tool;
    // Support smooth press-drag-release for straight road, freeform road, and utility lines!
    if (tool.kind === 'road' && tool.mode === 'straight' && this.roadStart && dragged) {
      const snappedEnd = this.snapRoadPoint(pt, this.roadStart, tool.snap);
      if (vec2Dist(this.roadStart, snappedEnd.point) >= 10) {
        this.commitRoad(this.roadStart, snappedEnd.point, undefined, undefined, tool.roadType);
        this.resetStroke();
        this.updateHoverVisuals(pt, clientX, clientY);
      }
    } else if (tool.kind === 'road' && tool.mode === 'freeform' && this.freeformPts.length > 0) {
      const snappedEnd = this.snapRoadPoint(pt, null, tool.snap);
      const pts = [...this.freeformPts];
      if (vec2Dist(pts[pts.length - 1], snappedEnd.point) >= 12) {
        pts.push(snappedEnd.point);
      }
      const curves = this.buildFreeformCurves(pts);
      for (const bez of curves) {
        this.commitRoad(bez.p0, bez.p1, bez.c0, bez.c1, tool.roadType);
      }
      this.resetStroke();
      this.updateHoverVisuals(pt, clientX, clientY);
    } else if (tool.kind === 'utility_line' && this.utilStart && dragged) {
      const snappedEnd = this.snapUtilityPoint(pt);
      if (vec2Dist(this.utilStart, snappedEnd) >= 8) {
        this.commitUtilityLine(tool.lineKind, this.utilStart, snappedEnd);
        this.resetStroke();
        this.updateHoverVisuals(pt, clientX, clientY);
      }
    }
  }

  private buildFreeformCurves(pts: Vec2[]): CubicBezier[] {
    if (pts.length < 2) return [];
    const curves: CubicBezier[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 2)];
      // Catmull-Rom to cubic Bezier tangents
      const c0: Vec2 = {
        x: p0.x + (p1.x - prev.x) / 6,
        z: p0.z + (p1.z - prev.z) / 6,
      };
      const c1: Vec2 = {
        x: p1.x - (next.x - p0.x) / 6,
        z: p1.z - (next.z - p0.z) / 6,
      };
      curves.push({ p0, c0, c1, p1 });
    }
    return curves;
  }

  private commitRoad(p0: Vec2, p1: Vec2, c0: Vec2 | undefined, c1: Vec2 | undefined, roadType: RoadType): void {
    if (vec2Dist(p0, p1) < 8) {
      this.callbacks.onToast('路段太短（至少 8 米）', 'warn');
      return;
    }
    this.callbacks.sendCommand({
      type: 'buildRoad',
      p0,
      c0,
      c1,
      p1,
      roadType,
    });
  }

  private commitUtilityLine(kind: 'power_line' | 'water_pipe', p0: Vec2, p1: Vec2): void {
    const len = vec2Dist(p0, p1);
    if (len < 6) {
      this.callbacks.onToast('线路太短', 'warn');
      return;
    }
    this.callbacks.sendCommand({
      type: 'buildUtilityLine',
      kind,
      x0: p0.x,
      z0: p0.z,
      x1: p1.x,
      z1: p1.z,
    });
  }

  private applyZonePaint(pt: Vec2, zone: ZoneType, brush: 'small' | 'medium' | 'large' | 'segment'): void {
    if (brush === 'segment') {
      const seg = this.pickRoadAtWorld(pt, 34);
      if (seg) {
        this.callbacks.sendCommand({
          type: 'zoneArea',
          zone,
          area: { shape: 'segment', segmentId: seg.id },
        });
      }
      return;
    }
    const radius = ZONE_BRUSH_RADIUS[brush];
    this.callbacks.sendCommand({
      type: 'zoneArea',
      zone,
      area: { shape: 'circle', x: pt.x, z: pt.z, radius },
    });
  }

  private commitBulldoze(pt: Vec2): void {
    // Priority: Building -> Road -> Utility Line
    const b = this.pickBuildingAtWorld(pt);
    if (b) {
      this.callbacks.sendCommand({ type: 'bulldozeBuilding', buildingId: b.id });
      this.preview.clearPreview();
      return;
    }
    const seg = this.pickRoadAtWorld(pt, 4);
    if (seg) {
      this.callbacks.sendCommand({ type: 'bulldozeRoad', segmentId: seg.id });
      this.preview.clearPreview();
      return;
    }
    const line = this.pickUtilityLineAtWorld(pt);
    if (line) {
      this.callbacks.sendCommand({ type: 'bulldozeUtilityLine', lineId: line.id });
      this.preview.clearPreview();
    }
  }

  /**
   * Programmatic preview trigger for deterministic screenshots (?tool=road&preview=1 or page.evaluate).
   */
  showDemoRoadPreview(p0: Vec2, p1: Vec2, ctrl?: Vec2): void {
    if (this.tool.kind !== 'road') return;
    const spec = ROAD_SPECS[this.tool.roadType];
    const bez = ctrl ? makeQuadraticAsCubic(p0, ctrl, p1) : makeStraightBezier(p0, p1);
    const lut = buildBezierLUT(bez, 28);
    const len = Math.round(lut.length);
    const cost = Math.round(lut.length * spec.costPerMeter);
    const sampleH = (x: number, z: number) => this.terrain.sampleHeight(x, z);

    this.preview.showRoadPreview([bez], spec.width, true, sampleH, {
      startSnap: 'node',
      endSnap: 'none',
      controlPoint: ctrl,
    });

    const screen = this.projectWorldToScreen(p1.x, sampleH(p1.x, p1.z) + 4, p1.z);
    this.callbacks.onReadout({
      visible: true,
      screenX: screen.x,
      screenY: screen.y,
      title: `${spec.labelZh} · ${len} m`,
      costText: `¥${cost.toLocaleString('zh-CN')}`,
      snapBadge: ctrl ? '曲线模式 · 节点吸附' : '节点吸附',
      valid: this.money >= cost,
      hint: '点击确认修建 · 右键取消',
    });
  }

  private updateHoverVisuals(pt: Vec2, screenX: number, screenY: number): void {
    const sampleH = (x: number, z: number) => this.terrain.sampleHeight(x, z);
    const tool = this.tool;

    if (tool.kind === 'road') {
      const spec = ROAD_SPECS[tool.roadType];

      if (tool.mode === 'upgrade') {
        const seg = this.pickRoadAtWorld(pt, 5);
        if (seg) {
          const same = seg.type === tool.roadType;
          const oldCost = ROAD_SPECS[seg.type].costPerMeter;
          const newCost = spec.costPerMeter;
          const cost = Math.max(
            Math.round(seg.lut.length * 10),
            Math.round(seg.lut.length * (newCost - oldCost * 0.5))
          );
          const valid = !same && this.money >= cost;
          this.preview.showRoadPreview([seg.bezier], spec.width, valid, sampleH, { highlightOnly: true });
          this.callbacks.onReadout({
            visible: true,
            screenX,
            screenY,
            title: same ? `已是${spec.labelZh}` : `升级为 ${spec.labelZh}`,
            costText: same ? undefined : `¥${cost.toLocaleString('zh-CN')}`,
            valid,
            hint: same ? undefined : '点击路段升级',
          });
        } else {
          this.preview.clearPreview();
          this.callbacks.onReadout({
            visible: true,
            screenX,
            screenY,
            title: `升级道路 → ${spec.labelZh}`,
            valid: true,
            hint: '点击已有路段进行升级',
          });
        }
        return;
      }

      if (tool.mode === 'freeform') {
        if (this.freeformPts.length > 0) {
          const snappedEnd = this.snapRoadPoint(pt, null, tool.snap);
          const pts = [...this.freeformPts, snappedEnd.point];
          const curves = this.buildFreeformCurves(pts);
          let totalLen = 0;
          for (const c of curves) totalLen += buildBezierLUT(c, 16).length;
          const cost = Math.round(totalLen * spec.costPerMeter);
          const valid = totalLen >= 8 && this.money >= cost;
          this.preview.showRoadPreview(curves, spec.width, valid, sampleH, {
            startSnap: this.roadStartSnap,
            endSnap: snappedEnd.kind,
          });
          this.callbacks.onReadout({
            visible: true,
            screenX,
            screenY,
            title: `${spec.labelZh} · ${Math.round(totalLen)} m`,
            costText: `¥${cost.toLocaleString('zh-CN')}`,
            snapBadge: '自由曲线',
            valid,
            hint: '松开修建道路',
          });
        } else {
          const snapped = this.snapRoadPoint(pt, null, tool.snap);
          this.preview.showRoadAnchor(snapped.point, snapped.kind, spec.width, sampleH);
          this.callbacks.onReadout({
            visible: true,
            screenX,
            screenY,
            title: `${spec.labelZh} · 自由绘制`,
            snapBadge: snapped.kind === 'node' ? '吸附节点' : snapped.kind === 'segment' ? '吸附路口' : undefined,
            valid: true,
            hint: '按住拖动自由绘制道路',
          });
        }
        return;
      }

      // Straight or Curve mode
      if (!this.roadStart) {
        const snapped = this.snapRoadPoint(pt, null, tool.snap);
        this.preview.showRoadAnchor(snapped.point, snapped.kind, spec.width, sampleH);
        this.callbacks.onReadout({
          visible: true,
          screenX,
          screenY,
          title: `${spec.labelZh}`,
          costText: `¥${spec.costPerMeter}/m`,
          snapBadge:
            snapped.kind === 'node'
              ? '已吸附节点'
              : snapped.kind === 'segment'
                ? 'T型路口吸附'
                : undefined,
          valid: true,
          hint: tool.mode === 'curve' ? '点击设置起点 (第 1/3 步)' : '点击或拖动设置起点',
        });
        return;
      }

      if (tool.mode === 'curve' && !this.roadControl) {
        const snapped = this.snapRoadPoint(pt, this.roadStart, tool.snap);
        const straight = makeStraightBezier(this.roadStart, snapped.point);
        const dist = vec2Dist(this.roadStart, snapped.point);
        this.preview.showRoadPreview([straight], spec.width * 0.7, dist >= 8, sampleH, {
          startSnap: this.roadStartSnap,
          endSnap: snapped.kind,
        });
        this.callbacks.onReadout({
          visible: true,
          screenX,
          screenY,
          title: `弯道控制点 · ${Math.round(dist)} m`,
          snapBadge: snapped.angleDeg !== undefined ? `角度 ${snapped.angleDeg}°` : undefined,
          valid: dist >= 8,
          hint: '点击设置弯曲方向 (第 2/3 步) · 右键取消',
        });
        return;
      }

      const anchor = tool.mode === 'curve' && this.roadControl ? this.roadControl : this.roadStart;
      const snappedEnd = this.snapRoadPoint(pt, anchor, tool.snap);
      const bez =
        tool.mode === 'curve' && this.roadControl
          ? makeQuadraticAsCubic(this.roadStart, this.roadControl, snappedEnd.point)
          : makeStraightBezier(this.roadStart, snappedEnd.point);
      const lut = buildBezierLUT(bez, 28);
      const len = lut.length;
      const cost = Math.round(len * spec.costPerMeter);
      const inBounds = this.terrain.isInBounds(snappedEnd.point.x, snappedEnd.point.z, 18);
      const valid = len >= 8 && inBounds && this.money >= cost;

      this.preview.showRoadPreview([bez], spec.width, valid, sampleH, {
        startSnap: this.roadStartSnap,
        endSnap: snappedEnd.kind,
        controlPoint: this.roadControl ?? undefined,
      });

      const snapBadge =
        snappedEnd.kind === 'node'
          ? '吸附节点'
          : snappedEnd.kind === 'segment'
            ? 'T型路口'
            : snappedEnd.angleDeg !== undefined
              ? `角度 ${snappedEnd.angleDeg}°`
              : undefined;

      this.callbacks.onReadout({
        visible: true,
        screenX,
        screenY,
        title: `${spec.labelZh} · ${Math.round(len)} m`,
        costText: `¥${cost.toLocaleString('zh-CN')}`,
        snapBadge,
        valid,
        hint: !inBounds
          ? '超出地图边界'
          : len < 8
            ? '长度需至少 8 m'
            : this.money < cost
              ? '资金不足'
              : '点击确认 · 右键/Esc 取消',
      });
      return;
    }

    if (tool.kind === 'zone') {
      const radius = ZONE_BRUSH_RADIUS[tool.brush];
      const matched: Array<{ x: number; y: number; z: number; yaw: number }> = [];

      if (tool.brush === 'segment') {
        const seg = this.pickRoadAtWorld(pt, 34);
        if (seg) {
          const maxD = seg.width * 0.5 + 36;
          for (const c of this.zoneCells) {
            if (
              c.x < seg.lut.minX - maxD ||
              c.x > seg.lut.maxX + maxD ||
              c.z < seg.lut.minZ - maxD ||
              c.z > seg.lut.maxZ + maxD
            ) {
              continue;
            }
            const cp = closestPointOnBezier(seg.lut, { x: c.x, z: c.z });
            if (cp.dist <= maxD) {
              matched.push(c);
            }
          }
        }
      } else {
        const rSq = radius * radius;
        for (const c of this.zoneCells) {
          const dx = c.x - pt.x;
          const dz = c.z - pt.z;
          if (dx * dx + dz * dz <= rSq) {
            matched.push(c);
          }
        }
      }

      this.preview.showZoneBrushPreview(pt, radius, tool.zone, matched, sampleH, tool.brush !== 'segment');
      const label = tool.zone === 'none' ? '取消分区' : ZONE_SPECS[tool.zone].labelZh;
      this.callbacks.onReadout({
        visible: true,
        screenX,
        screenY,
        title: `${label} · ${matched.length} 格`,
        valid: matched.length > 0,
        hint: matched.length > 0 ? '点击或拖动涂抹规划' : '请移至道路旁的可规划格',
      });
      return;
    }

    if (tool.kind === 'ploppable') {
      const spec = PLOPPABLE_SPECS[tool.ploppable];
      const check = this.validatePloppable(tool.ploppable, pt.x, pt.z);
      this.preview.showPloppableGhost(
        pt.x,
        pt.z,
        tool.yaw,
        spec.width,
        spec.depth,
        spec.height,
        spec.coverageRadius,
        check.valid,
        sampleH
      );
      this.callbacks.onReadout({
        visible: true,
        screenX,
        screenY,
        title: spec.labelZh,
        costText: `¥${spec.cost.toLocaleString('zh-CN')}`,
        valid: check.valid,
        hint: check.valid ? '点击放置 · R 键旋转方向' : check.reason,
      });
      return;
    }

    if (tool.kind === 'utility_line') {
      const snapped = this.snapUtilityPoint(pt);
      const label = tool.lineKind === 'power_line' ? '输电线' : '供水管道';
      const rate = tool.lineKind === 'power_line' ? 6 : 8;
      if (!this.utilStart) {
        this.preview.showUtilityLinePreview(tool.lineKind, snapped, null, true, sampleH);
        this.callbacks.onReadout({
          visible: true,
          screenX,
          screenY,
          title: label,
          costText: `¥${rate}/m`,
          valid: true,
          hint: '点击或拖动铺设线路',
        });
      } else {
        const len = vec2Dist(this.utilStart, snapped);
        const cost = Math.max(40, Math.round(len * rate));
        const valid = len >= 6 && this.money >= cost;
        this.preview.showUtilityLinePreview(tool.lineKind, this.utilStart, snapped, valid, sampleH);
        this.callbacks.onReadout({
          visible: true,
          screenX,
          screenY,
          title: `${label} · ${Math.round(len)} m`,
          costText: `¥${cost.toLocaleString('zh-CN')}`,
          valid,
          hint: len < 6 ? '距离太短' : this.money < cost ? '资金不足' : '松开或点击确认',
        });
      }
      return;
    }

    if (tool.kind === 'bulldoze') {
      const b = this.pickBuildingAtWorld(pt);
      if (b) {
        this.preview.showBulldozeBox(b.x, b.y, b.z, b.yaw, b.width, b.depth, b.height);
        const name =
          b.kind === 'ploppable' && b.ploppableKind
            ? PLOPPABLE_SPECS[b.ploppableKind].labelZh
            : b.zone !== 'none'
              ? `${ZONE_SPECS[b.zone].labelZh} Lv.${b.level}`
              : '建筑';
        const refund =
          b.kind === 'ploppable' && b.ploppableKind
            ? Math.round(PLOPPABLE_SPECS[b.ploppableKind].cost * 0.5)
            : 0;
        this.callbacks.onReadout({
          visible: true,
          screenX,
          screenY,
          title: `拆除 ${name}`,
          costText: refund > 0 ? `+¥${refund.toLocaleString('zh-CN')}` : undefined,
          valid: false,
          hint: '点击拆除',
        });
        return;
      }
      const seg = this.pickRoadAtWorld(pt, 4);
      if (seg) {
        const spec = ROAD_SPECS[seg.type];
        const refund = Math.round(seg.lut.length * spec.costPerMeter * 0.5);
        this.preview.showRoadPreview([seg.bezier], seg.width + 1, false, sampleH, { highlightOnly: true });
        this.callbacks.onReadout({
          visible: true,
          screenX,
          screenY,
          title: `拆除 ${spec.labelZh}`,
          costText: `+¥${refund.toLocaleString('zh-CN')}`,
          valid: false,
          hint: '点击拆除路段',
        });
        return;
      }
      const line = this.pickUtilityLineAtWorld(pt);
      if (line) {
        const len = Math.hypot(line.x1 - line.x0, line.z1 - line.z0);
        const rate = line.kind === 'power_line' ? 6 : 8;
        const refund = Math.max(20, Math.round(len * rate * 0.5));
        this.preview.showUtilityLinePreview(line.kind, { x: line.x0, z: line.z0 }, { x: line.x1, z: line.z1 }, false, sampleH);
        this.callbacks.onReadout({
          visible: true,
          screenX,
          screenY,
          title: `拆除 ${line.kind === 'power_line' ? '输电线' : '供水管道'}`,
          costText: `+¥${refund.toLocaleString('zh-CN')}`,
          valid: false,
          hint: '点击拆除线路',
        });
        return;
      }
      this.preview.clearPreview();
      this.callbacks.onReadout({
        visible: true,
        screenX,
        screenY,
        title: '拆除工具',
        valid: true,
        hint: '点击建筑、道路或管线拆除',
      });
    }
  }

  private hideReadout(): void {
    this.callbacks.onReadout({
      visible: false,
      screenX: 0,
      screenY: 0,
      title: '',
      valid: true,
    });
  }
}
