import { describe, expect, it } from 'vitest';
import { buildDemoTown } from '../demo.ts';
import { SimEngine } from '../engine.ts';

describe('Save/Load Serialization Roundtrip & Interactive Build Commands', () => {
  it('serialize -> deserialize preserves population, road count, buildings, money, time, and taxes on demo town', () => {
    const engine = new SimEngine(202604);
    buildDemoTown(engine);

    // Adjust custom taxes and budgets before saving to confirm they survive roundtrip
    engine.applyCommand({ type: 'setTaxRate', zone: 'res_low', rate: 7 });
    engine.applyCommand({ type: 'setTaxRate', zone: 'com_low', rate: 11 });
    engine.applyCommand({ type: 'setBudget', category: 'parks', percent: 120 });

    const beforeStats = engine.getStats();
    const beforeRoads = engine.roads.segments.size;
    const beforeNodes = engine.roads.nodes.size;
    const beforeBuildings = engine.buildings.buildings.length;
    const beforeZonesPainted = Array.from(engine.zones.cells.values()).filter((c) => c.zone !== 'none').length;
    const beforeDay = engine.simDay;
    const beforeTime = engine.timeOfDay;

    expect(beforeStats.population).toBeGreaterThanOrEqual(500);
    expect(beforeRoads).toBeGreaterThan(10);

    const json = engine.serialize();
    const restored = SimEngine.deserialize(json);
    const afterStats = restored.getStats();

    expect(afterStats.population).toBe(beforeStats.population);
    expect(restored.roads.segments.size).toBe(beforeRoads);
    expect(restored.roads.nodes.size).toBe(beforeNodes);
    expect(restored.buildings.buildings.length).toBe(beforeBuildings);
    expect(afterStats.money).toBe(beforeStats.money);
    expect(restored.simDay).toBe(beforeDay);
    expect(restored.timeOfDay).toBeCloseTo(beforeTime, 5);
    expect(afterStats.taxRates.res_low).toBe(7);
    expect(afterStats.taxRates.com_low).toBe(11);
    expect(afterStats.budgets.parks).toBe(120);

    const afterZonesPainted = Array.from(restored.zones.cells.values()).filter((c) => c.zone !== 'none').length;
    expect(afterZonesPainted).toBe(beforeZonesPainted);

    // Restored city continues simulating cleanly
    restored.step(60);
    expect(restored.getStats().population).toBeGreaterThan(0);
    expect(restored.traffic.vehicles.length).toBeGreaterThan(0);
  });

  it('empty new city starts with highway stub and grows via buildRoad + zoneArea + placeBuilding + buildUtilityLine', () => {
    const engine = new SimEngine(202604);

    // Empty new city invariants
    expect(engine.roads.segments.size).toBe(1);
    expect(engine.roads.getOutsideConnectionNodes().length).toBeGreaterThanOrEqual(1);
    expect(engine.buildings.buildings.length).toBe(0);
    expect(engine.getStats().money).toBe(120000);

    // Player draws a road straight off the highway endpoint (240, -240)
    const road1 = engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 240, z: -240 },
      p1: { x: 240, z: -60 },
      roadType: 'small_2lane',
    });
    expect(road1.ok).toBe(true);

    // Curved branch street forming a T-junction
    const road2 = engine.applyCommand({
      type: 'buildRoad',
      p0: { x: 240, z: -150 },
      c0: { x: 185, z: -150 },
      c1: { x: 145, z: -110 },
      p1: { x: 145, z: -60 },
      roadType: 'small_2lane',
    });
    expect(road2.ok).toBe(true);
    expect(engine.roads.segments.size).toBeGreaterThanOrEqual(4);

    // Place starter power + water + park
    const wind = engine.applyCommand({ type: 'placeBuilding', kind: 'wind_turbine', x: 110, z: -175, yaw: 0 });
    expect(wind.ok).toBe(true);
    const tower = engine.applyCommand({ type: 'placeBuilding', kind: 'water_tower', x: 295, z: -175, yaw: 0 });
    expect(tower.ok).toBe(true);
    const park = engine.applyCommand({ type: 'placeBuilding', kind: 'park_small', x: 195, z: -85, yaw: Math.PI / 4 });
    expect(park.ok).toBe(true);

    // Connect power line & water pipe
    const pLine = engine.applyCommand({
      type: 'buildUtilityLine',
      kind: 'power_line',
      x0: 110,
      z0: -175,
      x1: 295,
      z1: -175,
    });
    expect(pLine.ok).toBe(true);
    const wPipe = engine.applyCommand({
      type: 'buildUtilityLine',
      kind: 'water_pipe',
      x0: 295,
      z0: -175,
      x1: 145,
      z1: -80,
    });
    expect(wPipe.ok).toBe(true);

    // Paint residential, commercial, and industrial zones via brush circles
    const zRes = engine.applyCommand({
      type: 'zoneArea',
      zone: 'res_low',
      area: { shape: 'circle', x: 175, z: -100, radius: 75 },
    });
    expect(zRes.ok).toBe(true);
    expect((zRes.data as { changed: number }).changed).toBeGreaterThan(0);

    const zCom = engine.applyCommand({
      type: 'zoneArea',
      zone: 'com_low',
      area: { shape: 'circle', x: 245, z: -100, radius: 55 },
    });
    expect(zCom.ok).toBe(true);

    // Step simulation and verify buildings spawn, population grows, and building inspection & finance breakdown work
    engine.applyCommand({ type: 'stepTicks', count: 360 });
    const stats = engine.getStats();
    expect(stats.population).toBeGreaterThan(0);
    expect(stats.buildingCount).toBeGreaterThan(3);
    expect(stats.finance.weeklyIncome).toBeGreaterThan(0);
    expect(stats.finance.weeklyExpenses).toBeGreaterThan(0);

    const firstGrowable = engine.buildings.buildings.find((b) => b.kind === 'growable');
    expect(firstGrowable).toBeDefined();
    const detail = engine.getBuildingDetail(firstGrowable!.id);
    expect(detail).not.toBeNull();
    expect(detail!.level).toBeGreaterThanOrEqual(1);

    // Bulldoze a utility line and verify refund
    const lineId = (pLine.data as { lineId: number }).lineId;
    const beforeMoney = engine.economy.treasury;
    const delLine = engine.applyCommand({ type: 'bulldozeUtilityLine', lineId });
    expect(delLine.ok).toBe(true);
    expect(engine.economy.treasury).toBeGreaterThan(beforeMoney);
  });
});
