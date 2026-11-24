import {
  PLOPPABLE_SPECS,
  ProblemFlags,
  WATER_LEVEL,
  ZONE_CELL_SIZE,
  ZONE_SPECS,
  type ActiveZoneType,
  type PloppableKind,
  type ZoneType,
} from './types.ts';
import type { DemandState } from './demand.ts';
import type { ScalarFields } from './fields.ts';
import type { RoadNetwork } from './roads.ts';
import type { SeededRNG } from './rng.ts';
import type { Terrain } from './terrain.ts';
import type { ZoneCell, ZoneGrid } from './zones.ts';

export interface Building {
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
  cellIds: number[];
  segmentId: number;
  progress: number; // 0..1
  residents: number;
  households: number;
  capacityHouseholds: number;
  workers: number;
  capacityJobs: number;
  hasPower: boolean;
  hasWater: boolean;
  hasSewage: boolean;
  problems: number;
  abandonTimer: number;
  abandoned: boolean;
  levelProgress: number;
  variant: number;
}

export interface SerializedBuildings {
  nextBuildingId: number;
  buildings: Building[];
}

const LEVEL_THRESHOLDS = [0, 32, 46, 60, 74];

function computeGrowableHeight(zone: ActiveZoneType, level: number, variant: number): number {
  const jitter = ((variant % 5) - 2) * 0.55;
  switch (zone) {
    case 'res_low':
      return Math.max(5.5, 6.2 + (level - 1) * 1.8 + jitter);
    case 'res_high':
      return Math.max(16, 20 + (level - 1) * 9.5 + jitter * 2.5);
    case 'com_low':
      return Math.max(5.8, 6.8 + (level - 1) * 2.6 + jitter);
    case 'com_high':
      return Math.max(18, 22 + (level - 1) * 11 + jitter * 2.5);
    case 'ind':
      return Math.max(7.5, 8.8 + (level - 1) * 3.4 + jitter * 1.2);
    case 'office':
      return Math.max(20, 25 + (level - 1) * 16 + jitter * 3.5);
  }
}

function computeGrowableCapacities(
  zone: ActiveZoneType,
  areaCells: number,
  level: number
): { capacityHouseholds: number; capacityJobs: number } {
  const spec = ZONE_SPECS[zone];
  const levelMult = 1 + (level - 1) * 0.5;
  if (spec.baseHouseholdsPerCell > 0) {
    return {
      capacityHouseholds: Math.max(1, Math.round(spec.baseHouseholdsPerCell * areaCells * levelMult)),
      capacityJobs: 0,
    };
  }
  return {
    capacityHouseholds: 0,
    capacityJobs: Math.max(2, Math.round(spec.baseJobsPerCell * areaCells * levelMult)),
  };
}

export class BuildingSystem {
  readonly buildings: Building[] = [];
  private readonly byId = new Map<number, Building>();
  private nextBuildingId = 1;
  revision = 1;

  get(id: number): Building | undefined {
    return this.byId.get(id);
  }

  placePloppable(
    kind: PloppableKind,
    x: number,
    z: number,
    yaw: number,
    terrain: Terrain,
    roads: RoadNetwork,
    zones: ZoneGrid
  ): { ok: boolean; building?: Building; cost: number; reason?: string } {
    const spec = PLOPPABLE_SPECS[kind];
    if (!terrain.isInBounds(x, z, 24)) {
      return { ok: false, cost: 0, reason: 'Out of bounds' };
    }

    const h = terrain.sampleHeight(x, z);
    if (spec.needsWaterEdge) {
      if (!terrain.isNearWater(x, z, 72)) {
        return { ok: false, cost: 0, reason: 'Must be placed near water shoreline' };
      }
      if (h < WATER_LEVEL - 1.2) {
        return { ok: false, cost: 0, reason: 'Too deep in water' };
      }
    } else {
      if (!terrain.isBuildable(x, z, 0.32)) {
        return { ok: false, cost: 0, reason: 'Terrain not buildable (water or steep slope)' };
      }
    }

    // Check overlap against other ploppables
    const halfDiag = Math.hypot(spec.width, spec.depth) * 0.45;
    for (const existing of this.buildings) {
      if (existing.kind !== 'ploppable') continue;
      const otherHalf = Math.hypot(existing.width, existing.depth) * 0.45;
      if (Math.hypot(existing.x - x, existing.z - z) < (halfDiag + otherHalf) * 0.85) {
        return { ok: false, cost: 0, reason: 'Overlaps another civic/utility building' };
      }
    }

    // Clear any growable buildings overlapping this footprint
    const clearR = Math.max(spec.width, spec.depth) * 0.65;
    const toRemove: number[] = [];
    for (const existing of this.buildings) {
      if (existing.kind === 'growable' && Math.hypot(existing.x - x, existing.z - z) < clearR) {
        toRemove.push(existing.id);
      }
    }
    for (const rid of toRemove) {
      this.removeBuilding(rid, zones);
    }

    const nearest = roads.findNearestLane(x, z, 110);
    const id = this.nextBuildingId++;
    const building: Building = {
      id,
      kind: 'ploppable',
      zone: 'none',
      ploppableKind: kind,
      level: 1,
      x,
      y: Math.max(WATER_LEVEL + 0.2, h),
      z,
      yaw,
      width: spec.width,
      depth: spec.depth,
      height: spec.height,
      cellIds: [],
      segmentId: nearest ? nearest.lane.segmentId : 0,
      progress: 1,
      residents: 0,
      households: 0,
      capacityHouseholds: 0,
      workers: spec.jobs,
      capacityJobs: spec.jobs,
      hasPower: spec.powerMW > 0,
      hasWater: spec.waterM3 > 0,
      hasSewage: spec.sewageM3 > 0,
      problems: ProblemFlags.NONE,
      abandonTimer: 0,
      abandoned: false,
      levelProgress: 0,
      variant: id % 8,
    };

    this.buildings.push(building);
    this.byId.set(id, building);

    // Mark zone cells under ploppable as occupied so growables don't spawn on top
    const coveredCells = zones.queryNear(x, z, Math.max(spec.width, spec.depth) * 0.55);
    for (const c of coveredCells) {
      if (c.buildingId === 0) {
        c.buildingId = id;
        building.cellIds.push(c.id);
      }
    }

    this.revision++;
    return { ok: true, building, cost: spec.cost };
  }

  removeBuilding(buildingId: number, zones: ZoneGrid): { ok: boolean; refund: number } {
    const idx = this.buildings.findIndex((b) => b.id === buildingId);
    if (idx === -1) return { ok: false, refund: 0 };
    const b = this.buildings[idx];
    this.buildings.splice(idx, 1);
    this.byId.delete(buildingId);

    for (const cid of b.cellIds) {
      const cell = zones.cells.get(cid);
      if (cell && cell.buildingId === buildingId) {
        cell.buildingId = 0;
      }
    }

    this.revision++;
    const refund =
      b.kind === 'ploppable' && b.ploppableKind
        ? Math.round(PLOPPABLE_SPECS[b.ploppableKind].cost * 0.5)
        : 0;
    return { ok: true, refund };
  }

  /**
   * Re-links buildings to rebuilt zone cells after road additions/edits.
   * Growables whose fronting segment was bulldozed are cleanly removed.
   */
  reconcileAfterZoneRebuild(roads: RoadNetwork, zones: ZoneGrid): void {
    const toRemove: number[] = [];
    for (const b of this.buildings) {
      b.cellIds = [];
      if (b.kind === 'growable') {
        if (!roads.segments.has(b.segmentId)) {
          // Check if road was split into a replacement segment nearby
          const near = roads.findNearestLane(b.x, b.z, 38);
          if (near) {
            b.segmentId = near.lane.segmentId;
          } else {
            toRemove.push(b.id);
            continue;
          }
        }
      }
      const rad = Math.max(b.width, b.depth) * 0.52;
      const nearby = zones.queryNear(b.x, b.z, rad);
      for (const c of nearby) {
        if (c.buildingId === 0) {
          c.buildingId = b.id;
          b.cellIds.push(c.id);
        }
      }
    }

    for (const id of toRemove) {
      this.removeBuilding(id, zones);
    }
    this.revision++;
  }

  stepLifecycle(
    zones: ZoneGrid,
    fields: ScalarFields,
    demand: DemandState,
    taxRates: Record<ActiveZoneType, number>,
    waterIntakePollution: number,
    population: number,
    terrain: Terrain,
    rng: SeededRNG
  ): void {
    let changed = false;

    // 1. Progress construction, check problems, handle abandonment & level-up
    for (const b of this.buildings) {
      if (b.kind !== 'growable' || b.zone === 'none') {
        // Ploppable problem flags
        if (b.kind === 'ploppable' && b.ploppableKind) {
          let flags = 0;
          const spec = PLOPPABLE_SPECS[b.ploppableKind];
          if (spec.powerMW < 0 && !b.hasPower) flags |= ProblemFlags.NO_POWER;
          if (spec.waterM3 < 0 && !b.hasWater) flags |= ProblemFlags.NO_WATER;
          if (b.problems !== flags) {
            b.problems = flags;
            changed = true;
          }
        }
        continue;
      }

      // Advance construction
      if (b.progress < 1) {
        b.progress = Math.min(1, b.progress + 0.22);
        changed = true;
        continue;
      }

      if (b.abandoned) {
        b.problems = ProblemFlags.ABANDONED;
        // Slowly reclaim abandoned lots if demand & utilities are healthy
        if (b.hasPower && b.hasWater && demand.byZone[b.zone] > 20 && rng.chance(0.08)) {
          b.abandoned = false;
          b.abandonTimer = 0;
          b.problems = ProblemFlags.NONE;
          changed = true;
        }
        continue;
      }

      // Evaluate problems
      let flags = 0;
      if (!b.hasPower) flags |= ProblemFlags.NO_POWER;
      if (!b.hasWater) flags |= ProblemFlags.NO_WATER;
      if (!b.hasSewage && population > 120) flags |= ProblemFlags.NO_SEWAGE;
      if (taxRates[b.zone] > 14) flags |= ProblemFlags.HIGH_TAX;

      const poll = fields.sample(fields.pollution, b.x, b.z);
      if ((b.zone === 'res_low' || b.zone === 'res_high') && poll > 38) {
        flags |= ProblemFlags.HIGH_POLLUTION;
      }
      if (waterIntakePollution > 18 && b.hasWater) {
        flags |= ProblemFlags.POLLUTED_WATER;
      }
      if (population > 260 && fields.sample(fields.garbageCoverage, b.x, b.z) < 0.15) {
        flags |= ProblemFlags.GARBAGE;
      }
      if (population > 350 && fields.sample(fields.policeCoverage, b.x, b.z) < 0.1) {
        flags |= ProblemFlags.CRIME;
      }
      if (b.problems !== flags) {
        b.problems = flags;
        changed = true;
      }

      const fatal =
        (flags & (ProblemFlags.NO_POWER | ProblemFlags.NO_WATER | ProblemFlags.HIGH_TAX)) !== 0;
      if (fatal) {
        b.abandonTimer += 1;
        if (b.abandonTimer >= 26) {
          b.abandoned = true;
          b.residents = 0;
          b.households = 0;
          b.workers = 0;
          b.problems = ProblemFlags.ABANDONED;
          changed = true;
        }
      } else {
        b.abandonTimer = Math.max(0, b.abandonTimer - 2);
      }

      // Level-up check
      const spec = ZONE_SPECS[b.zone];
      if (!fatal && b.level < spec.maxLevel) {
        const lv = fields.sample(fields.landValue, b.x, b.z);
        const srv = fields.sample(fields.serviceCoverage, b.x, b.z);
        const ed = fields.sample(fields.educationCoverage, b.x, b.z) * 100;
        const pollPenalty = b.zone === 'ind' ? poll * 0.08 : poll * 0.55;
        const score = lv * 0.45 + srv * 0.35 + ed * 0.2 - pollPenalty;
        const needed = LEVEL_THRESHOLDS[b.level] ?? 80;
        if (score >= needed) {
          b.levelProgress += 6 + (score - needed) * 0.35;
          if (b.levelProgress >= 100) {
            b.level += 1;
            b.levelProgress = 0;
            const areaCells = Math.max(1, b.cellIds.length);
            const caps = computeGrowableCapacities(b.zone, areaCells, b.level);
            b.capacityHouseholds = caps.capacityHouseholds;
            b.capacityJobs = caps.capacityJobs;
            b.height = computeGrowableHeight(b.zone, b.level, b.variant);
            changed = true;
          }
        }
      }
    }

    // 2. Spawn new growables on vacant road-fronted zoned cells with power + water
    const candidates: ZoneCell[] = [];
    for (const cell of zones.cells.values()) {
      if (cell.depth !== 0 || cell.buildingId !== 0 || cell.zone === 'none') continue;
      const d = demand.byZone[cell.zone];
      if (d <= 4) continue;
      if (fields.sample(fields.powerCoverage, cell.x, cell.z) < 0.35) continue;
      if (fields.sample(fields.waterCoverage, cell.x, cell.z) < 0.35) continue;
      candidates.push(cell);
    }

    if (candidates.length > 0) {
      // Spawn up to 6 buildings per 20-tick cycle so scripted towns grow steadily and organically
      const maxSpawns = Math.min(6, candidates.length);
      let spawned = 0;
      const attempts = Math.min(candidates.length, 24);

      for (let a = 0; a < attempts && spawned < maxSpawns; a++) {
        const idx = rng.int(0, candidates.length - 1);
        const front = candidates[idx];
        // Swap-pop to avoid retrying same cell
        candidates[idx] = candidates[candidates.length - 1];
        candidates.pop();

        if (front.buildingId !== 0 || front.zone === 'none') continue;
        const zone = front.zone;
        const zoneDem = demand.byZone[zone];
        if (zoneDem <= 4) continue;

        // Spawn probability scales with demand
        const prob = Math.min(0.92, 0.25 + (zoneDem / 100) * 0.7);
        if (!rng.chance(prob)) continue;

        const created = this.trySpawnAtCell(front, zone, zones, terrain, rng);
        if (created) {
          spawned++;
          changed = true;
        }
      }
    }

    if (changed) {
      this.revision++;
    }
  }

  private trySpawnAtCell(
    front: ZoneCell,
    zone: ActiveZoneType,
    zones: ZoneGrid,
    terrain: Terrain,
    rng: SeededRNG
  ): Building | null {
    // Choose footprint size preference by zone density
    const sizeChoices: Array<[number, number]> =
      zone === 'res_high' || zone === 'com_high' || zone === 'office'
        ? [
            [4, 4],
            [3, 4],
            [4, 3],
            [3, 3],
            [2, 3],
            [2, 2],
            [1, 2],
            [1, 1],
          ]
        : zone === 'ind'
          ? [
              [4, 3],
              [3, 3],
              [3, 2],
              [2, 3],
              [2, 2],
              [2, 1],
              [1, 1],
            ]
          : [
              [3, 3],
              [2, 3],
              [3, 2],
              [2, 2],
              [2, 1],
              [1, 2],
              [1, 1],
            ];

    // Add variety by occasionally skipping the biggest size so streets aren't uniform
    const startIdx = rng.chance(0.45) ? Math.min(2, sizeChoices.length - 1) : 0;

    let claimed: ZoneCell[] | null = null;
    let wCells = 1;
    let dCells = 1;

    for (let i = startIdx; i < sizeChoices.length; i++) {
      const [w, d] = sizeChoices[i];
      const cells: ZoneCell[] = [];
      let valid = true;

      for (let dc = 0; dc < w && valid; dc++) {
        for (let dd = 0; dd < d && valid; dd++) {
          const c = zones.getSlotCell(front.segmentId, front.side, front.col + dc, dd);
          if (!c || c.zone !== zone || c.buildingId !== 0) {
            valid = false;
            break;
          }
          cells.push(c);
        }
      }

      if (valid && cells.length === w * d) {
        claimed = cells;
        wCells = w;
        dCells = d;
        break;
      }
    }

    if (!claimed) return null;

    // Average center across claimed cells
    let sumX = 0;
    let sumZ = 0;
    for (const c of claimed) {
      sumX += c.x;
      sumZ += c.z;
    }
    const cx = sumX / claimed.length;
    const cz = sumZ / claimed.length;
    const cy = terrain.sampleHeight(cx, cz);

    // Ensure it doesn't visually collide with another existing building
    const width = wCells * ZONE_CELL_SIZE - 1.4;
    const depth = dCells * ZONE_CELL_SIZE - 1.4;
    const minSep = Math.min(width, depth) * 0.42;
    for (const other of this.buildings) {
      const sep = minSep + Math.min(other.width, other.depth) * 0.42;
      if (Math.hypot(other.x - cx, other.z - cz) < sep) {
        return null;
      }
    }

    const id = this.nextBuildingId++;
    const variant = rng.int(0, 7);
    const caps = computeGrowableCapacities(zone, claimed.length, 1);
    const height = computeGrowableHeight(zone, 1, variant);

    // Orient building so its local +Z depth aligns with outward normal and +X aligns along road
    const midFront = claimed[Math.floor((wCells - 1) / 2) * dCells] ?? front;
    const yaw = Math.atan2(midFront.normalX, midFront.normalZ);

    const building: Building = {
      id,
      kind: 'growable',
      zone,
      level: 1,
      x: cx,
      y: cy,
      z: cz,
      yaw,
      width,
      depth,
      height,
      cellIds: claimed.map((c) => c.id),
      segmentId: front.segmentId,
      progress: 0.16,
      residents: 0,
      households: 0,
      capacityHouseholds: caps.capacityHouseholds,
      workers: 0,
      capacityJobs: caps.capacityJobs,
      hasPower: true,
      hasWater: true,
      hasSewage: true,
      problems: ProblemFlags.NONE,
      abandonTimer: 0,
      abandoned: false,
      levelProgress: 0,
      variant,
    };

    for (const c of claimed) {
      c.buildingId = id;
    }
    this.buildings.push(building);
    this.byId.set(id, building);
    return building;
  }

  getActiveProblemCount(): number {
    let count = 0;
    for (const b of this.buildings) {
      if (b.problems !== ProblemFlags.NONE) count++;
    }
    return count;
  }

  serialize(): SerializedBuildings {
    return {
      nextBuildingId: this.nextBuildingId,
      buildings: this.buildings.map((b) => ({ ...b, cellIds: [...b.cellIds] })),
    };
  }

  deserialize(data: SerializedBuildings): void {
    this.buildings.length = 0;
    this.byId.clear();
    this.nextBuildingId = data.nextBuildingId;
    for (const b of data.buildings) {
      const copy: Building = { ...b, cellIds: [...b.cellIds] };
      this.buildings.push(copy);
      this.byId.set(copy.id, copy);
    }
    this.revision++;
  }
}
