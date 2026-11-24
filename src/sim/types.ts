export const WORLD_SIZE = 1920;
export const WORLD_HALF = WORLD_SIZE / 2; // 960m, coords in [-960, +960]
export const TERRAIN_RES = 193; // 10m vertex spacing
export const TERRAIN_STEP = WORLD_SIZE / (TERRAIN_RES - 1);
export const FIELD_RES = 128; // 15m per scalar grid cell
export const FIELD_CELL_SIZE = WORLD_SIZE / FIELD_RES;
export const WATER_LEVEL = 0.0;

export const ZONE_CELL_SIZE = 8; // 8m x 8m standard zone cell
export const ZONE_MAX_DEPTH = 4; // 4 cells deep on each road side

export const TICK_DT = 0.1; // seconds of vehicle motion per logical tick
export const TICKS_PER_DAY = 240; // 24s per sim day at 1x speed (10 ticks/sec)

export interface Vec2 {
  x: number;
  z: number;
}

export interface CubicBezier {
  p0: Vec2;
  c0: Vec2;
  c1: Vec2;
  p1: Vec2;
}

export type RoadType =
  | 'small_2lane'
  | 'tree_2lane'
  | 'oneway_2lane'
  | 'avenue_4lane'
  | 'highway';

export const ROAD_TYPE_LIST: RoadType[] = [
  'small_2lane',
  'tree_2lane',
  'oneway_2lane',
  'avenue_4lane',
  'highway',
];

export const ROAD_TYPE_TO_INT: Record<RoadType, number> = {
  small_2lane: 0,
  tree_2lane: 1,
  oneway_2lane: 2,
  avenue_4lane: 3,
  highway: 4,
};

export interface RoadSpec {
  type: RoadType;
  labelZh: string;
  labelEn: string;
  width: number;
  sidewalkWidth: number;
  medianWidth: number;
  forwardLanes: number;
  backwardLanes: number;
  speedLimit: number; // m/s
  costPerMeter: number;
  upkeepPerMeterPerDay: number;
  noiseBase: number;
  landValueBonus: number;
  zoneable: boolean;
  hasTrees: boolean;
  milestoneTier: number;
}

export const ROAD_SPECS: Record<RoadType, RoadSpec> = {
  small_2lane: {
    type: 'small_2lane',
    labelZh: '双车道小路',
    labelEn: 'Small Road',
    width: 10,
    sidewalkWidth: 1.6,
    medianWidth: 0,
    forwardLanes: 1,
    backwardLanes: 1,
    speedLimit: 11.5, // ~41 km/h
    costPerMeter: 12,
    upkeepPerMeterPerDay: 0.12,
    noiseBase: 14,
    landValueBonus: 0,
    zoneable: true,
    hasTrees: false,
    milestoneTier: 0,
  },
  tree_2lane: {
    type: 'tree_2lane',
    labelZh: '林荫小道',
    labelEn: 'Tree Road',
    width: 14,
    sidewalkWidth: 3.4,
    medianWidth: 0,
    forwardLanes: 1,
    backwardLanes: 1,
    speedLimit: 11.5,
    costPerMeter: 18,
    upkeepPerMeterPerDay: 0.16,
    noiseBase: 7,
    landValueBonus: 8,
    zoneable: true,
    hasTrees: true,
    milestoneTier: 1,
  },
  oneway_2lane: {
    type: 'oneway_2lane',
    labelZh: '单向双车道',
    labelEn: 'One-Way Road',
    width: 10,
    sidewalkWidth: 1.6,
    medianWidth: 0,
    forwardLanes: 2,
    backwardLanes: 0,
    speedLimit: 14.0, // ~50 km/h
    costPerMeter: 14,
    upkeepPerMeterPerDay: 0.14,
    noiseBase: 16,
    landValueBonus: 0,
    zoneable: true,
    hasTrees: false,
    milestoneTier: 1,
  },
  avenue_4lane: {
    type: 'avenue_4lane',
    labelZh: '四车道大道',
    labelEn: '4-Lane Avenue',
    width: 20,
    sidewalkWidth: 2.0,
    medianWidth: 2.4,
    forwardLanes: 2,
    backwardLanes: 2,
    speedLimit: 17.5, // ~63 km/h
    costPerMeter: 26,
    upkeepPerMeterPerDay: 0.28,
    noiseBase: 28,
    landValueBonus: 4,
    zoneable: true,
    hasTrees: true,
    milestoneTier: 2,
  },
  highway: {
    type: 'highway',
    labelZh: '城市高速',
    labelEn: 'Highway',
    width: 16,
    sidewalkWidth: 0.8,
    medianWidth: 1.6,
    forwardLanes: 2,
    backwardLanes: 2,
    speedLimit: 28.0, // ~100 km/h
    costPerMeter: 45,
    upkeepPerMeterPerDay: 0.42,
    noiseBase: 48,
    landValueBonus: -10,
    zoneable: false,
    hasTrees: false,
    milestoneTier: 4,
  },
};

export type ZoneType =
  | 'none'
  | 'res_low'
  | 'res_high'
  | 'com_low'
  | 'com_high'
  | 'ind'
  | 'office';

export type ActiveZoneType = Exclude<ZoneType, 'none'>;

export const ZONE_TYPES: ActiveZoneType[] = [
  'res_low',
  'res_high',
  'com_low',
  'com_high',
  'ind',
  'office',
];

export const ZONE_TO_INT: Record<ZoneType, number> = {
  none: 0,
  res_low: 1,
  res_high: 2,
  com_low: 3,
  com_high: 4,
  ind: 5,
  office: 6,
};

export const INT_TO_ZONE: ZoneType[] = [
  'none',
  'res_low',
  'res_high',
  'com_low',
  'com_high',
  'ind',
  'office',
];

export interface ZoneSpec {
  zone: ActiveZoneType;
  labelZh: string;
  labelEn: string;
  maxLevel: number;
  baseHouseholdsPerCell: number;
  baseJobsPerCell: number;
  powerPerCell: number; // MW
  waterPerCell: number; // m3
  pollutionPerCell: number;
  noisePerCell: number;
  taxBasePerUnit: number;
  milestoneTier: number;
}

export const ZONE_SPECS: Record<ActiveZoneType, ZoneSpec> = {
  res_low: {
    zone: 'res_low',
    labelZh: '低密居住',
    labelEn: 'Low Res',
    maxLevel: 5,
    baseHouseholdsPerCell: 0.65,
    baseJobsPerCell: 0,
    powerPerCell: 0.04,
    waterPerCell: 0.55,
    pollutionPerCell: 0,
    noisePerCell: 1,
    taxBasePerUnit: 2.2,
    milestoneTier: 0,
  },
  res_high: {
    zone: 'res_high',
    labelZh: '高密居住',
    labelEn: 'High Res',
    maxLevel: 5,
    baseHouseholdsPerCell: 2.6,
    baseJobsPerCell: 0,
    powerPerCell: 0.12,
    waterPerCell: 1.7,
    pollutionPerCell: 0,
    noisePerCell: 6,
    taxBasePerUnit: 2.0,
    milestoneTier: 4,
  },
  com_low: {
    zone: 'com_low',
    labelZh: '低密商业',
    labelEn: 'Low Com',
    maxLevel: 3,
    baseHouseholdsPerCell: 0,
    baseJobsPerCell: 1.2,
    powerPerCell: 0.07,
    waterPerCell: 0.7,
    pollutionPerCell: 1,
    noisePerCell: 9,
    taxBasePerUnit: 3.1,
    milestoneTier: 0,
  },
  com_high: {
    zone: 'com_high',
    labelZh: '高密商业',
    labelEn: 'High Com',
    maxLevel: 3,
    baseHouseholdsPerCell: 0,
    baseJobsPerCell: 3.2,
    powerPerCell: 0.18,
    waterPerCell: 1.9,
    pollutionPerCell: 2,
    noisePerCell: 22,
    taxBasePerUnit: 3.5,
    milestoneTier: 4,
  },
  ind: {
    zone: 'ind',
    labelZh: '通用工业',
    labelEn: 'Industry',
    maxLevel: 3,
    baseHouseholdsPerCell: 0,
    baseJobsPerCell: 2.0,
    powerPerCell: 0.16,
    waterPerCell: 1.5,
    pollutionPerCell: 16,
    noisePerCell: 18,
    taxBasePerUnit: 3.3,
    milestoneTier: 0,
  },
  office: {
    zone: 'office',
    labelZh: '现代办公',
    labelEn: 'Office',
    maxLevel: 3,
    baseHouseholdsPerCell: 0,
    baseJobsPerCell: 2.4,
    powerPerCell: 0.13,
    waterPerCell: 1.1,
    pollutionPerCell: 0,
    noisePerCell: 4,
    taxBasePerUnit: 3.8,
    milestoneTier: 3,
  },
};

export type PloppableKind =
  | 'coal_plant'
  | 'wind_turbine'
  | 'solar_plant'
  | 'water_pump'
  | 'water_tower'
  | 'sewage_outlet'
  | 'police_station'
  | 'fire_station'
  | 'clinic'
  | 'hospital'
  | 'elementary_school'
  | 'high_school'
  | 'park_small'
  | 'park_plaza'
  | 'landfill';

export const PLOPPABLE_TO_INT: Record<PloppableKind, number> = {
  coal_plant: 10,
  wind_turbine: 11,
  solar_plant: 12,
  water_pump: 13,
  water_tower: 14,
  sewage_outlet: 15,
  police_station: 16,
  fire_station: 17,
  clinic: 18,
  hospital: 19,
  elementary_school: 20,
  high_school: 21,
  park_small: 22,
  park_plaza: 23,
  landfill: 24,
};

export type BudgetCategory =
  | 'power'
  | 'water'
  | 'roads'
  | 'police'
  | 'fire'
  | 'health'
  | 'education'
  | 'parks'
  | 'garbage';

export interface PloppableSpec {
  kind: PloppableKind;
  labelZh: string;
  labelEn: string;
  category: BudgetCategory;
  cost: number;
  upkeepPerDay: number;
  width: number;
  depth: number;
  height: number;
  powerMW: number; // positive generates, negative consumes
  waterM3: number; // positive supplies, negative consumes
  sewageM3: number; // positive processes, negative consumes
  jobs: number;
  coverageRadius: number;
  serviceStrength: number;
  pollution: number;
  noise: number;
  landValueBoost: number;
  needsWaterEdge: boolean;
  milestoneTier: number;
}

export const PLOPPABLE_SPECS: Record<PloppableKind, PloppableSpec> = {
  coal_plant: {
    kind: 'coal_plant',
    labelZh: '燃煤电厂',
    labelEn: 'Coal Power',
    category: 'power',
    cost: 6000,
    upkeepPerDay: 95,
    width: 32,
    depth: 28,
    height: 18,
    powerMW: 45,
    waterM3: -10,
    sewageM3: -4,
    jobs: 24,
    coverageRadius: 110,
    serviceStrength: 1,
    pollution: 70,
    noise: 45,
    landValueBoost: -20,
    needsWaterEdge: false,
    milestoneTier: 0,
  },
  wind_turbine: {
    kind: 'wind_turbine',
    labelZh: '风力发电机',
    labelEn: 'Wind Turbine',
    category: 'power',
    cost: 2400,
    upkeepPerDay: 24,
    width: 12,
    depth: 12,
    height: 36,
    powerMW: 12,
    waterM3: 0,
    sewageM3: 0,
    jobs: 2,
    coverageRadius: 95,
    serviceStrength: 1,
    pollution: 0,
    noise: 28,
    landValueBoost: -4,
    needsWaterEdge: false,
    milestoneTier: 0,
  },
  solar_plant: {
    kind: 'solar_plant',
    labelZh: '太阳能电站',
    labelEn: 'Solar Plant',
    category: 'power',
    cost: 9000,
    upkeepPerDay: 65,
    width: 32,
    depth: 24,
    height: 7,
    powerMW: 36,
    waterM3: -2,
    sewageM3: 0,
    jobs: 10,
    coverageRadius: 100,
    serviceStrength: 1,
    pollution: 0,
    noise: 6,
    landValueBoost: 2,
    needsWaterEdge: false,
    milestoneTier: 2,
  },
  water_pump: {
    kind: 'water_pump',
    labelZh: '抽水站',
    labelEn: 'Water Pump',
    category: 'water',
    cost: 2500,
    upkeepPerDay: 45,
    width: 16,
    depth: 16,
    height: 9,
    powerMW: -2.0,
    waterM3: 450,
    sewageM3: 0,
    jobs: 6,
    coverageRadius: 120,
    serviceStrength: 1,
    pollution: 0,
    noise: 16,
    landValueBoost: 0,
    needsWaterEdge: true,
    milestoneTier: 0,
  },
  water_tower: {
    kind: 'water_tower',
    labelZh: '水塔',
    labelEn: 'Water Tower',
    category: 'water',
    cost: 3200,
    upkeepPerDay: 55,
    width: 14,
    depth: 14,
    height: 22,
    powerMW: -1.5,
    waterM3: 240,
    sewageM3: 0,
    jobs: 4,
    coverageRadius: 110,
    serviceStrength: 1,
    pollution: 0,
    noise: 10,
    landValueBoost: -2,
    needsWaterEdge: false,
    milestoneTier: 0,
  },
  sewage_outlet: {
    kind: 'sewage_outlet',
    labelZh: '排污口',
    labelEn: 'Sewage Outlet',
    category: 'water',
    cost: 2200,
    upkeepPerDay: 40,
    width: 16,
    depth: 14,
    height: 6,
    powerMW: -1.5,
    waterM3: 0,
    sewageM3: 450,
    jobs: 4,
    coverageRadius: 110,
    serviceStrength: 1,
    pollution: 20,
    noise: 18,
    landValueBoost: -18,
    needsWaterEdge: true,
    milestoneTier: 0,
  },
  police_station: {
    kind: 'police_station',
    labelZh: '警察局',
    labelEn: 'Police',
    category: 'police',
    cost: 5000,
    upkeepPerDay: 70,
    width: 22,
    depth: 18,
    height: 12,
    powerMW: -1.2,
    waterM3: -6,
    sewageM3: -6,
    jobs: 18,
    coverageRadius: 280,
    serviceStrength: 1.0,
    pollution: 0,
    noise: 10,
    landValueBoost: 14,
    needsWaterEdge: false,
    milestoneTier: 2,
  },
  fire_station: {
    kind: 'fire_station',
    labelZh: '消防站',
    labelEn: 'Fire Station',
    category: 'fire',
    cost: 5000,
    upkeepPerDay: 70,
    width: 22,
    depth: 18,
    height: 11,
    powerMW: -1.2,
    waterM3: -8,
    sewageM3: -6,
    jobs: 18,
    coverageRadius: 280,
    serviceStrength: 1.0,
    pollution: 0,
    noise: 12,
    landValueBoost: 12,
    needsWaterEdge: false,
    milestoneTier: 2,
  },
  clinic: {
    kind: 'clinic',
    labelZh: '社区诊所',
    labelEn: 'Clinic',
    category: 'health',
    cost: 4200,
    upkeepPerDay: 60,
    width: 20,
    depth: 16,
    height: 10,
    powerMW: -1.0,
    waterM3: -8,
    sewageM3: -8,
    jobs: 16,
    coverageRadius: 260,
    serviceStrength: 0.85,
    pollution: 0,
    noise: 6,
    landValueBoost: 15,
    needsWaterEdge: false,
    milestoneTier: 1,
  },
  hospital: {
    kind: 'hospital',
    labelZh: '中心医院',
    labelEn: 'Hospital',
    category: 'health',
    cost: 14000,
    upkeepPerDay: 160,
    width: 34,
    depth: 26,
    height: 24,
    powerMW: -3.0,
    waterM3: -20,
    sewageM3: -20,
    jobs: 60,
    coverageRadius: 440,
    serviceStrength: 1.4,
    pollution: 0,
    noise: 10,
    landValueBoost: 24,
    needsWaterEdge: false,
    milestoneTier: 4,
  },
  elementary_school: {
    kind: 'elementary_school',
    labelZh: '小学',
    labelEn: 'Elementary',
    category: 'education',
    cost: 4500,
    upkeepPerDay: 62,
    width: 26,
    depth: 20,
    height: 11,
    powerMW: -1.2,
    waterM3: -10,
    sewageM3: -10,
    jobs: 20,
    coverageRadius: 290,
    serviceStrength: 0.9,
    pollution: 0,
    noise: 8,
    landValueBoost: 16,
    needsWaterEdge: false,
    milestoneTier: 1,
  },
  high_school: {
    kind: 'high_school',
    labelZh: '高级中学',
    labelEn: 'High School',
    category: 'education',
    cost: 8500,
    upkeepPerDay: 105,
    width: 32,
    depth: 24,
    height: 14,
    powerMW: -2.0,
    waterM3: -14,
    sewageM3: -14,
    jobs: 36,
    coverageRadius: 380,
    serviceStrength: 1.2,
    pollution: 0,
    noise: 9,
    landValueBoost: 20,
    needsWaterEdge: false,
    milestoneTier: 3,
  },
  park_small: {
    kind: 'park_small',
    labelZh: '街心公园',
    labelEn: 'Small Park',
    category: 'parks',
    cost: 1200,
    upkeepPerDay: 12,
    width: 16,
    depth: 16,
    height: 4,
    powerMW: -0.2,
    waterM3: -2,
    sewageM3: 0,
    jobs: 2,
    coverageRadius: 190,
    serviceStrength: 0.75,
    pollution: -6,
    noise: -10,
    landValueBoost: 24,
    needsWaterEdge: false,
    milestoneTier: 0,
  },
  park_plaza: {
    kind: 'park_plaza',
    labelZh: '海湾广场',
    labelEn: 'Bay Plaza',
    category: 'parks',
    cost: 3600,
    upkeepPerDay: 30,
    width: 28,
    depth: 24,
    height: 6,
    powerMW: -0.6,
    waterM3: -5,
    sewageM3: 0,
    jobs: 6,
    coverageRadius: 290,
    serviceStrength: 1.15,
    pollution: -10,
    noise: -12,
    landValueBoost: 36,
    needsWaterEdge: false,
    milestoneTier: 3,
  },
  landfill: {
    kind: 'landfill',
    labelZh: '垃圾填埋场',
    labelEn: 'Landfill',
    category: 'garbage',
    cost: 2800,
    upkeepPerDay: 40,
    width: 32,
    depth: 28,
    height: 5,
    powerMW: -0.6,
    waterM3: -2,
    sewageM3: 0,
    jobs: 10,
    coverageRadius: 420,
    serviceStrength: 1.0,
    pollution: 60,
    noise: 20,
    landValueBoost: -25,
    needsWaterEdge: false,
    milestoneTier: 1,
  },
};

export type OverlayType =
  | 'none'
  | 'traffic'
  | 'landvalue'
  | 'pollution'
  | 'noise'
  | 'power'
  | 'water'
  | 'services'
  | 'happiness';

export const ProblemFlags = {
  NONE: 0,
  NO_POWER: 1 << 0,
  NO_WATER: 1 << 1,
  NO_SEWAGE: 1 << 2,
  NO_WORKERS: 1 << 3,
  NO_GOODS: 1 << 4,
  HIGH_TAX: 1 << 5,
  HIGH_POLLUTION: 1 << 6,
  POLLUTED_WATER: 1 << 7,
  GARBAGE: 1 << 8,
  CRIME: 1 << 9,
  ABANDONED: 1 << 10,
} as const;

export interface MilestoneDef {
  tier: number;
  populationRequired: number;
  nameZh: string;
  nameEn: string;
  bonusMoney: number;
}

export const MILESTONES: MilestoneDef[] = [
  {
    tier: 0,
    populationRequired: 0,
    nameZh: '初建港湾',
    nameEn: 'Starter Cove',
    bonusMoney: 0,
  },
  {
    tier: 1,
    populationRequired: 250,
    nameZh: '海风村落',
    nameEn: 'Coastal Hamlet',
    bonusMoney: 15000,
  },
  {
    tier: 2,
    populationRequired: 600,
    nameZh: '汐光小镇',
    nameEn: 'Tidelight Town',
    bonusMoney: 25000,
  },
  {
    tier: 3,
    populationRequired: 1200,
    nameZh: '繁荣海湾',
    nameEn: 'Bustling Bay',
    bonusMoney: 40000,
  },
  {
    tier: 4,
    populationRequired: 2500,
    nameZh: '滨海新城',
    nameEn: 'Harbor City',
    bonusMoney: 60000,
  },
];

export type VehicleType = 'car' | 'truck' | 'van' | 'service';

export const VEHICLE_TYPE_TO_INT: Record<VehicleType, number> = {
  car: 0,
  truck: 1,
  van: 2,
  service: 3,
};
