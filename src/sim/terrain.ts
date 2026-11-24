import {
  FIELD_CELL_SIZE,
  FIELD_RES,
  TERRAIN_RES,
  TERRAIN_STEP,
  WATER_LEVEL,
  WORLD_HALF,
  WORLD_SIZE,
  type Vec2,
} from './types.ts';
import { SeededRNG, fbm2D } from './rng.ts';

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Meandering river centerline x(z) flowing north (-960) -> south (+460 into bay).
 */
export function riverCenterX(z: number): number {
  return -210 + 75 * Math.sin(z * 0.0042 + 0.7) + 40 * Math.cos(z * 0.0021 - 0.3);
}

export function riverCenterDxDz(z: number): number {
  return 75 * 0.0042 * Math.cos(z * 0.0042 + 0.7) - 40 * 0.0021 * Math.sin(z * 0.0021 - 0.3);
}

/**
 * Southern bay shoreline z(x). Points south of this curve transition into sea.
 */
export function bayShoreZ(x: number): number {
  return 410 + 70 * Math.sin(x * 0.0036 + 0.5) - 55 * Math.cos(x * 0.0023);
}

export class Terrain {
  readonly seed: number;
  readonly res = TERRAIN_RES;
  readonly step = TERRAIN_STEP;
  readonly heights: Float32Array;
  readonly waterMask: Uint8Array;
  readonly flowX: Float32Array;
  readonly flowZ: Float32Array;
  /** Packed [x, y, z, scale, variant] * treeCount */
  readonly trees: Float32Array;

  constructor(seed: number) {
    this.seed = seed;
    this.heights = new Float32Array(TERRAIN_RES * TERRAIN_RES);
    this.waterMask = new Uint8Array(TERRAIN_RES * TERRAIN_RES);
    this.flowX = new Float32Array(FIELD_RES * FIELD_RES);
    this.flowZ = new Float32Array(FIELD_RES * FIELD_RES);

    this.generateHeightmap();
    this.generateFlowField();
    this.trees = this.generateTrees();
  }

  private generateHeightmap(): void {
    for (let iz = 0; iz < TERRAIN_RES; iz++) {
      const z = -WORLD_HALF + iz * TERRAIN_STEP;
      const rCx = riverCenterX(z);

      for (let ix = 0; ix < TERRAIN_RES; ix++) {
        const x = -WORLD_HALF + ix * TERRAIN_STEP;

        // 1. Base coastal plain gentle elevation (~7m - 13m in buildable valley)
        const gentleNoise = fbm2D(x * 0.0018 + 11.3, z * 0.0018 - 5.7, this.seed, 4);
        const detailNoise = fbm2D(x * 0.006 + 3.1, z * 0.006 + 8.4, this.seed + 31, 3);
        let h = 6.2 + gentleNoise * 6.5 + (detailNoise - 0.5) * 1.4;

        // Slight gentle rise toward north
        h += smoothstep(350, -850, z) * 4.5;

        // 2. Scenic surrounding hills along North, West, and East edges
        const northHill = smoothstep(-480, -900, z);
        const westHill = smoothstep(-580, -920, x);
        const eastHill = smoothstep(560, 920, x);
        const ridgeMask = Math.max(northHill, westHill * 0.9, eastHill * 0.95);
        const ridgeNoise = fbm2D(x * 0.0032 - 2.4, z * 0.0032 + 9.1, this.seed + 71, 4);
        h += ridgeMask * ridgeMask * (26 + ridgeNoise * 42);

        // Keep a smooth valley pass around northern highway corridor (x near +160..+360)
        const hwyDist = Math.abs(x - 240);
        if (z < -420) {
          const passMask = (1 - smoothstep(45, 160, hwyDist)) * smoothstep(-420, -680, z);
          h = h * (1 - passMask * 0.72) + 12.5 * (passMask * 0.72);
        }

        // 3. Carve meandering river channel (north -> bay)
        const bayZ = bayShoreZ(x);
        if (z < bayZ + 120) {
          const riverHalfWidth = 30 + smoothstep(-700, 400, z) * 18; // widens toward estuary
          const dRiver = Math.abs(x - rCx);
          const bankT = smoothstep(riverHalfWidth * 0.65, riverHalfWidth * 2.1, dRiver);
          const riverBed = -3.4 - smoothstep(-600, 420, z) * 1.4;
          h = riverBed + (h - riverBed) * bankT;
        }

        // 4. Carve southern coastal bay
        const distToBay = z - bayZ;
        if (distToBay > -110) {
          const shoreT = smoothstep(-110, 95, distToBay);
          const deepSea = -7.5 - smoothstep(80, 480, distToBay) * 5.5;
          h = h * (1 - shoreT) + deepSea * shoreT;
        }

        const idx = iz * TERRAIN_RES + ix;
        this.heights[idx] = h;
        this.waterMask[idx] = h <= WATER_LEVEL + 0.05 ? 1 : 0;
      }
    }
  }

  private generateFlowField(): void {
    for (let iz = 0; iz < FIELD_RES; iz++) {
      const z = -WORLD_HALF + (iz + 0.5) * FIELD_CELL_SIZE;
      const rCx = riverCenterX(z);
      const dxDz = riverCenterDxDz(z);
      const len = Math.hypot(dxDz, 1);
      const rFx = dxDz / len;
      const rFz = 1 / len;

      for (let ix = 0; ix < FIELD_RES; ix++) {
        const x = -WORLD_HALF + (ix + 0.5) * FIELD_CELL_SIZE;
        const idx = iz * FIELD_RES + ix;
        const h = this.sampleHeight(x, z);
        if (h > WATER_LEVEL + 0.8) {
          this.flowX[idx] = 0;
          this.flowZ[idx] = 0;
          continue;
        }
        const bayZ = bayShoreZ(x);
        if (z < bayZ - 15 && Math.abs(x - rCx) < 95) {
          // Strong southward river flow
          this.flowX[idx] = rFx;
          this.flowZ[idx] = rFz;
        } else {
          // Gentle eastward/southward coastal tide in bay
          this.flowX[idx] = 0.72;
          this.flowZ[idx] = 0.69;
        }
      }
    }
  }

  private generateTrees(): Float32Array {
    const rng = new SeededRNG(this.seed ^ 0x51f15e);
    const out: number[] = [];
    const targetCount = 2400;

    for (let attempt = 0; attempt < targetCount * 4 && out.length < targetCount * 5; attempt++) {
      const x = rng.range(-WORLD_HALF + 30, WORLD_HALF - 30);
      const z = rng.range(-WORLD_HALF + 30, WORLD_HALF - 30);
      const h = this.sampleHeight(x, z);
      if (h < WATER_LEVEL + 2.0 || h > 52) continue;
      const slope = this.sampleSlope(x, z);
      if (slope > 0.42) continue;

      // Cluster forests naturally using fBM; keep central valley lighter for clean city building
      const forestDensity = fbm2D(x * 0.0045 + 17, z * 0.0045 - 13, this.seed + 199, 3);
      const inCentralPlain = x > -120 && x < 480 && z > -380 && z < 320;
      const threshold = inCentralPlain ? 0.66 : 0.42;
      if (forestDensity < threshold) continue;

      const scale = rng.range(0.75, 1.45);
      const variant = rng.int(0, 2);
      out.push(x, h, z, scale, variant);
    }

    return new Float32Array(out);
  }

  sampleHeight(x: number, z: number): number {
    const gx = Math.max(0, Math.min(TERRAIN_RES - 1.0001, (x + WORLD_HALF) / TERRAIN_STEP));
    const gz = Math.max(0, Math.min(TERRAIN_RES - 1.0001, (z + WORLD_HALF) / TERRAIN_STEP));
    const x0 = Math.floor(gx);
    const z0 = Math.floor(gz);
    const fx = gx - x0;
    const fz = gz - z0;

    const i00 = z0 * TERRAIN_RES + x0;
    const h00 = this.heights[i00];
    const h10 = this.heights[i00 + 1];
    const h01 = this.heights[i00 + TERRAIN_RES];
    const h11 = this.heights[i00 + TERRAIN_RES + 1];

    const hx0 = h00 + (h10 - h00) * fx;
    const hx1 = h01 + (h11 - h01) * fx;
    return hx0 + (hx1 - hx0) * fz;
  }

  sampleSlope(x: number, z: number): number {
    const eps = 5.0;
    const hx0 = this.sampleHeight(x - eps, z);
    const hx1 = this.sampleHeight(x + eps, z);
    const hz0 = this.sampleHeight(x, z - eps);
    const hz1 = this.sampleHeight(x, z + eps);
    const dhdx = (hx1 - hx0) / (2 * eps);
    const dhdz = (hz1 - hz0) / (2 * eps);
    return Math.hypot(dhdx, dhdz);
  }

  isInBounds(x: number, z: number, margin = 16): boolean {
    return (
      x >= -WORLD_HALF + margin &&
      x <= WORLD_HALF - margin &&
      z >= -WORLD_HALF + margin &&
      z <= WORLD_HALF - margin
    );
  }

  isWater(x: number, z: number, margin = 0.2): boolean {
    return this.sampleHeight(x, z) <= WATER_LEVEL + margin;
  }

  isBuildable(x: number, z: number, maxSlope = 0.26): boolean {
    if (!this.isInBounds(x, z, 20)) return false;
    const h = this.sampleHeight(x, z);
    if (h <= WATER_LEVEL + 0.6) return false;
    return this.sampleSlope(x, z) <= maxSlope;
  }

  isNearWater(x: number, z: number, radius = 48): boolean {
    if (this.isWater(x, z, 0.3)) return true;
    const steps = 8;
    for (let i = 0; i < steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      if (this.isWater(x + Math.cos(a) * radius, z + Math.sin(a) * radius, 0.1)) {
        return true;
      }
      if (this.isWater(x + Math.cos(a) * radius * 0.5, z + Math.sin(a) * radius * 0.5, 0.1)) {
        return true;
      }
    }
    return false;
  }

  sampleFlow(x: number, z: number): Vec2 {
    const ix = Math.max(0, Math.min(FIELD_RES - 1, Math.floor((x + WORLD_HALF) / FIELD_CELL_SIZE)));
    const iz = Math.max(0, Math.min(FIELD_RES - 1, Math.floor((z + WORLD_HALF) / FIELD_CELL_SIZE)));
    const idx = iz * FIELD_RES + ix;
    return { x: this.flowX[idx], z: this.flowZ[idx] };
  }

  getWorldSize(): number {
    return WORLD_SIZE;
  }
}
