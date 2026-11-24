import type { VehicleType } from './types.ts';
import { evalBezier, evalBezierTangent, lutTAtDistance } from './bezier.ts';
import type { Building } from './buildings.ts';
import type { RoadLane, RoadNetwork } from './roads.ts';
import type { SeededRNG } from './rng.ts';
import type { Terrain } from './terrain.ts';

export interface Vehicle {
  id: number;
  type: VehicleType;
  colorIdx: number;
  route: number[]; // laneIds
  routeIndex: number;
  laneId: number;
  s: number;
  speed: number;
  maxSpeed: number;
  length: number;
  x: number;
  y: number;
  z: number;
  yaw: number;
  braking: boolean;
  stuckTicks: number;
  totalDistanceMoved: number;
  ageTicks: number;
}

const MAX_VEHICLES = 1500;
const MAX_SPAWN_PER_TICK = 6;
const STUCK_DESPAWN_TICKS = 220;
const MAX_AGE_TICKS = 2600;
const MAX_ASTAR_EXPANSIONS = 380;

interface HeapItem {
  laneId: number;
  f: number;
}

class MinHeap {
  private readonly items: HeapItem[] = [];

  get size(): number {
    return this.items.length;
  }

  push(item: HeapItem): void {
    this.items.push(item);
    let i = this.items.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.items[p].f <= this.items[i].f) break;
      const tmp = this.items[p];
      this.items[p] = this.items[i];
      this.items[i] = tmp;
      i = p;
    }
  }

  pop(): HeapItem | undefined {
    if (this.items.length === 0) return undefined;
    const top = this.items[0];
    const last = this.items.pop()!;
    if (this.items.length > 0) {
      this.items[0] = last;
      let i = 0;
      const n = this.items.length;
      while (true) {
        const l = i * 2 + 1;
        const r = l + 1;
        let smallest = i;
        if (l < n && this.items[l].f < this.items[smallest].f) smallest = l;
        if (r < n && this.items[r].f < this.items[smallest].f) smallest = r;
        if (smallest === i) break;
        const tmp = this.items[i];
        this.items[i] = this.items[smallest];
        this.items[smallest] = tmp;
        i = smallest;
      }
    }
    return top;
  }
}

/**
 * Congestion-aware A* pathfinder on the directed RoadLane graph.
 */
export function findLaneRoute(
  roads: RoadNetwork,
  startLaneId: number,
  goalLaneId: number
): number[] | null {
  const startLane = roads.lanes.get(startLaneId);
  const goalLane = roads.lanes.get(goalLaneId);
  if (!startLane || !goalLane) return null;
  if (startLaneId === goalLaneId) return [startLaneId];

  const goalX = goalLane.bezier.p0.x;
  const goalZ = goalLane.bezier.p0.z;
  const maxSpeedRef = 28.0;

  const heuristic = (lane: RoadLane): number =>
    Math.hypot(lane.bezier.p1.x - goalX, lane.bezier.p1.z - goalZ) / maxSpeedRef;

  const gScore = new Map<number, number>();
  const cameFrom = new Map<number, number>();
  const closed = new Set<number>();
  const open = new MinHeap();

  gScore.set(startLaneId, 0);
  open.push({ laneId: startLaneId, f: heuristic(startLane) });

  let expansions = 0;
  while (open.size > 0 && expansions < MAX_ASTAR_EXPANSIONS) {
    const cur = open.pop()!;
    if (closed.has(cur.laneId)) continue;
    closed.add(cur.laneId);
    expansions++;

    if (cur.laneId === goalLaneId) {
      const path: number[] = [];
      let trace: number | undefined = goalLaneId;
      while (trace !== undefined) {
        path.push(trace);
        trace = cameFrom.get(trace);
      }
      path.reverse();
      return path;
    }

    const curG = gScore.get(cur.laneId) ?? Infinity;
    const conns = roads.outgoingConnections.get(cur.laneId);
    if (!conns) continue;

    for (let i = 0; i < conns.length; i++) {
      const conn = conns[i];
      if (closed.has(conn.toLaneId)) continue;
      const nextLane = roads.lanes.get(conn.toLaneId);
      if (!nextLane) continue;
      const seg = roads.segments.get(nextLane.segmentId);
      const cong = seg ? seg.congestion : 0;
      const effectiveSpeed = Math.max(2.0, nextLane.speedLimit * (1 - 0.65 * cong));
      const edgeCost = nextLane.lut.length / effectiveSpeed + conn.turnCost;
      const tentativeG = curG + edgeCost;

      if (tentativeG < (gScore.get(conn.toLaneId) ?? Infinity)) {
        cameFrom.set(conn.toLaneId, cur.laneId);
        gScore.set(conn.toLaneId, tentativeG);
        open.push({ laneId: conn.toLaneId, f: tentativeG + heuristic(nextLane) });
      }
    }
  }

  return null;
}

export class TrafficSystem {
  readonly vehicles: Vehicle[] = [];
  private nextVehicleId = 1;
  private readonly laneVehicles = new Map<number, Vehicle[]>();
  completedTrips = 0;
  despawnedStuck = 0;

  clearInvalidVehicles(roads: RoadNetwork): void {
    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const v = this.vehicles[i];
      if (!roads.lanes.has(v.laneId)) {
        this.vehicles.splice(i, 1);
      }
    }
  }

  step(
    dt: number,
    roads: RoadNetwork,
    buildings: readonly Building[],
    population: number,
    terrain: Terrain,
    rng: SeededRNG
  ): void {
    // 1. Advance intersection traffic signals
    roads.updateSignals(dt);

    // 2. Spawn new trips if below target vehicle concurrency
    if (roads.lanes.size >= 2) {
      this.spawnTrips(roads, buildings, population, terrain, rng);
    }

    // 3. Bucket vehicles per lane sorted descending by s (front-most first)
    this.laneVehicles.clear();
    for (let i = 0; i < this.vehicles.length; i++) {
      const v = this.vehicles[i];
      let arr = this.laneVehicles.get(v.laneId);
      if (!arr) {
        arr = [];
        this.laneVehicles.set(v.laneId, arr);
      }
      arr.push(v);
    }
    for (const arr of this.laneVehicles.values()) {
      if (arr.length > 1) {
        arr.sort((a, b) => b.s - a.s);
      }
    }

    // 4. IDM car-following & lane progression
    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      const v = this.vehicles[i];
      const lane = roads.lanes.get(v.laneId);
      if (!lane) {
        this.vehicles.splice(i, 1);
        continue;
      }

      v.ageTicks++;
      const v0 = Math.min(v.maxSpeed, lane.speedLimit);
      let gap = 90;
      let deltaV = 0;

      // Leader on same lane
      const sameLane = this.laneVehicles.get(v.laneId)!;
      const myIdx = sameLane.indexOf(v);
      if (myIdx > 0) {
        const ahead = sameLane[myIdx - 1];
        const d = ahead.s - v.s - ahead.length * 0.5 - v.length * 0.5;
        if (d < gap) {
          gap = d;
          deltaV = v.speed - ahead.speed;
        }
      } else if (v.routeIndex + 1 < v.route.length) {
        // Look ahead to tail vehicle on next lane
        const nextLaneId = v.route[v.routeIndex + 1];
        const nextArr = this.laneVehicles.get(nextLaneId);
        if (nextArr && nextArr.length > 0) {
          const tail = nextArr[nextArr.length - 1];
          const d = lane.lut.length - v.s + tail.s - tail.length * 0.5 - v.length * 0.5;
          if (d < gap) {
            gap = d;
            deltaV = v.speed - tail.speed;
          }
        }
      }

      // Intersection traffic light stop line check
      const distToEnd = lane.lut.length - v.s;
      if (v.routeIndex + 1 < v.route.length && distToEnd < 18 && distToEnd > 1.2) {
        const endNode = roads.nodes.get(lane.toNodeId);
        if (endNode && endNode.control === 'signals') {
          const conns = roads.outgoingConnections.get(v.laneId);
          const nextLaneId = v.route[v.routeIndex + 1];
          const conn = conns?.find((c) => c.toLaneId === nextLaneId);
          if (conn && conn.group !== endNode.signalPhase) {
            const stopGap = Math.max(0.15, distToEnd - 3.6);
            if (stopGap < gap) {
              gap = stopGap;
              deltaV = v.speed;
            }
          }
        }
      }

      // IDM acceleration
      const aMax = 3.4;
      const bComf = 4.2;
      const s0 = 2.2;
      const T = 1.05;
      const sStar =
        s0 +
        Math.max(0, v.speed * T + (v.speed * deltaV) / (2 * Math.sqrt(aMax * bComf)));
      const freeTerm = 1 - Math.pow(v.speed / Math.max(1, v0), 4);
      const intTerm = Math.pow(sStar / Math.max(0.45, gap), 2);
      const acc = Math.max(-7.5, Math.min(aMax, aMax * (freeTerm - intTerm)));

      v.speed = Math.max(0, Math.min(v0, v.speed + acc * dt));
      v.braking = acc < -0.7 || (v.speed < 0.7 && gap < 10);

      const ds = v.speed * dt;
      v.s += ds;
      v.totalDistanceMoved += ds;

      // Record congestion sample when moving slowly
      const seg = roads.segments.get(lane.segmentId);
      if (seg) {
        seg.flowSamples++;
        const slowFactor = 1 - Math.min(1, v.speed / Math.max(2, lane.speedLimit));
        seg.flowAccumulator += 0.22 + slowFactor * 0.95;
      }

      // Transition to next lane(s)
      let finished = false;
      let curLane = lane;
      while (v.s >= curLane.lut.length) {
        const overflow = v.s - curLane.lut.length;
        v.routeIndex++;
        if (v.routeIndex >= v.route.length) {
          finished = true;
          break;
        }
        const nextLane = roads.lanes.get(v.route[v.routeIndex]);
        if (!nextLane) {
          finished = true;
          break;
        }
        v.laneId = nextLane.id;
        v.s = overflow;
        curLane = nextLane;
      }

      if (finished) {
        this.completedTrips++;
        this.vehicles.splice(i, 1);
        continue;
      }

      // Stuck timer & despawn safeguard against gridlock death
      if (v.speed < 0.45) {
        v.stuckTicks++;
      } else {
        v.stuckTicks = Math.max(0, v.stuckTicks - 2);
      }
      if (v.stuckTicks > STUCK_DESPAWN_TICKS || v.ageTicks > MAX_AGE_TICKS) {
        this.despawnedStuck++;
        this.vehicles.splice(i, 1);
        continue;
      }

      // Sample world position & yaw from current lane Bezier
      const t = lutTAtDistance(curLane.lut, v.s);
      const pt = evalBezier(curLane.bezier, t);
      const tan = evalBezierTangent(curLane.bezier, t);
      v.x = pt.x;
      v.z = pt.z;
      const baseY = terrain.sampleHeight(pt.x, pt.z);
      const curSeg = roads.segments.get(curLane.segmentId);
      v.y = (curSeg?.isBridge ? Math.max(baseY, 1.8) : baseY) + 0.22;
      v.yaw = Math.atan2(tan.x, tan.z);
    }
  }

  private getTargetVehicleCount(roads: RoadNetwork, buildings: readonly Building[], population: number): number {
    if (roads.segments.size === 0) return 0;
    const minAmbient = roads.segments.size >= 3 ? 16 : 6;
    const target = Math.round(minAmbient + population * 0.085 + buildings.length * 0.35);
    return Math.min(MAX_VEHICLES, target);
  }

  private isLaneSpawnClear(laneId: number, startS: number): boolean {
    for (let i = 0; i < this.vehicles.length; i++) {
      const v = this.vehicles[i];
      if (v.laneId === laneId && Math.abs(v.s - startS) < 11) {
        return false;
      }
    }
    return true;
  }

  private pickLaneForSegment(roads: RoadNetwork, segId: number, rng: SeededRNG): RoadLane | null {
    const seg = roads.segments.get(segId);
    if (!seg || seg.laneIds.length === 0) return null;
    const id = rng.pick(seg.laneIds);
    return roads.lanes.get(id) ?? null;
  }

  private spawnTrips(
    roads: RoadNetwork,
    buildings: readonly Building[],
    population: number,
    terrain: Terrain,
    rng: SeededRNG
  ): void {
    const target = this.getTargetVehicleCount(roads, buildings, population);
    const deficit = target - this.vehicles.length;
    if (deficit <= 0) return;

    const toSpawn = Math.min(MAX_SPAWN_PER_TICK, deficit);
    const homes: Building[] = [];
    const shops: Building[] = [];
    const industry: Building[] = [];
    const civic: Building[] = [];
    const allActive: Building[] = [];

    for (const b of buildings) {
      if (b.abandoned || b.progress < 0.8 || b.segmentId === 0) continue;
      if (!roads.segments.has(b.segmentId)) continue;
      allActive.push(b);
      if (b.zone === 'res_low' || b.zone === 'res_high') homes.push(b);
      else if (b.zone === 'com_low' || b.zone === 'com_high' || b.zone === 'office') shops.push(b);
      else if (b.zone === 'ind') industry.push(b);
      else if (b.kind === 'ploppable') civic.push(b);
    }

    const outsideNodes = roads.getOutsideConnectionNodes();
    const allSegIds = Array.from(roads.segments.keys());
    if (allSegIds.length === 0) return;

    for (let k = 0; k < toSpawn; k++) {
      let startLane: RoadLane | null = null;
      let goalLane: RoadLane | null = null;
      let vType: VehicleType = 'car';

      const roll = rng.next();

      if (roll < 0.36 && homes.length > 0 && (shops.length > 0 || industry.length > 0)) {
        // Commute or shopping trip
        const src = rng.pick(homes);
        const dstPool = shops.length > 0 && (industry.length === 0 || rng.chance(0.55)) ? shops : industry;
        const dst = rng.pick(dstPool);
        startLane = this.pickLaneForSegment(roads, src.segmentId, rng);
        goalLane = this.pickLaneForSegment(roads, dst.segmentId, rng);
        vType = 'car';
      } else if (roll < 0.56 && industry.length > 0 && (shops.length > 0 || outsideNodes.length > 0)) {
        // Freight delivery truck
        const src = rng.pick(industry);
        startLane = this.pickLaneForSegment(roads, src.segmentId, rng);
        if (shops.length > 0 && rng.chance(0.65)) {
          goalLane = this.pickLaneForSegment(roads, rng.pick(shops).segmentId, rng);
        } else if (outsideNodes.length > 0) {
          const outNode = rng.pick(outsideNodes);
          const inc = roads.incomingLanesByNode.get(outNode.id);
          if (inc && inc.length > 0) goalLane = roads.lanes.get(rng.pick(inc)) ?? null;
        }
        vType = 'truck';
      } else if (roll < 0.78 && outsideNodes.length > 0 && allActive.length > 0) {
        // Regional highway traffic entering or exiting town
        const outNode = rng.pick(outsideNodes);
        const entering = rng.chance(0.58);
        const bldg = rng.pick(allActive);
        if (entering) {
          const outLanes = roads.outgoingLanesByNode.get(outNode.id);
          if (outLanes && outLanes.length > 0) startLane = roads.lanes.get(rng.pick(outLanes)) ?? null;
          goalLane = this.pickLaneForSegment(roads, bldg.segmentId, rng);
        } else {
          startLane = this.pickLaneForSegment(roads, bldg.segmentId, rng);
          const incLanes = roads.incomingLanesByNode.get(outNode.id);
          if (incLanes && incLanes.length > 0) goalLane = roads.lanes.get(rng.pick(incLanes)) ?? null;
        }
        vType = rng.chance(0.28) ? 'truck' : 'car';
      } else if (roll < 0.88 && civic.length > 0 && allActive.length > 1) {
        // Civic service patrol / delivery van
        const src = rng.pick(civic);
        const dst = rng.pick(allActive);
        startLane = this.pickLaneForSegment(roads, src.segmentId, rng);
        goalLane = this.pickLaneForSegment(roads, dst.segmentId, rng);
        vType = rng.chance(0.55) ? 'service' : 'van';
      } else {
        // General road-to-road trip across network
        const segA = rng.pick(allSegIds);
        const segB = rng.pick(allSegIds);
        startLane = this.pickLaneForSegment(roads, segA, rng);
        goalLane = this.pickLaneForSegment(roads, segB, rng);
        vType = rng.chance(0.2) ? 'van' : 'car';
      }

      if (!startLane || !goalLane || startLane.segmentId === goalLane.segmentId) continue;

      const startS = Math.min(startLane.lut.length * 0.25, 4);
      if (!this.isLaneSpawnClear(startLane.id, startS)) continue;

      const route = findLaneRoute(roads, startLane.id, goalLane.id);
      if (!route || route.length < 2) continue;

      const t = lutTAtDistance(startLane.lut, startS);
      const pt = evalBezier(startLane.bezier, t);
      const tan = evalBezierTangent(startLane.bezier, t);
      const seg = roads.segments.get(startLane.segmentId);
      const baseY = terrain.sampleHeight(pt.x, pt.z);

      const length = vType === 'truck' ? 6.8 : vType === 'car' ? 4.4 : 5.2;
      const maxSpeed = vType === 'truck' ? 18 : vType === 'service' ? 24 : 26;

      this.vehicles.push({
        id: this.nextVehicleId++,
        type: vType,
        colorIdx: rng.int(0, 6),
        route,
        routeIndex: 0,
        laneId: startLane.id,
        s: startS,
        speed: Math.min(startLane.speedLimit * 0.6, maxSpeed),
        maxSpeed,
        length,
        x: pt.x,
        y: (seg?.isBridge ? Math.max(baseY, 1.8) : baseY) + 0.22,
        z: pt.z,
        yaw: Math.atan2(tan.x, tan.z),
        braking: false,
        stuckTicks: 0,
        totalDistanceMoved: 0,
        ageTicks: 0,
      });
    }
  }
}
