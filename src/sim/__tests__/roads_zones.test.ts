import { describe, expect, it } from 'vitest';
import { closestPointOnBezier } from '../bezier.ts';
import { SimEngine } from '../engine.ts';
import { riverCenterX } from '../terrain.ts';
import { ROAD_SPECS, WATER_LEVEL, ZONE_CELL_SIZE, ZONE_MAX_DEPTH } from '../types.ts';

describe('Road topology: splitting, T-junctions, and crossings via SimCommand', () => {
  it('splits an existing road on T-junction and creates a 4-way crossing node on intersection', () => {
    const engine = new SimEngine(12345, { createInitialHighway: false });

    // 1. Horizontal road A across flat coastal plain
    const rA = engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 40, z: 0 },
      p1: { x: 260, z: 0 },
      roadType: 'avenue_4lane',
    });
    expect(rA.ok).toBe(true);
    expect(engine.roads.segments.size).toBe(1);
    expect(engine.roads.nodes.size).toBe(2);

    // 2. Vertical road B starting at midpoint of A -> T-junction split
    const rB = engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 150, z: 0 },
      p1: { x: 150, z: 140 },
      roadType: 'small_2lane',
    });
    expect(rB.ok).toBe(true);
    expect(engine.roads.segments.size).toBe(3);

    const tNode = Array.from(engine.roads.nodes.values()).find(
      (n) => Math.hypot(n.x - 150, n.z - 0) < 3
    );
    expect(tNode).toBeDefined();
    expect(tNode!.segmentIds.length).toBe(3);

    // 3. East-West road C crossing road B at (150, 70) -> 4-way crossing split on both B and C
    const rC = engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 60, z: 70 },
      p1: { x: 240, z: 70 },
      roadType: 'avenue_4lane',
    });
    expect(rC.ok).toBe(true);
    expect(engine.roads.segments.size).toBe(6);

    const crossNode = Array.from(engine.roads.nodes.values()).find(
      (n) => Math.hypot(n.x - 150, n.z - 70) < 3
    );
    expect(crossNode).toBeDefined();
    expect(crossNode!.segmentIds.length).toBe(4);
    expect(crossNode!.control).toBe('signals');

    // Verify lane connections were generated across the 4-way crossing
    let crossingConnCount = 0;
    for (const conns of engine.roads.outgoingConnections.values()) {
      for (const conn of conns) {
        if (conn.nodeId === crossNode!.id) crossingConnCount++;
      }
    }
    expect(crossingConnCount).toBeGreaterThanOrEqual(8);
  });
});

describe('Zone cell generation on curved roads and clipping', () => {
  it('generates 8m cells up to depth 4 along a cubic Bezier curve and clips against roads and water', () => {
    const engine = new SimEngine(202604, { createInitialHighway: false });

    // Curved boulevard in flat coastal plain
    const resCurve = engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 50, z: 180 },
      c0: { x: 140, z: 245 },
      c1: { x: 270, z: 245 },
      p1: { x: 360, z: 175 },
      roadType: 'tree_2lane',
    });
    expect(resCurve.ok).toBe(true);

    const cells = Array.from(engine.zones.cells.values());
    expect(cells.length).toBeGreaterThan(80);

    // Depth ranges 0..3 (4 cells deep)
    const depths = new Set(cells.map((c) => c.depth));
    expect(depths.has(0)).toBe(true);
    expect(depths.has(ZONE_MAX_DEPTH - 1)).toBe(true);
    for (const d of depths) {
      expect(d).toBeGreaterThanOrEqual(0);
      expect(d).toBeLessThan(ZONE_MAX_DEPTH);
    }

    // Verify 8m spacing between adjacent depth rows on the same (segment, side, col)
    const segId = Array.from(engine.roads.segments.keys())[0];
    let checkedDepthPairs = 0;
    for (const c of cells) {
      if (c.segmentId !== segId || c.depth !== 0) continue;
      const c1 = engine.zones.getSlotCell(c.segmentId, c.side, c.col, 1);
      if (c1) {
        const dist = Math.hypot(c1.x - c.x, c1.z - c.z);
        expect(dist).toBeCloseTo(ZONE_CELL_SIZE, 1);
        checkedDepthPairs++;
      }
    }
    expect(checkedDepthPairs).toBeGreaterThan(10);

    // Verify curved yaw varies across the curved road
    const yaws = cells.map((c) => c.yaw);
    const yawSpan = Math.max(...yaws) - Math.min(...yaws);
    expect(yawSpan).toBeGreaterThan(0.4);

    // Add a riverside curved road close to the eastern riverbank so the west side enters water
    const zMid = -40;
    const cx = riverCenterX(zMid);
    let bankX = cx + 65;
    for (let dx = 35; dx <= 120; dx += 4) {
      if (engine.terrain.isBuildable(cx + dx, zMid, 0.24)) {
        bankX = cx + dx + 8;
        break;
      }
    }
    const resRiver = engine.applyCommand({
      type: 'buildRoad',
      p0: { x: bankX + 10, z: -130 },
      c0: { x: bankX - 4, z: -70 },
      c1: { x: bankX - 4, z: -10 },
      p1: { x: bankX + 15, z: 50 },
      roadType: 'small_2lane',
    });
    expect(resRiver.ok).toBe(true);

    // Add a cross street through the curved boulevard to test road overlap clipping
    const resCross = engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 205, z: 120 },
      p1: { x: 205, z: 290 },
      roadType: 'small_2lane',
    });
    expect(resCross.ok).toBe(true);

    // Every single cell must be on dry buildable land and clear of all road surfaces
    for (const cell of engine.zones.cells.values()) {
      expect(cell.y).toBeGreaterThan(WATER_LEVEL + 0.5);
      expect(engine.terrain.isWater(cell.x, cell.z, 0.2)).toBe(false);

      for (const seg of engine.roads.segments.values()) {
        const halfW = ROAD_SPECS[seg.type].width * 0.5;
        const cp = closestPointOnBezier(seg.lut, { x: cell.x, z: cell.z });
        expect(cp.dist).toBeGreaterThanOrEqual(halfW + ZONE_CELL_SIZE * 0.4);
      }
    }
  });
});
