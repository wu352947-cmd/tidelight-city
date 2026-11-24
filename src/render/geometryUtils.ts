import * as THREE from 'three';

/**
 * Merges multiple closed BufferGeometries into a single watertight non-indexed BufferGeometry
 * preserving position, normal, uv, and vertex color (white fallback if absent).
 */
export function mergeClosedGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  let totalVerts = 0;
  const prepared: THREE.BufferGeometry[] = [];

  for (const raw of geos) {
    const g = raw.index ? raw.toNonIndexed() : raw.clone();
    if (!g.attributes.normal) g.computeVertexNormals();
    const count = g.attributes.position.count;
    if (!g.attributes.uv) {
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2));
    }
    if (!g.attributes.color) {
      const col = new Float32Array(count * 3);
      col.fill(1);
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    }
    prepared.push(g);
    totalVerts += count;
  }

  const pos = new Float32Array(totalVerts * 3);
  const norm = new Float32Array(totalVerts * 3);
  const uv = new Float32Array(totalVerts * 2);
  const color = new Float32Array(totalVerts * 3);

  let vOffset = 0;
  for (const g of prepared) {
    const p = g.attributes.position as THREE.BufferAttribute;
    const n = g.attributes.normal as THREE.BufferAttribute;
    const u = g.attributes.uv as THREE.BufferAttribute;
    const c = g.attributes.color as THREE.BufferAttribute;
    const count = p.count;

    pos.set(p.array as Float32Array, vOffset * 3);
    norm.set(n.array as Float32Array, vOffset * 3);
    uv.set(u.array as Float32Array, vOffset * 2);
    color.set(c.array as Float32Array, vOffset * 3);
    vOffset += count;
    g.dispose();
  }

  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(norm, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  out.setAttribute('color', new THREE.BufferAttribute(color, 3));
  return out;
}

/**
 * Applies baked-style vertical Ambient Occlusion into vertex colors of a BufferGeometry.
 */
export function applyVerticalAO(
  geo: THREE.BufferGeometry,
  minY: number,
  maxY: number,
  bottomShade = 0.74,
  topShade = 1.04
): THREE.BufferGeometry {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const count = pos.count;
  const existing = geo.attributes.color as THREE.BufferAttribute | undefined;
  const colors = existing ? (existing.array as Float32Array) : new Float32Array(count * 3);
  const span = Math.max(1e-4, maxY - minY);

  for (let i = 0; i < count; i++) {
    const y = pos.getY(i);
    const t = Math.max(0, Math.min(1, (y - minY) / span));
    const s = bottomShade + (topShade - bottomShade) * Math.pow(t, 0.72);
    if (existing) {
      colors[i * 3] *= s;
      colors[i * 3 + 1] *= s;
      colors[i * 3 + 2] *= s;
    } else {
      colors[i * 3] = s;
      colors[i * 3 + 1] = s;
      colors[i * 3 + 2] = s;
    }
  }
  if (!existing) {
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  } else {
    existing.needsUpdate = true;
  }
  return geo;
}

function buildPolyGeometry(
  positions: number[],
  colors?: number[]
): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  const count = positions.length / 3;
  const uvs = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    uvs[i * 2] = positions[i * 3] + 0.5;
    uvs[i * 2 + 1] = positions[i * 3 + 2] + 0.5;
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  if (colors) {
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  } else {
    applyVerticalAO(geo, -0.5, 0.5, 0.84, 1.03);
  }
  return geo;
}

type Pt3 = [number, number, number];

function pushTri(out: number[], a: Pt3, b: Pt3, c: Pt3): void {
  out.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2]);
}

function pushQuad(out: number[], a: Pt3, b: Pt3, c: Pt3, d: Pt3): void {
  pushTri(out, a, b, c);
  pushTri(out, a, c, d);
}

/**
 * Watertight closed gable roof prism in [-0.5, 0.5]^3, ridge running along X.
 */
export function createClosedGableRoofGeo(): THREE.BufferGeometry {
  const fl: Pt3 = [-0.5, -0.5, 0.5];
  const fr: Pt3 = [0.5, -0.5, 0.5];
  const br: Pt3 = [0.5, -0.5, -0.5];
  const bl: Pt3 = [-0.5, -0.5, -0.5];
  const rl: Pt3 = [-0.5, 0.5, 0];
  const rr: Pt3 = [0.5, 0.5, 0];

  const pos: number[] = [];
  // Front slope (+Z)
  pushQuad(pos, fl, fr, rr, rl);
  // Back slope (-Z)
  pushQuad(pos, br, bl, rl, rr);
  // Right gable end (+X)
  pushTri(pos, fr, br, rr);
  // Left gable end (-X)
  pushTri(pos, bl, fl, rl);
  // Closed bottom cap (-Y)
  pushQuad(pos, bl, br, fr, fl);

  return buildPolyGeometry(pos);
}

/**
 * Watertight closed hipped roof with horizontal ridge in [-0.5, 0.5]^3 (never a sharp pyramid tip).
 */
export function createClosedHipRoofGeo(ridgeRatio = 0.52): THREE.BufferGeometry {
  const r = Math.max(0.08, Math.min(0.46, ridgeRatio * 0.5));
  const fl: Pt3 = [-0.5, -0.5, 0.5];
  const fr: Pt3 = [0.5, -0.5, 0.5];
  const br: Pt3 = [0.5, -0.5, -0.5];
  const bl: Pt3 = [-0.5, -0.5, -0.5];
  const rl: Pt3 = [-r, 0.5, 0];
  const rr: Pt3 = [r, 0.5, 0];

  const pos: number[] = [];
  // Front slope
  pushQuad(pos, fl, fr, rr, rl);
  // Back slope
  pushQuad(pos, br, bl, rl, rr);
  // Right hip
  pushTri(pos, fr, br, rr);
  // Left hip
  pushTri(pos, bl, fl, rl);
  // Closed bottom cap
  pushQuad(pos, bl, br, fr, fl);

  return buildPolyGeometry(pos);
}

/**
 * Watertight closed single-slope shed roof / awning wedge in [-0.5, 0.5]^3.
 * High edge at -Z (y=+0.5), low edge at +Z (y=-0.5).
 */
export function createClosedShedRoofGeo(): THREE.BufferGeometry {
  const fl: Pt3 = [-0.5, -0.5, 0.5];
  const fr: Pt3 = [0.5, -0.5, 0.5];
  const brBot: Pt3 = [0.5, -0.5, -0.5];
  const blBot: Pt3 = [-0.5, -0.5, -0.5];
  const brTop: Pt3 = [0.5, 0.5, -0.5];
  const blTop: Pt3 = [-0.5, 0.5, -0.5];

  const pos: number[] = [];
  // Top sloped plane
  pushQuad(pos, fl, fr, brTop, blTop);
  // Back vertical face (-Z)
  pushQuad(pos, brBot, blBot, blTop, brTop);
  // Right side triangle (+X)
  pushTri(pos, fr, brBot, brTop);
  // Left side triangle (-X)
  pushTri(pos, blBot, fl, blTop);
  // Bottom closed cap (-Y)
  pushQuad(pos, blBot, brBot, fr, fl);

  return buildPolyGeometry(pos);
}

/**
 * Watertight closed multi-bay sawtooth roof for industrial factories in [-0.5, 0.5]^3.
 */
export function createClosedSawtoothRoofGeo(bays = 3): THREE.BufferGeometry {
  const pos: number[] = [];
  const stepX = 1.0 / bays;

  for (let i = 0; i < bays; i++) {
    const x0 = -0.5 + i * stepX;
    const x1 = x0 + stepX;
    // Slight inset overlap avoided by exact abutment
    const bfl: Pt3 = [x0, -0.5, 0.5];
    const bfr: Pt3 = [x1, -0.5, 0.5];
    const bbr: Pt3 = [x1, -0.5, -0.5];
    const bbl: Pt3 = [x0, -0.5, -0.5];
    // Vertical glazed clerestory face on x0 side, gentle slope down to x1
    const tfl: Pt3 = [x0 + stepX * 0.14, 0.5, 0.5];
    const tbl: Pt3 = [x0 + stepX * 0.14, 0.5, -0.5];

    // Gentle slope facing +X
    pushQuad(pos, bfr, bbr, tbl, tfl);
    // Steep face facing -X
    pushQuad(pos, bbl, bfl, tfl, tbl);
    // Front triangle (+Z)
    pushTri(pos, bfl, bfr, tfl);
    // Back triangle (-Z)
    pushTri(pos, bbr, bbl, tbl);
    // Bottom cap (-Y)
    pushQuad(pos, bbl, bbr, bfr, bfl);
  }

  return buildPolyGeometry(pos);
}

/**
 * Watertight closed multi-lobed broadleaf tree canopy with baked vertical AO.
 */
export function createBroadleafCanopyGeo(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];

  const main = new THREE.IcosahedronGeometry(2.35, 1);
  main.scale(1.06, 0.92, 1.02);
  main.translate(0, 4.75, 0);
  parts.push(main);

  const lobeA = new THREE.IcosahedronGeometry(1.75, 1);
  lobeA.scale(1.0, 0.86, 0.98);
  lobeA.translate(1.25, 3.85, 0.55);
  parts.push(lobeA);

  const lobeB = new THREE.IcosahedronGeometry(1.65, 1);
  lobeB.scale(0.98, 0.88, 1.02);
  lobeB.translate(-1.15, 3.95, -0.65);
  parts.push(lobeB);

  const crown = new THREE.IcosahedronGeometry(1.45, 1);
  crown.scale(1.0, 0.9, 1.0);
  crown.translate(-0.2, 5.9, 0.35);
  parts.push(crown);

  const merged = mergeClosedGeometries(parts);
  for (const p of parts) p.dispose();
  return applyVerticalAO(merged, 2.2, 7.2, 0.62, 1.08);
}

/**
 * Watertight closed 3-tier coastal conifer / spruce canopy with baked vertical AO.
 */
export function createConiferCanopyGeo(): THREE.BufferGeometry {
  const parts: THREE.BufferGeometry[] = [];

  const lower = new THREE.ConeGeometry(2.55, 3.8, 7, 1, false);
  lower.translate(0, 3.4, 0);
  parts.push(lower);

  const mid = new THREE.ConeGeometry(2.05, 3.5, 7, 1, false);
  mid.rotateY(0.45);
  mid.translate(0, 5.5, 0);
  parts.push(mid);

  const top = new THREE.ConeGeometry(1.38, 3.1, 7, 1, false);
  top.rotateY(0.9);
  top.translate(0, 7.55, 0);
  parts.push(top);

  const merged = mergeClosedGeometries(parts);
  for (const p of parts) p.dispose();
  return applyVerticalAO(merged, 1.5, 9.1, 0.58, 1.1);
}

/**
 * Attaches gentle GPU vertex-shader wind sway to an instanced tree canopy material.
 */
export function attachTreeWindSway(
  mat: THREE.MeshStandardMaterial,
  windUniform: { value: number },
  swayAmplitude = 0.24
): void {
  mat.customProgramCacheKey = () => `tidelight_tree_sway_${swayAmplitude.toFixed(2)}`;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uWindTime = windUniform;
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
uniform float uWindTime;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
float tlHeightMask = max(0.0, (position.y - 1.4) / 6.0);
float tlPhase = 0.0;
#ifdef USE_INSTANCING
  tlPhase = instanceMatrix[3].x * 0.09 + instanceMatrix[3].z * 0.07;
#endif
float tlGust = sin(uWindTime * 1.65 + tlPhase) * 0.72 + sin(uWindTime * 2.9 + tlPhase * 1.7) * 0.28;
transformed.x += tlGust * tlHeightMask * tlHeightMask * ${swayAmplitude.toFixed(3)};
transformed.z += cos(uWindTime * 1.35 + tlPhase * 1.15) * tlHeightMask * tlHeightMask * ${(swayAmplitude * 0.6).toFixed(3)};`
      );
  };
}
