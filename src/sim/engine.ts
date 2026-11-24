import {
  PLOPPABLE_SPECS,
  ROAD_SPECS,
  TICK_DT,
  TICKS_PER_DAY,
  ZONE_SPECS,
  type OverlayType,
} from './types.ts';
import { BuildingSystem, type SerializedBuildings } from './buildings.ts';
import { CitizenSystem } from './citizens.ts';
import { computeDemand, type DemandState } from './demand.ts';
import { EconomySystem, type SerializedEconomy } from './economy.ts';
import { ScalarFields } from './fields.ts';
import {
  packBuildings,
  packRoadCongestion,
  packRoads,
  packUtilities,
  packVehicles,
  packZones,
  type BuildingDetail,
  type ClientRevisions,
  type CommandResult,
  type SimCommand,
  type SimSnapshot,
  type SimSpeed,
  type SimStats,
  type TerrainInitPayload,
} from './protocol.ts';
import { SeededRNG } from './rng.ts';
import { RoadNetwork, type SerializedRoadNetwork } from './roads.ts';
import { updateServiceCoverages, type ServiceSummary } from './services.ts';
import { Terrain } from './terrain.ts';
import { TrafficSystem } from './traffic.ts';
import { UtilitySystem, type SerializedUtilities } from './utilities.ts';
import { ZoneGrid, type SerializedZones } from './zones.ts';

export interface SerializedCityState {
  version: 1;
  seed: number;
  rngState: number;
  tickCount: number;
  simDay: number;
  timeOfDay: number;
  timeLocked: boolean;
  roads: SerializedRoadNetwork;
  zones: SerializedZones;
  buildings: SerializedBuildings;
  utilities: SerializedUtilities;
  economy: SerializedEconomy;
}

export class SimEngine {
  readonly seed: number;
  readonly rng: SeededRNG;
  readonly terrain: Terrain;
  readonly roads: RoadNetwork;
  readonly zones: ZoneGrid;
  readonly fields: ScalarFields;
  readonly utilities: UtilitySystem;
  readonly citizens: CitizenSystem;
  readonly buildings: BuildingSystem;
  readonly economy: EconomySystem;
  readonly traffic: TrafficSystem;

  tickCount = 0;
  simDay = 1;
  timeOfDay = 10.5; // Bright coastal sunlit morning
  timeLocked = false;
  speed: SimSpeed = 1;

  demand: DemandState;
  servicesSummary: ServiceSummary = {
    elementaryCapacity: 0,
    highSchoolCapacity: 0,
    healthCapacity: 0,
    garbageCapacity: 0,
    avgEducationCoverage: 0,
    avgServiceCoverage: 0,
  };

  private utilitiesDirty = true;
  private fieldsDirty = true;

  constructor(seed = 202604, options?: { createInitialHighway?: boolean }) {
    this.seed = seed;
    this.rng = new SeededRNG(seed);
    this.terrain = new Terrain(seed);
    this.roads = new RoadNetwork();
    this.zones = new ZoneGrid();
    this.fields = new ScalarFields(this.terrain);
    this.utilities = new UtilitySystem();
    this.citizens = new CitizenSystem();
    this.buildings = new BuildingSystem();
    this.economy = new EconomySystem();
    this.traffic = new TrafficSystem();

    this.demand = computeDemand(this.citizens.stats, this.economy.taxRates, false);

    if (options?.createInitialHighway !== false) {
      this.createInitialOutsideHighway();
    }
  }

  /**
   * Regional highway entering from northern map edge through the coastal valley pass.
   */
  private createInitialOutsideHighway(): void {
    this.roads.addRoad(
      { x: 240, z: -955 },
      { x: 240, z: -240 },
      'highway',
      this.terrain,
      undefined,
      undefined,
      { allowEdge: true, outsideConnection: true }
    );
    this.zones.rebuildFromRoads(this.roads, this.terrain);
  }

  getTerrainInitPayload(): TerrainInitPayload {
    return {
      seed: this.seed,
      res: this.terrain.res,
      heights: new Float32Array(this.terrain.heights),
      waterMask: new Uint8Array(this.terrain.waterMask),
      trees: new Float32Array(this.terrain.trees),
    };
  }

  applyCommand(cmd: SimCommand): CommandResult {
    switch (cmd.type) {
      case 'buildRoad': {
        const estDist = Math.hypot(cmd.p1.x - cmd.p0.x, cmd.p1.z - cmd.p0.z);
        const estCost = Math.round(estDist * ROAD_SPECS[cmd.roadType].costPerMeter * 0.8);
        if (!this.economy.canAfford(estCost)) {
          return { ok: false, reason: '资金不足 (Insufficient funds)' };
        }
        const res = this.roads.addRoad(
          cmd.p0,
          cmd.p1,
          cmd.roadType,
          this.terrain,
          cmd.c0,
          cmd.c1,
          { allowEdge: cmd.allowEdge, outsideConnection: cmd.allowEdge }
        );
        if (!res.ok) {
          return { ok: false, reason: res.reason };
        }
        this.economy.spend(res.cost);
        this.zones.rebuildFromRoads(this.roads, this.terrain);
        this.buildings.reconcileAfterZoneRebuild(this.roads, this.zones);
        this.traffic.clearInvalidVehicles(this.roads);
        this.fieldsDirty = true;
        return { ok: true, data: { segmentIds: res.segmentIds, cost: res.cost } };
      }

      case 'upgradeRoad': {
        const seg = this.roads.segments.get(cmd.segmentId);
        if (!seg) return { ok: false, reason: 'Road segment not found' };
        const res = this.roads.upgradeRoad(cmd.segmentId, cmd.roadType);
        if (!res.ok) return { ok: false, reason: res.reason };
        this.economy.spend(res.cost);
        this.zones.rebuildFromRoads(this.roads, this.terrain);
        this.buildings.reconcileAfterZoneRebuild(this.roads, this.zones);
        this.traffic.clearInvalidVehicles(this.roads);
        this.fieldsDirty = true;
        return { ok: true, data: { cost: res.cost } };
      }

      case 'bulldozeRoad': {
        const res = this.roads.bulldozeRoad(cmd.segmentId);
        if (!res.ok) return { ok: false, reason: res.reason };
        this.economy.refund(res.refund);
        this.zones.rebuildFromRoads(this.roads, this.terrain);
        this.buildings.reconcileAfterZoneRebuild(this.roads, this.zones);
        this.traffic.clearInvalidVehicles(this.roads);
        this.fieldsDirty = true;
        return { ok: true, data: { refund: res.refund } };
      }

      case 'zoneArea': {
        const changed = this.zones.paintArea(cmd.zone, cmd.area);
        return { ok: true, data: { changed } };
      }

      case 'placeBuilding': {
        const spec = PLOPPABLE_SPECS[cmd.kind];
        if (!this.economy.canAfford(spec.cost)) {
          return { ok: false, reason: '资金不足 (Insufficient funds)' };
        }
        const res = this.buildings.placePloppable(
          cmd.kind,
          cmd.x,
          cmd.z,
          cmd.yaw ?? 0,
          this.terrain,
          this.roads,
          this.zones
        );
        if (!res.ok || !res.building) {
          return { ok: false, reason: res.reason };
        }
        this.economy.spend(res.cost);
        this.utilitiesDirty = true;
        this.fieldsDirty = true;
        this.refreshDerivedState();
        return { ok: true, data: { buildingId: res.building.id, cost: res.cost } };
      }

      case 'buildUtilityLine': {
        const len = Math.hypot(cmd.x1 - cmd.x0, cmd.z1 - cmd.z0);
        if (len < 4) return { ok: false, reason: 'Utility line too short' };
        const estCost = Math.max(40, Math.round(len * (cmd.kind === 'power_line' ? 6 : 8)));
        if (!this.economy.canAfford(estCost)) {
          return { ok: false, reason: '资金不足 (Insufficient funds)' };
        }
        const { line, cost } = this.utilities.addLine(cmd.kind, cmd.x0, cmd.z0, cmd.x1, cmd.z1);
        this.economy.spend(cost);
        this.utilitiesDirty = true;
        this.refreshDerivedState();
        return { ok: true, data: { lineId: line.id, cost } };
      }

      case 'bulldozeUtilityLine': {
        const res = this.utilities.removeLine(cmd.lineId);
        if (!res.ok) return { ok: false, reason: 'Utility line not found' };
        this.economy.refund(res.refund);
        this.utilitiesDirty = true;
        this.refreshDerivedState();
        return { ok: true, data: { refund: res.refund } };
      }

      case 'bulldozeBuilding': {
        const res = this.buildings.removeBuilding(cmd.buildingId, this.zones);
        if (!res.ok) return { ok: false, reason: 'Building not found' };
        this.economy.refund(res.refund);
        this.utilitiesDirty = true;
        this.fieldsDirty = true;
        this.refreshDerivedState();
        return { ok: true, data: { refund: res.refund } };
      }

      case 'setTaxRate': {
        this.economy.setTaxRate(cmd.zone, cmd.rate);
        this.refreshDerivedState();
        return { ok: true };
      }

      case 'setBudget': {
        this.economy.setBudget(cmd.category, cmd.percent);
        this.utilitiesDirty = true;
        this.fieldsDirty = true;
        this.refreshDerivedState();
        return { ok: true };
      }

      case 'setTimeOfDay': {
        this.timeOfDay = ((cmd.hours % 24) + 24) % 24;
        if (cmd.lock !== undefined) {
          this.timeLocked = cmd.lock;
        }
        return { ok: true };
      }

      case 'stepTicks': {
        const count = Math.max(0, Math.min(20000, Math.floor(cmd.count)));
        this.step(count);
        return { ok: true, data: { tick: this.tickCount, simDay: this.simDay } };
      }
    }
  }

  refreshDerivedState(preserveResidents = false): void {
    this.utilities.update(
      this.buildings.buildings,
      this.fields,
      this.economy.budgets,
      this.timeOfDay
    );
    this.utilitiesDirty = false;

    this.servicesSummary = updateServiceCoverages(
      this.buildings.buildings,
      this.fields,
      this.economy.budgets
    );
    this.fields.updateEnvironment(
      this.terrain,
      this.roads,
      this.buildings.buildings,
      this.economy.getAverageTaxRate()
    );
    this.fieldsDirty = false;

    const hasHighway = this.roads.getOutsideConnectionNodes().length > 0;
    this.citizens.update(
      this.buildings.buildings,
      this.fields,
      this.servicesSummary,
      this.economy.taxRates,
      hasHighway,
      preserveResidents
    );

    const hasPowerAndWater =
      this.utilities.stats.powerProducedMW > 0 && this.utilities.stats.waterProducedM3 > 0;
    this.demand = computeDemand(
      this.citizens.stats,
      this.economy.taxRates,
      hasPowerAndWater
    );

    this.economy.recalculateRates(this.buildings.buildings, this.roads, this.utilities);
  }

  getBuildingDetail(buildingId: number): BuildingDetail | null {
    const b = this.buildings.get(buildingId);
    if (!b) return null;

    let labelZh = '建筑';
    let labelEn = 'Building';
    let maxLevel = 1;
    let taxRate: number | undefined;
    let upkeepPerDay: number | undefined;

    if (b.kind === 'ploppable' && b.ploppableKind) {
      const spec = PLOPPABLE_SPECS[b.ploppableKind];
      labelZh = spec.labelZh;
      labelEn = spec.labelEn;
      upkeepPerDay = Math.round(spec.upkeepPerDay * (this.economy.budgets[spec.category] / 100));
    } else if (b.zone !== 'none') {
      const spec = ZONE_SPECS[b.zone];
      labelZh = spec.labelZh;
      labelEn = spec.labelEn;
      maxLevel = spec.maxLevel;
      taxRate = this.economy.taxRates[b.zone];
    }

    return {
      id: b.id,
      kind: b.kind,
      zone: b.zone,
      ploppableKind: b.ploppableKind,
      labelZh,
      labelEn,
      level: b.level,
      maxLevel,
      residents: b.residents,
      households: Math.round(b.households),
      capacityHouseholds: b.capacityHouseholds,
      workers: b.workers,
      capacityJobs: b.capacityJobs,
      happiness: Math.round(this.fields.sample(this.fields.happiness, b.x, b.z)),
      landValue: Math.round(this.fields.sample(this.fields.landValue, b.x, b.z)),
      pollution: Math.round(this.fields.sample(this.fields.pollution, b.x, b.z)),
      noise: Math.round(this.fields.sample(this.fields.noise, b.x, b.z)),
      serviceCoverage: Math.round(this.fields.sample(this.fields.serviceCoverage, b.x, b.z)),
      hasPower: b.hasPower,
      hasWater: b.hasWater,
      hasSewage: b.hasSewage,
      problems: b.problems,
      abandoned: b.abandoned,
      progress: b.progress,
      taxRate,
      upkeepPerDay,
      x: b.x,
      y: b.y,
      z: b.z,
    };
  }

  /**
   * Fixed deterministic tick following ARCHITECTURE.md Section 5.
   */
  tick(): void {
    // 1. Clock & Time-of-Day Advance
    this.tickCount++;
    if (!this.timeLocked) {
      this.timeOfDay = (this.timeOfDay + 24 / TICKS_PER_DAY) % 24;
    }
    this.simDay = Math.floor(this.tickCount / TICKS_PER_DAY) + 1;

    // 2. Traffic Step (every tick, dt = 0.1s)
    this.traffic.step(
      TICK_DT,
      this.roads,
      this.buildings.buildings,
      this.citizens.stats.population,
      this.terrain,
      this.rng
    );

    // 3. Congestion & Flow Decay (every 10 ticks)
    if (this.tickCount % 10 === 0) {
      this.roads.decayCongestion();
    }

    // 4. Utility Networks (when dirty or every 20 ticks)
    if (this.utilitiesDirty || this.tickCount % 20 === 0) {
      this.utilities.update(
        this.buildings.buildings,
        this.fields,
        this.economy.budgets,
        this.timeOfDay
      );
      this.utilitiesDirty = false;
    }

    // 5. Scalar Fields & Services Update (when dirty or every 40 ticks)
    if (this.fieldsDirty || this.tickCount % 40 === 0) {
      this.servicesSummary = updateServiceCoverages(
        this.buildings.buildings,
        this.fields,
        this.economy.budgets
      );
      this.fields.updateEnvironment(
        this.terrain,
        this.roads,
        this.buildings.buildings,
        this.economy.getAverageTaxRate()
      );
      this.fieldsDirty = false;
    }

    // 6. Citizens, Households & Goods Balance (every 20 ticks)
    if (this.tickCount % 20 === 0) {
      const hasHighway = this.roads.getOutsideConnectionNodes().length > 0;
      this.citizens.update(
        this.buildings.buildings,
        this.fields,
        this.servicesSummary,
        this.economy.taxRates,
        hasHighway
      );

      // 7. RCI+O Demand Update (every 20 ticks)
      const hasPowerAndWater =
        this.utilities.stats.powerProducedMW > 0 && this.utilities.stats.waterProducedM3 > 0;
      this.demand = computeDemand(
        this.citizens.stats,
        this.economy.taxRates,
        hasPowerAndWater
      );

      // 8. Building Lifecycle (every 20 ticks)
      const prevRev = this.buildings.revision;
      this.buildings.stepLifecycle(
        this.zones,
        this.fields,
        this.demand,
        this.economy.taxRates,
        this.utilities.stats.waterIntakePollution,
        this.citizens.stats.population,
        this.terrain,
        this.rng
      );
      if (this.buildings.revision !== prevRev) {
        this.utilitiesDirty = true;
      }
    }

    // 9. Economy & Milestones (every 60 ticks = 1/4 day)
    if (this.tickCount % 60 === 0) {
      this.economy.stepQuarterDay(
        this.buildings.buildings,
        this.roads,
        this.utilities,
        this.citizens.stats.population
      );
    }
  }

  step(count: number): void {
    for (let i = 0; i < count; i++) {
      this.tick();
    }
  }

  getStats(): SimStats {
    const m = this.economy.getCurrentMilestone();
    return {
      population: this.citizens.stats.population,
      households: this.citizens.stats.households,
      jobs: this.citizens.stats.jobsTotal,
      jobsFilled: this.citizens.stats.jobsFilled,
      unemployment: this.citizens.stats.unemploymentRate,
      demand: {
        r: Math.round(this.demand.r),
        c: Math.round(this.demand.c),
        i: Math.round(this.demand.i),
        o: Math.round(this.demand.o),
      },
      money: Math.round(this.economy.treasury),
      dailyNet: this.economy.dailyNet,
      weeklyNet: this.economy.weeklyNet,
      finance: this.economy.getLastBreakdown(),
      powerProducedMW: Math.round(this.utilities.stats.powerProducedMW * 10) / 10,
      powerConsumedMW: Math.round(this.utilities.stats.powerConsumedMW * 10) / 10,
      waterProducedM3: Math.round(this.utilities.stats.waterProducedM3),
      waterConsumedM3: Math.round(this.utilities.stats.waterConsumedM3),
      sewageCapacityM3: Math.round(this.utilities.stats.sewageCapacityM3),
      sewageConsumedM3: Math.round(this.utilities.stats.sewageConsumedM3),
      milestoneTier: m.tier,
      milestoneNameZh: m.nameZh,
      milestoneNameEn: m.nameEn,
      vehicleCount: this.traffic.vehicles.length,
      buildingCount: this.buildings.buildings.length,
      activeProblems: this.buildings.getActiveProblemCount(),
      avgHappiness: Math.round(this.citizens.stats.avgHappiness),
      avgLandValue: Math.round(this.citizens.stats.avgLandValue),
      taxRates: { ...this.economy.taxRates },
      budgets: { ...this.economy.budgets },
    };
  }

  getSnapshot(clientRevs: ClientRevisions, activeOverlay: OverlayType): SimSnapshot {
    const snap: SimSnapshot = {
      tick: this.tickCount,
      simDay: this.simDay,
      timeOfDay: this.timeOfDay,
      speed: this.speed,
      stats: this.getStats(),
      vehicles: packVehicles(this.traffic.vehicles),
      roadCongestion: packRoadCongestion(this.roads),
      overlayType: activeOverlay,
      overlayRevision: this.fields.revision,
    };

    if (clientRevs.road !== this.roads.revision) {
      snap.roads = packRoads(this.roads);
      clientRevs.road = this.roads.revision;
    }
    if (clientRevs.zone !== this.zones.revision) {
      snap.zones = packZones(this.zones);
      clientRevs.zone = this.zones.revision;
    }
    if (clientRevs.building !== this.buildings.revision) {
      snap.buildings = packBuildings(this.buildings.buildings, this.buildings.revision);
      clientRevs.building = this.buildings.revision;
    }
    if (clientRevs.utility !== this.utilities.revision) {
      snap.utilities = packUtilities(this.utilities.lines, this.utilities.revision);
      clientRevs.utility = this.utilities.revision;
    }

    const overlayChanged =
      clientRevs.overlayType !== activeOverlay || clientRevs.overlay !== this.fields.revision;
    if (overlayChanged) {
      clientRevs.overlayType = activeOverlay;
      clientRevs.overlay = this.fields.revision;
      const buf = this.fields.exportNormalizedOverlay(activeOverlay);
      if (buf) {
        snap.overlayField = buf;
      }
    }

    return snap;
  }

  serialize(): string {
    const payload: SerializedCityState = {
      version: 1,
      seed: this.seed,
      rngState: this.rng.getState(),
      tickCount: this.tickCount,
      simDay: this.simDay,
      timeOfDay: this.timeOfDay,
      timeLocked: this.timeLocked,
      roads: this.roads.serialize(),
      zones: this.zones.serialize(),
      buildings: this.buildings.serialize(),
      utilities: this.utilities.serialize(),
      economy: this.economy.serialize(),
    };
    return JSON.stringify(payload);
  }

  loadSerialized(json: string): boolean {
    const data = JSON.parse(json) as SerializedCityState;
    if (!data || data.version !== 1) return false;
    this.rng.setState(data.rngState);
    this.tickCount = data.tickCount;
    this.simDay = data.simDay;
    this.timeOfDay = data.timeOfDay;
    this.timeLocked = data.timeLocked;

    this.roads.deserialize(data.roads);
    this.zones.rebuildFromRoads(this.roads, this.terrain, data.zones.painted);
    this.buildings.deserialize(data.buildings);
    this.buildings.reconcileAfterZoneRebuild(this.roads, this.zones);
    this.utilities.deserialize(data.utilities);
    this.economy.deserialize(data.economy);
    this.traffic.vehicles.length = 0;

    this.utilitiesDirty = true;
    this.fieldsDirty = true;
    this.refreshDerivedState(true);
    return true;
  }

  static deserialize(json: string): SimEngine {
    const data = JSON.parse(json) as SerializedCityState;
    const engine = new SimEngine(data.seed, { createInitialHighway: false });
    engine.loadSerialized(json);
    return engine;
  }
}
