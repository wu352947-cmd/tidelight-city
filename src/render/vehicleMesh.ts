import * as THREE from 'three';
import { VEHICLE_STRIDE } from '../sim/protocol.ts';

const MAX_RENDER_VEHICLES = 1600;

// Muted miniature coastal vehicle palette (harmonized, readable, never neon)
const VEHICLE_COLORS = [
  new THREE.Color('#EAE6DE'),
  new THREE.Color('#C96254'),
  new THREE.Color('#4B88B4'),
  new THREE.Color('#D9B154'),
  new THREE.Color('#579A7B'),
  new THREE.Color('#7C71A6'),
  new THREE.Color('#C88456'),
  new THREE.Color('#5D6570'),
];

const TRUCK_COLOR = new THREE.Color('#E3DFD7');
const SERVICE_COLORS = [
  new THREE.Color('#EEF2F6'),
  new THREE.Color('#C44A3C'),
  new THREE.Color('#3B69A8'),
];

const CABIN_TINT = new THREE.Color('#3D5366');
const HEADLIGHT_DAY = new THREE.Color('#DAD5C8');
const HEADLIGHT_NIGHT = new THREE.Color('#FFF4CC');
const BRAKE_IDLE = new THREE.Color('#6D232A');
const BRAKE_LIT = new THREE.Color('#FF404E');

export class VehicleMeshLayer {
  readonly group = new THREE.Group();

  private readonly bodyMesh: THREE.InstancedMesh;
  private readonly cabinMesh: THREE.InstancedMesh;
  private readonly headlightMesh: THREE.InstancedMesh;
  private readonly taillightMesh: THREE.InstancedMesh;
  private readonly headMat: THREE.MeshBasicMaterial;
  private readonly tailMat: THREE.MeshBasicMaterial;

  private readonly dummy = new THREE.Object3D();
  private readonly tmpCol = new THREE.Color();
  private lastEmissive = 0;

  constructor() {
    const unitBox = new THREE.BoxGeometry(1, 1, 1);

    const bodyMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.42,
      metalness: 0.18,
    });
    const cabinMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      roughness: 0.24,
      metalness: 0.32,
    });
    // Tone-mapping disabled on night lights so HDR bloom picks them up crisply!
    this.headMat = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false });
    this.tailMat = new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false });

    this.bodyMesh = new THREE.InstancedMesh(unitBox, bodyMat, MAX_RENDER_VEHICLES);
    this.cabinMesh = new THREE.InstancedMesh(unitBox, cabinMat, MAX_RENDER_VEHICLES);
    this.headlightMesh = new THREE.InstancedMesh(unitBox, this.headMat, MAX_RENDER_VEHICLES);
    this.taillightMesh = new THREE.InstancedMesh(unitBox, this.tailMat, MAX_RENDER_VEHICLES);

    this.bodyMesh.castShadow = true;
    this.bodyMesh.receiveShadow = true;
    this.cabinMesh.castShadow = true;

    this.bodyMesh.count = 0;
    this.cabinMesh.count = 0;
    this.headlightMesh.count = 0;
    this.taillightMesh.count = 0;

    this.bodyMesh.frustumCulled = false;
    this.cabinMesh.frustumCulled = false;
    this.headlightMesh.frustumCulled = false;
    this.taillightMesh.frustumCulled = false;

    this.group.add(this.bodyMesh, this.cabinMesh, this.headlightMesh, this.taillightMesh);
  }

  updateFromSnapshot(vehicles: Float32Array, emissiveStrength: number): void {
    this.lastEmissive = emissiveStrength;
    const count = Math.min(MAX_RENDER_VEHICLES, Math.floor(vehicles.length / VEHICLE_STRIDE));

    this.bodyMesh.count = count;
    this.cabinMesh.count = count;
    this.headlightMesh.count = count;
    this.taillightMesh.count = count;

    if (count === 0) return;

    const headBoost = 1.0 + emissiveStrength * 2.4;
    const headColor = this.tmpCol
      .copy(HEADLIGHT_DAY)
      .lerp(HEADLIGHT_NIGHT, Math.min(1, 0.25 + emissiveStrength * 0.9))
      .multiplyScalar(headBoost);

    const brakeCol = new THREE.Color().copy(BRAKE_LIT).multiplyScalar(1.0 + emissiveStrength * 1.9);

    for (let i = 0; i < count; i++) {
      const base = i * VEHICLE_STRIDE;
      const x = vehicles[base];
      const y = vehicles[base + 1] + 0.1;
      const z = vehicles[base + 2];
      const yaw = vehicles[base + 3];
      const typeInt = Math.round(vehicles[base + 4]);
      const colorIdx = Math.abs(Math.round(vehicles[base + 5]));
      const braking = vehicles[base + 6] > 0.5;

      const sin = Math.sin(yaw);
      const cos = Math.cos(yaw);

      let w = 2.02;
      let h = 1.02;
      let len = 4.45;
      let cabW = 1.72;
      let cabH = 0.76;
      let cabLen = 2.25;
      let cabOffZ = -0.25;
      let bodyColor = VEHICLE_COLORS[colorIdx % VEHICLE_COLORS.length];

      if (typeInt === 1) {
        w = 2.42;
        h = 2.4;
        len = 6.7;
        cabW = 2.2;
        cabH = 1.76;
        cabLen = 1.95;
        cabOffZ = 2.25;
        bodyColor = TRUCK_COLOR;
      } else if (typeInt === 2) {
        w = 2.12;
        h = 1.72;
        len = 5.1;
        cabW = 1.88;
        cabH = 0.54;
        cabLen = 3.1;
        cabOffZ = -0.15;
      } else if (typeInt === 3) {
        w = 2.12;
        h = 1.68;
        len = 5.1;
        cabW = 1.82;
        cabH = 0.58;
        cabLen = 2.95;
        cabOffZ = -0.1;
        bodyColor = SERVICE_COLORS[colorIdx % SERVICE_COLORS.length];
      }

      // 1. Lower body
      this.dummy.position.set(x, y + h * 0.5, z);
      this.dummy.rotation.set(0, yaw, 0);
      this.dummy.scale.set(w, h, len);
      this.dummy.updateMatrix();
      this.bodyMesh.setMatrixAt(i, this.dummy.matrix);
      this.bodyMesh.setColorAt(i, bodyColor);

      // 2. Glazed cabin / truck cab
      const cabY = typeInt === 1 ? y + cabH * 0.5 + 0.15 : y + h + cabH * 0.45;
      this.dummy.position.set(x + sin * cabOffZ, cabY, z + cos * cabOffZ);
      this.dummy.rotation.set(0, yaw, 0);
      this.dummy.scale.set(cabW, cabH, cabLen);
      this.dummy.updateMatrix();
      this.cabinMesh.setMatrixAt(i, this.dummy.matrix);
      this.cabinMesh.setColorAt(i, typeInt === 1 ? VEHICLE_COLORS[colorIdx % VEHICLE_COLORS.length] : CABIN_TINT);

      // 3. Headlight bar (+Z forward) — expands slightly at night so moving traffic reads as warm light streams
      const frontOff = len * 0.5 + 0.14 + emissiveStrength * 0.45;
      const beamScale = 1 + emissiveStrength * 0.95;
      this.dummy.position.set(x + sin * frontOff, y + 0.56, z + cos * frontOff);
      this.dummy.rotation.set(0, yaw, 0);
      this.dummy.scale.set(w * 0.88, 0.38 * (1 + emissiveStrength * 0.35), 0.32 * beamScale);
      this.dummy.updateMatrix();
      this.headlightMesh.setMatrixAt(i, this.dummy.matrix);
      this.headlightMesh.setColorAt(i, headColor);

      // 4. Tail / Brake light bar (-Z rear)
      const rearOff = -(len * 0.5 + 0.12);
      const brakeGlow = braking || emissiveStrength > 0.42;
      this.dummy.position.set(x + sin * rearOff, y + 0.58, z + cos * rearOff);
      this.dummy.rotation.set(0, yaw, 0);
      this.dummy.scale.set(w * 0.88, brakeGlow ? 0.44 : 0.26, brakeGlow ? 0.38 : 0.18);
      this.dummy.updateMatrix();
      this.taillightMesh.setMatrixAt(i, this.dummy.matrix);
      this.taillightMesh.setColorAt(i, brakeGlow ? brakeCol : BRAKE_IDLE);
    }

    this.bodyMesh.instanceMatrix.needsUpdate = true;
    this.cabinMesh.instanceMatrix.needsUpdate = true;
    this.headlightMesh.instanceMatrix.needsUpdate = true;
    this.taillightMesh.instanceMatrix.needsUpdate = true;
    if (this.bodyMesh.instanceColor) this.bodyMesh.instanceColor.needsUpdate = true;
    if (this.cabinMesh.instanceColor) this.cabinMesh.instanceColor.needsUpdate = true;
    if (this.headlightMesh.instanceColor) this.headlightMesh.instanceColor.needsUpdate = true;
    if (this.taillightMesh.instanceColor) this.taillightMesh.instanceColor.needsUpdate = true;
  }

  getLastEmissive(): number {
    return this.lastEmissive;
  }
}
