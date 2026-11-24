import { WATER_LEVEL } from './types.ts';
import type { SimEngine } from './engine.ts';
import { riverCenterX } from './terrain.ts';

/**
 * Helper: finds a valid east-bank shoreline position along the river at given z
 * (read-only terrain lookup, mimicking a player scanning the riverbank with cursor).
 */
function findEastRiverBankSpot(engine: SimEngine, z: number): { x: number; z: number } {
  const cx = riverCenterX(z);
  for (let dx = 25; dx <= 120; dx += 4) {
    const x = cx + dx;
    const h = engine.terrain.sampleHeight(x, z);
    if (h >= WATER_LEVEL + 0.4 && h <= 6.5 && engine.terrain.isNearWater(x, z, 65)) {
      return { x, z };
    }
  }
  return { x: cx + 52, z };
}

/**
 * Builds a complete, living coastal sample town in Tidelight (汐光市)
 * using ONLY the real SimCommand API + deterministic fast-forward ticks.
 * Includes: outside-connection highway, 4-lane avenues, curved waterfront boulevard,
 * T-junctions & 4-way crossings, mixed R/C/I/O zones, growable buildings,
 * power/water/sewage utilities + pipes, civic services, and moving traffic.
 */
export function buildDemoTown(engine: SimEngine): void {
  const cmd = engine.applyCommand.bind(engine);

  // 1. Primary 4-lane avenue extending south from the northern highway entrance (240, -240)
  cmd({
    type: 'buildRoad',
    p0: { x: 240, z: -240 },
    p1: { x: 240, z: 270 },
    roadType: 'avenue_4lane',
  });

  // 2. Central East-West 4-lane avenue forming a major 4-way signalized crossing at (240, 20)
  cmd({
    type: 'buildRoad',
    p0: { x: 25, z: 20 },
    p1: { x: 430, z: 20 },
    roadType: 'avenue_4lane',
  });

  // 3. Scenic curved waterfront boulevard hugging the southern coastal bay (cubic Bezier!)
  cmd({
    type: 'buildRoad',
    p0: { x: 25, z: 245 },
    c0: { x: 135, z: 325 },
    c1: { x: 315, z: 325 },
    p1: { x: 430, z: 240 },
    roadType: 'tree_2lane',
  });

  // 4. Western coastal residential neighborhood streets (tree roads + small roads + curved lane)
  cmd({
    type: 'buildRoad',
    p0: { x: 130, z: -110 },
    p1: { x: 130, z: 290 },
    roadType: 'tree_2lane',
  });
  cmd({
    type: 'buildRoad',
    p0: { x: 25, z: -110 },
    p1: { x: 25, z: 245 },
    roadType: 'tree_2lane',
  });
  cmd({
    type: 'buildRoad',
    p0: { x: 25, z: -110 },
    p1: { x: 240, z: -110 },
    roadType: 'small_2lane',
  });
  cmd({
    type: 'buildRoad',
    p0: { x: 25, z: 135 },
    p1: { x: 240, z: 135 },
    roadType: 'small_2lane',
  });
  // Curved residential crescent creating T-junctions on the riverside quarter
  cmd({
    type: 'buildRoad',
    p0: { x: 25, z: -45 },
    c0: { x: 65, z: -25 },
    c1: { x: 95, z: -65 },
    p1: { x: 130, z: -45 },
    roadType: 'small_2lane',
  });

  // 5. Eastern commercial & mixed-use downtown blocks
  cmd({
    type: 'buildRoad',
    p0: { x: 340, z: -110 },
    p1: { x: 340, z: 278 },
    roadType: 'small_2lane',
  });
  cmd({
    type: 'buildRoad',
    p0: { x: 430, z: -110 },
    p1: { x: 430, z: 240 },
    roadType: 'small_2lane',
  });
  cmd({
    type: 'buildRoad',
    p0: { x: 240, z: 140 },
    p1: { x: 430, z: 140 },
    roadType: 'small_2lane',
  });
  cmd({
    type: 'buildRoad',
    p0: { x: 240, z: -110 },
    p1: { x: 430, z: -110 },
    roadType: 'small_2lane',
  });

  // 6. Northeast industrial park (T-junction off highway corridor + one-way loop)
  cmd({
    type: 'buildRoad',
    p0: { x: 240, z: -200 },
    p1: { x: 455, z: -200 },
    roadType: 'small_2lane',
  });
  cmd({
    type: 'buildRoad',
    p0: { x: 350, z: -200 },
    p1: { x: 350, z: -110 },
    roadType: 'oneway_2lane',
  });
  cmd({
    type: 'buildRoad',
    p0: { x: 455, z: -200 },
    p1: { x: 455, z: -110 },
    roadType: 'small_2lane',
  });

  // 7. Utilities: Power (coal plant near industry + starter wind turbine)
  cmd({ type: 'placeBuilding', kind: 'coal_plant', x: 485, z: -235, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'wind_turbine', x: -35, z: -165, yaw: 0 });

  // Upstream water pumps & far-downstream sewage outlet along the meandering river
  const pumpSpot = findEastRiverBankSpot(engine, -165);
  const pumpSpot2 = findEastRiverBankSpot(engine, -225);
  const sewageSpot = findEastRiverBankSpot(engine, 300);
  cmd({ type: 'placeBuilding', kind: 'water_pump', x: pumpSpot.x, z: pumpSpot.z, yaw: Math.PI * 0.5 });
  cmd({ type: 'placeBuilding', kind: 'water_pump', x: pumpSpot2.x, z: pumpSpot2.z, yaw: Math.PI * 0.5 });
  cmd({ type: 'placeBuilding', kind: 'sewage_outlet', x: sewageSpot.x, z: sewageSpot.z, yaw: Math.PI * 0.5 });

  // Power lines linking power plants and river utilities to town grid
  cmd({ type: 'buildUtilityLine', kind: 'power_line', x0: pumpSpot2.x, z0: pumpSpot2.z, x1: pumpSpot.x, z1: pumpSpot.z });
  cmd({ type: 'buildUtilityLine', kind: 'power_line', x0: pumpSpot.x, z0: pumpSpot.z, x1: 35, z1: -100 });
  cmd({ type: 'buildUtilityLine', kind: 'power_line', x0: -35, z0: -155, x1: 30, z1: -95 });
  cmd({ type: 'buildUtilityLine', kind: 'power_line', x0: 480, z0: -230, x1: 420, z1: -185 });
  cmd({ type: 'buildUtilityLine', kind: 'power_line', x0: 35, z0: 245, x1: sewageSpot.x, z1: sewageSpot.z });
  // Ensure continuous backbone power conductivity across avenue and blocks
  cmd({ type: 'buildUtilityLine', kind: 'power_line', x0: 30, z0: 20, x1: 425, z1: 20 });
  cmd({ type: 'buildUtilityLine', kind: 'power_line', x0: 240, z0: -195, x1: 240, z1: 265 });

  // Underground water & sewage pipe network covering every city block
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: pumpSpot2.x, z0: pumpSpot2.z, x1: pumpSpot.x, z1: pumpSpot.z });
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: pumpSpot.x, z0: pumpSpot.z, x1: 80, z1: -150 });
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: 80, z0: -150, x1: 80, z1: 280 });
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: 80, z0: 280, x1: sewageSpot.x, z1: sewageSpot.z });
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: 80, z0: -150, x1: 440, z1: -150 });
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: 210, z0: -200, x1: 210, z1: 295 });
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: 370, z0: -200, x1: 370, z1: 265 });
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: 80, z0: 20, x1: 430, z1: 20 });
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: 80, z0: 190, x1: 430, z1: 190 });

  // 8. Starter neighborhood parks along the waterfront & residential valley
  cmd({ type: 'placeBuilding', kind: 'park_small', x: 185, z: 242, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'park_small', x: 80, z: 80, yaw: 0 });

  // 9. Zone R / C / I districts
  // Residential west & bayfront neighborhoods
  cmd({
    type: 'zoneArea',
    zone: 'res_low',
    area: { shape: 'rect', x0: -20, z0: -145, x1: 215, z1: 345 },
  });
  // East-south waterfront residential villas
  cmd({
    type: 'zoneArea',
    zone: 'res_low',
    area: { shape: 'rect', x0: 365, z0: 55, x1: 470, z1: 290 },
  });
  // Commercial downtown corridor along Main Avenue & east-central streets
  cmd({
    type: 'zoneArea',
    zone: 'com_low',
    area: { shape: 'rect', x0: 216, z0: -95, x1: 364, z1: 335 },
  });
  cmd({
    type: 'zoneArea',
    zone: 'com_low',
    area: { shape: 'rect', x0: 365, z0: -95, x1: 470, z1: 54 },
  });
  // Northeast industrial park
  cmd({
    type: 'zoneArea',
    zone: 'ind',
    area: { shape: 'rect', x0: 245, z0: -240, x1: 495, z1: -112 },
  });

  // 10. Phase 1 fast-forward (~5 simulated days = 1200 ticks): town sprouts & crosses early milestones
  cmd({ type: 'stepTicks', count: 1200 });

  // 11. Phase 2 civic services, utility expansion & urban upgrades (placed cleanly in town center)
  const sewageSpot2 = findEastRiverBankSpot(engine, 355);
  cmd({ type: 'placeBuilding', kind: 'sewage_outlet', x: sewageSpot2.x, z: sewageSpot2.z, yaw: Math.PI * 0.5 });
  cmd({ type: 'buildUtilityLine', kind: 'power_line', x0: sewageSpot.x, z0: sewageSpot.z, x1: sewageSpot2.x, z1: sewageSpot2.z });
  cmd({ type: 'buildUtilityLine', kind: 'water_pipe', x0: sewageSpot.x, z0: sewageSpot.z, x1: sewageSpot2.x, z1: sewageSpot2.z });
  cmd({ type: 'placeBuilding', kind: 'coal_plant', x: 525, z: -235, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'wind_turbine', x: -42, z: -105, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'wind_turbine', x: 495, z: -145, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'water_tower', x: 465, z: -65, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'clinic', x: 186, z: -24, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'elementary_school', x: 82, z: -20, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'police_station', x: 294, z: -24, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'fire_station', x: 294, z: 82, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'park_plaza', x: 292, z: 242, yaw: 0 });
  cmd({ type: 'placeBuilding', kind: 'landfill', x: 505, z: -185, yaw: 0 });

  // Introduce a modest central apartment & office core for skyline variety
  cmd({
    type: 'zoneArea',
    zone: 'res_high',
    area: { shape: 'rect', x0: 150, z0: 45, x1: 222, z1: 125 },
  });
  cmd({
    type: 'zoneArea',
    zone: 'office',
    area: { shape: 'rect', x0: 258, z0: -105, x1: 335, z1: -45 },
  });

  // 12. Phase 3 fast-forward (~6.5 simulated days = 1560 ticks) for mature buildings, leveling & flowing traffic
  cmd({ type: 'stepTicks', count: 1560 });
}
