import * as THREE from 'three';
import {
  FIELD_CELL_SIZE,
  FIELD_RES,
  TERRAIN_RES,
  TERRAIN_STEP,
  WATER_LEVEL,
  WORLD_HALF,
  WORLD_SIZE,
  type OverlayType,
} from '../sim/types.ts';
import type { TerrainInitPayload } from '../sim/protocol.ts';
import {
  attachTreeWindSway,
  createBroadleafCanopyGeo,
  createConiferCanopyGeo,
} from './geometryUtils.ts';
import type { QualityProfile } from './quality.ts';

// Harmonized natural coastal biome palette (rich organic tones, never flat lime-green)
const C_DEEP_BED = new THREE.Color('#133548');
const C_SHALLOW_BED = new THREE.Color('#478082');
const C_WET_SAND = new THREE.Color('#B9A47C');
const C_SAND = new THREE.Color('#E6D6AE');
const C_MEADOW_SUN = new THREE.Color('#86A164');
const C_MEADOW_LUSH = new THREE.Color('#61834E');
const C_MEADOW_WARM = new THREE.Color('#9FA76C');
const C_MEADOW_DRY = new THREE.Color('#AEA976');
const C_FOREST_FLOOR = new THREE.Color('#43603B');
const C_PINE_MOSS = new THREE.Color('#4A6C44');
const C_ROCK_WARM = new THREE.Color('#9B9789');
const C_ROCK_CRAG = new THREE.Color('#7C7D74');

const CONIFER_COLORS = [
  new THREE.Color('#395F3F'),
  new THREE.Color('#456D47'),
  new THREE.Color('#2F5137'),
  new THREE.Color('#4E754A'),
];

const BROADLEAF_COLORS = [
  new THREE.Color('#537E49'),
  new THREE.Color('#688E52'),
  new THREE.Color('#456F44'),
  new THREE.Color('#789858'),
  new THREE.Color('#8A9C5C'),
  new THREE.Color('#D1A7AC'), // rare subtle coastal blossom accent
];

// Overlay ramp colors (ART_BIBLE Section 2.4)
const OV_LV_LOW = new THREE.Color('#D4DCE3');
const OV_LV_MID = new THREE.Color('#7BC8A4');
const OV_LV_HIGH = new THREE.Color('#38A3A5');
const OV_LV_PRIME = new THREE.Color('#F2C94C');

const OV_POLL_LOW = new THREE.Color('#A68A5B');
const OV_POLL_HIGH = new THREE.Color('#8A567C');

const OV_PWR_ON = new THREE.Color('#F6C84C');
const OV_PWR_OFF = new THREE.Color('#9BA4B0');

const OV_WTR_ON = new THREE.Color('#58B8EE');
const OV_WTR_OFF = new THREE.Color('#9C8F82');

const OV_SRV_LOW = new THREE.Color('#CBD5DF');
const OV_SRV_HIGH = new THREE.Color('#4BC29A');

function hash2D(ix: number, iz: number, seed: number): number {
  let n = Math.imul(ix, 374761393) + Math.imul(iz, 668265263) + Math.imul(seed, 1442695041);
  n = (n ^ (n >>> 13)) >>> 0;
  n = Math.imul(n, 1274126177) >>> 0;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function valueNoise2D(x: number, z: number, seed: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);
  const a = hash2D(ix, iz, seed);
  const b = hash2D(ix + 1, iz, seed);
  const c = hash2D(ix, iz + 1, seed);
  const d = hash2D(ix + 1, iz + 1, seed);
  return (a + (b - a) * ux) * (1 - uz) + (c + (d - c) * ux) * uz;
}

function fbm(x: number, z: number, seed: number, octaves = 3): number {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += valueNoise2D(x * freq, z * freq, seed + i * 79) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2.03;
  }
  return sum / norm;
}

/**
 * Generates a rich seamless 512x512 organic pasture/soil/meadow detail texture so even
 * gently rolling buildable plains show natural variation instead of a flat plastic surface.
 */
function createTerrainDetailTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#EAEAE8';
  ctx.fillRect(0, 0, size, size);

  let h = 424242;
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };

  // Large seamless organic pasture & clover patches
  for (let i = 0; i < 480; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const r = 18 + rand() * 58;
    const roll = rand();
    const alpha = 0.055 + rand() * 0.075;
    const col =
      roll > 0.55
        ? `rgba(255, 248, 212, ${alpha})`
        : roll > 0.18
          ? `rgba(34, 58, 32, ${alpha})`
          : `rgba(112, 92, 62, ${alpha * 0.85})`;
    for (const ox of [-size, 0, size]) {
      for (const oy of [-size, 0, size]) {
        const px = x + ox;
        const py = y + oy;
        if (px + r < 0 || px - r > size || py + r < 0 || py - r > size) continue;
        const g = ctx.createRadialGradient(px, py, 2, px, py, r);
        g.addColorStop(0, col);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Fine organic grass/soil micro-stipple
  for (let i = 0; i < 7200; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const s = 1.2 + rand() * 2.6;
    const dark = rand() > 0.45;
    ctx.fillStyle = dark ? 'rgba(28, 48, 30, 0.13)' : 'rgba(255, 250, 228, 0.11)';
    ctx.fillRect(x, y, s, s * 1.4);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(22, 22);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function sampleOverlayColor(overlay: OverlayType, v: number, out: THREE.Color): number {
  const t = Math.max(0, Math.min(1, v));
  switch (overlay) {
    case 'landvalue': {
      if (t < 0.35) {
        out.copy(OV_LV_LOW).lerp(OV_LV_MID, t / 0.35);
      } else if (t < 0.7) {
        out.copy(OV_LV_MID).lerp(OV_LV_HIGH, (t - 0.35) / 0.35);
      } else {
        out.copy(OV_LV_HIGH).lerp(OV_LV_PRIME, (t - 0.7) / 0.3);
      }
      return 0.78;
    }
    case 'pollution':
    case 'noise': {
      if (t < 0.05) return 0;
      out.copy(OV_POLL_LOW).lerp(OV_POLL_HIGH, t);
      return Math.min(0.84, 0.25 + t * 0.65);
    }
    case 'power': {
      if (t > 0.25) {
        out.copy(OV_PWR_ON);
        return 0.68;
      }
      out.copy(OV_PWR_OFF);
      return 0.42;
    }
    case 'water': {
      if (t > 0.25) {
        out.copy(OV_WTR_ON);
        return 0.7;
      }
      out.copy(OV_WTR_OFF);
      return 0.36;
    }
    case 'services':
    case 'happiness': {
      out.copy(OV_SRV_LOW).lerp(OV_SRV_HIGH, t);
      return 0.7;
    }
    default:
      return 0;
  }
}

export interface WaterEnvUniforms {
  horizonColor: THREE.Color;
  zenithColor: THREE.Color;
  sunDir: THREE.Vector3;
  sunColor: THREE.Color;
  fogColor: THREE.Color;
  fogNear: number;
  fogFar: number;
  emissiveStrength: number;
}

export class TerrainMeshLayer {
  readonly group = new THREE.Group();
  private seed = 202604;
  private heights = new Float32Array(TERRAIN_RES * TERRAIN_RES);
  private terrainGeo: THREE.BufferGeometry | null = null;
  private terrainMesh: THREE.Mesh | null = null;
  private terrainDetailTex: THREE.CanvasTexture | null = null;
  private baseColors = new Float32Array(TERRAIN_RES * TERRAIN_RES * 3);
  private waterMat: THREE.ShaderMaterial | null = null;
  private waterDepthTex: THREE.DataTexture | null = null;
  private rawTrees = new Float32Array(0);
  private treeMeshes: THREE.Object3D[] = [];
  private readonly windTimeUniform = { value: 0 };
  private waveTime = 0;
  private treeDensityMult = 2.35;
  private waterWaveDetail = 1.0;

  setQuality(quality: QualityProfile): void {
    this.treeDensityMult = quality.treeDensityMult;
    this.waterWaveDetail = quality.waterWaveDetail;
    if (this.waterMat) {
      this.waterMat.uniforms.uWaveDetail.value = this.waterWaveDetail;
    }
  }

  init(payload: TerrainInitPayload): void {
    this.clear();
    this.seed = payload.seed || 202604;
    this.heights = new Float32Array(payload.heights);
    this.rawTrees = new Float32Array(payload.trees);

    this.buildTerrainSurface();
    this.buildWaterSurface();
    this.buildTrees(null);
  }

  getTerrainMesh(): THREE.Mesh | null {
    return this.terrainMesh;
  }

  sampleSlope(x: number, z: number): number {
    const eps = 5.0;
    const hx0 = this.sampleHeight(x - eps, z);
    const hx1 = this.sampleHeight(x + eps, z);
    const hz0 = this.sampleHeight(x, z - eps);
    const hz1 = this.sampleHeight(x, z + eps);
    return Math.hypot((hx1 - hx0) / (2 * eps), (hz1 - hz0) / (2 * eps));
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

  isBuildable(x: number, z: number, maxSlope = 0.32): boolean {
    if (!this.isInBounds(x, z, 20)) return false;
    const h = this.sampleHeight(x, z);
    if (h <= WATER_LEVEL + 0.6) return false;
    return this.sampleSlope(x, z) <= maxSlope;
  }

  isNearWater(x: number, z: number, radius = 72): boolean {
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
    return (h00 + (h10 - h00) * fx) * (1 - fz) + (h01 + (h11 - h01) * fx) * fz;
  }

  private buildForestDensityGrid(): Float32Array {
    const res = 96;
    const grid = new Float32Array(res * res);
    const total = Math.floor(this.rawTrees.length / 5);
    for (let i = 0; i < total; i++) {
      const x = this.rawTrees[i * 5];
      const z = this.rawTrees[i * 5 + 2];
      const gx = Math.floor(((x + WORLD_HALF) / WORLD_SIZE) * res);
      const gz = Math.floor(((z + WORLD_HALF) / WORLD_SIZE) * res);
      for (let dz = -2; dz <= 2; dz++) {
        const iz = gz + dz;
        if (iz < 0 || iz >= res) continue;
        for (let dx = -2; dx <= 2; dx++) {
          const ix = gx + dx;
          if (ix < 0 || ix >= res) continue;
          const d2 = dx * dx + dz * dz;
          if (d2 <= 5) {
            grid[iz * res + ix] += (6 - d2) * 0.05;
          }
        }
      }
    }
    return grid;
  }

  private buildTerrainSurface(): void {
    const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, TERRAIN_RES - 1, TERRAIN_RES - 1);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const count = pos.count;
    const colors = new Float32Array(count * 3);
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      pos.setY(i, this.heights[i]);
    }
    geo.computeVertexNormals();
    const norm = geo.attributes.normal as THREE.BufferAttribute;

    const forestGrid = this.buildForestDensityGrid();
    const fRes = 96;

    for (let iz = 0; iz < TERRAIN_RES; iz++) {
      for (let ix = 0; ix < TERRAIN_RES; ix++) {
        const i = iz * TERRAIN_RES + ix;
        const h = this.heights[i];
        const wx = pos.getX(i);
        const wz = pos.getZ(i);
        const ny = norm.getY(i);
        const slope = 1 - Math.max(0, Math.min(1, ny));

        // Multi-scale organic biome noise for lush coastal valley variety
        const nMacro = fbm(wx * 0.0036 + 4.1, wz * 0.0036 - 7.3, this.seed + 11, 3);
        const nMeso = fbm(wx * 0.012 - 3.2, wz * 0.012 + 5.9, this.seed + 53, 3);
        const nMicro = valueNoise2D(wx * 0.038, wz * 0.038, this.seed + 97);

        // Local concavity / ridge curvature for grounded relief AO
        const iL = iz * TERRAIN_RES + Math.max(0, ix - 1);
        const iR = iz * TERRAIN_RES + Math.min(TERRAIN_RES - 1, ix + 1);
        const iU = Math.max(0, iz - 1) * TERRAIN_RES + ix;
        const iD = Math.min(TERRAIN_RES - 1, iz + 1) * TERRAIN_RES + ix;
        const avgNeighbor = (this.heights[iL] + this.heights[iR] + this.heights[iU] + this.heights[iD]) * 0.25;
        const concavity = Math.max(-2.5, Math.min(2.5, avgNeighbor - h));

        const fgx = Math.max(0, Math.min(fRes - 1, Math.floor(((wx + WORLD_HALF) / WORLD_SIZE) * fRes)));
        const fgz = Math.max(0, Math.min(fRes - 1, Math.floor(((wz + WORLD_HALF) / WORLD_SIZE) * fRes)));
        const forestAmt = Math.min(1, forestGrid[fgz * fRes + fgx]);

        const sandTop = 2.45 + (nMeso - 0.5) * 1.15;

        if (h < -3.2) {
          tmp.copy(C_DEEP_BED);
        } else if (h < 0.0) {
          const t = (h + 3.2) / 3.2;
          tmp.copy(C_DEEP_BED).lerp(C_SHALLOW_BED, Math.pow(t, 1.1));
        } else if (h < 0.55) {
          const t = h / 0.55;
          tmp.copy(C_WET_SAND).lerp(C_SAND, t);
        } else if (h < sandTop) {
          const t = (h - 0.55) / Math.max(0.25, sandTop - 0.55);
          tmp.copy(C_SAND).lerp(C_MEADOW_SUN, Math.pow(t, 1.25));
        } else if (h < 18.0) {
          // Rich mottled coastal meadows: olive pasture, lush valley clover, warm dry knolls
          const elevT = (h - sandTop) / Math.max(1, 18.0 - sandTop);
          tmp.copy(C_MEADOW_SUN).lerp(C_MEADOW_LUSH, Math.min(1, elevT * 0.55 + nMacro * 0.65));
          if (nMeso > 0.5) {
            tmp.lerp(C_MEADOW_WARM, (nMeso - 0.5) * 1.15);
          }
          if (nMacro > 0.64 && nMeso > 0.58) {
            tmp.lerp(C_MEADOW_DRY, (nMacro - 0.64) * 1.1);
          }
        } else if (h < 38.0) {
          const t = (h - 18.0) / 20.0;
          tmp.copy(C_MEADOW_LUSH).lerp(C_PINE_MOSS, t);
          if (nMacro > 0.5) {
            tmp.lerp(C_ROCK_WARM, (nMacro - 0.5) * 0.55 * t);
          }
        } else {
          const t = Math.min(1, (h - 38.0) / 16.0);
          tmp.copy(C_PINE_MOSS).lerp(C_ROCK_WARM, t * 0.88);
        }

        // Rich darker mossy woodland soil under forest clusters
        if (h > 1.8 && forestAmt > 0.04) {
          tmp.lerp(C_FOREST_FLOOR, Math.min(0.66, forestAmt * 0.72));
        }

        // Exposed rocky coastal outcrops on hillside slopes & river bluffs
        const slopeThresh = 0.04 + (nMeso - 0.5) * 0.022;
        if (slope > slopeThresh && h > 1.6) {
          const rockMix = Math.min(0.9, (slope - slopeThresh) * 5.8);
          tmp.lerp(nMicro > 0.48 ? C_ROCK_WARM : C_ROCK_CRAG, rockMix);
        }

        // Subtle topographic shading & concave valley AO so rolling relief reads immediately
        const shade =
          1.0 +
          (nMeso - 0.5) * 0.14 +
          (nMicro - 0.5) * 0.08 -
          concavity * 0.075;
        tmp.multiplyScalar(Math.max(0.74, Math.min(1.16, shade)));

        colors[i * 3] = tmp.r;
        colors[i * 3 + 1] = tmp.g;
        colors[i * 3 + 2] = tmp.b;
      }
    }

    this.baseColors = new Float32Array(colors);
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    this.terrainGeo = geo;

    if (!this.terrainDetailTex) {
      this.terrainDetailTex = createTerrainDetailTexture();
    }

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      map: this.terrainDetailTex,
      roughness: 0.94,
      metalness: 0.0,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.receiveShadow = true;
    mesh.name = 'terrain';
    this.terrainMesh = mesh;
    this.group.add(mesh);
  }

  private buildWaterSurface(): void {
    // Smooth bilinear depth map packed directly from heightmap -> zero triangular sawtooth foam
    const data = new Uint8Array(TERRAIN_RES * TERRAIN_RES * 4);
    for (let iz = 0; iz < TERRAIN_RES; iz++) {
      const row = TERRAIN_RES - 1 - iz;
      for (let ix = 0; ix < TERRAIN_RES; ix++) {
        const h = this.heights[iz * TERRAIN_RES + ix];
        const depth = WATER_LEVEL - h;
        const r = Math.max(0, Math.min(255, Math.round((depth / 11.0) * 255)));
        const g = Math.max(0, Math.min(255, Math.round(((depth + 0.4) / 2.6) * 255)));
        const idx = (row * TERRAIN_RES + ix) * 4;
        data[idx] = r;
        data[idx + 1] = g;
        data[idx + 2] = 0;
        data[idx + 3] = 255;
      }
    }

    const depthTex = new THREE.DataTexture(data, TERRAIN_RES, TERRAIN_RES, THREE.RGBAFormat);
    depthTex.minFilter = THREE.LinearFilter;
    depthTex.magFilter = THREE.LinearFilter;
    depthTex.wrapS = THREE.ClampToEdgeWrapping;
    depthTex.wrapT = THREE.ClampToEdgeWrapping;
    depthTex.needsUpdate = true;
    this.waterDepthTex = depthTex;

    const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, 96, 96);
    geo.rotateX(-Math.PI / 2);

    const waterMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uDepthMap: { value: depthTex },
        uTime: { value: 0 },
        uWaveDetail: { value: this.waterWaveDetail },
        uSunDir: { value: new THREE.Vector3(0.35, 0.72, 0.55).normalize() },
        uSunColor: { value: new THREE.Color('#FFF4DE') },
        uHorizonColor: { value: new THREE.Color('#CEE3F2') },
        uZenithColor: { value: new THREE.Color('#4C92D4') },
        uFogColor: { value: new THREE.Color('#CEE3F2') },
        uFogNear: { value: 680.0 },
        uFogFar: { value: 2250.0 },
        uNightFactor: { value: 0.0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying float vFogDepth;

        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          vec4 mvPos = viewMatrix * worldPos;
          vFogDepth = -mvPos.z;
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform sampler2D uDepthMap;
        uniform float uTime;
        uniform float uWaveDetail;
        uniform vec3 uSunDir;
        uniform vec3 uSunColor;
        uniform vec3 uHorizonColor;
        uniform vec3 uZenithColor;
        uniform vec3 uFogColor;
        uniform float uFogNear;
        uniform float uFogFar;
        uniform float uNightFactor;

        varying vec2 vUv;
        varying vec3 vWorldPos;
        varying float vFogDepth;

        float hash21(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        float noise2(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          float a = hash21(i);
          float b = hash21(i + vec2(1.0, 0.0));
          float c = hash21(i + vec2(0.0, 1.0));
          float d = hash21(i + vec2(1.0, 1.0));
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        void main() {
          vec4 depthSample = texture2D(uDepthMap, vUv);
          float fineDepth = depthSample.g * 2.6 - 0.4; // -0.4m .. +2.2m
          float broadDepth = depthSample.r * 11.0;
          float depth = max(fineDepth, broadDepth);

          if (fineDepth < -0.05) discard;

          vec2 wp = vWorldPos.xz;

          // Multi-frequency animated ripples (natural ocean surface texture, cheap on SwiftShader)
          float t = uTime * 0.72;
          float w1 = sin(wp.x * 0.16 + wp.y * 0.11 + t * 1.45) * cos(wp.y * 0.14 - wp.x * 0.08 - t * 1.15);
          float w2 = sin(wp.x * 0.38 - wp.y * 0.31 - t * 2.1) * 0.55;
          float n1 = noise2(wp * 0.11 + vec2(t * 0.32, -t * 0.24)) - 0.5;
          float n2 = noise2(wp * 0.28 + vec2(-t * 0.45, t * 0.38)) - 0.5;
          float rippleScale = (0.055 + 0.045 * uWaveDetail) * smoothstep(0.0, 1.0, fineDepth);

          vec3 N = normalize(vec3(
            (w1 * 0.55 + w2 * 0.65 + n1 * 0.8 + n2 * 0.5) * rippleScale,
            1.0,
            (w1 * 0.45 - w2 * 0.75 + n1 * 0.65 - n2 * 0.55) * rippleScale
          ));

          vec3 V = normalize(cameraPosition - vWorldPos);
          float NdotV = max(dot(N, V), 0.001);
          float fresnel = pow(1.0 - NdotV, 3.6);

          // TRUE LINEAR coastal water colors (so ACES + sRGB matches deep marine references!)
          vec3 cShallowDay = vec3(0.055, 0.235, 0.245); // clear coastal turquoise
          vec3 cMidDay     = vec3(0.018, 0.095, 0.148); // harbor teal
          vec3 cDeepDay    = vec3(0.009, 0.042, 0.088); // deep bay marine blue

          vec3 cShallowNight = vec3(0.008, 0.024, 0.042);
          vec3 cMidNight     = vec3(0.004, 0.012, 0.028);
          vec3 cDeepNight    = vec3(0.002, 0.006, 0.018);

          vec3 cShallow = mix(cShallowDay, cShallowNight, uNightFactor);
          vec3 cMid     = mix(cMidDay, cMidNight, uNightFactor);
          vec3 cDeep    = mix(cDeepDay, cDeepNight, uNightFactor);

          float midT = smoothstep(0.18, 2.2, depth);
          float deepT = smoothstep(1.8, 6.8, depth);
          vec3 waterCol = mix(cShallow, cMid, midT);
          waterCol = mix(waterCol, cDeep, deepT);

          // Subtle wave crest/trough light modulation
          waterCol *= 0.90 + 0.16 * (w1 * 0.5 + n1 + n2 * 0.5);

          // Fresnel sky reflection (already linear uHorizonColor / uZenithColor)
          vec3 skyRefl = mix(uHorizonColor, uZenithColor, 0.48 + 0.28 * (1.0 - NdotV));
          float reflStrength = mix(0.08, 0.48, fresnel) * mix(0.85, 0.52, uNightFactor);
          waterCol = mix(waterCol, skyRefl * 0.72, reflStrength);

          // Crisp sun / moon specular glints
          vec3 H = normalize(normalize(uSunDir) + V);
          float specBroad = pow(max(dot(N, H), 0.0), 48.0) * 0.16;
          float specSharp = pow(max(dot(N, H), 0.0), 220.0) * 0.58;
          waterCol += uSunColor * (specBroad + specSharp) * mix(0.95, 0.35, uNightFactor);

          // Tight crisp organic shoreline foam kiss right along depth 0.0 .. 0.30m
          float shoreNoise = noise2(wp * 0.22 + vec2(t * 0.42, t * 0.25));
          float edgeBand = 1.0 - smoothstep(0.01, 0.24 + shoreNoise * 0.14, fineDepth);
          float rippleFoam = smoothstep(0.58, 0.92, sin(fineDepth * 26.0 - uTime * 2.2 + shoreNoise * 5.0))
                           * (1.0 - smoothstep(0.08, 0.50, fineDepth)) * 0.46;
          float foamMask = clamp(edgeBand * (0.65 + shoreNoise * 0.38) + rippleFoam, 0.0, 1.0);
          foamMask *= smoothstep(-0.02, 0.04, fineDepth);

          // Linear foam color (clean sunlit seafoam by day, subtle moonlit rim by night)
          vec3 foamCol = mix(vec3(0.76, 0.85, 0.84), vec3(0.04, 0.065, 0.11), uNightFactor);
          waterCol = mix(waterCol, foamCol, foamMask * 0.80);

          // Seamless edge feathering over wet beach sand
          float alpha = smoothstep(-0.03, 0.18, fineDepth);
          alpha = mix(alpha * 0.76, 0.96, smoothstep(0.14, 1.8, depth));
          alpha = max(alpha, foamMask * 0.82);

          // Atmospheric distance fog
          float fogFactor = smoothstep(uFogNear, uFogFar, vFogDepth);
          waterCol = mix(waterCol, uFogColor, fogFactor);

          gl_FragColor = vec4(waterCol, alpha);
          #include <colorspace_fragment>
        }
      `,
    });

    this.waterMat = waterMat;
    const mesh = new THREE.Mesh(geo, waterMat);
    mesh.position.y = WATER_LEVEL + 0.04;
    mesh.renderOrder = 1;
    mesh.name = 'water';
    this.group.add(mesh);
  }

  /**
   * Rebuilds natural conifer + broadleaf forests using instanced multi-part silhouettes
   * with GPU wind sway, dense hillside clusters, and scenic riverbank/valley copses
   * (all cleanly cleared around roads and buildings via exclusions).
   */
  buildTrees(exclusionPoints: Array<{ x: number; z: number; r: number }> | null): void {
    for (const obj of this.treeMeshes) {
      this.group.remove(obj);
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    }
    this.treeMeshes = [];

    const totalRaw = Math.floor(this.rawTrees.length / 5);
    if (totalRaw === 0) return;

    const isBlocked = (tx: number, tz: number): boolean => {
      if (!exclusionPoints) return false;
      for (let j = 0; j < exclusionPoints.length; j++) {
        const ex = exclusionPoints[j];
        const dx = tx - ex.x;
        const dz = tz - ex.z;
        if (dx * dx + dz * dz < ex.r * ex.r) return true;
      }
      return false;
    };

    interface TreeInstance {
      x: number;
      y: number;
      z: number;
      scale: number;
      yaw: number;
      colorIdx: number;
    }

    const conifers: TreeInstance[] = [];
    const broadleafs: TreeInstance[] = [];

    const extraPerAnchor = this.treeDensityMult >= 2.1 ? 2 : this.treeDensityMult >= 1.4 ? 1 : 0;

    for (let i = 0; i < totalRaw; i++) {
      const tx = this.rawTrees[i * 5];
      const ty = this.rawTrees[i * 5 + 1];
      const tz = this.rawTrees[i * 5 + 2];
      const scale = this.rawTrees[i * 5 + 3];
      const variant = Math.floor(this.rawTrees[i * 5 + 4]);

      if (isBlocked(tx, tz)) continue;

      const coniferBias = ty > 14.5 ? 0.72 : 0.42;
      const rType = hash2D(i, 17, this.seed);
      const isConifer = rType < coniferBias;
      const yaw = (i * 1.6180339) % (Math.PI * 2);

      if (isConifer) {
        conifers.push({
          x: tx,
          y: ty,
          z: tz,
          scale: scale * 1.2,
          yaw,
          colorIdx: variant % CONIFER_COLORS.length,
        });
      } else {
        const blossomRoll = hash2D(i, 91, this.seed);
        const colIdx =
          ty < 16 && blossomRoll < 0.055
            ? BROADLEAF_COLORS.length - 1
            : (variant + i) % (BROADLEAF_COLORS.length - 1);
        broadleafs.push({
          x: tx,
          y: ty,
          z: tz,
          scale: scale * 1.14,
          yaw,
          colorIdx: colIdx,
        });
      }

      for (let e = 0; e < extraPerAnchor; e++) {
        const ang = hash2D(i, 31 + e * 7, this.seed) * Math.PI * 2;
        const dist = 5.5 + hash2D(i, 53 + e * 11, this.seed) * 11.0;
        const sx = tx + Math.cos(ang) * dist;
        const sz = tz + Math.sin(ang) * dist;
        if (!this.isInBounds(sx, sz, 24)) continue;
        const sy = this.sampleHeight(sx, sz);
        if (sy < WATER_LEVEL + 1.8 || sy > 54) continue;
        if (isBlocked(sx, sz)) continue;

        const subScale = scale * (0.72 + hash2D(i, 71 + e * 13, this.seed) * 0.56);
        const subYaw = ang * 1.7;
        const subConifer = hash2D(i, 83 + e * 5, this.seed) < (sy > 13.5 ? 0.75 : 0.45);
        if (subConifer) {
          conifers.push({
            x: sx,
            y: sy,
            z: sz,
            scale: subScale * 1.15,
            yaw: subYaw,
            colorIdx: (variant + e + 1) % CONIFER_COLORS.length,
          });
        } else {
          broadleafs.push({
            x: sx,
            y: sy,
            z: sz,
            scale: subScale * 1.06,
            yaw: subYaw,
            colorIdx: (variant + e) % (BROADLEAF_COLORS.length - 1),
          });
        }
      }
    }

    // Add tight organic riverbank & valley woodland copses (clustered 3-5 trees per grove, cleared on build!)
    const groveAnchors = Math.round(135 * Math.min(1.5, this.treeDensityMult * 0.65));
    const treesPerGrove = this.treeDensityMult >= 2.0 ? 4 : this.treeDensityMult >= 1.4 ? 3 : 2;
    for (let k = 0; k < groveAnchors; k++) {
      const gx = -520 + hash2D(k, 211, this.seed) * 1120;
      const gz = -560 + hash2D(k, 307, this.seed) * 980;
      if (!this.isInBounds(gx, gz, 28)) continue;
      if (Math.abs(gx - 240) < 38 && gz < -210) continue;
      const gh = this.sampleHeight(gx, gz);
      if (gh < WATER_LEVEL + 2.0 || gh > 38) continue;
      const nearRiver = gh < 6.8 && this.isNearWater(gx, gz, 84);
      const groveNoise = fbm(gx * 0.0055 + 9.2, gz * 0.0055 - 4.7, this.seed + 401, 3);
      if (!nearRiver && groveNoise < 0.59) continue;

      for (let m = 0; m < treesPerGrove; m++) {
        const ang = hash2D(k, 811 + m * 17, this.seed) * Math.PI * 2;
        const rad = m === 0 ? 0 : 4.5 + hash2D(k, 907 + m * 23, this.seed) * 11.5;
        const tx = gx + Math.cos(ang) * rad;
        const tz = gz + Math.sin(ang) * rad;
        if (!this.isInBounds(tx, tz, 24)) continue;
        if (Math.abs(tx - 240) < 32 && tz < -215) continue;
        const th = this.sampleHeight(tx, tz);
        if (th < WATER_LEVEL + 1.8 || th > 42) continue;
        if (isBlocked(tx, tz)) continue;

        const sc = 0.8 + hash2D(k + m * 31, 419, this.seed) * 0.64;
        const yaw = hash2D(k + m * 19, 521, this.seed) * Math.PI * 2;
        const isConifer = hash2D(k + m * 13, 613, this.seed) < (nearRiver ? 0.34 : 0.52);
        if (isConifer) {
          conifers.push({
            x: tx,
            y: th,
            z: tz,
            scale: sc * 1.16,
            yaw,
            colorIdx: (k + m) % CONIFER_COLORS.length,
          });
        } else {
          const blossom = hash2D(k + m * 7, 709, this.seed) < 0.05;
          broadleafs.push({
            x: tx,
            y: th,
            z: tz,
            scale: sc * 1.08,
            yaw,
            colorIdx: blossom ? BROADLEAF_COLORS.length - 1 : (k + m) % (BROADLEAF_COLORS.length - 1),
          });
        }
      }
    }

    const dummy = new THREE.Object3D();

    const spawnTreeGroup = (
      list: TreeInstance[],
      canopyGeo: THREE.BufferGeometry,
      palette: THREE.Color[],
      trunkH: number,
      trunkRTop: number,
      trunkRBot: number,
      swayAmp: number
    ) => {
      if (list.length === 0) return;

      const trunkGeo = new THREE.CylinderGeometry(trunkRTop, trunkRBot, trunkH, 6);
      trunkGeo.translate(0, trunkH * 0.5, 0);
      const trunkMat = new THREE.MeshStandardMaterial({
        color: '#6A5342',
        roughness: 0.94,
        metalness: 0.0,
      });

      const canopyMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        vertexColors: true,
        roughness: 0.88,
        metalness: 0.0,
      });
      attachTreeWindSway(canopyMat, this.windTimeUniform, swayAmp);

      const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, list.length);
      const canopies = new THREE.InstancedMesh(canopyGeo, canopyMat, list.length);
      canopies.castShadow = true;
      canopies.receiveShadow = true;

      for (let k = 0; k < list.length; k++) {
        const it = list[k];
        dummy.position.set(it.x, it.y - 0.35, it.z);
        dummy.rotation.set(0, it.yaw, 0);
        const hStretch = 0.9 + ((k * 37) % 23) * 0.01;
        dummy.scale.set(it.scale, it.scale * hStretch, it.scale);
        dummy.updateMatrix();
        trunks.setMatrixAt(k, dummy.matrix);
        canopies.setMatrixAt(k, dummy.matrix);
        canopies.setColorAt(k, palette[it.colorIdx % palette.length]);
      }

      trunks.instanceMatrix.needsUpdate = true;
      canopies.instanceMatrix.needsUpdate = true;
      if (canopies.instanceColor) canopies.instanceColor.needsUpdate = true;

      this.treeMeshes.push(trunks, canopies);
      this.group.add(trunks, canopies);
    };

    spawnTreeGroup(conifers, createConiferCanopyGeo(), CONIFER_COLORS, 2.8, 0.24, 0.48, 0.22);
    spawnTreeGroup(broadleafs, createBroadleafCanopyGeo(), BROADLEAF_COLORS, 3.0, 0.28, 0.52, 0.26);
  }

  applyOverlay(overlay: OverlayType, field?: Float32Array): void {
    if (!this.terrainGeo) return;
    const colorAttr = this.terrainGeo.attributes.color as THREE.BufferAttribute;
    const arr = colorAttr.array as Float32Array;

    if (overlay === 'none') {
      arr.set(this.baseColors);
      colorAttr.needsUpdate = true;
      return;
    }

    const pos = this.terrainGeo.attributes.position as THREE.BufferAttribute;

    if (overlay === 'traffic' || !field) {
      for (let i = 0; i < pos.count; i++) {
        const r0 = this.baseColors[i * 3];
        const g0 = this.baseColors[i * 3 + 1];
        const b0 = this.baseColors[i * 3 + 2];
        const lum = r0 * 0.299 + g0 * 0.587 + b0 * 0.114;
        const neutral = Math.min(0.86, lum * 1.12 + 0.12);
        arr[i * 3] = neutral * 0.82 + r0 * 0.18;
        arr[i * 3 + 1] = neutral * 0.84 + g0 * 0.16;
        arr[i * 3 + 2] = neutral * 0.87 + b0 * 0.13;
      }
      colorAttr.needsUpdate = true;
      return;
    }

    const ovColor = new THREE.Color();
    const baseColor = new THREE.Color();

    for (let i = 0; i < pos.count; i++) {
      const h = this.heights[i];
      const r0 = this.baseColors[i * 3];
      const g0 = this.baseColors[i * 3 + 1];
      const b0 = this.baseColors[i * 3 + 2];

      if (h < WATER_LEVEL - 0.4 && overlay !== 'pollution') {
        arr[i * 3] = r0;
        arr[i * 3 + 1] = g0;
        arr[i * 3 + 2] = b0;
        continue;
      }

      const wx = pos.getX(i);
      const wz = pos.getZ(i);
      const gx = Math.max(0, Math.min(FIELD_RES - 1.001, (wx + WORLD_HALF) / FIELD_CELL_SIZE - 0.5));
      const gz = Math.max(0, Math.min(FIELD_RES - 1.001, (wz + WORLD_HALF) / FIELD_CELL_SIZE - 0.5));
      const x0 = Math.floor(gx);
      const z0 = Math.floor(gz);
      const fx = gx - x0;
      const fz = gz - z0;
      const i00 = z0 * FIELD_RES + x0;
      const val =
        (field[i00] * (1 - fx) + field[i00 + 1] * fx) * (1 - fz) +
        (field[i00 + FIELD_RES] * (1 - fx) + field[i00 + FIELD_RES + 1] * fx) * fz;

      const alpha = sampleOverlayColor(overlay, val, ovColor);
      const lum = r0 * 0.299 + g0 * 0.587 + b0 * 0.114;
      const desat = Math.min(0.84, lum * 1.1 + 0.1);
      baseColor.setRGB(desat * 0.78 + r0 * 0.22, desat * 0.78 + g0 * 0.22, desat * 0.8 + b0 * 0.2);
      baseColor.lerp(ovColor, alpha);

      arr[i * 3] = baseColor.r;
      arr[i * 3 + 1] = baseColor.g;
      arr[i * 3 + 2] = baseColor.b;
    }

    colorAttr.needsUpdate = true;
  }

  syncEnvironment(env: WaterEnvUniforms): void {
    if (!this.waterMat) return;
    const u = this.waterMat.uniforms;
    (u.uHorizonColor.value as THREE.Color).copy(env.horizonColor);
    (u.uZenithColor.value as THREE.Color).copy(env.zenithColor);
    (u.uSunDir.value as THREE.Vector3).copy(env.sunDir).normalize();
    (u.uSunColor.value as THREE.Color).copy(env.sunColor);
    (u.uFogColor.value as THREE.Color).copy(env.fogColor);
    u.uFogNear.value = env.fogNear;
    u.uFogFar.value = env.fogFar;
    u.uNightFactor.value = env.emissiveStrength;
  }

  update(dt: number, _emissiveStrength: number): void {
    this.waveTime += dt;
    this.windTimeUniform.value = this.waveTime;
    if (this.waterMat) {
      this.waterMat.uniforms.uTime.value = this.waveTime;
    }
  }

  private clear(): void {
    while (this.group.children.length > 0) {
      const child = this.group.children[0];
      this.group.remove(child);
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }
    if (this.waterDepthTex) {
      this.waterDepthTex.dispose();
      this.waterDepthTex = null;
    }
    this.terrainGeo = null;
    this.terrainMesh = null;
    this.waterMat = null;
    this.treeMeshes = [];
  }
}
