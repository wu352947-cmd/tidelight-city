import type { CubicBezier, Vec2 } from './types.ts';

export function vec2Dist(a: Vec2, b: Vec2): number {
  return Math.hypot(b.x - a.x, b.z - a.z);
}

export function vec2DistSq(a: Vec2, b: Vec2): number {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  return dx * dx + dz * dz;
}

export function vec2Lerp(a: Vec2, b: Vec2, t: number): Vec2 {
  return { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t };
}

export function makeStraightBezier(p0: Vec2, p1: Vec2): CubicBezier {
  return {
    p0: { x: p0.x, z: p0.z },
    c0: vec2Lerp(p0, p1, 1 / 3),
    c1: vec2Lerp(p0, p1, 2 / 3),
    p1: { x: p1.x, z: p1.z },
  };
}

export function makeQuadraticAsCubic(p0: Vec2, ctrl: Vec2, p1: Vec2): CubicBezier {
  return {
    p0: { x: p0.x, z: p0.z },
    c0: {
      x: p0.x + (2 / 3) * (ctrl.x - p0.x),
      z: p0.z + (2 / 3) * (ctrl.z - p0.z),
    },
    c1: {
      x: p1.x + (2 / 3) * (ctrl.x - p1.x),
      z: p1.z + (2 / 3) * (ctrl.z - p1.z),
    },
    p1: { x: p1.x, z: p1.z },
  };
}

export function evalBezier(b: CubicBezier, t: number): Vec2 {
  const u = 1 - t;
  const u2 = u * u;
  const u3 = u2 * u;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: u3 * b.p0.x + 3 * u2 * t * b.c0.x + 3 * u * t2 * b.c1.x + t3 * b.p1.x,
    z: u3 * b.p0.z + 3 * u2 * t * b.c0.z + 3 * u * t2 * b.c1.z + t3 * b.p1.z,
  };
}

export function evalBezierDerivative(b: CubicBezier, t: number): Vec2 {
  const u = 1 - t;
  const u2 = u * u;
  const t2 = t * t;
  return {
    x:
      3 * u2 * (b.c0.x - b.p0.x) +
      6 * u * t * (b.c1.x - b.c0.x) +
      3 * t2 * (b.p1.x - b.c1.x),
    z:
      3 * u2 * (b.c0.z - b.p0.z) +
      6 * u * t * (b.c1.z - b.c0.z) +
      3 * t2 * (b.p1.z - b.c1.z),
  };
}

export function evalBezierTangent(b: CubicBezier, t: number): Vec2 {
  let d = evalBezierDerivative(b, t);
  let len = Math.hypot(d.x, d.z);
  if (len < 1e-6) {
    // Fallback near degenerate control handles
    const eps = t < 0.5 ? 0.005 : -0.005;
    const pA = evalBezier(b, t);
    const pB = evalBezier(b, Math.max(0, Math.min(1, t + eps)));
    d = { x: (pB.x - pA.x) * Math.sign(eps), z: (pB.z - pA.z) * Math.sign(eps) };
    len = Math.hypot(d.x, d.z);
    if (len < 1e-6) {
      d = { x: b.p1.x - b.p0.x, z: b.p1.z - b.p0.z };
      len = Math.hypot(d.x, d.z) || 1;
    }
  }
  return { x: d.x / len, z: d.z / len };
}

/**
 * Right-hand normal in Three.js Y-up XZ coordinates:
 * forward × up = (tx, 0, tz) × (0, 1, 0) = (-tz, 0, tx).
 * Example: heading North (0, -1) -> right is East (+1, 0).
 */
export function rightNormalFromTangent(tan: Vec2): Vec2 {
  return { x: -tan.z, z: tan.x };
}

export function evalBezierRightNormal(b: CubicBezier, t: number): Vec2 {
  return rightNormalFromTangent(evalBezierTangent(b, t));
}

/** Exact De Casteljau split of a cubic Bezier at t in (0, 1). */
export function splitBezier(b: CubicBezier, t: number): [CubicBezier, CubicBezier] {
  const p01 = vec2Lerp(b.p0, b.c0, t);
  const p12 = vec2Lerp(b.c0, b.c1, t);
  const p23 = vec2Lerp(b.c1, b.p1, t);
  const p012 = vec2Lerp(p01, p12, t);
  const p123 = vec2Lerp(p12, p23, t);
  const mid = vec2Lerp(p012, p123, t);
  return [
    { p0: { ...b.p0 }, c0: p01, c1: p012, p1: mid },
    { p0: { ...mid }, c0: p123, c1: p23, p1: { ...b.p1 } },
  ];
}

export function reverseBezier(b: CubicBezier): CubicBezier {
  return {
    p0: { ...b.p1 },
    c0: { ...b.c1 },
    c1: { ...b.c0 },
    p1: { ...b.p0 },
  };
}

export interface BezierLUT {
  bezier: CubicBezier;
  samples: number;
  ts: Float32Array;
  arcLengths: Float32Array;
  xs: Float32Array;
  zs: Float32Array;
  length: number;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export function buildBezierLUT(bezier: CubicBezier, samples = 32): BezierLUT {
  const count = samples + 1;
  const ts = new Float32Array(count);
  const arcLengths = new Float32Array(count);
  const xs = new Float32Array(count);
  const zs = new Float32Array(count);

  let total = 0;
  let prev = evalBezier(bezier, 0);
  let minX = prev.x;
  let maxX = prev.x;
  let minZ = prev.z;
  let maxZ = prev.z;

  ts[0] = 0;
  arcLengths[0] = 0;
  xs[0] = prev.x;
  zs[0] = prev.z;

  for (let i = 1; i <= samples; i++) {
    const t = i / samples;
    const p = evalBezier(bezier, t);
    total += Math.hypot(p.x - prev.x, p.z - prev.z);
    ts[i] = t;
    arcLengths[i] = total;
    xs[i] = p.x;
    zs[i] = p.z;
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.z < minZ) minZ = p.z;
    if (p.z > maxZ) maxZ = p.z;
    prev = p;
  }

  return {
    bezier,
    samples,
    ts,
    arcLengths,
    xs,
    zs,
    length: total,
    minX,
    maxX,
    minZ,
    maxZ,
  };
}

export function lutTAtDistance(lut: BezierLUT, dist: number): number {
  if (dist <= 0 || lut.length <= 1e-6) return 0;
  if (dist >= lut.length) return 1;
  let lo = 0;
  let hi = lut.samples;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (lut.arcLengths[mid] <= dist) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const s0 = lut.arcLengths[lo];
  const s1 = lut.arcLengths[hi];
  const alpha = s1 > s0 ? (dist - s0) / (s1 - s0) : 0;
  return lut.ts[lo] + (lut.ts[hi] - lut.ts[lo]) * alpha;
}

export function lutDistanceAtT(lut: BezierLUT, t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  const f = clamped * lut.samples;
  const idx = Math.min(lut.samples - 1, Math.floor(f));
  const alpha = f - idx;
  return lut.arcLengths[idx] + (lut.arcLengths[idx + 1] - lut.arcLengths[idx]) * alpha;
}

export interface ClosestPointResult {
  t: number;
  s: number;
  dist: number;
  point: Vec2;
}

export function closestPointOnBezier(lut: BezierLUT, p: Vec2): ClosestPointResult {
  let bestIdx = 0;
  let bestDistSq = Infinity;
  for (let i = 0; i <= lut.samples; i++) {
    const dx = lut.xs[i] - p.x;
    const dz = lut.zs[i] - p.z;
    const d2 = dx * dx + dz * dz;
    if (d2 < bestDistSq) {
      bestDistSq = d2;
      bestIdx = i;
    }
  }

  let lo = Math.max(0, (bestIdx - 1) / lut.samples);
  let hi = Math.min(1, (bestIdx + 1) / lut.samples);

  // Golden-section search refinement (14 iterations -> ~1e-4 precision on t)
  const invPhi = 0.6180339887498949;
  for (let iter = 0; iter < 14; iter++) {
    const m1 = hi - (hi - lo) * invPhi;
    const m2 = lo + (hi - lo) * invPhi;
    const d1 = vec2DistSq(evalBezier(lut.bezier, m1), p);
    const d2 = vec2DistSq(evalBezier(lut.bezier, m2), p);
    if (d1 < d2) {
      hi = m2;
    } else {
      lo = m1;
    }
  }

  const t = 0.5 * (lo + hi);
  const point = evalBezier(lut.bezier, t);
  const dist = vec2Dist(point, p);
  return {
    t,
    s: lutDistanceAtT(lut, t),
    dist,
    point,
  };
}

export interface CurveIntersection {
  tA: number;
  tB: number;
  point: Vec2;
}

function segmentSegmentIntersect(
  a0x: number,
  a0z: number,
  a1x: number,
  a1z: number,
  b0x: number,
  b0z: number,
  b1x: number,
  b1z: number
): { u: number; v: number; x: number; z: number } | null {
  const rX = a1x - a0x;
  const rZ = a1z - a0z;
  const sX = b1x - b0x;
  const sZ = b1z - b0z;
  const denom = rX * sZ - rZ * sX;
  if (Math.abs(denom) < 1e-8) return null;

  const qpx = b0x - a0x;
  const qpz = b0z - a0z;
  const u = (qpx * sZ - qpz * sX) / denom;
  const v = (qpx * rZ - qpz * rX) / denom;
  if (u >= 0 && u <= 1 && v >= 0 && v <= 1) {
    return { u, v, x: a0x + u * rX, z: a0z + u * rZ };
  }
  return null;
}

/**
 * Finds all crossing points between two cubic Beziers using LUT polylines + Newton refinement.
 */
export function intersectBeziers(
  lutA: BezierLUT,
  lutB: BezierLUT,
  margin = 0.5
): CurveIntersection[] {
  // Fast AABB reject
  if (
    lutA.maxX + margin < lutB.minX ||
    lutA.minX - margin > lutB.maxX ||
    lutA.maxZ + margin < lutB.minZ ||
    lutA.minZ - margin > lutB.maxZ
  ) {
    return [];
  }

  const hits: CurveIntersection[] = [];
  const nA = lutA.samples;
  const nB = lutB.samples;

  for (let i = 0; i < nA; i++) {
    const a0x = lutA.xs[i];
    const a0z = lutA.zs[i];
    const a1x = lutA.xs[i + 1];
    const a1z = lutA.zs[i + 1];
    const aMinX = Math.min(a0x, a1x);
    const aMaxX = Math.max(a0x, a1x);
    const aMinZ = Math.min(a0z, a1z);
    const aMaxZ = Math.max(a0z, a1z);

    for (let j = 0; j < nB; j++) {
      const b0x = lutB.xs[j];
      const b0z = lutB.zs[j];
      const b1x = lutB.xs[j + 1];
      const b1z = lutB.zs[j + 1];
      if (
        aMaxX < Math.min(b0x, b1x) ||
        aMinX > Math.max(b0x, b1x) ||
        aMaxZ < Math.min(b0z, b1z) ||
        aMinZ > Math.max(b0z, b1z)
      ) {
        continue;
      }
      const res = segmentSegmentIntersect(a0x, a0z, a1x, a1z, b0x, b0z, b1x, b1z);
      if (!res) continue;

      let tA = lutA.ts[i] + (lutA.ts[i + 1] - lutA.ts[i]) * res.u;
      let tB = lutB.ts[j] + (lutB.ts[j + 1] - lutB.ts[j]) * res.v;

      // 4 iterations of 2D Newton refinement to land accurately on exact cubic curves
      for (let k = 0; k < 4; k++) {
        const pA = evalBezier(lutA.bezier, tA);
        const pB = evalBezier(lutB.bezier, tB);
        const fx = pA.x - pB.x;
        const fz = pA.z - pB.z;
        if (fx * fx + fz * fz < 1e-8) break;
        const dA = evalBezierDerivative(lutA.bezier, tA);
        const dB = evalBezierDerivative(lutB.bezier, tB);
        const det = dA.x * (-dB.z) - dA.z * (-dB.x);
        if (Math.abs(det) < 1e-8) break;
        const dtA = (fx * (-dB.z) - fz * (-dB.x)) / det;
        const dtB = (dA.x * fz - dA.z * fx) / det;
        tA = Math.max(0, Math.min(1, tA - dtA));
        tB = Math.max(0, Math.min(1, tB - dtB));
      }

      const pt = evalBezier(lutA.bezier, tA);
      // Deduplicate near-identical crossings
      const duplicate = hits.some(
        (h) => Math.abs(h.tA - tA) < 0.015 && Math.abs(h.tB - tB) < 0.015
      );
      if (!duplicate) {
        hits.push({ tA, tB, point: pt });
      }
    }
  }

  hits.sort((a, b) => a.tA - b.tA);
  return hits;
}
