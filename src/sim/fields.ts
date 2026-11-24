import {
  FIELD_CELL_SIZE,
  FIELD_RES,
  PLOPPABLE_SPECS,
  ROAD_SPECS,
  WORLD_HALF,
  ZONE_SPECS,
  type OverlayType,
} from './types.ts';
import { evalBezier } from './bezier.ts';
import type { Building } from './buildings.ts';
import type { RoadNetwork } from './roads.ts';
import type { Terrain } from './terrain.ts';

const CELL_COUNT = FIELD_RES * FIELD_RES;

export class ScalarFields {
  readonly res = FIELD_RES;
  readonly cellSize = FIELD_CELL_SIZE;

  readonly waterfrontBonus = new Float32Array(CELL_COUNT);
  readonly landValue = new Float32Array(CELL_COUNT);
  readonly pollution = new Float32Array(CELL_COUNT);
  readonly noise = new Float32Array(CELL_COUNT);
  readonly waterPollution = new Float32Array(CELL_COUNT);
  readonly powerCoverage = new Float32Array(CELL_COUNT);
  readonly waterCoverage = new Float32Array(CELL_COUNT);

  readonly policeCoverage = new Float32Array(CELL_COUNT);
  readonly fireCoverage = new Float32Array(CELL_COUNT);
  readonly healthCoverage = new Float32Array(CELL_COUNT);
  readonly educationCoverage = new Float32Array(CELL_COUNT);
  readonly parkCoverage = new Float32Array(CELL_COUNT);
  readonly garbageCoverage = new Float32Array(CELL_COUNT);
  readonly serviceCoverage = new Float32Array(CELL_COUNT);

  readonly happiness = new Float32Array(CELL_COUNT);

  private readonly scratch = new Float32Array(CELL_COUNT);
  private readonly roadLandValue = new Float32Array(CELL_COUNT);
  private readonly abandonPenalty = new Float32Array(CELL_COUNT);
  revision = 1;

  constructor(terrain: Terrain) {
    this.computeWaterfrontBonus(terrain);
    this.landValue.fill(25);
    this.happiness.fill(60);
    for (let i = 0; i < CELL_COUNT; i++) {
      this.landValue[i] = Math.min(100, 26 + this.waterfrontBonus[i]);
    }
  }

  private computeWaterfrontBonus(terrain: Terrain): void {
    const isWaterGrid = new Uint8Array(CELL_COUNT);
    for (let iz = 0; iz < FIELD_RES; iz++) {
      const z = -WORLD_HALF + (iz + 0.5) * FIELD_CELL_SIZE;
      for (let ix = 0; ix < FIELD_RES; ix++) {
        const x = -WORLD_HALF + (ix + 0.5) * FIELD_CELL_SIZE;
        isWaterGrid[iz * FIELD_RES + ix] = terrain.isWater(x, z, 0.25) ? 1 : 0;
      }
    }

    const searchR = 7; // 105m waterfront vista bonus
    for (let iz = 0; iz < FIELD_RES; iz++) {
      for (let ix = 0; ix < FIELD_RES; ix++) {
        const idx = iz * FIELD_RES + ix;
        if (isWaterGrid[idx]) {
          this.waterfrontBonus[idx] = 0;
          continue;
        }
        let minDistSq = Infinity;
        for (let dz = -searchR; dz <= searchR; dz++) {
          const nz = iz + dz;
          if (nz < 0 || nz >= FIELD_RES) continue;
          for (let dx = -searchR; dx <= searchR; dx++) {
            const nx = ix + dx;
            if (nx < 0 || nx >= FIELD_RES) continue;
            if (isWaterGrid[nz * FIELD_RES + nx]) {
              const d2 = dx * dx + dz * dz;
              if (d2 < minDistSq) minDistSq = d2;
            }
          }
        }
        if (minDistSq < Infinity) {
          const d = Math.sqrt(minDistSq);
          this.waterfrontBonus[idx] = Math.max(0, (1 - d / (searchR + 0.5)) * 34);
        }
      }
    }
  }

  worldToIndex(x: number, z: number): number {
    const ix = Math.max(0, Math.min(FIELD_RES - 1, Math.floor((x + WORLD_HALF) / FIELD_CELL_SIZE)));
    const iz = Math.max(0, Math.min(FIELD_RES - 1, Math.floor((z + WORLD_HALF) / FIELD_CELL_SIZE)));
    return iz * FIELD_RES + ix;
  }

  sample(field: Float32Array, x: number, z: number): number {
    const gx = Math.max(0, Math.min(FIELD_RES - 1.001, (x + WORLD_HALF) / FIELD_CELL_SIZE - 0.5));
    const gz = Math.max(0, Math.min(FIELD_RES - 1.001, (z + WORLD_HALF) / FIELD_CELL_SIZE - 0.5));
    const x0 = Math.floor(gx);
    const z0 = Math.floor(gz);
    const fx = gx - x0;
    const fz = gz - z0;
    const i00 = z0 * FIELD_RES + x0;
    const v00 = field[i00];
    const v10 = field[i00 + 1];
    const v01 = field[i00 + FIELD_RES];
    const v11 = field[i00 + FIELD_RES + 1];
    return (v00 + (v10 - v00) * fx) * (1 - fz) + (v01 + (v11 - v01) * fx) * fz;
  }

  addRadial(
    field: Float32Array,
    x: number,
    z: number,
    radius: number,
    peak: number,
    maxCap = 100
  ): void {
    const rCells = Math.ceil(radius / FIELD_CELL_SIZE);
    const cx = Math.floor((x + WORLD_HALF) / FIELD_CELL_SIZE);
    const cz = Math.floor((z + WORLD_HALF) / FIELD_CELL_SIZE);
    const rSq = radius * radius;

    const z0 = Math.max(0, cz - rCells);
    const z1 = Math.min(FIELD_RES - 1, cz + rCells);
    const x0 = Math.max(0, cx - rCells);
    const x1 = Math.min(FIELD_RES - 1, cx + rCells);

    for (let iz = z0; iz <= z1; iz++) {
      const wz = -WORLD_HALF + (iz + 0.5) * FIELD_CELL_SIZE;
      const dz = wz - z;
      for (let ix = x0; ix <= x1; ix++) {
        const wx = -WORLD_HALF + (ix + 0.5) * FIELD_CELL_SIZE;
        const dx = wx - x;
        const d2 = dx * dx + dz * dz;
        if (d2 >= rSq) continue;
        const falloff = 1 - Math.sqrt(d2) / radius;
        const smooth = falloff * falloff * (3 - 2 * falloff);
        const idx = iz * FIELD_RES + ix;
        field[idx] = Math.max(0, Math.min(maxCap, field[idx] + peak * smooth));
      }
    }
  }

  paintMaxRadial(field: Float32Array, x: number, z: number, radius: number, peak: number): void {
    const rCells = Math.ceil(radius / FIELD_CELL_SIZE);
    const cx = Math.floor((x + WORLD_HALF) / FIELD_CELL_SIZE);
    const cz = Math.floor((z + WORLD_HALF) / FIELD_CELL_SIZE);
    const rSq = radius * radius;

    const z0 = Math.max(0, cz - rCells);
    const z1 = Math.min(FIELD_RES - 1, cz + rCells);
    const x0 = Math.max(0, cx - rCells);
    const x1 = Math.min(FIELD_RES - 1, cx + rCells);

    for (let iz = z0; iz <= z1; iz++) {
      const wz = -WORLD_HALF + (iz + 0.5) * FIELD_CELL_SIZE;
      const dz = wz - z;
      for (let ix = x0; ix <= x1; ix++) {
        const wx = -WORLD_HALF + (ix + 0.5) * FIELD_CELL_SIZE;
        const dx = wx - x;
        const d2 = dx * dx + dz * dz;
        if (d2 >= rSq) continue;
        const falloff = 1 - Math.sqrt(d2) / radius;
        const val = peak * Math.min(1, falloff * 1.45);
        const idx = iz * FIELD_RES + ix;
        if (val > field[idx]) field[idx] = val;
      }
    }
  }

  paintSegmentMax(
    field: Float32Array,
    x0: number,
    z0: number,
    x1: number,
    z1: number,
    radius: number,
    value: number
  ): void {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const steps = Math.max(1, Math.ceil(len / (radius * 0.45)));
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      this.paintMaxRadial(field, x0 + (x1 - x0) * t, z0 + (z1 - z0) * t, radius, value);
    }
  }

  private diffuse(field: Float32Array, passes: number, mix = 0.35): void {
    for (let p = 0; p < passes; p++) {
      for (let iz = 0; iz < FIELD_RES; iz++) {
        const row = iz * FIELD_RES;
        const up = Math.max(0, iz - 1) * FIELD_RES;
        const dn = Math.min(FIELD_RES - 1, iz + 1) * FIELD_RES;
        for (let ix = 0; ix < FIELD_RES; ix++) {
          const lt = Math.max(0, ix - 1);
          const rt = Math.min(FIELD_RES - 1, ix + 1);
          const avg =
            (field[up + ix] + field[dn + ix] + field[row + lt] + field[row + rt]) * 0.25;
          this.scratch[row + ix] = field[row + ix] * (1 - mix) + avg * mix;
        }
      }
      field.set(this.scratch);
    }
  }

  updateEnvironment(
    terrain: Terrain,
    roads: RoadNetwork,
    buildings: readonly Building[],
    avgTaxRate: number
  ): void {
    this.pollution.fill(0);
    this.noise.fill(0);
    this.roadLandValue.fill(0);
    this.abandonPenalty.fill(0);

    // 1. Road noise & land value bonus
    for (const seg of roads.segments.values()) {
      const spec = ROAD_SPECS[seg.type];
      const steps = Math.max(2, Math.ceil(seg.lut.length / 22));
      const trafficNoise = spec.noiseBase * (0.65 + seg.congestion * 0.85);
      for (let i = 0; i <= steps; i++) {
        const pt = evalBezier(seg.bezier, i / steps);
        this.addRadial(this.noise, pt.x, pt.z, 55, trafficNoise * 0.45, 100);
        if (spec.landValueBonus !== 0) {
          this.addRadial(
            this.roadLandValue,
            pt.x,
            pt.z,
            45,
            spec.landValueBonus,
            30
          );
        }
      }
    }

    // 2. Building pollution, noise, sewage injection, abandonment penalty
    for (const b of buildings) {
      if (b.abandoned) {
        this.addRadial(this.abandonPenalty, b.x, b.z, 65, 18, 45);
        continue;
      }
      if (b.kind === 'growable' && b.zone !== 'none') {
        const spec = ZONE_SPECS[b.zone];
        const area = Math.max(1, (b.width * b.depth) / 64);
        if (spec.pollutionPerCell > 0) {
          this.addRadial(
            this.pollution,
            b.x,
            b.z,
            95,
            spec.pollutionPerCell * Math.sqrt(area) * 1.15,
            100
          );
        }
        if (spec.noisePerCell > 0) {
          this.addRadial(
            this.noise,
            b.x,
            b.z,
            65,
            spec.noisePerCell * Math.sqrt(area) * 0.5,
            100
          );
        }
      } else if (b.kind === 'ploppable' && b.ploppableKind) {
        const spec = PLOPPABLE_SPECS[b.ploppableKind];
        if (spec.pollution > 0) {
          this.addRadial(this.pollution, b.x, b.z, 140, spec.pollution, 100);
        }
        if (spec.noise > 0) {
          this.addRadial(this.noise, b.x, b.z, 90, spec.noise, 100);
        }
        if (spec.landValueBoost < 0) {
          this.addRadial(this.abandonPenalty, b.x, b.z, 110, -spec.landValueBoost, 50);
        }
        if (b.ploppableKind === 'sewage_outlet' && b.hasPower) {
          this.addRadial(this.waterPollution, b.x, b.z, 48, 55, 100);
        }
      }
    }

    this.diffuse(this.pollution, 2, 0.38);
    this.diffuse(this.noise, 1, 0.32);

    // 3. Advect waterPollution downstream along river flow vectors
    this.advectWaterPollution(terrain);

    // 4. Composite Land Value & Happiness
    const taxMood = (9 - avgTaxRate) * 3.0;
    for (let i = 0; i < CELL_COUNT; i++) {
      const lv =
        24 +
        this.waterfrontBonus[i] +
        this.parkCoverage[i] * 32 +
        this.serviceCoverage[i] * 0.38 +
        this.roadLandValue[i] -
        this.pollution[i] * 0.55 -
        this.noise[i] * 0.28 -
        this.abandonPenalty[i];
      this.landValue[i] = Math.max(5, Math.min(100, lv));

      const hap =
        54 +
        this.serviceCoverage[i] * 0.28 +
        this.parkCoverage[i] * 12 +
        (this.landValue[i] - 30) * 0.16 -
        this.pollution[i] * 0.36 -
        this.noise[i] * 0.14 +
        taxMood;
      this.happiness[i] = Math.max(5, Math.min(100, hap));
    }

    this.revision++;
  }

  private advectWaterPollution(terrain: Terrain): void {
    // Semi-Lagrangian upstream sampling along flowX/flowZ
    const stepCells = 1.4;
    for (let iz = 0; iz < FIELD_RES; iz++) {
      for (let ix = 0; ix < FIELD_RES; ix++) {
        const idx = iz * FIELD_RES + ix;
        const fx = terrain.flowX[idx];
        const fz = terrain.flowZ[idx];
        if (fx === 0 && fz === 0) {
          this.scratch[idx] = this.waterPollution[idx] * 0.55;
          continue;
        }
        const sx = Math.max(0, Math.min(FIELD_RES - 1.001, ix - fx * stepCells));
        const sz = Math.max(0, Math.min(FIELD_RES - 1.001, iz - fz * stepCells));
        const x0 = Math.floor(sx);
        const z0 = Math.floor(sz);
        const ax = sx - x0;
        const az = sz - z0;
        const i00 = z0 * FIELD_RES + x0;
        const v =
          (this.waterPollution[i00] * (1 - ax) + this.waterPollution[i00 + 1] * ax) * (1 - az) +
          (this.waterPollution[i00 + FIELD_RES] * (1 - ax) +
            this.waterPollution[i00 + FIELD_RES + 1] * ax) *
            az;
        this.scratch[idx] = Math.min(100, Math.max(this.waterPollution[idx] * 0.65, v * 0.94));
      }
    }
    this.waterPollution.set(this.scratch);
  }

  /**
   * Returns a normalized [0..1] Float32Array snapshot for rendering a given overlay.
   */
  exportNormalizedOverlay(overlay: OverlayType): Float32Array | null {
    if (overlay === 'none' || overlay === 'traffic') return null;
    const out = new Float32Array(CELL_COUNT);
    switch (overlay) {
      case 'landvalue':
        for (let i = 0; i < CELL_COUNT; i++) out[i] = this.landValue[i] / 100;
        return out;
      case 'pollution':
        for (let i = 0; i < CELL_COUNT; i++) {
          out[i] = Math.min(1, Math.max(this.pollution[i], this.waterPollution[i]) / 100);
        }
        return out;
      case 'noise':
        for (let i = 0; i < CELL_COUNT; i++) out[i] = this.noise[i] / 100;
        return out;
      case 'power':
        out.set(this.powerCoverage);
        return out;
      case 'water':
        out.set(this.waterCoverage);
        return out;
      case 'services':
        for (let i = 0; i < CELL_COUNT; i++) out[i] = this.serviceCoverage[i] / 100;
        return out;
      case 'happiness':
        for (let i = 0; i < CELL_COUNT; i++) out[i] = this.happiness[i] / 100;
        return out;
    }
  }
}
