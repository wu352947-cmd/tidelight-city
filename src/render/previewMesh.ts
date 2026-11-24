import * as THREE from 'three';
import {
  buildBezierLUT,
  evalBezier,
  evalBezierTangent,
  lutTAtDistance,
  rightNormalFromTangent,
} from '../sim/bezier.ts';
import {
  ZONE_CELL_SIZE,
  type CubicBezier,
  type Vec2,
  type ZoneType,
} from '../sim/types.ts';
import type { UtilityLineKind } from '../sim/utilities.ts';

// High-contrast unmistakable road preview palette (pops crisply against grass & water)
const ROAD_PREVIEW_CORE_VALID = '#29485C';
const ROAD_PREVIEW_TINT_VALID = '#22C7D6';
const ROAD_PREVIEW_EDGE_VALID = '#FFFFFF';
const ROAD_PREVIEW_DASH_VALID = '#FFF8DB';
const VALID_COLOR = '#1FC2B6';
const INVALID_COLOR = '#E24C4C';
const INVALID_EDGE_COLOR = '#FFE3E3';
const SNAP_NODE_COLOR = '#1FE0C8';
const SNAP_SEG_COLOR = '#F4BD44';
const SELECTED_COLOR = '#F4C95D';

const ZONE_PREVIEW_COLORS: Record<ZoneType, string> = {
  none: '#E55B5B',
  res_low: '#7ED389',
  res_high: '#2F9E66',
  com_low: '#69B8F5',
  com_high: '#2D74C4',
  ind: '#F0B94D',
  office: '#49C6C1',
};

function disposeObject(obj: THREE.Object3D): void {
  obj.traverse((child) => {
    if (
      child instanceof THREE.Mesh ||
      child instanceof THREE.Line ||
      child instanceof THREE.LineSegments
    ) {
      child.geometry.dispose();
      if (Array.isArray(child.material)) {
        child.material.forEach((m) => m.dispose());
      } else {
        child.material.dispose();
      }
    }
  });
}

function createOffsetRibbonMesh(
  curves: CubicBezier[],
  offsetL: number,
  offsetR: number,
  color: string,
  opacity: number,
  sampleHeight: (x: number, z: number) => number,
  yLift = 0.65,
  renderOrder = 10
): THREE.Mesh | null {
  const positions: number[] = [];
  const indices: number[] = [];

  for (const bez of curves) {
    const lut = buildBezierLUT(bez, 28);
    if (lut.length < 1) continue;
    const steps = Math.max(6, Math.ceil(lut.length / 3.5));
    const baseVert = positions.length / 3;

    for (let i = 0; i <= steps; i++) {
      const s = (i / steps) * lut.length;
      const t = lutTAtDistance(lut, s);
      const p = evalBezier(bez, t);
      const tan = evalBezierTangent(bez, t);
      const rn = rightNormalFromTangent(tan);
      const y = Math.max(0.25, sampleHeight(p.x, p.z)) + yLift;
      positions.push(p.x + rn.x * offsetL, y, p.z + rn.z * offsetL);
      positions.push(p.x + rn.x * offsetR, y, p.z + rn.z * offsetR);
    }

    for (let i = 0; i < steps; i++) {
      const v = baseVert + i * 2;
      indices.push(v, v + 1, v + 2, v + 1, v + 3, v + 2);
    }
  }

  if (indices.length === 0) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();

  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -8,
    polygonOffsetUnits: -8,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = renderOrder;
  return mesh;
}

function createDashedCenterRibbon(
  curves: CubicBezier[],
  halfDashWidth: number,
  color: string,
  sampleHeight: (x: number, z: number) => number,
  yLift = 0.88
): THREE.Mesh | null {
  const positions: number[] = [];
  const indices: number[] = [];
  const dashLen = 4.2;
  const stride = 8.4;

  for (const bez of curves) {
    const lut = buildBezierLUT(bez, 28);
    if (lut.length < 2) continue;

    for (let s0 = 1.5; s0 < lut.length - 1.5; s0 += stride) {
      const s1 = Math.min(lut.length - 1.0, s0 + dashLen);
      if (s1 - s0 < 1.0) break;
      const t0 = lutTAtDistance(lut, s0);
      const t1 = lutTAtDistance(lut, s1);
      const p0 = evalBezier(bez, t0);
      const p1 = evalBezier(bez, t1);
      const n0 = rightNormalFromTangent(evalBezierTangent(bez, t0));
      const n1 = rightNormalFromTangent(evalBezierTangent(bez, t1));
      const y0 = Math.max(0.25, sampleHeight(p0.x, p0.z)) + yLift;
      const y1 = Math.max(0.25, sampleHeight(p1.x, p1.z)) + yLift;

      const v = positions.length / 3;
      positions.push(
        p0.x - n0.x * halfDashWidth,
        y0,
        p0.z - n0.z * halfDashWidth,
        p0.x + n0.x * halfDashWidth,
        y0,
        p0.z + n0.z * halfDashWidth,
        p1.x - n1.x * halfDashWidth,
        y1,
        p1.z - n1.z * halfDashWidth,
        p1.x + n1.x * halfDashWidth,
        y1,
        p1.z + n1.z * halfDashWidth
      );
      indices.push(v, v + 1, v + 2, v + 1, v + 3, v + 2);
    }
  }

  if (indices.length === 0) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.96,
    side: THREE.DoubleSide,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -10,
    polygonOffsetUnits: -10,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 13;
  return mesh;
}

function createRibbonMesh(
  curves: CubicBezier[],
  width: number,
  color: string,
  opacity: number,
  sampleHeight: (x: number, z: number) => number,
  yLift = 0.56
): THREE.Mesh | null {
  return createOffsetRibbonMesh(curves, -width * 0.5, width * 0.5, color, opacity, sampleHeight, yLift, 10);
}

function createRing(
  x: number,
  y: number,
  z: number,
  innerR: number,
  outerR: number,
  color: string,
  opacity = 0.9,
  segments = 36
): THREE.Mesh {
  const geo = new THREE.RingGeometry(innerR, outerR, segments);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, y, z);
  mesh.renderOrder = 14;
  return mesh;
}

function createTerrainCircleLine(
  cx: number,
  cz: number,
  radius: number,
  color: string,
  sampleHeight: (x: number, z: number) => number,
  yLift = 0.55,
  segments = 48
): THREE.Line {
  const pts: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const x = cx + Math.cos(a) * radius;
    const z = cz + Math.sin(a) * radius;
    const y = Math.max(0.2, sampleHeight(x, z)) + yLift;
    pts.push(x, y, z);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
  });
  const line = new THREE.Line(geo, mat);
  line.renderOrder = 11;
  return line;
}

export class ToolPreviewLayer {
  readonly group = new THREE.Group();
  private readonly previewGroup = new THREE.Group();
  private readonly selectionGroup = new THREE.Group();

  constructor() {
    this.group.add(this.previewGroup, this.selectionGroup);
  }

  clearPreview(): void {
    while (this.previewGroup.children.length > 0) {
      const child = this.previewGroup.children[0];
      this.previewGroup.remove(child);
      disposeObject(child);
    }
  }

  clearSelection(): void {
    while (this.selectionGroup.children.length > 0) {
      const child = this.selectionGroup.children[0];
      this.selectionGroup.remove(child);
      disposeObject(child);
    }
  }

  showSelectedBuilding(
    x: number,
    y: number,
    z: number,
    yaw: number,
    width: number,
    depth: number,
    height: number
  ): void {
    this.clearSelection();
    const boxGeo = new THREE.BoxGeometry(width + 1.8, height + 2.2, depth + 1.8);
    const edges = new THREE.EdgesGeometry(boxGeo);
    boxGeo.dispose();
    const mat = new THREE.LineBasicMaterial({ color: SELECTED_COLOR });
    const wire = new THREE.LineSegments(edges, mat);
    wire.position.set(x, y + height * 0.5 + 0.5, z);
    wire.rotation.y = yaw;
    wire.renderOrder = 14;
    this.selectionGroup.add(wire);

    const ringR = Math.hypot(width, depth) * 0.55 + 1.5;
    const ring = createRing(x, y + 0.45, z, ringR - 0.9, ringR, SELECTED_COLOR, 0.85, 32);
    this.selectionGroup.add(ring);
  }

  showRoadAnchor(
    pt: Vec2,
    snapKind: 'none' | 'node' | 'segment',
    roadWidth: number,
    sampleHeight: (x: number, z: number) => number
  ): void {
    this.clearPreview();
    const y = Math.max(0.2, sampleHeight(pt.x, pt.z)) + 0.72;
    const color =
      snapKind === 'node'
        ? SNAP_NODE_COLOR
        : snapKind === 'segment'
          ? SNAP_SEG_COLOR
          : ROAD_PREVIEW_TINT_VALID;
    const r = Math.max(4.8, roadWidth * 0.54);
    this.previewGroup.add(createRing(pt.x, y, pt.z, r * 0.48, r, color, 0.94, 28));
    this.previewGroup.add(createRing(pt.x, y + 0.05, pt.z, r, r + 1.1, '#FFFFFF', 0.92, 28));
    if (snapKind !== 'none') {
      this.previewGroup.add(createRing(pt.x, y + 0.08, pt.z, r + 1.8, r + 3.0, color, 0.72, 28));
    }
  }

  showRoadPreview(
    curves: CubicBezier[],
    roadWidth: number,
    valid: boolean,
    sampleHeight: (x: number, z: number) => number,
    options?: {
      startSnap?: 'none' | 'node' | 'segment';
      endSnap?: 'none' | 'node' | 'segment';
      controlPoint?: Vec2;
      highlightOnly?: boolean;
    }
  ): void {
    this.clearPreview();
    if (curves.length === 0) return;

    const halfW = roadWidth * 0.5;
    const borderW = 1.15;

    // 1. Subtle bright halo footprint underneath so ghost pops clearly on both grass & water
    const halo = createOffsetRibbonMesh(
      curves,
      -(halfW + borderW + 0.9),
      halfW + borderW + 0.9,
      valid ? ROAD_PREVIEW_TINT_VALID : INVALID_COLOR,
      0.34,
      sampleHeight,
      0.62,
      9
    );
    if (halo) this.previewGroup.add(halo);

    // 2. Elevated bright-contrast asphalt/blueprint road deck core
    const core = createOffsetRibbonMesh(
      curves,
      -halfW,
      halfW,
      valid ? ROAD_PREVIEW_CORE_VALID : '#9E2A2A',
      0.86,
      sampleHeight,
      0.74,
      10
    );
    if (core) this.previewGroup.add(core);

    // 3. Thick crisp bright-white solid mesh outer border ribbons (always legible at aerial zoom!)
    const edgeCol = valid ? ROAD_PREVIEW_EDGE_VALID : INVALID_EDGE_COLOR;
    const leftEdge = createOffsetRibbonMesh(
      curves,
      -(halfW + borderW),
      -halfW + 0.15,
      edgeCol,
      0.96,
      sampleHeight,
      0.84,
      12
    );
    const rightEdge = createOffsetRibbonMesh(
      curves,
      halfW - 0.15,
      halfW + borderW,
      edgeCol,
      0.96,
      sampleHeight,
      0.84,
      12
    );
    if (leftEdge) this.previewGroup.add(leftEdge);
    if (rightEdge) this.previewGroup.add(rightEdge);

    // 4. Crisp solid dashed centerline quads
    const dashes = createDashedCenterRibbon(
      curves,
      0.42,
      valid ? ROAD_PREVIEW_DASH_VALID : '#FFD0D0',
      sampleHeight,
      0.9
    );
    if (dashes) this.previewGroup.add(dashes);

    if (!options?.highlightOnly) {
      const first = curves[0].p0;
      const last = curves[curves.length - 1].p1;
      const startY = Math.max(0.25, sampleHeight(first.x, first.z)) + 0.92;
      const endY = Math.max(0.25, sampleHeight(last.x, last.z)) + 0.92;
      const r = Math.max(5.0, halfW + 1.0);

      const startColor =
        options?.startSnap === 'node'
          ? SNAP_NODE_COLOR
          : options?.startSnap === 'segment'
            ? SNAP_SEG_COLOR
            : valid
              ? ROAD_PREVIEW_TINT_VALID
              : INVALID_COLOR;
      const endColor =
        options?.endSnap === 'node'
          ? SNAP_NODE_COLOR
          : options?.endSnap === 'segment'
            ? SNAP_SEG_COLOR
            : valid
              ? ROAD_PREVIEW_TINT_VALID
              : INVALID_COLOR;

      // High-contrast double endpoint rings
      this.previewGroup.add(createRing(first.x, startY, first.z, r * 0.48, r, startColor, 0.95, 28));
      this.previewGroup.add(createRing(first.x, startY + 0.04, first.z, r, r + 1.0, '#FFFFFF', 0.95, 28));
      this.previewGroup.add(createRing(last.x, endY, last.z, r * 0.48, r, endColor, 0.95, 28));
      this.previewGroup.add(createRing(last.x, endY + 0.04, last.z, r, r + 1.0, '#FFFFFF', 0.95, 28));

      // Bold curve control beacon + tangent guide ribbon when curving
      if (options?.controlPoint) {
        const cp = options.controlPoint;
        const cy = Math.max(0.25, sampleHeight(cp.x, cp.z)) + 0.94;
        this.previewGroup.add(createRing(cp.x, cy, cp.z, 1.8, 4.2, '#F4C94E', 0.96, 24));
        this.previewGroup.add(createRing(cp.x, cy + 0.04, cp.z, 4.2, 5.1, '#FFFFFF', 0.92, 24));

        const leg1: CubicBezier = {
          p0: first,
          c0: { x: first.x + (cp.x - first.x) / 3, z: first.z + (cp.z - first.z) / 3 },
          c1: { x: first.x + ((cp.x - first.x) * 2) / 3, z: first.z + ((cp.z - first.z) * 2) / 3 },
          p1: cp,
        };
        const leg2: CubicBezier = {
          p0: cp,
          c0: { x: cp.x + (last.x - cp.x) / 3, z: cp.z + (last.z - cp.z) / 3 },
          c1: { x: cp.x + ((last.x - cp.x) * 2) / 3, z: cp.z + ((last.z - cp.z) * 2) / 3 },
          p1: last,
        };
        const guideDashes = createDashedCenterRibbon([leg1, leg2], 0.35, '#FFE07D', sampleHeight, 0.88);
        if (guideDashes) this.previewGroup.add(guideDashes);
      }
    }
  }

  showZoneBrushPreview(
    center: Vec2,
    radius: number,
    zone: ZoneType,
    cells: Array<{ x: number; y: number; z: number; yaw: number }>,
    sampleHeight: (x: number, z: number) => number,
    showCircle: boolean
  ): void {
    this.clearPreview();
    const color = ZONE_PREVIEW_COLORS[zone];

    if (showCircle) {
      this.previewGroup.add(createTerrainCircleLine(center.x, center.z, radius, color, sampleHeight, 0.52, 40));
    }

    if (cells.length === 0) return;

    const size = ZONE_CELL_SIZE - 0.55;
    const geo = new THREE.PlaneGeometry(size, size);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: zone === 'none' ? 0.68 : 0.76,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -5,
      polygonOffsetUnits: -5,
    });
    const inst = new THREE.InstancedMesh(geo, mat, cells.length);
    inst.renderOrder = 10;

    const dummy = new THREE.Object3D();
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      const y = Math.max(c.y, sampleHeight(c.x, c.z)) + 0.34;
      dummy.position.set(c.x, y, c.z);
      dummy.rotation.set(0, c.yaw, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
    this.previewGroup.add(inst);
  }

  showPloppableGhost(
    x: number,
    z: number,
    yaw: number,
    width: number,
    depth: number,
    height: number,
    coverageRadius: number,
    valid: boolean,
    sampleHeight: (x: number, z: number) => number
  ): void {
    this.clearPreview();
    const y = Math.max(0.2, sampleHeight(x, z));
    const color = valid ? VALID_COLOR : INVALID_COLOR;

    const boxGeo = new THREE.BoxGeometry(width, Math.max(3, height), depth);
    const boxMat = new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: 0.48,
      roughness: 0.5,
      depthWrite: false,
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    box.position.set(x, y + Math.max(3, height) * 0.5, z);
    box.rotation.y = yaw;
    box.renderOrder = 10;
    this.previewGroup.add(box);

    const edgeGeo = new THREE.EdgesGeometry(boxGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: valid ? '#FFFFFF' : '#FFD4D4' });
    const wire = new THREE.LineSegments(edgeGeo, edgeMat);
    wire.position.copy(box.position);
    wire.rotation.y = yaw;
    wire.renderOrder = 11;
    this.previewGroup.add(wire);

    const arrowDist = depth * 0.5 + 3.5;
    const ax = x + Math.sin(yaw) * arrowDist;
    const az = z + Math.cos(yaw) * arrowDist;
    const arrowGeo = new THREE.ConeGeometry(2.2, 4.4, 3);
    arrowGeo.rotateX(Math.PI / 2);
    const arrowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.92 });
    const arrow = new THREE.Mesh(arrowGeo, arrowMat);
    arrow.position.set(ax, y + 1.8, az);
    arrow.rotation.y = yaw;
    arrow.renderOrder = 12;
    this.previewGroup.add(arrow);

    if (coverageRadius > 20) {
      this.previewGroup.add(
        createTerrainCircleLine(x, z, coverageRadius, valid ? '#5CC4C8' : INVALID_COLOR, sampleHeight, 0.55, 64)
      );
    }
  }

  showUtilityLinePreview(
    kind: UtilityLineKind,
    p0: Vec2,
    p1: Vec2 | null,
    valid: boolean,
    sampleHeight: (x: number, z: number) => number
  ): void {
    this.clearPreview();
    const baseColor = valid ? (kind === 'power_line' ? '#F6C84C' : '#3B9ED8') : INVALID_COLOR;
    const y0 = Math.max(0.2, sampleHeight(p0.x, p0.z)) + 0.6;
    this.previewGroup.add(createRing(p0.x, y0, p0.z, 2.4, 4.8, baseColor, 0.92, 24));

    if (!p1) return;
    const len = Math.hypot(p1.x - p0.x, p1.z - p0.z);
    if (len < 1) return;

    const y1 = Math.max(0.2, sampleHeight(p1.x, p1.z)) + 0.6;
    this.previewGroup.add(createRing(p1.x, y1, p1.z, 2.4, 4.8, baseColor, 0.92, 24));

    const steps = Math.max(2, Math.ceil(len / 12));
    const pts: number[] = [];
    const lift = kind === 'power_line' ? 11.5 : 1.0;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = p0.x + (p1.x - p0.x) * t;
      const z = p0.z + (p1.z - p0.z) * t;
      pts.push(x, Math.max(0.2, sampleHeight(x, z)) + lift, z);
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: baseColor });
    const line = new THREE.Line(lineGeo, lineMat);
    line.renderOrder = 12;
    this.previewGroup.add(line);

    if (kind === 'power_line') {
      const spans = Math.max(1, Math.round(len / 55));
      const poleGeo = new THREE.CylinderGeometry(0.35, 0.6, 12, 4);
      poleGeo.translate(0, 6, 0);
      const poleMat = new THREE.MeshBasicMaterial({ color: baseColor, transparent: true, opacity: 0.78 });
      for (let s = 0; s <= spans; s++) {
        const t = s / spans;
        const px = p0.x + (p1.x - p0.x) * t;
        const pz = p0.z + (p1.z - p0.z) * t;
        const m = new THREE.Mesh(poleGeo.clone(), poleMat.clone());
        m.position.set(px, sampleHeight(px, pz), pz);
        m.renderOrder = 11;
        this.previewGroup.add(m);
      }
      poleGeo.dispose();
      poleMat.dispose();
    } else {
      const straight: CubicBezier = {
        p0,
        c0: { x: p0.x + (p1.x - p0.x) / 3, z: p0.z + (p1.z - p0.z) / 3 },
        c1: { x: p0.x + ((p1.x - p0.x) * 2) / 3, z: p0.z + ((p1.z - p0.z) * 2) / 3 },
        p1,
      };
      const ribbon = createRibbonMesh([straight], 6, baseColor, 0.56, sampleHeight, 0.55);
      if (ribbon) this.previewGroup.add(ribbon);
    }
  }

  showBulldozeBox(
    x: number,
    y: number,
    z: number,
    yaw: number,
    width: number,
    depth: number,
    height: number
  ): void {
    this.clearPreview();
    const boxGeo = new THREE.BoxGeometry(width + 1.6, Math.max(4, height + 1.8), depth + 1.6);
    const mat = new THREE.MeshBasicMaterial({
      color: INVALID_COLOR,
      transparent: true,
      opacity: 0.44,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(boxGeo, mat);
    mesh.position.set(x, y + Math.max(4, height + 1.8) * 0.5, z);
    mesh.rotation.y = yaw;
    mesh.renderOrder = 12;
    this.previewGroup.add(mesh);

    const edgeGeo = new THREE.EdgesGeometry(boxGeo);
    const wire = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: '#FFF0F0' }));
    wire.position.copy(mesh.position);
    wire.rotation.y = yaw;
    wire.renderOrder = 13;
    this.previewGroup.add(wire);
  }
}
