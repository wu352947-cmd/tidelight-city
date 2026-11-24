import { describe, expect, it } from 'vitest';
import { buildDemoTown } from '../demo.ts';
import { SimEngine } from '../engine.ts';
import { findLaneRoute } from '../traffic.ts';

describe('Demand, City Growth, Pathfinding, and Traffic Simulation', () => {
  it('demand responds monotonically to tax rate changes via SimCommand', () => {
    const engine = new SimEngine(202604);
    engine.refreshDerivedState();
    const baseR = engine.demand.r;
    const baseC = engine.demand.c;
    const baseI = engine.demand.i;

    // Lowering taxes stimulates demand
    engine.applyCommand({ type: 'setTaxRate', zone: 'res_low', rate: 5 });
    engine.applyCommand({ type: 'setTaxRate', zone: 'res_high', rate: 5 });
    engine.applyCommand({ type: 'setTaxRate', zone: 'com_low', rate: 5 });
    engine.applyCommand({ type: 'setTaxRate', zone: 'com_high', rate: 5 });
    engine.applyCommand({ type: 'setTaxRate', zone: 'ind', rate: 5 });
    expect(engine.demand.r).toBeGreaterThan(baseR);
    expect(engine.demand.c).toBeGreaterThan(baseC);
    expect(engine.demand.i).toBeGreaterThan(baseI);

    // Raising taxes sharply suppresses demand into negative territory
    engine.applyCommand({ type: 'setTaxRate', zone: 'res_low', rate: 22 });
    engine.applyCommand({ type: 'setTaxRate', zone: 'res_high', rate: 22 });
    engine.applyCommand({ type: 'setTaxRate', zone: 'com_low', rate: 22 });
    engine.applyCommand({ type: 'setTaxRate', zone: 'com_high', rate: 22 });
    engine.applyCommand({ type: 'setTaxRate', zone: 'ind', rate: 22 });
    expect(engine.demand.r).toBeLessThan(0);
    expect(engine.demand.c).toBeLessThan(0);
    expect(engine.demand.i).toBeLessThan(0);
  });

  it('demo town grows deterministically to >= 500 population with power and water', () => {
    const engine = new SimEngine(202604);
    buildDemoTown(engine);

    const stats = engine.getStats();
    expect(stats.population).toBeGreaterThanOrEqual(500);
    expect(stats.buildingCount).toBeGreaterThan(25);
    expect(stats.powerProducedMW).toBeGreaterThan(stats.powerConsumedMW);
    expect(stats.waterProducedM3).toBeGreaterThan(stats.waterConsumedM3);
    expect(stats.sewageCapacityM3).toBeGreaterThan(0);
    expect(engine.simDay).toBeGreaterThanOrEqual(10);

    // Verify determinism with identical seed
    const engine2 = new SimEngine(202604);
    buildDemoTown(engine2);
    const stats2 = engine2.getStats();
    expect(stats2.population).toBe(stats.population);
    expect(stats2.money).toBe(stats.money);
    expect(stats2.buildingCount).toBe(stats.buildingCount);
    expect(stats2.vehicleCount).toBe(stats.vehicleCount);
  });

  it('pathfinding finds a valid multi-lane route across intersections', () => {
    const engine = new SimEngine(777, { createInitialHighway: false });

    // Build an L-and-grid street loop using SimCommand
    engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 40, z: 0 },
      p1: { x: 260, z: 0 },
      roadType: 'avenue_4lane',
    });
    engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 260, z: 0 },
      p1: { x: 260, z: 180 },
      roadType: 'small_2lane',
    });
    engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 40, z: 180 },
      p1: { x: 260, z: 180 },
      roadType: 'small_2lane',
    });
    engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 150, z: 0 },
      p1: { x: 150, z: 180 },
      roadType: 'small_2lane',
    });

    // Pick a lane near (40, 0) heading east and a lane near (40, 180)
    const lanes = Array.from(engine.roads.lanes.values());
    const startLane = lanes.find(
      (l) => Math.hypot(l.bezier.p0.x - 40, l.bezier.p0.z - 0) < 15 && l.bezier.p1.x > l.bezier.p0.x
    );
    const goalLane = lanes.find(
      (l) => Math.hypot(l.bezier.p1.x - 40, l.bezier.p1.z - 180) < 15 && l.bezier.p1.x < l.bezier.p0.x
    );
    expect(startLane).toBeDefined();
    expect(goalLane).toBeDefined();

    const route = findLaneRoute(engine.roads, startLane!.id, goalLane!.id);
    expect(route).not.toBeNull();
    expect(route!.length).toBeGreaterThanOrEqual(3);
    expect(route![0]).toBe(startLane!.id);
    expect(route![route!.length - 1]).toBe(goalLane!.id);

    // Every step in the route must correspond to a legal LaneConnection
    for (let i = 0; i < route!.length - 1; i++) {
      const conns = engine.roads.outgoingConnections.get(route![i]) ?? [];
      expect(conns.some((c) => c.toLaneId === route![i + 1])).toBe(true);
    }
  });

  it('vehicles move along lanes, complete trips, and avoid permanent gridlock', () => {
    const engine = new SimEngine(202604);
    buildDemoTown(engine);

    expect(engine.traffic.vehicles.length).toBeGreaterThan(10);

    const beforePos = new Map<number, { x: number; z: number; dist: number }>();
    for (const v of engine.traffic.vehicles) {
      beforePos.set(v.id, { x: v.x, z: v.z, dist: v.totalDistanceMoved });
    }
    const completedBefore = engine.traffic.completedTrips;

    // Advance 120 ticks (12 seconds of vehicle simulation)
    engine.step(120);

    let movedCount = 0;
    let totalDisplacement = 0;
    let maxStuckTicks = 0;
    for (const v of engine.traffic.vehicles) {
      if (v.stuckTicks > maxStuckTicks) maxStuckTicks = v.stuckTicks;
      const prev = beforePos.get(v.id);
      if (prev) {
        const disp = Math.hypot(v.x - prev.x, v.z - prev.z);
        const deltaDist = v.totalDistanceMoved - prev.dist;
        if (disp > 1.0 || deltaDist > 2.0) {
          movedCount++;
          totalDisplacement += Math.max(disp, deltaDist);
        }
      }
    }

    const completedDelta = engine.traffic.completedTrips - completedBefore;
    expect(movedCount + completedDelta).toBeGreaterThan(8);
    expect(totalDisplacement).toBeGreaterThan(40);
    expect(completedDelta).toBeGreaterThan(0);
    // No permanent gridlock: active vehicles stay under despawn threshold and traffic continues flowing
    expect(maxStuckTicks).toBeLessThanOrEqual(220);
    expect(engine.traffic.vehicles.length).toBeGreaterThan(10);
  });
});
