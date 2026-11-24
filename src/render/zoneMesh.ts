import * as THREE from 'three';
import { INT_TO_ZONE, ZONE_CELL_SIZE, type ZoneType } from '../sim/types.ts';
import { ZONE_CELL_STRIDE, type ZoneSnapshotPayload } from '../sim/protocol.ts';

// Harmonized muted zoning tints so vacant lots stay subtle in scenic mode & crisp when zoning
const ZONE_COLORS: Record<ZoneType, THREE.Color> = {
  none: new THREE.Color('#ffffff'),
  res_low: new THREE.Color('#6FA875'),
  res_high: new THREE.Color('#38885C'),
  com_low: new THREE.Color('#6098C8'),
  com_high: new THREE.Color('#386DA6'),
  ind: new THREE.Color('#CFA04E'),
  office: new THREE.Color('#4BA4A0'),
};

export class ZoneMeshLayer {
  readonly group = new THREE.Group();
  private mesh: THREE.InstancedMesh | null = null;
  private mat: THREE.MeshStandardMaterial | null = null;
  private availableMesh: THREE.InstancedMesh | null = null;
  private showAvailableGrid = false;
  private lastRevision = -1;
  private lastEmissive = 0;

  private computeOpacity(): number {
    // Almost invisible at night & whisper-soft in scenic daytime; crisp when Zoning tool is active!
    if (this.showAvailableGrid) {
      return Math.max(0.32, 0.56 - this.lastEmissive * 0.18);
    }
    return Math.max(0.0, 0.11 * (1.0 - this.lastEmissive * 1.15));
  }

  setShowAvailableGrid(show: boolean): void {
    this.showAvailableGrid = show;
    if (this.availableMesh) {
      this.availableMesh.visible = show;
    }
    if (this.mat && this.mesh) {
      const op = this.computeOpacity();
      this.mat.opacity = op;
      this.mesh.visible = op > 0.01;
    }
  }

  updateLighting(emissiveStrength: number): void {
    this.lastEmissive = emissiveStrength;
    if (this.mat && this.mesh) {
      const op = this.computeOpacity();
      this.mat.opacity = op;
      this.mesh.visible = op > 0.01;
    }
  }

  updateFromSnapshot(payload: ZoneSnapshotPayload, sampleHeight: (x: number, z: number) => number): void {
    if (payload.revision === this.lastRevision) return;
    this.lastRevision = payload.revision;
    this.clear();

    const data = payload.cells;
    const total = Math.floor(data.length / ZONE_CELL_STRIDE);
    if (total === 0) return;

    const vacantIndices: number[] = [];
    const unzonedIndices: number[] = [];
    for (let i = 0; i < total; i++) {
      const zoneInt = Math.round(data[i * ZONE_CELL_STRIDE + 4]);
      const occupied = data[i * ZONE_CELL_STRIDE + 5];
      if (occupied >= 0.5) continue;
      if (zoneInt > 0) {
        vacantIndices.push(i);
      } else {
        unzonedIndices.push(i);
      }
    }

    const dummy = new THREE.Object3D();

    if (vacantIndices.length > 0) {
      const size = ZONE_CELL_SIZE - 0.9;
      const geo = new THREE.PlaneGeometry(size, size);
      geo.rotateX(-Math.PI / 2);

      const op = this.computeOpacity();
      // Lit MeshStandardMaterial ensures vacant zones respond to sun/shadows & never glow at night!
      const mat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.95,
        metalness: 0.0,
        transparent: true,
        opacity: op,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      });
      this.mat = mat;

      const inst = new THREE.InstancedMesh(geo, mat, vacantIndices.length);
      inst.receiveShadow = true;
      inst.renderOrder = 2;
      inst.visible = op > 0.01;

      for (let k = 0; k < vacantIndices.length; k++) {
        const idx = vacantIndices[k];
        const base = idx * ZONE_CELL_STRIDE;
        const x = data[base];
        const z = data[base + 2];
        const yaw = data[base + 3];
        const zone = INT_TO_ZONE[Math.round(data[base + 4])] ?? 'none';
        const y = Math.max(data[base + 1], sampleHeight(x, z)) + 0.14;

        dummy.position.set(x, y, z);
        dummy.rotation.set(0, yaw, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        inst.setMatrixAt(k, dummy.matrix);
        inst.setColorAt(k, ZONE_COLORS[zone]);
      }

      inst.instanceMatrix.needsUpdate = true;
      if (inst.instanceColor) inst.instanceColor.needsUpdate = true;

      this.mesh = inst;
      this.group.add(inst);
    }

    if (unzonedIndices.length > 0) {
      const size = ZONE_CELL_SIZE - 1.1;
      const geo = new THREE.PlaneGeometry(size, size);
      geo.rotateX(-Math.PI / 2);

      const mat = new THREE.MeshBasicMaterial({
        color: '#F7F4EC',
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
      });

      const avail = new THREE.InstancedMesh(geo, mat, unzonedIndices.length);
      avail.renderOrder = 1;
      avail.visible = this.showAvailableGrid;

      for (let k = 0; k < unzonedIndices.length; k++) {
        const idx = unzonedIndices[k];
        const base = idx * ZONE_CELL_STRIDE;
        const x = data[base];
        const z = data[base + 2];
        const yaw = data[base + 3];
        const y = Math.max(data[base + 1], sampleHeight(x, z)) + 0.12;

        dummy.position.set(x, y, z);
        dummy.rotation.set(0, yaw, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        avail.setMatrixAt(k, dummy.matrix);
      }

      avail.instanceMatrix.needsUpdate = true;
      this.availableMesh = avail;
      this.group.add(avail);
    }
  }

  private clear(): void {
    if (this.mesh) {
      this.group.remove(this.mesh);
      this.mesh.geometry.dispose();
      (this.mesh.material as THREE.Material).dispose();
      this.mesh = null;
      this.mat = null;
    }
    if (this.availableMesh) {
      this.group.remove(this.availableMesh);
      this.availableMesh.geometry.dispose();
      (this.availableMesh.material as THREE.Material).dispose();
      this.availableMesh = null;
    }
  }
}
