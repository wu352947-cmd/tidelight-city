import {
  PLOPPABLE_TO_INT,
  ROAD_SPECS,
  ROAD_TYPE_TO_INT,
  VEHICLE_TYPE_TO_INT,
  ZONE_TO_INT,
  type ActiveZoneType,
  type BudgetCategory,
  type OverlayType,
  type PloppableKind,
  type RoadType,
  type Vec2,
  type ZoneType,
} from './types.ts';
import type { Building } from './buildings.ts';
import type { FinanceBreakdown } from './economy.ts';
import { ROAD_CONTROL_TO_INT, type RoadNetwork } from './roads.ts';
import type { Vehicle } from './traffic.ts';
import type { UtilityLine, UtilityLineKind } from './utilities.ts';
import type { ZoneAreaShape, ZoneGrid } from './zones.ts';

export type SimSpeed = 0 | 1 | 2 | 4;

export type SimCommand =
  | {
      type: 'buildRoad';
      p0: Vec2;
      c0?: Vec2;
      c1?: Vec2;
      p1: Vec2;
      roadType: RoadType;
      allowEdge?: boolean;
    }
  | { type: 'upgradeRoad'; segmentId: number; roadType: RoadType }
  | { type: 'bulldozeRoad'; segmentId: number }
  | { type: 'zoneArea'; zone: ZoneType; area: ZoneAreaShape }
  | { type: 'placeBuilding'; kind: PloppableKind; x: number; z: number; yaw?: number }
  | {
      type: 'buildUtilityLine';
      kind: UtilityLineKind;
      x0: number;
      z0: number;
      x1: number;
      z1: number;
    }
  | { type: 'bulldozeUtilityLine'; lineId: number }
  | { type: 'bulldozeBuilding'; buildingId: number }
  | { type: 'setTaxRate'; zone: ActiveZoneType; rate: number }
  | { type: 'setBudget'; category: BudgetCategory; percent: number }
  | { type: 'setTimeOfDay'; hours: number; lock?: boolean }
  | { type: 'stepTicks'; count: number };

export interface CommandResult {
  ok: boolean;
  reason?: string;
  data?: unknown;
}

export interface TerrainInitPayload {
  seed: number;
  res: number;
  heights: Float32Array;
  waterMask: Uint8Array;
  trees: Float32Array;
}

/**
 * segments stride = 12:
 * [id, typeInt, p0x, p0z, c0x, c0z, c1x, c1z, p1x, p1z, width, isBridge]
 * nodes stride = 5:
 * [id, x, z, radius, controlInt]
 */
export const ROAD_SEGMENT_STRIDE = 12;
export const ROAD_NODE_STRIDE = 5;

export interface RoadSnapshotPayload {
  revision: number;
  segments: Float32Array;
  nodes: Float32Array;
}

/** cells stride = 6: [x, y, z, yaw, zoneInt, occupied] */
export const ZONE_CELL_STRIDE = 6;

export interface ZoneSnapshotPayload {
  revision: number;
  cells: Float32Array;
}

/**
 * buildings stride = 14:
 * [id, kindInt(0=grow,1=plop), zoneOrPlopInt, level, x, y, z, yaw, width, depth, height, progress, flags, variant]
 */
export const BUILDING_STRIDE = 14;

export interface BuildingSnapshotPayload {
  revision: number;
  buildings: Float32Array;
}

/** lines stride = 7: [id, kindInt(0=power,1=water), x0, z0, x1, z1, active] */
export const UTILITY_LINE_STRIDE = 7;

export interface UtilitySnapshotPayload {
  revision: number;
  lines: Float32Array;
}

/** vehicles stride = 7: [x, y, z, yaw, typeInt, colorIdx, braking] */
export const VEHICLE_STRIDE = 7;

export interface BuildingDetail {
  id: number;
  kind: 'growable' | 'ploppable';
  zone: ZoneType;
  ploppableKind?: PloppableKind;
  labelZh: string;
  labelEn: string;
  level: number;
  maxLevel: number;
  residents: number;
  households: number;
  capacityHouseholds: number;
  workers: number;
  capacityJobs: number;
  happiness: number;
  landValue: number;
  pollution: number;
  noise: number;
  serviceCoverage: number;
  hasPower: boolean;
  hasWater: boolean;
  hasSewage: boolean;
  problems: number;
  abandoned: boolean;
  progress: number;
  taxRate?: number;
  upkeepPerDay?: number;
  x: number;
  y: number;
  z: number;
}

export interface SimStats {
  population: number;
  households: number;
  jobs: number;
  jobsFilled: number;
  unemployment: number;
  demand: { r: number; c: number; i: number; o: number };
  money: number;
  dailyNet: number;
  weeklyNet: number;
  finance: FinanceBreakdown;
  powerProducedMW: number;
  powerConsumedMW: number;
  waterProducedM3: number;
  waterConsumedM3: number;
  sewageCapacityM3: number;
  sewageConsumedM3: number;
  milestoneTier: number;
  milestoneNameZh: string;
  milestoneNameEn: string;
  vehicleCount: number;
  buildingCount: number;
  activeProblems: number;
  avgHappiness: number;
  avgLandValue: number;
  taxRates: Record<ActiveZoneType, number>;
  budgets: Record<BudgetCategory, number>;
}

export interface ClientRevisions {
  road: number;
  zone: number;
  building: number;
  utility: number;
  overlay: number;
  overlayType: OverlayType;
}

export interface SimSnapshot {
  tick: number;
  simDay: number;
  timeOfDay: number;
  speed: SimSpeed;
  stats: SimStats;
  vehicles: Float32Array;
  /** Parallel to segments order: [segId, congestion] stride = 2 */
  roadCongestion: Float32Array;
  roads?: RoadSnapshotPayload;
  zones?: ZoneSnapshotPayload;
  buildings?: BuildingSnapshotPayload;
  utilities?: UtilitySnapshotPayload;
  overlayType: OverlayType;
  overlayRevision: number;
  overlayField?: Float32Array;
}

export type MainToWorkerMessage =
  | {
      type: 'init';
      seed: number;
      demo?: boolean;
      timeOfDay?: number;
      lockTime?: boolean;
      overlay?: OverlayType;
    }
  | { type: 'command'; cmd: SimCommand; requestId?: number }
  | { type: 'setSpeed'; speed: SimSpeed }
  | { type: 'setOverlay'; overlay: OverlayType }
  | { type: 'requestFullSync' }
  | { type: 'inspectBuilding'; buildingId: number; requestId: number }
  | { type: 'serialize'; requestId: number }
  | { type: 'deserialize'; json: string; requestId?: number };

export type WorkerToMainMessage =
  | { type: 'ready'; terrain: TerrainInitPayload }
  | { type: 'snapshot'; snapshot: SimSnapshot }
  | { type: 'commandResult'; requestId?: number; result: CommandResult }
  | { type: 'buildingDetail'; requestId: number; detail: BuildingDetail | null }
  | { type: 'serialized'; requestId: number; json: string };

export function packRoads(roads: RoadNetwork): RoadSnapshotPayload {
  const segList = Array.from(roads.segments.values());
  const segments = new Float32Array(segList.length * ROAD_SEGMENT_STRIDE);
  for (let i = 0; i < segList.length; i++) {
    const s = segList[i];
    const base = i * ROAD_SEGMENT_STRIDE;
    segments[base] = s.id;
    segments[base + 1] = ROAD_TYPE_TO_INT[s.type];
    segments[base + 2] = s.bezier.p0.x;
    segments[base + 3] = s.bezier.p0.z;
    segments[base + 4] = s.bezier.c0.x;
    segments[base + 5] = s.bezier.c0.z;
    segments[base + 6] = s.bezier.c1.x;
    segments[base + 7] = s.bezier.c1.z;
    segments[base + 8] = s.bezier.p1.x;
    segments[base + 9] = s.bezier.p1.z;
    segments[base + 10] = ROAD_SPECS[s.type].width;
    segments[base + 11] = s.isBridge ? 1 : 0;
  }

  const nodeList = Array.from(roads.nodes.values());
  const nodes = new Float32Array(nodeList.length * ROAD_NODE_STRIDE);
  for (let i = 0; i < nodeList.length; i++) {
    const n = nodeList[i];
    let maxW = 10;
    for (const sid of n.segmentIds) {
      const seg = roads.segments.get(sid);
      if (seg) {
        const w = ROAD_SPECS[seg.type].width;
        if (w > maxW) maxW = w;
      }
    }
    const base = i * ROAD_NODE_STRIDE;
    nodes[base] = n.id;
    nodes[base + 1] = n.x;
    nodes[base + 2] = n.z;
    nodes[base + 3] = maxW * 0.52;
    nodes[base + 4] = ROAD_CONTROL_TO_INT[n.control];
  }

  return { revision: roads.revision, segments, nodes };
}

export function packRoadCongestion(roads: RoadNetwork): Float32Array {
  const segList = Array.from(roads.segments.values());
  const out = new Float32Array(segList.length * 2);
  for (let i = 0; i < segList.length; i++) {
    out[i * 2] = segList[i].id;
    out[i * 2 + 1] = segList[i].congestion;
  }
  return out;
}

export function packZones(zones: ZoneGrid): ZoneSnapshotPayload {
  const all = Array.from(zones.cells.values());
  const cells = new Float32Array(all.length * ZONE_CELL_STRIDE);
  for (let i = 0; i < all.length; i++) {
    const c = all[i];
    const base = i * ZONE_CELL_STRIDE;
    cells[base] = c.x;
    cells[base + 1] = c.y;
    cells[base + 2] = c.z;
    cells[base + 3] = c.yaw;
    cells[base + 4] = ZONE_TO_INT[c.zone];
    cells[base + 5] = c.buildingId > 0 ? 1 : 0;
  }
  return { revision: zones.revision, cells };
}

export function packBuildings(buildings: readonly Building[], revision: number): BuildingSnapshotPayload {
  const out = new Float32Array(buildings.length * BUILDING_STRIDE);
  for (let i = 0; i < buildings.length; i++) {
    const b = buildings[i];
    const base = i * BUILDING_STRIDE;
    out[base] = b.id;
    out[base + 1] = b.kind === 'ploppable' ? 1 : 0;
    out[base + 2] =
      b.kind === 'ploppable' && b.ploppableKind
        ? PLOPPABLE_TO_INT[b.ploppableKind]
        : ZONE_TO_INT[b.zone];
    out[base + 3] = b.level;
    out[base + 4] = b.x;
    out[base + 5] = b.y;
    out[base + 6] = b.z;
    out[base + 7] = b.yaw;
    out[base + 8] = b.width;
    out[base + 9] = b.depth;
    out[base + 10] = b.height;
    out[base + 11] = b.progress;
    out[base + 12] = b.problems;
    out[base + 13] = b.variant;
  }
  return { revision, buildings: out };
}

export function packUtilities(lines: readonly UtilityLine[], revision: number): UtilitySnapshotPayload {
  const out = new Float32Array(lines.length * UTILITY_LINE_STRIDE);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const base = i * UTILITY_LINE_STRIDE;
    out[base] = l.id;
    out[base + 1] = l.kind === 'power_line' ? 0 : 1;
    out[base + 2] = l.x0;
    out[base + 3] = l.z0;
    out[base + 4] = l.x1;
    out[base + 5] = l.z1;
    out[base + 6] = l.active ? 1 : 0;
  }
  return { revision, lines: out };
}

export function packVehicles(vehicles: readonly Vehicle[]): Float32Array {
  const out = new Float32Array(vehicles.length * VEHICLE_STRIDE);
  for (let i = 0; i < vehicles.length; i++) {
    const v = vehicles[i];
    const base = i * VEHICLE_STRIDE;
    out[base] = v.x;
    out[base + 1] = v.y;
    out[base + 2] = v.z;
    out[base + 3] = v.yaw;
    out[base + 4] = VEHICLE_TYPE_TO_INT[v.type];
    out[base + 5] = v.colorIdx;
    out[base + 6] = v.braking ? 1 : 0;
  }
  return out;
}

export function collectSnapshotTransferables(snap: SimSnapshot): Transferable[] {
  const list: Transferable[] = [snap.vehicles.buffer, snap.roadCongestion.buffer];
  if (snap.roads) {
    list.push(snap.roads.segments.buffer, snap.roads.nodes.buffer);
  }
  if (snap.zones) {
    list.push(snap.zones.cells.buffer);
  }
  if (snap.buildings) {
    list.push(snap.buildings.buildings.buffer);
  }
  if (snap.utilities) {
    list.push(snap.utilities.lines.buffer);
  }
  if (snap.overlayField) {
    list.push(snap.overlayField.buffer);
  }
  return list;
}
