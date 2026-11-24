import * as THREE from 'three';
import {
  buildBezierLUT,
  evalBezier,
  evalBezierTangent,
  lutTAtDistance,
  rightNormalFromTangent,
} from '../sim/bezier.ts';
import {
  ROAD_SPECS,
  ROAD_TYPE_LIST,
  type CubicBezier,
  type OverlayType,
  type RoadType,
} from '../sim/types.ts';
import {
  ROAD_NODE_STRIDE,
  ROAD_SEGMENT_STRIDE,
  UTILITY_LINE_STRIDE,
  type RoadSnapshotPayload,
  type UtilitySnapshotPayload,
} from '../sim/protocol.ts';
import { attachTreeWindSway, createBroadleafCanopyGeo } from './geometryUtils.ts';
import type { AllFacadeTextures } from './facadeTextures.ts';

interface RibbonAccumulator {
  positions: number[];
  normals: number[];
  uvs: number[];
  indices: number[];
}

function createAcc(): RibbonAccumulator {
  return { positions: [], normals: [], uvs: [], indices: [] };
}

function addQuad(
  acc: RibbonAccumulator,
  x0: number,
  y0: number,
  z0: number,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  x3: number,
  y3: number,
  z3: number,
  nx = 0,
  ny = 1,
  nz = 0,
  u0 = 0,
  v0 = 0,
  u1 = 1,
  v1 = 1
): void {
  const base = acc.positions.length / 3;
  acc.positions.push(x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3);
  acc.normals.push(nx, ny, nz, nx, ny, nz, nx, ny, nz, nx, ny, nz);
  acc.uvs.push(u0, v0, u1, v0, u0, v1, u1, v1);
  // Upward-facing CCW winding for Three.js FrontSide (offsetL -> offsetR -> forward)
  acc.indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
}

function buildGeometry(acc: RibbonAccumulator): THREE.BufferGeometry | null {
  if (acc.indices.length === 0) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(acc.positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(acc.normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(acc.uvs, 2));
  geo.setIndex(acc.indices);
  return geo;
}

function addRibbonStrip(
  acc: RibbonAccumulator,
  pts: Array<{ x: number; y: number; z: number; nx: number; nz: number; s: number }>,
  offsetL: number,
  offsetR: number,
  yLift: number,
  addOuterSkirts = false,
  skirtAcc?: RibbonAccumulator
): void {
  const targetSkirt = skirtAcc ?? acc;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const ax0 = a.x + a.nx * offsetL;
    const az0 = a.z + a.nz * offsetL;
    const ax1 = a.x + a.nx * offsetR;
    const az1 = a.z + a.nz * offsetR;
    const bx0 = b.x + b.nx * offsetL;
    const bz0 = b.z + b.nz * offsetL;
    const bx1 = b.x + b.nx * offsetR;
    const bz1 = b.z + b.nz * offsetR;

    const ay = a.y + yLift;
    const by = b.y + yLift;

    addQuad(
      acc,
      ax0,
      ay,
      az0,
      ax1,
      ay,
      az1,
      bx0,
      by,
      bz0,
      bx1,
      by,
      bz1,
      0,
      1,
      0,
      0,
      a.s * 0.08,
      1,
      b.s * 0.08
    );

    if (addOuterSkirts) {
      const skirtDrop = 1.85;
      addQuad(
        targetSkirt,
        ax0,
        ay,
        az0,
        bx0,
        by,
        bz0,
        ax0,
        ay - skirtDrop,
        az0,
        bx0,
        by - skirtDrop,
        bz0,
        -a.nx,
        0,
        -a.nz
      );
      addQuad(
        targetSkirt,
        bx1,
        by,
        bz1,
        ax1,
        ay,
        az1,
        bx1,
        by - skirtDrop,
        bz1,
        ax1,
        ay - skirtDrop,
        az1,
        a.nx,
        0,
        a.nz
      );
    }
  }
}

function addCircleDisc(
  acc: RibbonAccumulator,
  cx: number,
  cy: number,
  cz: number,
  radius: number,
  segments = 16
): void {
  const centerIdx = acc.positions.length / 3;
  acc.positions.push(cx, cy, cz);
  acc.normals.push(0, 1, 0);
  acc.uvs.push(0.5, 0.5);
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    acc.positions.push(cx + Math.cos(a) * radius, cy, cz + Math.sin(a) * radius);
    acc.normals.push(0, 1, 0);
    acc.uvs.push(0.5 + Math.cos(a) * 0.5, 0.5 + Math.sin(a) * 0.5);
  }
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    acc.indices.push(centerIdx, centerIdx + 1 + next, centerIdx + 1 + i);
  }
}

function addCrosswalk(
  acc: RibbonAccumulator,
  px: number,
  py: number,
  pz: number,
  tx: number,
  tz: number,
  nx: number,
  nz: number,
  asphaltHalf: number
): void {
  const stripeLen = 2.1;
  const stripeW = 0.55;
  const gap = 1.15;
  const usable = asphaltHalf - 0.55;
  const y = py + 0.345;

  for (let off = -usable + stripeW * 0.5; off <= usable - stripeW * 0.5; off += gap) {
    const cx = px + nx * off;
    const cz = pz + nz * off;
    const hw = stripeW * 0.5;
    const hl = stripeLen * 0.5;

    const x0 = cx - nx * hw - tx * hl;
    const z0 = cz - nz * hw - tz * hl;
    const x1 = cx + nx * hw - tx * hl;
    const z1 = cz + nz * hw - tz * hl;
    const x2 = cx - nx * hw + tx * hl;
    const z2 = cz - nz * hw + tz * hl;
    const x3 = cx + nx * hw + tx * hl;
    const z3 = cz + nz * hw + tz * hl;
    addQuad(acc, x0, y, z0, x1, y, z1, x2, y, z2, x3, y, z3);
  }
}

// Congestion gradient from ART_BIBLE Section 2.4
const CONG_FREE = new THREE.Color('#4CC38A');
const CONG_MOD = new THREE.Color('#F2C94C');
const CONG_HEAVY = new THREE.Color('#EB7B3C');
const CONG_GRID = new THREE.Color('#D63E4F');

function congestionColor(c: number, out: THREE.Color): void {
  const t = Math.max(0, Math.min(1, c));
  if (t < 0.35) {
    out.copy(CONG_FREE).lerp(CONG_MOD, t / 0.35);
  } else if (t < 0.7) {
    out.copy(CONG_MOD).lerp(CONG_HEAVY, (t - 0.35) / 0.35);
  } else {
    out.copy(CONG_HEAVY).lerp(CONG_GRID, (t - 0.7) / 0.3);
  }
}

interface TrafficOverlaySegmentRef {
  segId: number;
  startVertex: number;
  vertexCount: number;
}

export class RoadMeshLayer {
  readonly group = new THREE.Group();
  private readonly roadGroup = new THREE.Group();
  private readonly utilityGroup = new THREE.Group();
  private readonly trafficOverlayGroup = new THREE.Group();

  private lastRoadRev = -1;
  private lastUtilityRev = -1;

  private sharedTextures: AllFacadeTextures | null = null;
  private streetLampMat: THREE.MeshStandardMaterial | null = null;
  private lampPoolMat: THREE.MeshBasicMaterial | null = null;
  private trafficOverlayGeo: THREE.BufferGeometry | null = null;
  private trafficOverlayRefs: TrafficOverlaySegmentRef[] = [];
  private utilityPipeMeshes: THREE.Object3D[] = [];
  private forceShowPipes = false;
  private lastOverlay: OverlayType = 'none';
  private exclusionPoints: Array<{ x: number; z: number; r: number }> = [];
  private readonly windTimeUniform = { value: 0 };

  constructor() {
    this.group.add(this.roadGroup, this.utilityGroup, this.trafficOverlayGroup);
    this.trafficOverlayGroup.visible = false;
  }

  setSharedTextures(textures: AllFacadeTextures): void {
    this.sharedTextures = textures;
  }

  getExclusionPoints(): Array<{ x: number; z: number; r: number }> {
    return this.exclusionPoints;
  }

  updateRoads(payload: RoadSnapshotPayload, sampleHeight: (x: number, z: number) => number): boolean {
    if (payload.revision === this.lastRoadRev) return false;
    this.lastRoadRev = payload.revision;
    this.clearGroup(this.roadGroup);
    this.clearGroup(this.trafficOverlayGroup);
    this.streetLampMat = null;
    this.lampPoolMat = null;
    this.trafficOverlayGeo = null;
    this.trafficOverlayRefs = [];
    this.exclusionPoints = [];

    const segData = payload.segments;
    const segCount = Math.floor(segData.length / ROAD_SEGMENT_STRIDE);
    const nodeData = payload.nodes;
    const nodeCount = Math.floor(nodeData.length / ROAD_NODE_STRIDE);

    const sidewalkAcc = createAcc();
    const curbAcc = createAcc();
    const asphaltAcc = createAcc();
    const highwayAcc = createAcc();
    const medianAcc = createAcc();
    const barrierAcc = createAcc();
    const creamLineAcc = createAcc();
    const yellowLineAcc = createAcc();

    const trafficPositions: number[] = [];
    const trafficNormals: number[] = [];
    const trafficColors: number[] = [];
    const trafficIndices: number[] = [];

    const streetTreeSpots: Array<{ x: number; y: number; z: number; scale: number }> = [];
    const lampSpots: Array<{ x: number; y: number; z: number; yaw: number; side: number }> = [];
    const signalSpots: Array<{ x: number; y: number; z: number }> = [];

    // Pre-index node positions for crosswalk placement near junctions
    const nodePositions: Array<{ x: number; z: number; radius: number }> = [];
    for (let i = 0; i < nodeCount; i++) {
      const base = i * ROAD_NODE_STRIDE;
      nodePositions.push({
        x: nodeData[base + 1],
        z: nodeData[base + 2],
        radius: nodeData[base + 3],
      });
    }

    for (let i = 0; i < segCount; i++) {
      const base = i * ROAD_SEGMENT_STRIDE;
      const segId = Math.round(segData[base]);
      const typeInt = Math.round(segData[base + 1]);
      const roadType: RoadType = ROAD_TYPE_LIST[typeInt] ?? 'small_2lane';
      const spec = ROAD_SPECS[roadType];

      const bezier: CubicBezier = {
        p0: { x: segData[base + 2], z: segData[base + 3] },
        c0: { x: segData[base + 4], z: segData[base + 5] },
        c1: { x: segData[base + 6], z: segData[base + 7] },
        p1: { x: segData[base + 8], z: segData[base + 9] },
      };
      const width = segData[base + 10] || spec.width;
      const isBridge = segData[base + 11] > 0.5;

      const lut = buildBezierLUT(bezier, 28);
      const samples = Math.max(4, Math.ceil(lut.length / 4.5));
      const pts: Array<{
        x: number;
        y: number;
        z: number;
        tx: number;
        tz: number;
        nx: number;
        nz: number;
        s: number;
        yaw: number;
      }> = [];

      for (let k = 0; k <= samples; k++) {
        const s = (k / samples) * lut.length;
        const t = lutTAtDistance(lut, s);
        const p = evalBezier(bezier, t);
        const tan = evalBezierTangent(bezier, t);
        const tLen = Math.hypot(tan.x, tan.z) || 1;
        const tx = tan.x / tLen;
        const tz = tan.z / tLen;
        const rn = rightNormalFromTangent(tan);
        const rawH = sampleHeight(p.x, p.z);
        const y = isBridge ? Math.max(rawH, 1.8) : rawH;
        pts.push({ x: p.x, y, z: p.z, tx, tz, nx: rn.x, nz: rn.z, s, yaw: Math.atan2(tx, tz) });

        if (k % 2 === 0) {
          this.exclusionPoints.push({ x: p.x, z: p.z, r: width * 0.65 + 4.2 });
        }
      }

      const halfW = width * 0.5;
      const asphaltHalf = Math.max(2.6, halfW - spec.sidewalkWidth);

      // 1. Raised concrete sidewalk deck + shaded curb skirt
      addRibbonStrip(sidewalkAcc, pts, -halfW, halfW, 0.24, true, curbAcc);

      // Crisp stone inner curb rim separating sidewalk from asphalt
      if (roadType !== 'highway') {
        addRibbonStrip(curbAcc, pts, -asphaltHalf - 0.28, -asphaltHalf, 0.285, false);
        addRibbonStrip(curbAcc, pts, asphaltHalf, asphaltHalf + 0.28, 0.285, false);
      }

      // 2. Weathered coastal asphalt roadbed
      const targetAsphalt = roadType === 'highway' ? highwayAcc : asphaltAcc;
      addRibbonStrip(targetAsphalt, pts, -asphaltHalf, asphaltHalf, 0.3, false);

      // Crisp outer shoulder lines on highway and avenues
      if (roadType === 'highway' || roadType === 'avenue_4lane') {
        addRibbonStrip(creamLineAcc, pts, -asphaltHalf + 0.18, -asphaltHalf + 0.34, 0.34, false);
        addRibbonStrip(creamLineAcc, pts, asphaltHalf - 0.34, asphaltHalf - 0.18, 0.34, false);
      }

      // 3. Planted median, highway barrier, and lane dividers
      if (spec.medianWidth > 0.2) {
        const medHalf = spec.medianWidth * 0.5;
        if (roadType === 'highway') {
          addRibbonStrip(barrierAcc, pts, -medHalf * 0.45, medHalf * 0.45, 0.48, false);
        } else {
          addRibbonStrip(medianAcc, pts, -medHalf, medHalf, 0.37, false);
          addRibbonStrip(yellowLineAcc, pts, -medHalf - 0.34, -medHalf - 0.14, 0.34, false);
          addRibbonStrip(yellowLineAcc, pts, medHalf + 0.14, medHalf + 0.34, 0.34, false);
        }
      } else if (roadType === 'small_2lane' || roadType === 'tree_2lane') {
        for (let k = 1; k < pts.length - 2; k += 2) {
          addRibbonStrip(creamLineAcc, [pts[k], pts[k + 1]], -0.13, 0.13, 0.34, false);
        }
      } else if (roadType === 'oneway_2lane') {
        for (let k = 1; k < pts.length - 2; k += 2) {
          addRibbonStrip(creamLineAcc, [pts[k], pts[k + 1]], -0.12, 0.12, 0.34, false);
        }
      }

      // Dashed lane dividers for 4-lane avenue and highway
      if (roadType === 'avenue_4lane' || roadType === 'highway') {
        const laneCenterOffset = (spec.medianWidth * 0.5 + asphaltHalf) * 0.5;
        for (let k = 1; k < pts.length - 2; k += 2) {
          addRibbonStrip(
            creamLineAcc,
            [pts[k], pts[k + 1]],
            -laneCenterOffset - 0.12,
            -laneCenterOffset + 0.12,
            0.34,
            false
          );
          addRibbonStrip(
            creamLineAcc,
            [pts[k], pts[k + 1]],
            laneCenterOffset - 0.12,
            laneCenterOffset + 0.12,
            0.34,
            false
          );
        }
      }

      // Crosswalk zebra stripes inset cleanly near road junctions (non-highway)
      if (roadType !== 'highway' && lut.length > 26) {
        const cwOffset = Math.min(11, halfW + 2.4);
        for (const dist of [cwOffset, lut.length - cwOffset]) {
          const t = lutTAtDistance(lut, dist);
          const p = evalBezier(bezier, t);
          const tan = evalBezierTangent(bezier, t);
          const tl = Math.hypot(tan.x, tan.z) || 1;
          const tx = tan.x / tl;
          const tz = tan.z / tl;
          const rn = rightNormalFromTangent(tan);
          const py = isBridge ? Math.max(sampleHeight(p.x, p.z), 1.8) : sampleHeight(p.x, p.z);
          addCrosswalk(creamLineAcc, p.x, py, p.z, tx, tz, rn.x, rn.z, asphaltHalf);
        }
      }

      // 4. Traffic overlay colored ribbon
      const startVertex = trafficPositions.length / 3;
      const ovHalf = asphaltHalf * 0.96;
      for (let k = 0; k < pts.length; k++) {
        const p = pts[k];
        const y = p.y + 0.43;
        trafficPositions.push(p.x - p.nx * ovHalf, y, p.z - p.nz * ovHalf);
        trafficPositions.push(p.x + p.nx * ovHalf, y, p.z + p.nz * ovHalf);
        trafficNormals.push(0, 1, 0, 0, 1, 0);
        trafficColors.push(CONG_FREE.r, CONG_FREE.g, CONG_FREE.b, CONG_FREE.r, CONG_FREE.g, CONG_FREE.b);
      }
      for (let k = 0; k < pts.length - 1; k++) {
        const v0 = startVertex + k * 2;
        trafficIndices.push(v0, v0 + 1, v0 + 2, v0 + 1, v0 + 3, v0 + 2);
      }
      this.trafficOverlayRefs.push({
        segId,
        startVertex,
        vertexCount: pts.length * 2,
      });

      // 5. Street trees & cantilevered streetlights along road verges
      if (lut.length > 24 && !isBridge) {
        if (spec.hasTrees) {
          const treeStep = roadType === 'avenue_4lane' ? 22 : 18;
          for (let dist = 14; dist < lut.length - 14; dist += treeStep) {
            const t = lutTAtDistance(lut, dist);
            const p = evalBezier(bezier, t);
            const rn = rightNormalFromTangent(evalBezierTangent(bezier, t));
            if (roadType === 'avenue_4lane') {
              const my = sampleHeight(p.x, p.z);
              streetTreeSpots.push({ x: p.x, y: my + 0.25, z: p.z, scale: 0.62 });
            } else {
              const off = halfW - 1.5;
              const lx = p.x - rn.x * off;
              const lz = p.z - rn.z * off;
              const rx = p.x + rn.x * off;
              const rz = p.z + rn.z * off;
              streetTreeSpots.push({ x: lx, y: sampleHeight(lx, lz) + 0.16, z: lz, scale: 0.68 });
              streetTreeSpots.push({ x: rx, y: sampleHeight(rx, rz) + 0.16, z: rz, scale: 0.68 });
            }
          }
        }

        if (roadType !== 'highway') {
          const lampStep = 30;
          for (let dist = 15; dist < lut.length - 13; dist += lampStep) {
            const t = lutTAtDistance(lut, dist);
            const p = evalBezier(bezier, t);
            const tan = evalBezierTangent(bezier, t);
            const rn = rightNormalFromTangent(tan);
            const side = Math.floor(dist / lampStep) % 2 === 0 ? 1 : -1;
            const off = asphaltHalf + 0.72;
            const lx = p.x + rn.x * off * side;
            const lz = p.z + rn.z * off * side;
            lampSpots.push({
              x: lx,
              y: sampleHeight(lx, lz) + 0.22,
              z: lz,
              yaw: Math.atan2(tan.x, tan.z),
              side,
            });
          }
        }
      }
    }

    // 6. Seamless circular junction caps at road nodes (slightly staggered to avoid z-fighting)
    for (let i = 0; i < nodeCount; i++) {
      const base = i * ROAD_NODE_STRIDE;
      const nx = nodeData[base + 1];
      const nz = nodeData[base + 2];
      const radius = nodeData[base + 3];
      const control = Math.round(nodeData[base + 4]);
      const h = sampleHeight(nx, nz);

      addCircleDisc(sidewalkAcc, nx, h + 0.246, nz, radius * 1.03, 18);
      addCircleDisc(asphaltAcc, nx, h + 0.308, nz, Math.max(2.5, radius - 1.45), 18);

      if (control === 2) {
        signalSpots.push({ x: nx + radius * 0.78, y: h + 0.2, z: nz + radius * 0.78 });
        signalSpots.push({ x: nx - radius * 0.78, y: h + 0.2, z: nz - radius * 0.78 });
      }
    }

    const addLayerMesh = (
      acc: RibbonAccumulator,
      color: string,
      roughness: number,
      polyFactor: number,
      receiveShadow = true,
      map?: THREE.Texture
    ) => {
      const geo = buildGeometry(acc);
      if (!geo) return;
      const mat = new THREE.MeshStandardMaterial({
        color,
        map: map ?? null,
        roughness,
        metalness: 0.02,
        polygonOffset: true,
        polygonOffsetFactor: polyFactor,
        polygonOffsetUnits: polyFactor,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.receiveShadow = receiveShadow;
      this.roadGroup.add(mesh);
    };

    const asphaltTex = this.sharedTextures?.asphalt;
    addLayerMesh(sidewalkAcc, '#CEC8BC', 0.91, -1, true);
    addLayerMesh(curbAcc, '#A7A196', 0.92, -1.5, true);
    addLayerMesh(asphaltAcc, '#5E646F', 0.88, -2.5, true, asphaltTex);
    addLayerMesh(highwayAcc, '#505762', 0.85, -2.5, true, asphaltTex);
    addLayerMesh(medianAcc, '#6E915B', 0.92, -3.5, true);
    addLayerMesh(barrierAcc, '#C2BDB3', 0.86, -3.5, true);
    addLayerMesh(creamLineAcc, '#EFEADF', 0.78, -5, false);
    addLayerMesh(yellowLineAcc, '#DEB24D', 0.78, -5, false);

    // Street trees (solid multi-lobed broadleaf with gentle wind sway)
    if (streetTreeSpots.length > 0) {
      const trunkGeo = new THREE.CylinderGeometry(0.2, 0.32, 2.5, 6);
      trunkGeo.translate(0, 1.25, 0);
      const trunkMat = new THREE.MeshStandardMaterial({ color: '#6A5342', roughness: 0.92 });

      const crownGeo = createBroadleafCanopyGeo();
      const crownMat = new THREE.MeshStandardMaterial({
        color: '#5A854E',
        vertexColors: true,
        roughness: 0.86,
      });
      attachTreeWindSway(crownMat, this.windTimeUniform, 0.18);

      const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, streetTreeSpots.length);
      const crowns = new THREE.InstancedMesh(crownGeo, crownMat, streetTreeSpots.length);
      crowns.castShadow = true;
      crowns.receiveShadow = true;

      const dummy = new THREE.Object3D();
      for (let i = 0; i < streetTreeSpots.length; i++) {
        const s = streetTreeSpots[i];
        dummy.position.set(s.x, s.y, s.z);
        dummy.rotation.set(0, i * 1.37, 0);
        dummy.scale.setScalar(s.scale);
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);
        crowns.setMatrixAt(i, dummy.matrix);
      }
      trunks.instanceMatrix.needsUpdate = true;
      crowns.instanceMatrix.needsUpdate = true;
      this.roadGroup.add(trunks, crowns);
    }

    // Cantilevered streetlights + warm ground light pools at dusk/night
    if (lampSpots.length > 0) {
      const poleGeo = new THREE.CylinderGeometry(0.09, 0.14, 5.4, 5);
      poleGeo.translate(0, 2.7, 0);
      const armGeo = new THREE.BoxGeometry(1.5, 0.12, 0.12);
      armGeo.translate(-0.7, 5.3, 0);
      const poleMat = new THREE.MeshStandardMaterial({ color: '#5D6672', roughness: 0.58, metalness: 0.38 });

      const bulbGeo = new THREE.BoxGeometry(0.65, 0.24, 0.42);
      bulbGeo.translate(-1.35, 5.18, 0);
      const bulbMat = new THREE.MeshStandardMaterial({
        color: '#FFF4D4',
        emissive: new THREE.Color('#FFD07A'),
        emissiveIntensity: 0.1,
        roughness: 0.25,
      });
      this.streetLampMat = bulbMat;

      const poles = new THREE.InstancedMesh(poleGeo, poleMat, lampSpots.length);
      const arms = new THREE.InstancedMesh(armGeo, poleMat, lampSpots.length);
      const bulbs = new THREE.InstancedMesh(bulbGeo, bulbMat, lampSpots.length);

      let pools: THREE.InstancedMesh | null = null;
      if (this.sharedTextures) {
        const poolGeo = new THREE.PlaneGeometry(11.5, 11.5);
        poolGeo.rotateX(-Math.PI / 2);
        const poolMat = new THREE.MeshBasicMaterial({
          map: this.sharedTextures.lampGlow,
          transparent: true,
          opacity: 0.0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -6,
          polygonOffsetUnits: -6,
        });
        this.lampPoolMat = poolMat;
        pools = new THREE.InstancedMesh(poolGeo, poolMat, lampSpots.length);
        pools.renderOrder = 5;
      }

      const dummy = new THREE.Object3D();
      for (let i = 0; i < lampSpots.length; i++) {
        const l = lampSpots[i];
        const armYaw = l.yaw + (l.side > 0 ? 0 : Math.PI);
        dummy.position.set(l.x, l.y, l.z);
        dummy.rotation.set(0, armYaw, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        poles.setMatrixAt(i, dummy.matrix);
        arms.setMatrixAt(i, dummy.matrix);
        bulbs.setMatrixAt(i, dummy.matrix);

        if (pools) {
          // Offset warm light pool slightly over the asphalt road
          const cos = Math.cos(armYaw);
          const sin = Math.sin(armYaw);
          dummy.position.set(l.x - cos * 2.2, l.y + 0.18, l.z + sin * 2.2);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          pools.setMatrixAt(i, dummy.matrix);
        }
      }
      poles.instanceMatrix.needsUpdate = true;
      arms.instanceMatrix.needsUpdate = true;
      bulbs.instanceMatrix.needsUpdate = true;
      this.roadGroup.add(poles, arms, bulbs);
      if (pools) {
        pools.instanceMatrix.needsUpdate = true;
        this.roadGroup.add(pools);
      }
    }

    // Traffic signal masts at signalized crossings
    if (signalSpots.length > 0) {
      const sigPoleGeo = new THREE.BoxGeometry(0.28, 5.6, 0.28);
      sigPoleGeo.translate(0, 2.8, 0);
      const sigHeadGeo = new THREE.BoxGeometry(0.55, 1.4, 0.55);
      sigHeadGeo.translate(0, 5.2, 0);
      const sigMat = new THREE.MeshStandardMaterial({ color: '#3E4652', roughness: 0.6, metalness: 0.3 });
      const headMat = new THREE.MeshStandardMaterial({
        color: '#2F3640',
        emissive: new THREE.Color('#5FE08C'),
        emissiveIntensity: 0.5,
        roughness: 0.4,
      });

      const sigPoles = new THREE.InstancedMesh(sigPoleGeo, sigMat, signalSpots.length);
      const sigHeads = new THREE.InstancedMesh(sigHeadGeo, headMat, signalSpots.length);
      const dummy = new THREE.Object3D();
      for (let i = 0; i < signalSpots.length; i++) {
        const s = signalSpots[i];
        dummy.position.set(s.x, s.y, s.z);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        sigPoles.setMatrixAt(i, dummy.matrix);
        sigHeads.setMatrixAt(i, dummy.matrix);
      }
      sigPoles.instanceMatrix.needsUpdate = true;
      sigHeads.instanceMatrix.needsUpdate = true;
      this.roadGroup.add(sigPoles, sigHeads);
    }

    // Traffic congestion overlay mesh
    if (trafficIndices.length > 0) {
      const ovGeo = new THREE.BufferGeometry();
      ovGeo.setAttribute('position', new THREE.Float32BufferAttribute(trafficPositions, 3));
      ovGeo.setAttribute('normal', new THREE.Float32BufferAttribute(trafficNormals, 3));
      ovGeo.setAttribute('color', new THREE.Float32BufferAttribute(trafficColors, 3));
      ovGeo.setIndex(trafficIndices);
      this.trafficOverlayGeo = ovGeo;

      const ovMat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        polygonOffset: true,
        polygonOffsetFactor: -7,
        polygonOffsetUnits: -7,
      });
      const ovMesh = new THREE.Mesh(ovGeo, ovMat);
      ovMesh.renderOrder = 6;
      this.trafficOverlayGroup.add(ovMesh);
    }

    return true;
  }

  updateUtilities(payload: UtilitySnapshotPayload, sampleHeight: (x: number, z: number) => number): void {
    if (payload.revision === this.lastUtilityRev) return;
    this.lastUtilityRev = payload.revision;
    this.clearGroup(this.utilityGroup);
    this.utilityPipeMeshes = [];

    const data = payload.lines;
    const count = Math.floor(data.length / UTILITY_LINE_STRIDE);
    if (count === 0) return;

    const pylonSpots: Array<{ x: number; y: number; z: number; yaw: number }> = [];
    const wirePts: number[] = [];
    const pipeSegments: Array<{ x0: number; y0: number; z0: number; x1: number; y1: number; z1: number; active: boolean }> = [];

    for (let i = 0; i < count; i++) {
      const base = i * UTILITY_LINE_STRIDE;
      const kind = Math.round(data[base + 1]);
      const x0 = data[base + 2];
      const z0 = data[base + 3];
      const x1 = data[base + 4];
      const z1 = data[base + 5];
      const active = data[base + 6] > 0.5;

      const dx = x1 - x0;
      const dz = z1 - z0;
      const len = Math.hypot(dx, dz);
      if (len < 1) continue;

      if (kind === 0) {
        const yaw = Math.atan2(dx, dz);
        const spans = Math.max(1, Math.round(len / 55));
        let prevX = x0;
        let prevY = sampleHeight(x0, z0) + 12.5;
        let prevZ = z0;
        pylonSpots.push({ x: x0, y: sampleHeight(x0, z0), z: z0, yaw });

        for (let s = 1; s <= spans; s++) {
          const t = s / spans;
          const px = x0 + dx * t;
          const pz = z0 + dz * t;
          const py = sampleHeight(px, pz) + 12.5;
          pylonSpots.push({ x: px, y: sampleHeight(px, pz), z: pz, yaw });

          const midX = (prevX + px) * 0.5;
          const midZ = (prevZ + pz) * 0.5;
          const midY = (prevY + py) * 0.5 - 1.4;
          wirePts.push(prevX, prevY, prevZ, midX, midY, midZ, midX, midY, midZ, px, py, pz);
          prevX = px;
          prevY = py;
          prevZ = pz;
        }
      } else {
        pipeSegments.push({
          x0,
          y0: sampleHeight(x0, z0) + 0.55,
          z0,
          x1,
          y1: sampleHeight(x1, z1) + 0.55,
          z1,
          active,
        });
      }
    }

    if (pylonSpots.length > 0) {
      const mastGeo = new THREE.CylinderGeometry(0.26, 0.56, 13.0, 4);
      mastGeo.translate(0, 6.5, 0);
      const armGeo = new THREE.BoxGeometry(5.2, 0.34, 0.34);
      armGeo.translate(0, 12.2, 0);
      const steelMat = new THREE.MeshStandardMaterial({ color: '#838F9C', roughness: 0.55, metalness: 0.4 });

      const masts = new THREE.InstancedMesh(mastGeo, steelMat, pylonSpots.length);
      const arms = new THREE.InstancedMesh(armGeo, steelMat, pylonSpots.length);
      const dummy = new THREE.Object3D();
      for (let i = 0; i < pylonSpots.length; i++) {
        const p = pylonSpots[i];
        dummy.position.set(p.x, p.y - 0.5, p.z);
        dummy.rotation.set(0, p.yaw, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        masts.setMatrixAt(i, dummy.matrix);
        arms.setMatrixAt(i, dummy.matrix);
      }
      masts.instanceMatrix.needsUpdate = true;
      arms.instanceMatrix.needsUpdate = true;
      this.utilityGroup.add(masts, arms);
    }

    if (wirePts.length > 0) {
      const wireGeo = new THREE.BufferGeometry();
      wireGeo.setAttribute('position', new THREE.Float32BufferAttribute(wirePts, 3));
      const wireMat = new THREE.LineBasicMaterial({ color: '#6A7684' });
      this.utilityGroup.add(new THREE.LineSegments(wireGeo, wireMat));
    }

    if (pipeSegments.length > 0) {
      const pipeGeo = new THREE.CylinderGeometry(0.85, 0.85, 1, 8);
      pipeGeo.rotateX(Math.PI / 2);
      const pipeMat = new THREE.MeshBasicMaterial({ color: '#3B9ED8', transparent: true, opacity: 0.88 });
      const pipes = new THREE.InstancedMesh(pipeGeo, pipeMat, pipeSegments.length);
      const dummy = new THREE.Object3D();
      const p0 = new THREE.Vector3();
      const p1 = new THREE.Vector3();
      const mid = new THREE.Vector3();
      for (let i = 0; i < pipeSegments.length; i++) {
        const s = pipeSegments[i];
        p0.set(s.x0, s.y0, s.z0);
        p1.set(s.x1, s.y1, s.z1);
        mid.addVectors(p0, p1).multiplyScalar(0.5);
        dummy.position.copy(mid);
        dummy.lookAt(p1);
        dummy.scale.set(1, 1, p0.distanceTo(p1));
        dummy.updateMatrix();
        pipes.setMatrixAt(i, dummy.matrix);
      }
      pipes.instanceMatrix.needsUpdate = true;
      pipes.visible = this.forceShowPipes || this.lastOverlay === 'water';
      this.utilityPipeMeshes.push(pipes);
      this.utilityGroup.add(pipes);
    }
  }

  setForceShowPipes(force: boolean): void {
    this.forceShowPipes = force;
    const vis = this.forceShowPipes || this.lastOverlay === 'water';
    for (const pm of this.utilityPipeMeshes) {
      pm.visible = vis;
    }
  }

  updateTrafficOverlay(overlay: OverlayType, roadCongestion: Float32Array): void {
    this.lastOverlay = overlay;
    const showTraffic = overlay === 'traffic';
    this.trafficOverlayGroup.visible = showTraffic;

    for (const pm of this.utilityPipeMeshes) {
      pm.visible = this.forceShowPipes || overlay === 'water';
    }

    if (!showTraffic || !this.trafficOverlayGeo || this.trafficOverlayRefs.length === 0) return;

    const congBySeg = new Map<number, number>();
    for (let i = 0; i + 1 < roadCongestion.length; i += 2) {
      congBySeg.set(Math.round(roadCongestion[i]), roadCongestion[i + 1]);
    }

    const colAttr = this.trafficOverlayGeo.attributes.color as THREE.BufferAttribute;
    const arr = colAttr.array as Float32Array;
    const c = new THREE.Color();

    for (const ref of this.trafficOverlayRefs) {
      const val = congBySeg.get(ref.segId) ?? 0;
      congestionColor(val, c);
      for (let k = 0; k < ref.vertexCount; k++) {
        const vi = (ref.startVertex + k) * 3;
        arr[vi] = c.r;
        arr[vi + 1] = c.g;
        arr[vi + 2] = c.b;
      }
    }
    colAttr.needsUpdate = true;
  }

  updateLighting(emissiveStrength: number, dt = 0): void {
    this.windTimeUniform.value += dt;
    if (this.streetLampMat) {
      this.streetLampMat.emissiveIntensity = 0.08 + emissiveStrength * 4.5;
    }
    if (this.lampPoolMat) {
      this.lampPoolMat.opacity = Math.max(0, (emissiveStrength - 0.12) * 0.78);
    }
  }

  private clearGroup(g: THREE.Group): void {
    while (g.children.length > 0) {
      const child = g.children[0];
      g.remove(child);
      if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }
  }
}
