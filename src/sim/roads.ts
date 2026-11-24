import {
  ROAD_SPECS,
  WORLD_HALF,
  type CubicBezier,
  type RoadType,
  type Vec2,
} from './types.ts';
import {
  buildBezierLUT,
  closestPointOnBezier,
  evalBezier,
  evalBezierRightNormal,
  evalBezierTangent,
  intersectBeziers,
  makeStraightBezier,
  reverseBezier,
  splitBezier,
  vec2Dist,
  type BezierLUT,
} from './bezier.ts';
import type { Terrain } from './terrain.ts';

export type RoadControl = 'none' | 'yield' | 'signals';

export const ROAD_CONTROL_TO_INT: Record<RoadControl, number> = {
  none: 0,
  yield: 1,
  signals: 2,
};

export interface RoadNode {
  id: number;
  x: number;
  z: number;
  segmentIds: number[];
  isOutsideConnection: boolean;
  control: RoadControl;
  signalPhase: number;
  signalTimer: number;
}

export interface RoadLane {
  id: number;
  segmentId: number;
  direction: 1 | -1;
  laneIndex: number;
  offset: number;
  fromNodeId: number;
  toNodeId: number;
  bezier: CubicBezier;
  lut: BezierLUT;
  speedLimit: number;
  width: number;
}

export interface LaneConnection {
  fromLaneId: number;
  toLaneId: number;
  nodeId: number;
  turnCost: number;
  isUturn: boolean;
  group: number; // 0 or 1 for 2-phase traffic signal
}

export interface RoadSegment {
  id: number;
  type: RoadType;
  startNodeId: number;
  endNodeId: number;
  bezier: CubicBezier;
  lut: BezierLUT;
  laneIds: number[];
  congestion: number;
  flowAccumulator: number;
  flowSamples: number;
  isBridge: boolean;
}

export interface AddRoadResult {
  ok: boolean;
  reason?: string;
  segmentIds: number[];
  length: number;
  cost: number;
}

export interface SerializedRoadNetwork {
  nextNodeId: number;
  nextSegmentId: number;
  nodes: Array<{
    id: number;
    x: number;
    z: number;
    isOutsideConnection: boolean;
    control: RoadControl;
  }>;
  segments: Array<{
    id: number;
    type: RoadType;
    startNodeId: number;
    endNodeId: number;
    bezier: CubicBezier;
    isBridge: boolean;
  }>;
}

const SNAP_NODE_RADIUS = 13;
const SNAP_SEG_RADIUS = 11;
const MIN_ROAD_LENGTH = 8;
const SIGNAL_PHASE_DURATION = 8.0; // 16s full cycle

function splitBezierMultiple(b: CubicBezier, sortedTs: number[]): CubicBezier[] {
  const parts: CubicBezier[] = [];
  let cur = b;
  let prevT = 0;
  for (const t of sortedTs) {
    if (t <= prevT + 1e-4 || t >= 1 - 1e-4) continue;
    const localT = (t - prevT) / (1 - prevT);
    const [left, right] = splitBezier(cur, localT);
    parts.push(left);
    cur = right;
    prevT = t;
  }
  parts.push(cur);
  return parts;
}

function offsetBezier(b: CubicBezier, offset: number): CubicBezier {
  if (Math.abs(offset) < 1e-4) {
    return {
      p0: { ...b.p0 },
      c0: { ...b.c0 },
      c1: { ...b.c1 },
      p1: { ...b.p1 },
    };
  }
  const n0 = evalBezierRightNormal(b, 0);
  const n1 = evalBezierRightNormal(b, 1 / 3);
  const n2 = evalBezierRightNormal(b, 2 / 3);
  const n3 = evalBezierRightNormal(b, 1);
  return {
    p0: { x: b.p0.x + n0.x * offset, z: b.p0.z + n0.z * offset },
    c0: { x: b.c0.x + n1.x * offset, z: b.c0.z + n1.z * offset },
    c1: { x: b.c1.x + n2.x * offset, z: b.c1.z + n2.z * offset },
    p1: { x: b.p1.x + n3.x * offset, z: b.p1.z + n3.z * offset },
  };
}

function computeLaneOffsets(type: RoadType): { forward: number[]; backward: number[] } {
  const spec = ROAD_SPECS[type];
  const forward: number[] = [];
  const backward: number[] = [];

  if (spec.backwardLanes === 0 && spec.forwardLanes > 0) {
    const asphalt = spec.width - 2 * spec.sidewalkWidth;
    const laneW = asphalt / spec.forwardLanes;
    for (let i = 0; i < spec.forwardLanes; i++) {
      forward.push(-asphalt * 0.5 + (i + 0.5) * laneW);
    }
    return { forward, backward };
  }

  const sideAsphalt = (spec.width - 2 * spec.sidewalkWidth - spec.medianWidth) * 0.5;
  const halfMedian = spec.medianWidth * 0.5;

  if (spec.forwardLanes > 0) {
    const laneW = sideAsphalt / spec.forwardLanes;
    for (let i = 0; i < spec.forwardLanes; i++) {
      forward.push(halfMedian + (i + 0.5) * laneW);
    }
  }
  if (spec.backwardLanes > 0) {
    const laneW = sideAsphalt / spec.backwardLanes;
    for (let i = 0; i < spec.backwardLanes; i++) {
      backward.push(-(halfMedian + (i + 0.5) * laneW));
    }
  }

  return { forward, backward };
}

export class RoadNetwork {
  readonly nodes = new Map<number, RoadNode>();
  readonly segments = new Map<number, RoadSegment>();
  readonly lanes = new Map<number, RoadLane>();
  readonly outgoingConnections = new Map<number, LaneConnection[]>();
  readonly incomingLanesByNode = new Map<number, number[]>();
  readonly outgoingLanesByNode = new Map<number, number[]>();

  private nextNodeId = 1;
  private nextSegmentId = 1;
  private nextLaneId = 1;
  revision = 1;

  private createNode(x: number, z: number, outsideHint = false): RoadNode {
    const id = this.nextNodeId++;
    const nearEdge =
      Math.abs(x) >= WORLD_HALF - 26 || Math.abs(z) >= WORLD_HALF - 26;
    const node: RoadNode = {
      id,
      x,
      z,
      segmentIds: [],
      isOutsideConnection: outsideHint || nearEdge,
      control: 'none',
      signalPhase: 0,
      signalTimer: 0,
    };
    this.nodes.set(id, node);
    return node;
  }

  private findClosestNode(p: Vec2, radius: number): RoadNode | null {
    let best: RoadNode | null = null;
    let bestDist = radius;
    for (const node of this.nodes.values()) {
      const d = Math.hypot(node.x - p.x, node.z - p.z);
      if (d < bestDist) {
        bestDist = d;
        best = node;
      }
    }
    return best;
  }

  private findClosestSegment(
    p: Vec2,
    radius: number,
    excludeSegmentIds?: Set<number>
  ): { segment: RoadSegment; t: number; point: Vec2; dist: number } | null {
    let best: { segment: RoadSegment; t: number; point: Vec2; dist: number } | null = null;
    for (const seg of this.segments.values()) {
      if (excludeSegmentIds?.has(seg.id)) continue;
      if (
        p.x < seg.lut.minX - radius ||
        p.x > seg.lut.maxX + radius ||
        p.z < seg.lut.minZ - radius ||
        p.z > seg.lut.maxZ + radius
      ) {
        continue;
      }
      const cp = closestPointOnBezier(seg.lut, p);
      if (cp.dist < radius && (!best || cp.dist < best.dist)) {
        // Ignore hits too close to endpoints (handled by node snap)
        if (cp.s > 6 && cp.s < seg.lut.length - 6) {
          best = { segment: seg, t: cp.t, point: cp.point, dist: cp.dist };
        }
      }
    }
    return best;
  }

  private detectBridge(lut: BezierLUT, terrain: Terrain): boolean {
    const steps = Math.max(4, Math.ceil(lut.length / 10));
    let waterHits = 0;
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const p = evalBezier(lut.bezier, t);
      if (terrain.isWater(p.x, p.z, 0.05)) {
        waterHits++;
      }
    }
    return waterHits >= 2;
  }

  private insertRawSegment(
    startNode: RoadNode,
    endNode: RoadNode,
    bezier: CubicBezier,
    type: RoadType,
    terrain: Terrain
  ): RoadSegment | null {
    // Reject degenerate or duplicate segment
    const fixedBezier: CubicBezier = {
      p0: { x: startNode.x, z: startNode.z },
      c0: { ...bezier.c0 },
      c1: { ...bezier.c1 },
      p1: { x: endNode.x, z: endNode.z },
    };
    const lut = buildBezierLUT(fixedBezier, 32);
    if (lut.length < 4) return null;

    // Duplicate check (same endpoints and similar midpoint)
    const mid = evalBezier(fixedBezier, 0.5);
    for (const segId of startNode.segmentIds) {
      const existing = this.segments.get(segId);
      if (!existing) continue;
      const samePair =
        (existing.startNodeId === startNode.id && existing.endNodeId === endNode.id) ||
        (existing.startNodeId === endNode.id && existing.endNodeId === startNode.id);
      if (samePair) {
        const emid = evalBezier(existing.bezier, 0.5);
        if (vec2Dist(mid, emid) < 4) return null;
      }
    }

    const id = this.nextSegmentId++;
    const seg: RoadSegment = {
      id,
      type,
      startNodeId: startNode.id,
      endNodeId: endNode.id,
      bezier: fixedBezier,
      lut,
      laneIds: [],
      congestion: 0,
      flowAccumulator: 0,
      flowSamples: 0,
      isBridge: this.detectBridge(lut, terrain),
    };
    this.segments.set(id, seg);
    startNode.segmentIds.push(id);
    endNode.segmentIds.push(id);
    return seg;
  }

  private removeSegmentRaw(segmentId: number): RoadSegment | null {
    const seg = this.segments.get(segmentId);
    if (!seg) return null;
    this.segments.delete(segmentId);
    const nA = this.nodes.get(seg.startNodeId);
    if (nA) nA.segmentIds = nA.segmentIds.filter((id) => id !== segmentId);
    const nB = this.nodes.get(seg.endNodeId);
    if (nB) nB.segmentIds = nB.segmentIds.filter((id) => id !== segmentId);
    return seg;
  }

  /**
   * Splits an existing segment at one or more sorted parameter values t in (0, 1).
   * Returns the created split nodes in ascending t order.
   */
  splitSegmentAtParams(segmentId: number, ts: number[], terrain: Terrain): RoadNode[] {
    const seg = this.segments.get(segmentId);
    if (!seg || ts.length === 0) return [];

    const sorted = [...ts]
      .filter((t) => t > 0.02 && t < 0.98)
      .sort((a, b) => a - b);

    // Deduplicate closely spaced splits
    const cleanTs: number[] = [];
    for (const t of sorted) {
      if (cleanTs.length === 0 || t - cleanTs[cleanTs.length - 1] > 0.03) {
        cleanTs.push(t);
      }
    }
    if (cleanTs.length === 0) return [];

    const startNode = this.nodes.get(seg.startNodeId);
    const endNode = this.nodes.get(seg.endNodeId);
    if (!startNode || !endNode) return [];

    const parts = splitBezierMultiple(seg.bezier, cleanTs);
    if (parts.length < 2) return [];

    this.removeSegmentRaw(segmentId);

    const createdNodes: RoadNode[] = [];
    let prevNode = startNode;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const nextNode =
        i === parts.length - 1
          ? endNode
          : this.createNode(part.p1.x, part.p1.z);
      if (i < parts.length - 1) {
        createdNodes.push(nextNode);
      }
      this.insertRawSegment(prevNode, nextNode, part, seg.type, terrain);
      prevNode = nextNode;
    }

    return createdNodes;
  }

  addRoad(
    p0: Vec2,
    p1: Vec2,
    roadType: RoadType,
    terrain: Terrain,
    c0?: Vec2,
    c1?: Vec2,
    options?: { allowEdge?: boolean; outsideConnection?: boolean }
  ): AddRoadResult {
    const margin = options?.allowEdge ? 2 : 18;
    if (!terrain.isInBounds(p0.x, p0.z, margin) || !terrain.isInBounds(p1.x, p1.z, margin)) {
      return { ok: false, reason: 'Out of map bounds', segmentIds: [], length: 0, cost: 0 };
    }

    if (vec2Dist(p0, p1) < MIN_ROAD_LENGTH) {
      return { ok: false, reason: 'Road too short', segmentIds: [], length: 0, cost: 0 };
    }

    // 1. Endpoint snapping (existing node first, else existing segment T-junction)
    let startNode = this.findClosestNode(p0, SNAP_NODE_RADIUS);
    let startSnapSeg: { segmentId: number; t: number; point: Vec2 } | null = null;
    if (!startNode) {
      const hit = this.findClosestSegment(p0, SNAP_SEG_RADIUS);
      if (hit) {
        startSnapSeg = { segmentId: hit.segment.id, t: hit.t, point: hit.point };
      }
    }

    let endNode = this.findClosestNode(p1, SNAP_NODE_RADIUS);
    let endSnapSeg: { segmentId: number; t: number; point: Vec2 } | null = null;
    if (!endNode) {
      const hit = this.findClosestSegment(p1, SNAP_SEG_RADIUS);
      if (hit) {
        endSnapSeg = { segmentId: hit.segment.id, t: hit.t, point: hit.point };
      }
    }

    const snappedP0 = startNode
      ? { x: startNode.x, z: startNode.z }
      : startSnapSeg
        ? startSnapSeg.point
        : p0;
    const snappedP1 = endNode
      ? { x: endNode.x, z: endNode.z }
      : endSnapSeg
        ? endSnapSeg.point
        : p1;

    if (startNode && endNode && startNode.id === endNode.id) {
      return { ok: false, reason: 'Start and end snapped to same node', segmentIds: [], length: 0, cost: 0 };
    }
    if (vec2Dist(snappedP0, snappedP1) < MIN_ROAD_LENGTH) {
      return { ok: false, reason: 'Snapped road too short', segmentIds: [], length: 0, cost: 0 };
    }

    // 2. Execute T-junction splits if endpoints landed mid-segment
    if (startSnapSeg && endSnapSeg && startSnapSeg.segmentId === endSnapSeg.segmentId) {
      const firstFirst = startSnapSeg.t < endSnapSeg.t;
      const ordered = firstFirst ? [startSnapSeg.t, endSnapSeg.t] : [endSnapSeg.t, startSnapSeg.t];
      const splitNodes = this.splitSegmentAtParams(startSnapSeg.segmentId, ordered, terrain);
      if (splitNodes.length === 2) {
        startNode = firstFirst ? splitNodes[0] : splitNodes[1];
        endNode = firstFirst ? splitNodes[1] : splitNodes[0];
      } else if (splitNodes.length === 1) {
        return { ok: false, reason: 'Endpoints too close on same segment', segmentIds: [], length: 0, cost: 0 };
      }
    } else {
      if (startSnapSeg) {
        const splitNodes = this.splitSegmentAtParams(startSnapSeg.segmentId, [startSnapSeg.t], terrain);
        if (splitNodes.length > 0) startNode = splitNodes[0];
      }
      if (endSnapSeg) {
        const splitNodes = this.splitSegmentAtParams(endSnapSeg.segmentId, [endSnapSeg.t], terrain);
        if (splitNodes.length > 0) endNode = splitNodes[0];
      }
    }

    if (!startNode) {
      startNode = this.createNode(
        snappedP0.x,
        snappedP0.z,
        options?.outsideConnection && (Math.abs(snappedP0.x) >= WORLD_HALF - 26 || Math.abs(snappedP0.z) >= WORLD_HALF - 26)
      );
    }
    if (!endNode) {
      endNode = this.createNode(
        snappedP1.x,
        snappedP1.z,
        options?.outsideConnection && (Math.abs(snappedP1.x) >= WORLD_HALF - 26 || Math.abs(snappedP1.z) >= WORLD_HALF - 26)
      );
    }

    // Build candidate cubic bezier with snapped endpoints
    let candidate: CubicBezier;
    if (c0 && c1) {
      const d0x = startNode.x - p0.x;
      const d0z = startNode.z - p0.z;
      const d1x = endNode.x - p1.x;
      const d1z = endNode.z - p1.z;
      candidate = {
        p0: { x: startNode.x, z: startNode.z },
        c0: { x: c0.x + d0x * 0.5, z: c0.z + d0z * 0.5 },
        c1: { x: c1.x + d1x * 0.5, z: c1.z + d1z * 0.5 },
        p1: { x: endNode.x, z: endNode.z },
      };
    } else {
      candidate = makeStraightBezier(
        { x: startNode.x, z: startNode.z },
        { x: endNode.x, z: endNode.z }
      );
    }

    const candLut = buildBezierLUT(candidate, 40);
    if (candLut.length < MIN_ROAD_LENGTH) {
      this.cleanupOrphanNode(startNode.id);
      this.cleanupOrphanNode(endNode.id);
      return { ok: false, reason: 'Road curve too short', segmentIds: [], length: 0, cost: 0 };
    }

    // 3. Find all curve-curve crossings with existing segments
    interface PendingCrossing {
      tA: number;
      point: Vec2;
      existingNodeId?: number;
      otherSegId?: number;
      tB?: number;
    }

    const crossings: PendingCrossing[] = [];
    const splitsByExistingSeg = new Map<number, Array<{ tB: number; crossingIdx: number }>>();

    for (const seg of this.segments.values()) {
      const hits = intersectBeziers(candLut, seg.lut, 1.0);
      for (const hit of hits) {
        // Ignore endpoint touches
        if (hit.tA < 0.035 || hit.tA > 0.965) continue;
        if (
          vec2Dist(hit.point, startNode) < 8 ||
          vec2Dist(hit.point, endNode) < 8
        ) {
          continue;
        }
        // Check if crossing lands right on an existing node
        const nearNode = this.findClosestNode(hit.point, 8);
        if (nearNode && nearNode.id !== startNode.id && nearNode.id !== endNode.id) {
          if (!crossings.some((c) => Math.abs(c.tA - hit.tA) < 0.03)) {
            crossings.push({ tA: hit.tA, point: { x: nearNode.x, z: nearNode.z }, existingNodeId: nearNode.id });
          }
          continue;
        }
        if (hit.tB < 0.03 || hit.tB > 0.97) continue;
        if (crossings.some((c) => Math.abs(c.tA - hit.tA) < 0.03)) continue;

        const idx = crossings.length;
        crossings.push({ tA: hit.tA, point: hit.point, otherSegId: seg.id, tB: hit.tB });
        const list = splitsByExistingSeg.get(seg.id) ?? [];
        list.push({ tB: hit.tB, crossingIdx: idx });
        splitsByExistingSeg.set(seg.id, list);
      }
    }

    // Execute splits on crossed existing segments and link their created junction nodes
    const crossingNodeMap = new Map<number, RoadNode>();
    for (const [segId, list] of splitsByExistingSeg.entries()) {
      list.sort((a, b) => a.tB - b.tB);
      const deduped: Array<{ tB: number; crossingIdx: number }> = [];
      for (const item of list) {
        if (deduped.length === 0 || item.tB - deduped[deduped.length - 1].tB > 0.03) {
          deduped.push(item);
        }
      }
      const created = this.splitSegmentAtParams(
        segId,
        deduped.map((d) => d.tB),
        terrain
      );
      for (let i = 0; i < created.length && i < deduped.length; i++) {
        crossingNodeMap.set(deduped[i].crossingIdx, created[i]);
      }
    }

    // Build ordered split chain along the new candidate curve
    const orderedCrossings: Array<{ tA: number; node: RoadNode }> = [];
    for (let i = 0; i < crossings.length; i++) {
      const c = crossings[i];
      const node = c.existingNodeId
        ? this.nodes.get(c.existingNodeId)
        : crossingNodeMap.get(i);
      if (node && node.id !== startNode.id && node.id !== endNode.id) {
        orderedCrossings.push({ tA: c.tA, node });
      }
    }
    orderedCrossings.sort((a, b) => a.tA - b.tA);

    const pieces = splitBezierMultiple(
      candidate,
      orderedCrossings.map((c) => c.tA)
    );

    const chainNodes: RoadNode[] = [
      startNode,
      ...orderedCrossings.map((c) => c.node),
      endNode,
    ];

    const createdSegIds: number[] = [];
    let totalLength = 0;

    for (let i = 0; i < pieces.length && i + 1 < chainNodes.length; i++) {
      const nA = chainNodes[i];
      const nB = chainNodes[i + 1];
      if (nA.id === nB.id) continue;
      const inserted = this.insertRawSegment(nA, nB, pieces[i], roadType, terrain);
      if (inserted) {
        createdSegIds.push(inserted.id);
        totalLength += inserted.lut.length;
      }
    }

    if (createdSegIds.length === 0) {
      this.cleanupOrphanNode(startNode.id);
      this.cleanupOrphanNode(endNode.id);
      return { ok: false, reason: 'Duplicate or invalid road placement', segmentIds: [], length: 0, cost: 0 };
    }

    this.rebuildLanesAndConnections();
    this.revision++;

    const cost = Math.round(totalLength * ROAD_SPECS[roadType].costPerMeter);
    return {
      ok: true,
      segmentIds: createdSegIds,
      length: totalLength,
      cost,
    };
  }

  private cleanupOrphanNode(nodeId: number): void {
    const node = this.nodes.get(nodeId);
    if (node && node.segmentIds.length === 0) {
      this.nodes.delete(nodeId);
    }
  }

  upgradeRoad(segmentId: number, newType: RoadType): { ok: boolean; cost: number; reason?: string } {
    const seg = this.segments.get(segmentId);
    if (!seg) return { ok: false, cost: 0, reason: 'Segment not found' };
    if (seg.type === newType) return { ok: false, cost: 0, reason: 'Already this road type' };

    const oldCost = ROAD_SPECS[seg.type].costPerMeter;
    const newCost = ROAD_SPECS[newType].costPerMeter;
    const upgradeCost = Math.max(
      Math.round(seg.lut.length * 10),
      Math.round(seg.lut.length * (newCost - oldCost * 0.5))
    );
    seg.type = newType;
    this.rebuildLanesAndConnections();
    this.revision++;
    return { ok: true, cost: upgradeCost };
  }

  bulldozeRoad(segmentId: number): { ok: boolean; refund: number; reason?: string } {
    const seg = this.removeSegmentRaw(segmentId);
    if (!seg) return { ok: false, refund: 0, reason: 'Segment not found' };

    this.cleanupOrphanNode(seg.startNodeId);
    this.cleanupOrphanNode(seg.endNodeId);
    this.rebuildLanesAndConnections();
    this.revision++;

    const refund = Math.round(seg.lut.length * ROAD_SPECS[seg.type].costPerMeter * 0.5);
    return { ok: true, refund };
  }

  rebuildLanesAndConnections(): void {
    this.lanes.clear();
    this.outgoingConnections.clear();
    this.incomingLanesByNode.clear();
    this.outgoingLanesByNode.clear();
    this.nextLaneId = 1;

    // 1. Update node control types
    for (const node of this.nodes.values()) {
      const deg = node.segmentIds.length;
      let hasMajor = false;
      for (const sid of node.segmentIds) {
        const s = this.segments.get(sid);
        if (s && (s.type === 'avenue_4lane' || s.type === 'highway')) {
          hasMajor = true;
          break;
        }
      }
      if (deg >= 4 || (deg === 3 && hasMajor)) {
        node.control = 'signals';
      } else if (deg === 3) {
        node.control = 'yield';
      } else {
        node.control = 'none';
      }
    }

    // 2. Build directional lanes for each segment
    for (const seg of this.segments.values()) {
      seg.laneIds = [];
      const spec = ROAD_SPECS[seg.type];
      const offsets = computeLaneOffsets(seg.type);

      // Forward lanes (startNode -> endNode)
      for (let i = 0; i < offsets.forward.length; i++) {
        const off = offsets.forward[i];
        const laneBez = offsetBezier(seg.bezier, off);
        const laneLut = buildBezierLUT(laneBez, 24);
        const laneId = this.nextLaneId++;
        const lane: RoadLane = {
          id: laneId,
          segmentId: seg.id,
          direction: 1,
          laneIndex: i,
          offset: off,
          fromNodeId: seg.startNodeId,
          toNodeId: seg.endNodeId,
          bezier: laneBez,
          lut: laneLut,
          speedLimit: spec.speedLimit,
          width: 3.3,
        };
        this.lanes.set(laneId, lane);
        seg.laneIds.push(laneId);
        this.pushNodeLane(this.outgoingLanesByNode, lane.fromNodeId, laneId);
        this.pushNodeLane(this.incomingLanesByNode, lane.toNodeId, laneId);
      }

      // Backward lanes (endNode -> startNode, reversed bezier so s=0 is always start!)
      for (let i = 0; i < offsets.backward.length; i++) {
        const off = offsets.backward[i];
        const laneBez = reverseBezier(offsetBezier(seg.bezier, off));
        const laneLut = buildBezierLUT(laneBez, 24);
        const laneId = this.nextLaneId++;
        const lane: RoadLane = {
          id: laneId,
          segmentId: seg.id,
          direction: -1,
          laneIndex: i,
          offset: off,
          fromNodeId: seg.endNodeId,
          toNodeId: seg.startNodeId,
          bezier: laneBez,
          lut: laneLut,
          speedLimit: spec.speedLimit,
          width: 3.3,
        };
        this.lanes.set(laneId, lane);
        seg.laneIds.push(laneId);
        this.pushNodeLane(this.outgoingLanesByNode, lane.fromNodeId, laneId);
        this.pushNodeLane(this.incomingLanesByNode, lane.toNodeId, laneId);
      }
    }

    // 3. Build per-node lane connections
    for (const node of this.nodes.values()) {
      const inc = this.incomingLanesByNode.get(node.id) ?? [];
      const out = this.outgoingLanesByNode.get(node.id) ?? [];
      const isDeadEnd = node.segmentIds.length <= 1;

      for (const inLaneId of inc) {
        const inLane = this.lanes.get(inLaneId);
        if (!inLane) continue;
        const inTan = evalBezierTangent(inLane.bezier, 1);
        const signalGroup = Math.abs(inTan.x) >= Math.abs(inTan.z) ? 0 : 1;
        const conns: LaneConnection[] = [];

        for (const outLaneId of out) {
          const outLane = this.lanes.get(outLaneId);
          if (!outLane) continue;
          const isSameSeg = inLane.segmentId === outLane.segmentId;
          if (isSameSeg && !isDeadEnd) continue;

          const outTan = evalBezierTangent(outLane.bezier, 0);
          const dot = Math.max(-1, Math.min(1, inTan.x * outTan.x + inTan.z * outTan.z));
          // crossY = inTan.x * outTan.z - inTan.z * outTan.x: positive = right turn in XZ? Wait:
          // in=(0,-1) North, out=(1,0) East (right): 0*0 - (-1)*1 = +1 (right turn)
          const cross = inTan.x * outTan.z - inTan.z * outTan.x;
          let turnCost = 0.2;
          if (isSameSeg) {
            turnCost = 4.0; // U-turn at dead-end
          } else if (dot > 0.7) {
            turnCost = 0.15; // Straight
          } else if (cross > 0) {
            turnCost = 0.6; // Right turn
          } else {
            turnCost = 1.25; // Left turn
          }

          if (node.control === 'signals') {
            turnCost += 0.9;
          }

          conns.push({
            fromLaneId: inLaneId,
            toLaneId: outLaneId,
            nodeId: node.id,
            turnCost,
            isUturn: isSameSeg,
            group: signalGroup,
          });
        }

        if (conns.length > 0) {
          this.outgoingConnections.set(inLaneId, conns);
        }
      }
    }
  }

  private pushNodeLane(map: Map<number, number[]>, nodeId: number, laneId: number): void {
    const arr = map.get(nodeId);
    if (arr) {
      arr.push(laneId);
    } else {
      map.set(nodeId, [laneId]);
    }
  }

  updateSignals(dt: number): void {
    for (const node of this.nodes.values()) {
      if (node.control !== 'signals') continue;
      node.signalTimer += dt;
      if (node.signalTimer >= SIGNAL_PHASE_DURATION) {
        node.signalTimer -= SIGNAL_PHASE_DURATION;
        node.signalPhase = (node.signalPhase + 1) % 2;
      }
    }
  }

  decayCongestion(): void {
    for (const seg of this.segments.values()) {
      const raw = seg.flowSamples > 0 ? Math.min(1, seg.flowAccumulator / Math.max(1, seg.lut.length / 18)) : 0;
      seg.congestion = seg.congestion * 0.8 + raw * 0.2;
      if (seg.congestion < 0.005) seg.congestion = 0;
      seg.flowAccumulator = 0;
      seg.flowSamples = 0;
    }
  }

  findNearestLane(x: number, z: number, maxDist = 90): { lane: RoadLane; s: number; dist: number } | null {
    const p = { x, z };
    let best: { lane: RoadLane; s: number; dist: number } | null = null;
    for (const seg of this.segments.values()) {
      if (
        x < seg.lut.minX - maxDist ||
        x > seg.lut.maxX + maxDist ||
        z < seg.lut.minZ - maxDist ||
        z > seg.lut.maxZ + maxDist
      ) {
        continue;
      }
      const cp = closestPointOnBezier(seg.lut, p);
      if (cp.dist > maxDist) continue;
      if (!best || cp.dist < best.dist) {
        const laneId = seg.laneIds[0];
        const lane = laneId !== undefined ? this.lanes.get(laneId) : undefined;
        if (lane) {
          const laneCp = closestPointOnBezier(lane.lut, p);
          best = { lane, s: laneCp.s, dist: cp.dist };
        }
      }
    }
    return best;
  }

  getOutsideConnectionNodes(): RoadNode[] {
    const out: RoadNode[] = [];
    for (const node of this.nodes.values()) {
      if (node.isOutsideConnection && node.segmentIds.length > 0) {
        out.push(node);
      }
    }
    return out;
  }

  getTotalUpkeepPerDay(): number {
    let sum = 0;
    for (const seg of this.segments.values()) {
      sum += seg.lut.length * ROAD_SPECS[seg.type].upkeepPerMeterPerDay;
    }
    return sum;
  }

  serialize(): SerializedRoadNetwork {
    return {
      nextNodeId: this.nextNodeId,
      nextSegmentId: this.nextSegmentId,
      nodes: Array.from(this.nodes.values()).map((n) => ({
        id: n.id,
        x: n.x,
        z: n.z,
        isOutsideConnection: n.isOutsideConnection,
        control: n.control,
      })),
      segments: Array.from(this.segments.values()).map((s) => ({
        id: s.id,
        type: s.type,
        startNodeId: s.startNodeId,
        endNodeId: s.endNodeId,
        bezier: s.bezier,
        isBridge: s.isBridge,
      })),
    };
  }

  deserialize(data: SerializedRoadNetwork): void {
    this.nodes.clear();
    this.segments.clear();
    this.nextNodeId = data.nextNodeId;
    this.nextSegmentId = data.nextSegmentId;

    for (const n of data.nodes) {
      this.nodes.set(n.id, {
        id: n.id,
        x: n.x,
        z: n.z,
        segmentIds: [],
        isOutsideConnection: n.isOutsideConnection,
        control: n.control,
        signalPhase: 0,
        signalTimer: 0,
      });
    }

    for (const s of data.segments) {
      const nA = this.nodes.get(s.startNodeId);
      const nB = this.nodes.get(s.endNodeId);
      if (!nA || !nB) continue;
      const seg: RoadSegment = {
        id: s.id,
        type: s.type,
        startNodeId: s.startNodeId,
        endNodeId: s.endNodeId,
        bezier: s.bezier,
        lut: buildBezierLUT(s.bezier, 32),
        laneIds: [],
        congestion: 0,
        flowAccumulator: 0,
        flowSamples: 0,
        isBridge: s.isBridge,
      };
      this.segments.set(seg.id, seg);
      nA.segmentIds.push(seg.id);
      nB.segmentIds.push(seg.id);
    }

    this.rebuildLanesAndConnections();
    this.revision++;
  }
}
