import * as THREE from 'three';
import {
  INT_TO_ZONE,
  PLOPPABLE_TO_INT,
  ProblemFlags,
  type PloppableKind,
  type ZoneType,
} from '../sim/types.ts';
import { BUILDING_STRIDE, type BuildingSnapshotPayload } from '../sim/protocol.ts';
import { createAllFacadeTextures, type AllFacadeTextures, type FacadeTextureSet } from './facadeTextures.ts';
import {
  applyVerticalAO,
  attachTreeWindSway,
  createBroadleafCanopyGeo,
  createClosedGableRoofGeo,
  createClosedHipRoofGeo,
  createClosedSawtoothRoofGeo,
  createClosedShedRoofGeo,
  createConiferCanopyGeo,
} from './geometryUtils.ts';
import type { QualityProfile } from './quality.ts';

const INT_TO_PLOPPABLE = new Map<number, PloppableKind>(
  (Object.entries(PLOPPABLE_TO_INT) as Array<[PloppableKind, number]>).map(([k, v]) => [v, k])
);

// Harmonized muted coastal architectural palette (varied warm brick, stone, stucco & coastal glass)
const WALL_PALETTES: Record<Exclude<ZoneType, 'none'>, string[]> = {
  res_low: ['#EAE3D6', '#E4D5C6', '#D5DDD3', '#DFD3C2', '#E8DDD2', '#D8DCE0'],
  res_high: ['#E2DDD5', '#D7D0C6', '#D5DBD9', '#DFD5CA', '#D0D6DC'],
  com_low: ['#E5D8C5', '#C7967E', '#CED8CE', '#DFD3C0', '#C6D2DC', '#EAE4D8'],
  com_high: ['#CED6DE', '#DCD6CC', '#9FB8C8', '#BCC8D0'],
  ind: ['#B8986E', '#747D86', '#9E6954', '#8B857B', '#7F868D'],
  office: ['#8AC0CF', '#7CB0C4', '#96C3CE', '#A6C9D4', '#78A6BA'],
};

const RES_LOW_ROOFS = ['#A25D49', '#566778', '#82614B', '#666B72', '#926D56'];
const COM_LOW_AWNINGS = ['#B85C4B', '#48799B', '#4F8066', '#C29648', '#7D6384'];
const COM_LOW_ROOFS = ['#646D76', '#975D4B', '#586774', '#7B6756'];
const COM_SIGN_COLORS = ['#2E4A62', '#8F4D3F', '#3E6A58', '#997536', '#4E5866'];

interface BoxItem {
  x: number;
  y: number;
  z: number;
  yaw: number;
  sx: number;
  sy: number;
  sz: number;
  color: string;
  rx?: number;
  seed?: number;
}

interface CylinderItem {
  x: number;
  y: number;
  z: number;
  rx?: number;
  rz?: number;
  yaw?: number;
  radiusTop: number;
  radiusBottom: number;
  height: number;
  color: string;
}

interface AoQuadItem {
  x: number;
  y: number;
  z: number;
  yaw: number;
  sx: number;
  sz: number;
}

interface SmokeSource {
  x: number;
  y: number;
  z: number;
  scale: number;
  phase: number;
}

interface YardTreeItem {
  x: number;
  y: number;
  z: number;
  scale: number;
  conifer: boolean;
  color: string;
}

type FacadeKey = 'res_low' | 'res_high' | 'com_low' | 'com_high' | 'ind' | 'office' | 'civic';

function localToWorld(
  ox: number,
  oy: number,
  oz: number,
  yaw: number,
  lx: number,
  ly: number,
  lz: number
): [number, number, number] {
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  return [ox + lx * c + lz * s, oy + ly, oz - lx * s + lz * c];
}

export class BuildingMeshLayer {
  readonly group = new THREE.Group();
  private lastRevision = -1;
  private textures: AllFacadeTextures | null = null;
  private facadeMats: THREE.MeshStandardMaterial[] = [];
  private turbineRotors: THREE.Object3D[] = [];
  private exclusionPoints: Array<{ x: number; z: number; r: number }> = [];

  // Lightweight animated chimney smoke puffs
  private smokeSources: SmokeSource[] = [];
  private smokeMesh: THREE.InstancedMesh | null = null;
  private smokeTime = 0;
  private enableSmoke = true;
  private readonly windTimeUniform = { value: 0 };
  private readonly smokeDummy = new THREE.Object3D();

  setQuality(quality: QualityProfile): void {
    this.enableSmoke = quality.enableSmoke;
    if (this.smokeMesh) {
      this.smokeMesh.visible = this.enableSmoke;
    }
  }

  getExclusionPoints(): Array<{ x: number; z: number; r: number }> {
    return this.exclusionPoints;
  }

  getSharedTextures(): AllFacadeTextures {
    if (!this.textures) {
      this.textures = createAllFacadeTextures();
    }
    return this.textures;
  }

  updateFromSnapshot(payload: BuildingSnapshotPayload): boolean {
    if (payload.revision === this.lastRevision) return false;
    this.lastRevision = payload.revision;
    this.clear();

    const tex = this.getSharedTextures();
    const data = payload.buildings;
    const count = Math.floor(data.length / BUILDING_STRIDE);
    if (count === 0) return true;

    const foundations: BoxItem[] = [];
    const solidTrim: BoxItem[] = [];
    const darkMetal: BoxItem[] = [];
    const glassAccents: BoxItem[] = [];
    const gableRoofs: BoxItem[] = [];
    const hipRoofs: BoxItem[] = [];
    const shedRoofs: BoxItem[] = [];
    const sawtoothRoofs: BoxItem[] = [];
    const cylinders: CylinderItem[] = [];
    const cones: CylinderItem[] = [];
    const aoQuads: AoQuadItem[] = [];
    const yardTrees: YardTreeItem[] = [];
    this.smokeSources = [];

    const facadeBuckets: Record<FacadeKey, BoxItem[]> = {
      res_low: [],
      res_high: [],
      com_low: [],
      com_high: [],
      ind: [],
      office: [],
      civic: [],
    };

    this.exclusionPoints = [];

    const pushBoxLocal = (
      list: BoxItem[],
      ox: number,
      oy: number,
      oz: number,
      yaw: number,
      lx: number,
      ly: number,
      lz: number,
      sx: number,
      sy: number,
      sz: number,
      color: string,
      extraYaw = 0,
      rx = 0,
      seed = 0
    ) => {
      const [wx, wy, wz] = localToWorld(ox, oy, oz, yaw, lx, ly, lz);
      list.push({ x: wx, y: wy, z: wz, yaw: yaw + extraYaw, sx, sy, sz, color, rx, seed });
    };

    const pushCylLocal = (
      list: CylinderItem[],
      ox: number,
      oy: number,
      oz: number,
      yaw: number,
      lx: number,
      ly: number,
      lz: number,
      radiusTop: number,
      radiusBottom: number,
      height: number,
      color: string,
      rx = 0,
      rz = 0
    ) => {
      const [wx, wy, wz] = localToWorld(ox, oy, oz, yaw, lx, ly, lz);
      list.push({ x: wx, y: wy, z: wz, yaw, rx, rz, radiusTop, radiusBottom, height, color });
    };

    const addParapet = (
      ox: number,
      oy: number,
      oz: number,
      yaw: number,
      w: number,
      d: number,
      wallH: number,
      color: string,
      thick = 0.55,
      parapetH = 0.85
    ) => {
      const py = wallH + parapetH * 0.5;
      pushBoxLocal(solidTrim, ox, oy, oz, yaw, 0, py, -d * 0.5 + thick * 0.5, w, parapetH, thick, color);
      pushBoxLocal(solidTrim, ox, oy, oz, yaw, 0, py, d * 0.5 - thick * 0.5, w, parapetH, thick, color);
      pushBoxLocal(
        solidTrim,
        ox,
        oy,
        oz,
        yaw,
        -w * 0.5 + thick * 0.5,
        py,
        0,
        thick,
        parapetH,
        Math.max(0.4, d - thick * 2),
        color
      );
      pushBoxLocal(
        solidTrim,
        ox,
        oy,
        oz,
        yaw,
        w * 0.5 - thick * 0.5,
        py,
        0,
        thick,
        parapetH,
        Math.max(0.4, d - thick * 2),
        color
      );
    };

    for (let i = 0; i < count; i++) {
      const base = i * BUILDING_STRIDE;
      const id = Math.round(data[base]);
      const kindInt = Math.round(data[base + 1]);
      const code = Math.round(data[base + 2]);
      const level = Math.max(1, Math.round(data[base + 3]));
      const x = data[base + 4];
      const y = data[base + 5];
      const z = data[base + 6];
      const yaw = data[base + 7];
      const width = Math.max(4, data[base + 8]);
      const depth = Math.max(4, data[base + 9]);
      const height = Math.max(2.5, data[base + 10]);
      const progress = Math.max(0.15, Math.min(1, data[base + 11]));
      const flags = Math.round(data[base + 12]);
      const variant = Math.abs(Math.round(data[base + 13]));
      const bSeed = ((id * 0.6180339887 + variant * 0.137) % 1 + 1) % 1;

      const isAbandoned = (flags & ProblemFlags.ABANDONED) !== 0;
      this.exclusionPoints.push({ x, z, r: Math.max(width, depth) * 0.66 + 2.5 });

      // Ground contact AO pad under every building
      aoQuads.push({
        x,
        y: y + 0.08,
        z,
        yaw,
        sx: width * 1.16 + 2.2,
        sz: depth * 1.16 + 2.2,
      });

      // =========================================================================
      // 1. RECOGNIZABLE PLOPPABLES (ALL 15 UTILITIES, SERVICES & PARKS)
      // =========================================================================
      if (kindInt === 1) {
        const plop = INT_TO_PLOPPABLE.get(code) ?? 'park_small';
        this.buildPloppable(
          plop,
          x,
          y,
          z,
          yaw,
          width,
          depth,
          height,
          variant,
          bSeed,
          foundations,
          facadeBuckets,
          solidTrim,
          darkMetal,
          glassAccents,
          gableRoofs,
          hipRoofs,
          shedRoofs,
          sawtoothRoofs,
          cylinders,
          cones,
          yardTrees,
          pushBoxLocal,
          pushCylLocal,
          addParapet
        );
        continue;
      }

      // =========================================================================
      // 2. GROWABLE BUILDINGS (SOLID WATERTIGHT ARCHETYPES PER ZONE & LEVEL)
      // =========================================================================
      const zone = INT_TO_ZONE[code] ?? 'res_low';
      if (zone === 'none') continue;

      const palette = WALL_PALETTES[zone];
      let wallColor = palette[(variant + level) % palette.length];
      if (isAbandoned) wallColor = '#747B84';
      else if (progress < 0.95) wallColor = '#D2C3AA';

      const bw = width * 0.88;
      const bd = depth * 0.88;

      // Under construction: solid concrete plinth + rising structural block + crane mast / scaffold rim
      if (progress < 0.95) {
        const curH = Math.max(2.6, height * (0.28 + 0.72 * progress));
        foundations.push({ x, y: y - 1.85, z, yaw, sx: bw + 0.6, sy: 4.2, sz: bd + 0.6, color: '#97938A' });
        solidTrim.push({ x, y: y + curH * 0.5, z, yaw, sx: bw * 0.94, sy: curH, sz: bd * 0.94, color: '#CFC4B0' });
        darkMetal.push({ x, y: y + curH + 0.6, z, yaw, sx: bw * 0.98, sy: 0.45, sz: bd * 0.98, color: '#C59A4B' });
        continue;
      }

      // -----------------------------------------------------------------------
      // RES_LOW: Pitched gable / hipped / modern split-level villas + porches + chimneys + yards
      // -----------------------------------------------------------------------
      if (zone === 'res_low') {
        const roofColor = isAbandoned ? '#5E646C' : RES_LOW_ROOFS[(variant + id) % RES_LOW_ROOFS.length];
        const trimColor = isAbandoned ? '#6F757D' : '#EDE8DF';
        const style = (variant + id) % 3; // 0 = gable house, 1 = hipped villa, 2 = modern coastal split-level

        // Watertight lot terrace / garden pad (-4m skirt)
        foundations.push({
          x,
          y: y - 1.9,
          z,
          yaw,
          sx: width * 0.96,
          sy: 4.1,
          sz: depth * 0.96,
          color: '#889677',
        });

        // Proportioned house mass inside the yard (prevents 3x3 lots becoming giant barns!)
        const lotScaleX = width > 14 ? 0.68 : 0.78;
        const lotScaleZ = depth > 14 ? 0.62 : 0.74;
        const hx = Math.min(14.5, width * lotScaleX);
        const hz = Math.min(11.5, depth * lotScaleZ);
        const houseH = Math.max(4.6, Math.min(11.5, height * (0.76 + level * 0.06)));
        const shiftX = width > 14 ? ((variant % 2 === 0 ? -1 : 1) * (width - hx) * 0.14) : 0;
        const shiftZ = -(depth - hz) * 0.16; // pull slightly toward street (-Z), leaving backyard (+Z)

        // Solid stone plinth under house
        pushBoxLocal(foundations, x, y, z, yaw, shiftX, -1.65, shiftZ, hx + 0.55, 4.1, hz + 0.55, '#99948C');
        // Main house body
        pushBoxLocal(
          facadeBuckets.res_low,
          x,
          y,
          z,
          yaw,
          shiftX,
          houseH * 0.5 + 0.35,
          shiftZ,
          hx,
          houseH,
          hz,
          wallColor,
          0,
          0,
          bSeed
        );

        const roofBaseY = houseH + 0.35;
        if (style === 0) {
          // Gable roof with crisp eave overhang + ridge cap beam + chimney
          const roofH = Math.min(3.8, Math.max(2.1, hz * 0.34));
          const rotRidge = hx < hz ? Math.PI * 0.5 : 0;
          const rw = rotRidge === 0 ? hx + 0.9 : hz + 0.9;
          const rd = rotRidge === 0 ? hz + 1.0 : hx + 1.0;
          pushBoxLocal(
            gableRoofs,
            x,
            y,
            z,
            yaw,
            shiftX,
            roofBaseY + roofH * 0.5,
            shiftZ,
            rw,
            roofH,
            rd,
            roofColor,
            rotRidge
          );
          // Crisp architectural roof ridge cap beam
          pushBoxLocal(
            solidTrim,
            x,
            y,
            z,
            yaw,
            shiftX,
            roofBaseY + roofH + 0.08,
            shiftZ,
            rotRidge === 0 ? rw + 0.1 : 0.34,
            0.26,
            rotRidge === 0 ? 0.34 : rw + 0.1,
            '#4C5056'
          );
          // Brick chimney rising through roof
          pushBoxLocal(
            solidTrim,
            x,
            y,
            z,
            yaw,
            shiftX + hx * 0.28,
            roofBaseY + roofH * 0.62,
            shiftZ + hz * 0.16,
            1.05,
            roofH + 1.35,
            1.05,
            '#8E5B4C'
          );
        } else if (style === 1) {
          // Hipped coastal villa roof (horizontal ridge, NOT a sharp pyramid)
          const roofH = Math.min(3.5, Math.max(1.9, Math.min(hx, hz) * 0.32));
          pushBoxLocal(
            hipRoofs,
            x,
            y,
            z,
            yaw,
            shiftX,
            roofBaseY + roofH * 0.5,
            shiftZ,
            hx + 1.05,
            roofH,
            hz + 1.05,
            roofColor
          );
          // Chimney
          pushBoxLocal(
            solidTrim,
            x,
            y,
            z,
            yaw,
            shiftX - hx * 0.25,
            roofBaseY + roofH * 0.58,
            shiftZ - hz * 0.1,
            0.95,
            roofH + 1.15,
            0.95,
            '#9A8A7B'
          );
        } else {
          // Modern split-level coastal home with cantilevered shed roof & cedar fascia
          const roofH = Math.min(2.2, Math.max(1.2, hz * 0.18));
          pushBoxLocal(
            shedRoofs,
            x,
            y,
            z,
            yaw,
            shiftX,
            roofBaseY + roofH * 0.5,
            shiftZ,
            hx + 1.15,
            roofH,
            hz + 1.15,
            roofColor
          );
          // Upper clerestory / bonus room volume on L2+
          if (level >= 2 || width >= 12) {
            const ux = hx * 0.58;
            const uz = hz * 0.64;
            const uh = 2.6 + level * 0.35;
            pushBoxLocal(
              facadeBuckets.res_low,
              x,
              y,
              z,
              yaw,
              shiftX - hx * 0.16,
              roofBaseY + uh * 0.45,
              shiftZ + hz * 0.12,
              ux,
              uh,
              uz,
              trimColor,
              0,
              0,
              (bSeed + 0.31) % 1
            );
            pushBoxLocal(
              shedRoofs,
              x,
              y,
              z,
              yaw,
              shiftX - hx * 0.16,
              roofBaseY + uh + 0.45,
              shiftZ + hz * 0.12,
              ux + 0.9,
              1.0,
              uz + 0.9,
              '#596571',
              Math.PI
            );
          }
        }

        // Front entrance porch / stoop facing street (-Z)
        const porchW = Math.min(4.2, hx * 0.42);
        const porchD = 2.0;
        const porchZ = shiftZ - hz * 0.5 - porchD * 0.45;
        pushBoxLocal(solidTrim, x, y, z, yaw, shiftX, 0.55, porchZ, porchW, 0.65, porchD, '#CEC7BA');
        pushBoxLocal(
          shedRoofs,
          x,
          y,
          z,
          yaw,
          shiftX,
          3.1,
          porchZ - 0.1,
          porchW + 0.5,
          0.75,
          porchD + 0.55,
          roofColor,
          Math.PI
        );
        // Porch columns
        pushBoxLocal(solidTrim, x, y, z, yaw, shiftX - porchW * 0.42, 1.85, porchZ - porchD * 0.36, 0.28, 2.2, 0.28, trimColor);
        pushBoxLocal(solidTrim, x, y, z, yaw, shiftX + porchW * 0.42, 1.85, porchZ - porchD * 0.36, 0.28, 2.2, 0.28, trimColor);

        // L-shaped side wing / garage for wider lots (adds architectural richness)
        if (width >= 13 && style !== 2) {
          const wingW = Math.min(5.8, (width - hx) * 0.82);
          const wingD = hz * 0.72;
          const wingH = Math.max(3.6, houseH * 0.62);
          const sideSign = shiftX <= 0 ? 1 : -1;
          const wx = shiftX + sideSign * (hx * 0.5 + wingW * 0.45);
          pushBoxLocal(
            facadeBuckets.res_low,
            x,
            y,
            z,
            yaw,
            wx,
            wingH * 0.5 + 0.35,
            shiftZ + hz * 0.08,
            wingW,
            wingH,
            wingD,
            trimColor,
            0,
            0,
            (bSeed + 0.57) % 1
          );
          pushBoxLocal(
            gableRoofs,
            x,
            y,
            z,
            yaw,
            wx,
            wingH + 0.35 + 0.95,
            shiftZ + hz * 0.08,
            wingW + 0.7,
            1.9,
            wingD + 0.7,
            roofColor
          );
        }

        // Low garden hedge / fence border + backyard garden plot or tree on larger lots
        if (depth >= 11 || width >= 12) {
          const hedgeCol = (variant + id) % 2 === 0 ? '#5D8052' : '#B6A78E';
          const fenceH = (variant + id) % 2 === 0 ? 0.95 : 0.78;
          const fy = 0.2 + fenceH * 0.5;
          const hw = width * 0.46;
          const hd = depth * 0.46;
          // Back and side lot borders
          pushBoxLocal(solidTrim, x, y, z, yaw, 0, fy, hd, width * 0.92, fenceH, 0.45, hedgeCol);
          pushBoxLocal(solidTrim, x, y, z, yaw, -hw, fy, hd * 0.25, 0.45, fenceH, depth * 0.65, hedgeCol);
          pushBoxLocal(solidTrim, x, y, z, yaw, hw, fy, hd * 0.25, 0.45, fenceH, depth * 0.65, hedgeCol);

          // Backyard garden bed or cozy yard tree
          if (depth >= 12) {
            if ((variant + id) % 3 === 0) {
              pushBoxLocal(solidTrim, x, y, z, yaw, -width * 0.18, 0.32, hd - 2.4, 3.8, 0.3, 2.2, '#7B6753');
              pushBoxLocal(solidTrim, x, y, z, yaw, -width * 0.18, 0.5, hd - 2.4, 3.3, 0.28, 1.7, '#648E53');
            }
            const [tx, ty, tz] = localToWorld(
              x,
              y + 0.2,
              z,
              yaw,
              ((variant % 2 === 0 ? 1 : -1) * width * 0.26),
              0,
              hd - 2.3
            );
            yardTrees.push({
              x: tx,
              y: ty,
              z: tz,
              scale: 0.55 + (variant % 3) * 0.12,
              conifer: (id + variant) % 4 === 0,
              color: (id + variant) % 7 === 0 ? '#CFA7AB' : '#58824D',
            });
          }
        }
        continue;
      }

      // -----------------------------------------------------------------------
      // RES_HIGH: Apartment slabs & terraced towers with balcony grids & rooftop penthouses
      // -----------------------------------------------------------------------
      if (zone === 'res_high') {
        const towerH = Math.max(16, height * (0.95 + (level - 1) * 0.12));
        const trimCol = isAbandoned ? '#687078' : '#CFC9BE';
        const railCol = isAbandoned ? '#586068' : '#52616E';

        foundations.push({ x, y: y - 1.85, z, yaw, sx: bw + 0.7, sy: 4.2, sz: bd + 0.7, color: '#949088' });

        // Ground lobby plinth
        const plinthH = 3.6;
        pushBoxLocal(solidTrim, x, y, z, yaw, 0, plinthH * 0.5 + 0.2, 0, bw * 1.02, plinthH, bd * 1.02, '#B6B1A8');
        pushBoxLocal(glassAccents, x, y, z, yaw, 0, plinthH * 0.5 + 0.2, -bd * 0.51, bw * 0.56, plinthH * 0.78, 0.45, '#3E5B6E');

        // Main residential slab/tower shaft
        const mainH = level >= 3 ? towerH * 0.74 : towerH - plinthH;
        const shaftBaseY = plinthH + 0.2;
        pushBoxLocal(
          facadeBuckets.res_high,
          x,
          y,
          z,
          yaw,
          0,
          shaftBaseY + mainH * 0.5,
          0,
          bw,
          mainH,
          bd,
          wallColor,
          0,
          0,
          bSeed
        );

        // Protruding balcony slabs with railing strips on front & back facades
        const floorStep = 3.4;
        const balconyFloors = Math.min(10, Math.max(2, Math.floor(mainH / floorStep)));
        const balcCols = bw >= 16 ? 2 : 1;
        const balcW = balcCols === 2 ? bw * 0.34 : bw * 0.58;
        for (let f = 1; f < balconyFloors; f++) {
          const by = shaftBaseY + f * floorStep;
          if (by > shaftBaseY + mainH - 1.5) break;
          for (let c = 0; c < balcCols; c++) {
            const bx = balcCols === 2 ? (c === 0 ? -bw * 0.24 : bw * 0.24) : 0;
            // Front (-Z) balcony floor + railing
            pushBoxLocal(solidTrim, x, y, z, yaw, bx, by, -bd * 0.5 - 0.52, balcW, 0.34, 1.08, trimCol);
            pushBoxLocal(darkMetal, x, y, z, yaw, bx, by + 0.55, -bd * 0.5 - 0.96, balcW, 0.75, 0.18, railCol);
            // Back (+Z) balcony floor + railing on every other floor or tall blocks
            if (bd >= 10) {
              pushBoxLocal(solidTrim, x, y, z, yaw, bx, by, bd * 0.5 + 0.52, balcW, 0.34, 1.08, trimCol);
              pushBoxLocal(darkMetal, x, y, z, yaw, bx, by + 0.55, bd * 0.5 + 0.96, balcW, 0.75, 0.18, railCol);
            }
          }
        }

        // Upper setback tier for higher levels (L3–L5)
        let topY = shaftBaseY + mainH;
        addParapet(x, y, z, yaw, bw, bd, topY, trimCol, 0.55, 0.9);
        if (level >= 3) {
          const upperH = Math.max(6.5, towerH * 0.28);
          const uw = bw * 0.76;
          const ud = bd * 0.76;
          pushBoxLocal(
            facadeBuckets.res_high,
            x,
            y,
            z,
            yaw,
            0,
            topY + upperH * 0.5,
            0,
            uw,
            upperH,
            ud,
            wallColor,
            0,
            0,
            (bSeed + 0.23) % 1
          );
          topY += upperH;
          addParapet(x, y, z, yaw, uw, ud, topY, trimCol, 0.5, 0.85);
        }

        // Rooftop elevator stairhead + HVAC condensers
        pushBoxLocal(solidTrim, x, y, z, yaw, -bw * 0.14, topY + 1.5, bd * 0.08, bw * 0.3, 3.0, bd * 0.28, '#C8C3BA');
        pushBoxLocal(darkMetal, x, y, z, yaw, bw * 0.18, topY + 0.85, -bd * 0.12, 2.2, 1.4, 1.8, '#7A838C');
        continue;
      }

      // -----------------------------------------------------------------------
      // COM_LOW: Varied corner shops, pitched-roof cafés & modern boutiques with wrap awnings
      // -----------------------------------------------------------------------
      if (zone === 'com_low') {
        const awningCol = isAbandoned ? '#676D75' : COM_LOW_AWNINGS[(variant + id) % COM_LOW_AWNINGS.length];
        const signCol = isAbandoned ? '#5A6068' : COM_SIGN_COLORS[(variant + id) % COM_SIGN_COLORS.length];
        const shopH = Math.max(5.5, Math.min(13.5, height));

        foundations.push({ x, y: y - 1.85, z, yaw, sx: bw + 0.6, sy: 4.2, sz: bd + 0.6, color: '#96928A' });

        // Split wide commercial frontage into two distinct varied-height storefronts for boutique rhythm
        const splitShop = bw >= 14.5;
        const subCount = splitShop ? 2 : 1;
        for (let s = 0; s < subCount; s++) {
          const sw = splitShop ? bw * 0.49 : bw;
          const sxOff = splitShop ? (s === 0 ? -bw * 0.255 : bw * 0.255) : 0;
          const style = (variant + id + s) % 3; // 0 = classic parapet shop, 1 = pitched-roof café, 2 = stepped boutique
          const sh = splitShop ? shopH * (s === 0 ? 1.02 : 0.8) : shopH;
          const subWall = s === 0 ? wallColor : palette[(variant + level + 2) % palette.length];
          const subAwning = s === 0 ? awningCol : COM_LOW_AWNINGS[(variant + id + 2) % COM_LOW_AWNINGS.length];
          const subRoof = isAbandoned ? '#5E646C' : COM_LOW_ROOFS[(variant + id + s) % COM_LOW_ROOFS.length];

          pushBoxLocal(
            facadeBuckets.com_low,
            x,
            y,
            z,
            yaw,
            sxOff,
            sh * 0.5 + 0.25,
            0,
            sw,
            sh,
            bd,
            isAbandoned ? '#747B84' : subWall,
            0,
            0,
            (bSeed + s * 0.37) % 1
          );

          const topY = sh + 0.25;
          if (style === 1) {
            // Coastal pitched-roof café / bakery silhouette
            const roofH = Math.min(2.8, Math.max(1.6, Math.min(sw, bd) * 0.24));
            pushBoxLocal(
              hipRoofs,
              x,
              y,
              z,
              yaw,
              sxOff,
              topY + roofH * 0.5,
              0,
              sw + 0.65,
              roofH,
              bd + 0.65,
              subRoof
            );
          } else if (style === 2) {
            // Modern stepped boutique with recessed timber/slate rooftop lounge
            pushBoxLocal(solidTrim, x, y, z, yaw, sxOff, topY + 0.35, -bd * 0.5 + 0.28, sw + 0.25, 0.75, 0.56, subRoof);
            pushBoxLocal(solidTrim, x, y, z, yaw, sxOff, topY + 0.35, bd * 0.5 - 0.28, sw + 0.25, 0.75, 0.56, subRoof);
            pushBoxLocal(solidTrim, x, y, z, yaw, sxOff - sw * 0.5 + 0.25, topY + 0.35, 0, 0.5, 0.75, bd, subRoof);
            pushBoxLocal(solidTrim, x, y, z, yaw, sxOff + sw * 0.5 - 0.25, topY + 0.35, 0, 0.5, 0.75, bd, subRoof);
            pushBoxLocal(
              solidTrim,
              x,
              y,
              z,
              yaw,
              sxOff,
              topY + 1.15,
              bd * 0.1,
              sw * 0.58,
              1.9,
              bd * 0.52,
              '#9E8366'
            );
            pushBoxLocal(
              shedRoofs,
              x,
              y,
              z,
              yaw,
              sxOff,
              topY + 2.4,
              bd * 0.1,
              sw * 0.64,
              0.75,
              bd * 0.58,
              subRoof
            );
          } else {
            // Classic commercial shop with raised decorative facade cornice + gravel roof + AC
            pushBoxLocal(solidTrim, x, y, z, yaw, sxOff, topY + 0.55, -bd * 0.5 + 0.3, sw + 0.25, 1.15, 0.6, '#C8C0B2');
            pushBoxLocal(solidTrim, x, y, z, yaw, sxOff, topY + 0.35, bd * 0.5 - 0.28, sw + 0.2, 0.75, 0.56, '#C8C0B2');
            pushBoxLocal(solidTrim, x, y, z, yaw, sxOff - sw * 0.5 + 0.25, topY + 0.35, 0, 0.5, 0.75, bd, '#C8C0B2');
            pushBoxLocal(solidTrim, x, y, z, yaw, sxOff + sw * 0.5 - 0.25, topY + 0.35, 0, 0.5, 0.75, bd, '#C8C0B2');
            pushBoxLocal(darkMetal, x, y, z, yaw, sxOff + sw * 0.16, topY + 0.55, bd * 0.14, 1.6, 0.95, 1.35, '#76808A');
          }

          // Sloped storefront awning on BOTH street front (-Z) and visible rear/corner wrap so streets pop from every angle
          const awnY = Math.min(3.55, sh * 0.46);
          pushBoxLocal(
            shedRoofs,
            x,
            y,
            z,
            yaw,
            sxOff,
            awnY,
            -bd * 0.5 - 0.68,
            sw * 0.94,
            0.84,
            1.42,
            subAwning,
            Math.PI
          );
          // Subtle side awning on corner face for visual richness from oblique angles
          if (!splitShop || s === 0) {
            pushBoxLocal(
              shedRoofs,
              x,
              y,
              z,
              yaw,
              sxOff - sw * 0.5 - 0.52,
              awnY,
              -bd * 0.1,
              bd * 0.58,
              0.76,
              1.1,
              subAwning,
              -Math.PI * 0.5
            );
          }

          // Original compact storefront signboard mounted cleanly above awning
          pushBoxLocal(
            solidTrim,
            x,
            y,
            z,
            yaw,
            sxOff,
            awnY + 0.85,
            -bd * 0.5 - 0.16,
            sw * 0.64,
            0.78,
            0.28,
            signCol
          );
          pushBoxLocal(
            solidTrim,
            x,
            y,
            z,
            yaw,
            sxOff,
            awnY + 0.85,
            -bd * 0.5 - 0.32,
            sw * 0.38,
            0.2,
            0.08,
            '#F2ECE1'
          );
        }
        continue;
      }

      // -----------------------------------------------------------------------
      // COM_HIGH: Glazed retail podium, entrance canopy, stepped tower & skylight crown
      // -----------------------------------------------------------------------
      if (zone === 'com_high') {
        const podiumH = Math.min(8.5, height * 0.36);
        const upperH = Math.max(10, height - podiumH);
        const trimCol = isAbandoned ? '#6C737C' : '#D5D9DF';

        foundations.push({ x, y: y - 1.85, z, yaw, sx: bw + 0.8, sy: 4.2, sz: bd + 0.8, color: '#919498' });

        // Wide glazed retail podium
        pushBoxLocal(
          facadeBuckets.com_high,
          x,
          y,
          z,
          yaw,
          0,
          podiumH * 0.5 + 0.25,
          0,
          bw,
          podiumH,
          bd,
          wallColor,
          0,
          0,
          bSeed
        );
        // Projecting glass-and-steel entrance canopy facing street (-Z)
        pushBoxLocal(darkMetal, x, y, z, yaw, 0, 3.8, -bd * 0.5 - 1.1, bw * 0.68, 0.38, 2.2, '#4A5B6B');
        pushBoxLocal(glassAccents, x, y, z, yaw, 0, 4.02, -bd * 0.5 - 1.05, bw * 0.62, 0.18, 1.9, '#7CB2C8');

        // Upper stepped commercial tower
        const uw = bw * 0.82;
        const ud = bd * 0.8;
        const upperBaseY = podiumH + 0.25;
        pushBoxLocal(
          facadeBuckets.com_high,
          x,
          y,
          z,
          yaw,
          0,
          upperBaseY + upperH * 0.5,
          bd * 0.04,
          uw,
          upperH,
          ud,
          wallColor,
          0,
          0,
          (bSeed + 0.41) % 1
        );
        // Vertical glazed atrium feature bay on front facade
        pushBoxLocal(
          glassAccents,
          x,
          y,
          z,
          yaw,
          0,
          upperBaseY + upperH * 0.5,
          bd * 0.04 - ud * 0.5 - 0.22,
          uw * 0.34,
          upperH * 0.94,
          0.45,
          '#4C829E'
        );

        const topY = upperBaseY + upperH;
        addParapet(x, y, z, yaw, uw, ud, topY, trimCol, 0.6, 1.05);
        // Rooftop skylight monitor & signage frame
        pushBoxLocal(glassAccents, x, y, z, yaw, 0, topY + 1.15, bd * 0.04, uw * 0.44, 1.8, ud * 0.34, '#6A9DB4');
        continue;
      }

      // -----------------------------------------------------------------------
      // IND: Sawtooth / monitor roofs, storage tanks/silos, loading bays & rising smoke
      // -----------------------------------------------------------------------
      if (zone === 'ind') {
        const hallH = Math.max(6.2, Math.min(14.0, height * 0.88));
        const roofCol = isAbandoned ? '#626870' : '#7B848D';
        const hasYardTank = bw >= 12 || variant % 2 === 0;
        const hallW = hasYardTank ? bw * 0.72 : bw;
        const hallShiftX = hasYardTank ? -bw * 0.13 : 0;

        foundations.push({ x, y: y - 1.85, z, yaw, sx: bw + 0.8, sy: 4.2, sz: bd + 0.8, color: '#84837E' });

        // Main industrial hall
        pushBoxLocal(
          facadeBuckets.ind,
          x,
          y,
          z,
          yaw,
          hallShiftX,
          hallH * 0.5 + 0.25,
          0,
          hallW,
          hallH,
          bd * 0.9,
          wallColor,
          0,
          0,
          bSeed
        );

        // Sawtooth roof (variants 0,1) or clerestory monitor roof (variants 2,3)
        const roofBaseY = hallH + 0.25;
        if (variant % 2 === 0) {
          const sawH = Math.min(3.2, Math.max(1.8, hallW * 0.16));
          pushBoxLocal(
            sawtoothRoofs,
            x,
            y,
            z,
            yaw,
            hallShiftX,
            roofBaseY + sawH * 0.5,
            0,
            hallW + 0.3,
            sawH,
            bd * 0.92,
            roofCol
          );
        } else {
          // Raised monitor skylight ridge
          pushBoxLocal(solidTrim, x, y, z, yaw, hallShiftX, roofBaseY + 0.35, 0, hallW + 0.3, 0.7, bd * 0.92, roofCol);
          pushBoxLocal(
            solidTrim,
            x,
            y,
            z,
            yaw,
            hallShiftX,
            roofBaseY + 1.5,
            0,
            hallW * 0.78,
            1.7,
            bd * 0.36,
            '#6D767F'
          );
          pushBoxLocal(
            gableRoofs,
            x,
            y,
            z,
            yaw,
            hallShiftX,
            roofBaseY + 2.8,
            0,
            hallW * 0.82,
            1.1,
            bd * 0.42,
            roofCol
          );
        }

        // Loading bay canopy facing street (-Z)
        pushBoxLocal(
          darkMetal,
          x,
          y,
          z,
          yaw,
          hallShiftX,
          3.9,
          -bd * 0.45 - 0.85,
          hallW * 0.65,
          0.35,
          1.7,
          '#5E666E'
        );

        // Storage silos / tanks on side yard
        if (hasYardTank) {
          const tx = bw * 0.34;
          const tankR = Math.min(2.3, bw * 0.12);
          const tankH = hallH * 0.86;
          pushCylLocal(cylinders, x, y, z, yaw, tx, tankH * 0.5 + 0.25, -bd * 0.18, tankR, tankR, tankH, '#B8BEC4');
          pushCylLocal(cones, x, y, z, yaw, tx, tankH + 0.75, -bd * 0.18, 0.2, tankR * 1.04, 1.0, '#969EA6');
          if (bd >= 12) {
            pushCylLocal(cylinders, x, y, z, yaw, tx, tankH * 0.45 + 0.25, bd * 0.2, tankR * 0.9, tankR * 0.9, tankH * 0.9, '#A5AEB6');
          }
        }

        // Industrial smokestack + animated smoke puff source
        if (!isAbandoned && (variant % 2 === 0 || level >= 2)) {
          const stackH = 6.5 + level * 2.5;
          const sx = hallShiftX + hallW * 0.32;
          const sz = bd * 0.26;
          pushCylLocal(
            cylinders,
            x,
            y,
            z,
            yaw,
            sx,
            roofBaseY + stackH * 0.5,
            sz,
            0.55,
            0.95,
            stackH,
            variant % 3 === 0 ? '#9E5E4B' : '#737C86'
          );
          pushCylLocal(
            cylinders,
            x,
            y,
            z,
            yaw,
            sx,
            roofBaseY + stackH - 1.4,
            sz,
            0.66,
            0.7,
            1.1,
            '#D4CEC4'
          );
          const [smX, smY, smZ] = localToWorld(x, y, z, yaw, sx, roofBaseY + stackH + 0.6, sz);
          this.smokeSources.push({ x: smX, y: smY, z: smZ, scale: 0.95, phase: bSeed * Math.PI * 2 });
        }
        continue;
      }

      // -----------------------------------------------------------------------
      // OFFICE: Glass curtain-wall towers stepping sharply with level + varied skyline crowns
      // -----------------------------------------------------------------------
      if (zone === 'office') {
        const heightVar = 0.88 + ((variant + id) % 4) * 0.14; // organic downtown skyline height variation
        const officeH = Math.max(22, height * (1.04 + (level - 1) * 0.18) * heightVar);
        const mullionCol = isAbandoned ? '#6C737B' : '#D5DDE4';

        foundations.push({ x, y: y - 1.85, z, yaw, sx: bw + 0.8, sy: 4.2, sz: bd + 0.8, color: '#8F959C' });

        // Stone-framed double-height lobby base
        const lobbyH = 4.6;
        pushBoxLocal(solidTrim, x, y, z, yaw, 0, lobbyH * 0.5 + 0.25, 0, bw * 1.02, lobbyH, bd * 1.02, '#C7CFD6');
        pushBoxLocal(glassAccents, x, y, z, yaw, 0, lobbyH * 0.5 + 0.25, 0, bw * 0.9, lobbyH * 0.82, bd * 1.04, '#4B7890');

        // Primary curtain-wall shaft
        const shaftBase = lobbyH + 0.25;
        const hasSetback = level >= 2 || (variant + id) % 2 === 0;
        const mainH = hasSetback ? officeH * 0.68 : officeH - lobbyH;
        pushBoxLocal(
          facadeBuckets.office,
          x,
          y,
          z,
          yaw,
          0,
          shaftBase + mainH * 0.5,
          0,
          bw * 0.94,
          mainH,
          bd * 0.94,
          wallColor,
          0,
          0,
          bSeed
        );

        // Crisp architectural corner piers + horizontal floor-belt cornice band
        const pw = bw * 0.47;
        const pd = bd * 0.47;
        for (const sx of [-pw, pw]) {
          for (const sz of [-pd, pd]) {
            pushBoxLocal(solidTrim, x, y, z, yaw, sx, shaftBase + mainH * 0.5, sz, 0.72, mainH + 0.4, 0.72, mullionCol);
          }
        }
        pushBoxLocal(solidTrim, x, y, z, yaw, 0, shaftBase + mainH * 0.5, 0, bw * 0.97, 0.48, bd * 0.97, mullionCol);

        let topY = shaftBase + mainH;
        addParapet(x, y, z, yaw, bw * 0.94, bd * 0.94, topY, mullionCol, 0.52, 0.9);

        // Stepped upper glass setback tower for dynamic downtown skyline
        if (hasSetback) {
          const upperH = Math.max(7.5, officeH * 0.34);
          const uw = bw * 0.68;
          const ud = bd * 0.68;
          pushBoxLocal(
            facadeBuckets.office,
            x,
            y,
            z,
            yaw,
            0,
            topY + upperH * 0.5,
            0,
            uw,
            upperH,
            ud,
            wallColor,
            0,
            0,
            (bSeed + 0.52) % 1
          );
          topY += upperH;
          addParapet(x, y, z, yaw, uw, ud, topY, mullionCol, 0.48, 1.05);
        }

        // Sculpted rooftop mechanical plant & landmark spire on tallest towers
        pushBoxLocal(solidTrim, x, y, z, yaw, 0, topY + 1.6, 0, bw * 0.38, 3.0, bd * 0.38, '#C3CDD6');
        if (level >= 3 || officeH > 32) {
          pushCylLocal(cylinders, x, y, z, yaw, 0, topY + 6.4, 0, 0.14, 0.32, 7.2, '#E2E9F0');
        }
      }
    }

    // =========================================================================
    // 3. EMIT SOLID WATERTIGHT INSTANCED MESHES (LOW DRAW CALLS!)
    // =========================================================================
    this.addSolidBoxInstanced(foundations, 0.94, 0.02, 0.78);
    this.addSolidBoxInstanced(solidTrim, 0.82, 0.06, 0.84);
    this.addSolidBoxInstanced(darkMetal, 0.52, 0.36, 0.85);
    this.addSolidBoxInstanced(glassAccents, 0.24, 0.42, 0.86);

    // Archetype-specific windowed building facades with world-proportioned UVs & night variation
    this.addFacadeInstanced('res_low', facadeBuckets.res_low, tex.res_low, 3.0, 3.1, 0.82, 0.04, '#8A857C');
    this.addFacadeInstanced('res_high', facadeBuckets.res_high, tex.res_high, 3.3, 3.4, 0.78, 0.06, '#7E8082');
    this.addFacadeInstanced('com_low', facadeBuckets.com_low, tex.com_low, 3.2, 3.6, 0.76, 0.06, '#76787A');
    this.addFacadeInstanced('com_high', facadeBuckets.com_high, tex.com_high, 3.6, 3.8, 0.42, 0.22, '#868E96');
    this.addFacadeInstanced('ind', facadeBuckets.ind, tex.ind, 3.8, 4.2, 0.86, 0.12, '#6E747B');
    this.addFacadeInstanced('office', facadeBuckets.office, tex.office, 3.4, 3.6, 0.2, 0.24, '#8B96A0');
    this.addFacadeInstanced('civic', facadeBuckets.civic, tex.civic, 3.4, 3.6, 0.76, 0.08, '#908F8A');

    // Solid watertight roofs
    this.addCustomPolyInstanced(gableRoofs, createClosedGableRoofGeo(), 0.84, 0.04);
    this.addCustomPolyInstanced(hipRoofs, createClosedHipRoofGeo(0.5), 0.84, 0.04);
    this.addCustomPolyInstanced(shedRoofs, createClosedShedRoofGeo(), 0.8, 0.06);
    this.addCustomPolyInstanced(sawtoothRoofs, createClosedSawtoothRoofGeo(3), 0.78, 0.14);

    // Closed cylinders & cones
    this.addCylinderInstanced(cylinders, false);
    this.addCylinderInstanced(cones, true);

    // Grounded Contact AO quads
    this.addGroundAOInstanced(aoQuads, tex.groundAO);

    // Park & yard trees (sharing our solid broadleaf & conifer silhouettes + wind sway)
    this.addYardTreesInstanced(yardTrees);

    // Lightweight rising smoke puffs above factories & coal plants
    this.buildSmokeInstanced();

    return true;
  }

  private buildPloppable(
    plop: PloppableKind,
    x: number,
    y: number,
    z: number,
    yaw: number,
    width: number,
    depth: number,
    height: number,
    variant: number,
    bSeed: number,
    foundations: BoxItem[],
    facadeBuckets: Record<FacadeKey, BoxItem[]>,
    solidTrim: BoxItem[],
    darkMetal: BoxItem[],
    glassAccents: BoxItem[],
    gableRoofs: BoxItem[],
    hipRoofs: BoxItem[],
    shedRoofs: BoxItem[],
    sawtoothRoofs: BoxItem[],
    cylinders: CylinderItem[],
    cones: CylinderItem[],
    yardTrees: YardTreeItem[],
    pushBoxLocal: (
      list: BoxItem[],
      ox: number,
      oy: number,
      oz: number,
      yaw: number,
      lx: number,
      ly: number,
      lz: number,
      sx: number,
      sy: number,
      sz: number,
      color: string,
      extraYaw?: number,
      rx?: number,
      seed?: number
    ) => void,
    pushCylLocal: (
      list: CylinderItem[],
      ox: number,
      oy: number,
      oz: number,
      yaw: number,
      lx: number,
      ly: number,
      lz: number,
      radiusTop: number,
      radiusBottom: number,
      height: number,
      color: string,
      rx?: number,
      rz?: number
    ) => void,
    addParapet: (
      ox: number,
      oy: number,
      oz: number,
      yaw: number,
      w: number,
      d: number,
      wallH: number,
      color: string,
      thick?: number,
      parapetH?: number
    ) => void
  ): void {
    // 1. Wind Turbine
    if (plop === 'wind_turbine') {
      foundations.push({ x, y: y - 1.8, z, yaw, sx: 6.8, sy: 4.0, sz: 6.8, color: '#ABA79E' });
      pushCylLocal(cylinders, x, y, z, yaw, 0, 15.0, 0, 0.65, 1.45, 30.0, '#ECEFF3');
      // Streamlined nacelle
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, 30.2, 0.3, 2.1, 2.0, 4.8, '#E4EAF0');
      pushCylLocal(cones, x, y, z, yaw, 0, 30.2, 2.9, 0.15, 0.95, 1.8, '#EEF2F6', Math.PI * 0.5);

      const rotor = this.createWindRotor();
      rotor.position.set(x, y + 30.2, z);
      rotor.rotation.y = yaw;
      rotor.children[0].rotation.z = variant * 0.9;
      this.turbineRotors.push(rotor.children[0]);
      this.group.add(rotor);
      return;
    }

    // 2. Solar Plant: control house + rows of tilted navy PV arrays
    if (plop === 'solar_plant') {
      foundations.push({ x, y: y - 1.85, z, yaw, sx: width, sy: 4.1, sz: depth, color: '#ABA599' });
      // Small white inverter cabin in corner
      pushBoxLocal(facadeBuckets.civic, x, y, z, yaw, -width * 0.34, 2.2, -depth * 0.3, 7.5, 4.0, 6.2, '#E5E8EC', 0, 0, bSeed);
      pushBoxLocal(solidTrim, x, y, z, yaw, -width * 0.34, 4.4, -depth * 0.3, 7.9, 0.45, 6.6, '#6E7C8A');
      // 3x4 tilted solar panel banks
      const rows = 3;
      const cols = 4;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (r === 0 && c === 0) continue; // space for cabin
          const lx = -width * 0.36 + c * (width * 0.24);
          const lz = -depth * 0.3 + r * (depth * 0.3);
          pushBoxLocal(darkMetal, x, y, z, yaw, lx, 1.0, lz, 0.55, 1.8, 0.55, '#8A949E');
          pushBoxLocal(glassAccents, x, y, z, yaw, lx, 2.15, lz, 5.8, 0.22, 4.0, '#264468', 0, 0.46);
          pushBoxLocal(solidTrim, x, y, z, yaw, lx, 2.02, lz, 6.0, 0.14, 4.2, '#BCC5CE', 0, 0.46);
        }
      }
      return;
    }

    // 3. Coal Plant: brick boiler hall + turbine hall + coal hopper + twin striped chimneys + smoke
    if (plop === 'coal_plant') {
      foundations.push({ x, y: y - 1.85, z, yaw, sx: width * 1.02, sy: 4.2, sz: depth * 1.02, color: '#7D7A74' });
      // Main brick boiler hall
      pushBoxLocal(facadeBuckets.ind, x, y, z, yaw, -width * 0.14, 7.8, 0, width * 0.58, 15.2, depth * 0.72, '#925B4B', 0, 0, bSeed);
      pushBoxLocal(sawtoothRoofs, x, y, z, yaw, -width * 0.14, 16.5, 0, width * 0.6, 2.4, depth * 0.74, '#6B727A');
      // Lower steel turbine annex
      pushBoxLocal(facadeBuckets.ind, x, y, z, yaw, width * 0.28, 4.6, depth * 0.06, width * 0.32, 8.8, depth * 0.6, '#747D86', 0, 0, (bSeed + 0.3) % 1);
      pushBoxLocal(shedRoofs, x, y, z, yaw, width * 0.28, 9.7, depth * 0.06, width * 0.34, 1.5, depth * 0.62, '#626B74');
      // Coal bunker pile + conveyor shed
      pushBoxLocal(darkMetal, x, y, z, yaw, width * 0.22, 1.2, -depth * 0.34, 7.5, 2.0, 5.5, '#3B3F44');
      // Twin tapered striped smokestacks
      for (const ox of [-width * 0.24, width * 0.02]) {
        pushCylLocal(cylinders, x, y, z, yaw, ox, 18.0, -depth * 0.16, 1.25, 2.15, 24.0, '#858B92');
        pushCylLocal(cylinders, x, y, z, yaw, ox, 26.2, -depth * 0.16, 1.4, 1.5, 2.4, '#B85442');
        pushCylLocal(cylinders, x, y, z, yaw, ox, 22.8, -depth * 0.16, 1.55, 1.65, 2.0, '#E2DDD5');
        const [smX, smY, smZ] = localToWorld(x, y, z, yaw, ox, 30.5, -depth * 0.16);
        this.smokeSources.push({ x: smX, y: smY, z: smZ, scale: 1.45, phase: (ox + bSeed * 10) * 0.7 });
      }
      return;
    }

    // 4. Water Pump: concrete intake deck + blue-roofed pump house + surge tank + intake pipes
    if (plop === 'water_pump') {
      foundations.push({ x, y: y - 1.9, z, yaw, sx: width, sy: 4.4, sz: depth, color: '#9DA2A6' });
      pushBoxLocal(facadeBuckets.civic, x, y, z, yaw, -1.6, 3.9, 0, width * 0.62, 7.2, depth * 0.68, '#E4E9EE', 0, 0, bSeed);
      pushBoxLocal(gableRoofs, x, y, z, yaw, -1.6, 8.7, 0, width * 0.68, 2.5, depth * 0.74, '#3B82AD');
      // Cylindrical surge tank
      pushCylLocal(cylinders, x, y, z, yaw, width * 0.28, 4.2, -1.2, 2.2, 2.2, 7.8, '#4692BF');
      pushCylLocal(cones, x, y, z, yaw, width * 0.28, 8.6, -1.2, 0.2, 2.3, 1.2, '#35749B');
      // Twin intake pipes extending toward river (-Z)
      pushCylLocal(cylinders, x, y, z, yaw, -2.2, 1.4, -depth * 0.56, 0.65, 0.65, 5.2, '#5E7282', Math.PI * 0.42);
      pushCylLocal(cylinders, x, y, z, yaw, 0.8, 1.4, -depth * 0.56, 0.65, 0.65, 5.2, '#5E7282', Math.PI * 0.42);
      return;
    }

    // 5. Water Tower: 4 angled steel legs + cross-bracing ring + banded tank + conical roof
    if (plop === 'water_tower') {
      foundations.push({ x, y: y - 1.85, z, yaw, sx: width * 0.82, sy: 4.1, sz: depth * 0.82, color: '#9D9A92' });
      const legR = 3.2;
      for (const [lx, lz] of [
        [-legR, -legR],
        [legR, -legR],
        [-legR, legR],
        [legR, legR],
      ]) {
        pushCylLocal(cylinders, x, y, z, yaw, lx * 0.85, 7.6, lz * 0.85, 0.34, 0.44, 15.2, '#8F99A3');
      }
      // Central riser pipe & horizontal brace deck
      pushCylLocal(cylinders, x, y, z, yaw, 0, 7.8, 0, 0.85, 0.95, 15.2, '#6E7A85');
      pushBoxLocal(darkMetal, x, y, z, yaw, 0, 7.5, 0, legR * 1.85, 0.4, legR * 1.85, '#9BA5AE');
      pushBoxLocal(darkMetal, x, y, z, yaw, 0, 14.6, 0, legR * 2.1, 0.55, legR * 2.1, '#AEB7C0');
      // Cylindrical water tank + band + conical cap
      pushCylLocal(cylinders, x, y, z, yaw, 0, 18.2, 0, 4.9, 4.7, 6.8, '#DDE5EC');
      pushCylLocal(cylinders, x, y, z, yaw, 0, 18.2, 0, 5.02, 5.02, 1.5, '#4692BF');
      pushCylLocal(cones, x, y, z, yaw, 0, 23.0, 0, 0.2, 5.2, 2.9, '#3B7EA8');
      return;
    }

    // 6. Sewage Outlet: concrete headwall + twin outfall pipes + clarifier basin
    if (plop === 'sewage_outlet') {
      foundations.push({ x, y: y - 1.9, z, yaw, sx: width, sy: 4.4, sz: depth, color: '#8A8984' });
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, 3.0, 1.2, width * 0.86, 5.6, depth * 0.64, '#92969A');
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, 5.95, 1.2, width * 0.88, 0.5, depth * 0.66, '#B88F4A');
      // Settling clarifier tank
      pushCylLocal(cylinders, x, y, z, yaw, 0, 6.5, 1.4, 3.6, 3.6, 1.6, '#7C654B');
      // Twin concrete outfall culverts projecting forward
      pushCylLocal(cylinders, x, y, z, yaw, -2.8, 1.6, -depth * 0.45, 1.25, 1.25, 4.4, '#6A6E72', Math.PI * 0.5);
      pushCylLocal(cylinders, x, y, z, yaw, 2.8, 1.6, -depth * 0.45, 1.25, 1.25, 4.4, '#6A6E72', Math.PI * 0.5);
      return;
    }

    // 7. Police Station: stepped civic sandstone hall + blue portico + rooftop comms tower
    if (plop === 'police_station') {
      foundations.push({ x, y: y - 1.85, z, yaw, sx: width * 1.02, sy: 4.2, sz: depth * 1.02, color: '#999791' });
      pushBoxLocal(facadeBuckets.civic, x, y, z, yaw, 0, height * 0.48 + 0.25, 0.8, width * 0.9, height * 0.92, depth * 0.78, '#E4E7EC', 0, 0, bSeed);
      addParapet(x, y, z, yaw, width * 0.9, depth * 0.78, height * 0.94 + 0.25, '#3E6BA8', 0.65, 1.1);
      // Entrance portico facing street (-Z)
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, 4.6, -depth * 0.4, width * 0.44, 0.8, 3.2, '#3E6BA8');
      pushBoxLocal(solidTrim, x, y, z, yaw, -width * 0.18, 2.2, -depth * 0.45, 0.55, 4.2, 0.55, '#EAEEF2');
      pushBoxLocal(solidTrim, x, y, z, yaw, width * 0.18, 2.2, -depth * 0.45, 0.55, 4.2, 0.55, '#EAEEF2');
      // Rooftop comms mast
      pushBoxLocal(solidTrim, x, y, z, yaw, width * 0.22, height + 1.1, 1.0, 3.4, 2.0, 3.0, '#CFD5DC');
      pushCylLocal(cylinders, x, y, z, yaw, width * 0.22, height + 4.8, 1.0, 0.14, 0.26, 6.2, '#7D8996');
      return;
    }

    // 8. Fire Station: brick & cream hall + 3 red apparatus bay doors + tall hose tower
    if (plop === 'fire_station') {
      foundations.push({ x, y: y - 1.85, z, yaw, sx: width * 1.02, sy: 4.2, sz: depth * 1.02, color: '#99958E' });
      pushBoxLocal(facadeBuckets.civic, x, y, z, yaw, -1.5, height * 0.48 + 0.25, 0, width * 0.78, height * 0.92, depth * 0.8, '#E5DDD4', 0, 0, bSeed);
      addParapet(x, y, z, yaw, width * 0.78, depth * 0.8, height * 0.94 + 0.25, '#B8473B', 0.6, 1.1);
      // 3 unmistakable red apparatus bay doors on front (-Z)
      for (const ox of [-6.0, -1.5, 3.0]) {
        pushBoxLocal(solidTrim, x, y, z, yaw, ox, 2.3, -depth * 0.41, 3.3, 4.0, 0.45, '#C44538');
        pushBoxLocal(solidTrim, x, y, z, yaw, ox, 4.45, -depth * 0.42, 3.6, 0.35, 0.6, '#EBE5DC');
      }
      // Corner hose-drying tower
      const tw = 4.6;
      const th = height + 6.5;
      pushBoxLocal(facadeBuckets.civic, x, y, z, yaw, width * 0.35, th * 0.5 + 0.25, depth * 0.16, tw, th, tw, '#C45848', 0, 0, (bSeed + 0.4) % 1);
      pushBoxLocal(hipRoofs, x, y, z, yaw, width * 0.35, th + 1.25, depth * 0.16, tw + 0.8, 2.0, tw + 0.8, '#58626C');
      return;
    }

    // 9. Clinic & Hospital: stepped medical wings + ambulance canopy + crisp red cross + helipad
    if (plop === 'clinic' || plop === 'hospital') {
      const isHosp = plop === 'hospital';
      foundations.push({ x, y: y - 1.85, z, yaw, sx: width * 1.02, sy: 4.2, sz: depth * 1.02, color: '#9B9DA0' });
      // Wide clinical podium
      const podH = isHosp ? 9.0 : height * 0.85;
      pushBoxLocal(facadeBuckets.civic, x, y, z, yaw, 0, podH * 0.5 + 0.25, 0, width * 0.92, podH, depth * 0.8, '#EDF1F4', 0, 0, bSeed);
      addParapet(x, y, z, yaw, width * 0.92, depth * 0.8, podH + 0.25, '#D5DDE3', 0.6, 0.9);
      // Ambulance canopy facing street
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, 4.2, -depth * 0.46, width * 0.36, 0.55, 3.6, '#D9535E');
      pushBoxLocal(solidTrim, x, y, z, yaw, -width * 0.15, 2.1, -depth * 0.52, 0.45, 4.0, 0.45, '#E2E7EC');
      pushBoxLocal(solidTrim, x, y, z, yaw, width * 0.15, 2.1, -depth * 0.52, 0.45, 4.0, 0.45, '#E2E7EC');

      let crossY = podH + 0.95;
      if (isHosp) {
        // Tall upper medical tower wing
        const twH = height - podH + 4.0;
        pushBoxLocal(facadeBuckets.office, x, y, z, yaw, -width * 0.14, podH + 0.25 + twH * 0.5, 0.5, width * 0.54, twH, depth * 0.58, '#E6EEF2', 0, 0, (bSeed + 0.2) % 1);
        addParapet(x, y, z, yaw, width * 0.54, depth * 0.58, podH + 0.25 + twH, '#CFD8E0', 0.6, 1.0);
        crossY = podH + 0.25 + twH + 0.65;
        // Helipad circle on lower east wing
        pushCylLocal(cylinders, x, y, z, yaw, width * 0.28, podH + 0.55, 0, 4.2, 4.2, 0.45, '#59636E');
        pushBoxLocal(solidTrim, x, y, z, yaw, width * 0.28 - 1.2, podH + 0.85, 0, 0.55, 0.15, 3.2, '#F0EFEA');
        pushBoxLocal(solidTrim, x, y, z, yaw, width * 0.28 + 1.2, podH + 0.85, 0, 0.55, 0.15, 3.2, '#F0EFEA');
        pushBoxLocal(solidTrim, x, y, z, yaw, width * 0.28, podH + 0.85, 0, 2.4, 0.15, 0.55, '#F0EFEA');
      }
      // Crisp 3D red cross emblem
      const cxOff = isHosp ? -width * 0.14 : 0;
      pushBoxLocal(solidTrim, x, y, z, yaw, cxOff, crossY, 0, 5.4, 0.65, 1.75, '#D84E58');
      pushBoxLocal(solidTrim, x, y, z, yaw, cxOff, crossY, 0, 1.75, 0.65, 5.4, '#D84E58');
      return;
    }

    // 10. Elementary & High School: warm brick U-campus + pitched clock tower + courtyard
    if (plop === 'elementary_school' || plop === 'high_school') {
      const isHigh = plop === 'high_school';
      foundations.push({ x, y: y - 1.85, z, yaw, sx: width * 1.02, sy: 4.2, sz: depth * 1.02, color: '#C6BEB1' });
      const wallCol = isHigh ? '#D9C2A0' : '#E2CCA9';
      const roofCol = isHigh ? '#586A7A' : '#9E5C49';
      // Main central wing
      const mainH = height * 0.82;
      pushBoxLocal(facadeBuckets.civic, x, y, z, yaw, 0, mainH * 0.5 + 0.25, -depth * 0.18, width * 0.88, mainH, depth * 0.46, wallCol, 0, 0, bSeed);
      pushBoxLocal(gableRoofs, x, y, z, yaw, 0, mainH + 1.55, -depth * 0.18, width * 0.92, 2.7, depth * 0.52, roofCol);
      // Left & right campus wings framing courtyard
      const wingH = mainH * 0.82;
      for (const side of [-1, 1]) {
        pushBoxLocal(facadeBuckets.civic, x, y, z, yaw, side * width * 0.33, wingH * 0.5 + 0.25, depth * 0.2, width * 0.24, wingH, depth * 0.44, wallCol, 0, 0, (bSeed + side * 0.2 + 1) % 1);
        pushBoxLocal(hipRoofs, x, y, z, yaw, side * width * 0.33, wingH + 1.2, depth * 0.2, width * 0.28, 2.0, depth * 0.48, roofCol);
      }
      // Central clock/bell tower peak
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, mainH + 3.4, -depth * 0.26, 3.6, 3.6, 3.6, '#EBE4D8');
      pushBoxLocal(hipRoofs, x, y, z, yaw, 0, mainH + 6.1, -depth * 0.26, 4.1, 2.1, 4.1, '#C4923B');
      // Courtyard sports court surface
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, 0.36, depth * 0.24, width * 0.36, 0.28, depth * 0.34, '#6E9A74');
      return;
    }

    // 11. Parks (park_small & park_plaza): stone terraces, paths, gazebo/fountain, flowerbeds & trees
    if (plop === 'park_small' || plop === 'park_plaza') {
      const isPlaza = plop === 'park_plaza';
      foundations.push({ x, y: y - 1.9, z, yaw, sx: width, sy: 4.2, sz: depth, color: '#BCB5A8' });
      // Lush landscaped lawn base
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, 0.35, 0, width * 0.95, 0.42, depth * 0.95, '#668E55');
      // Cross-axis stone footpaths
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, 0.48, 0, width * 0.96, 0.3, 2.6, '#D9D3C7');
      pushBoxLocal(solidTrim, x, y, z, yaw, 0, 0.48, 0, 2.6, 0.3, depth * 0.96, '#D9D3C7');

      if (isPlaza) {
        // Grand stone terrace + tiered turquoise fountain
        pushBoxLocal(solidTrim, x, y, z, yaw, 0, 0.65, 0, width * 0.46, 0.45, depth * 0.46, '#DFD9CD');
        pushCylLocal(cylinders, x, y, z, yaw, 0, 1.15, 0, 3.9, 4.2, 0.9, '#C9C2B4');
        pushCylLocal(cylinders, x, y, z, yaw, 0, 1.32, 0, 3.4, 3.4, 0.72, '#4BA6AE');
        pushCylLocal(cylinders, x, y, z, yaw, 0, 2.35, 0, 0.9, 1.4, 1.8, '#D5CFC2');
        pushCylLocal(cylinders, x, y, z, yaw, 0, 3.4, 0, 1.6, 0.6, 0.55, '#DFD9CD');
      } else {
        // Charming wooden pavilion / gazebo centerpiece
        pushBoxLocal(solidTrim, x, y, z, yaw, 0, 0.65, 0, 5.2, 0.42, 5.2, '#D7D0C3');
        for (const [px, pz] of [[-1.9, -1.9], [1.9, -1.9], [-1.9, 1.9], [1.9, 1.9]]) {
          pushBoxLocal(solidTrim, x, y, z, yaw, px, 2.0, pz, 0.34, 2.4, 0.34, '#8A694D');
        }
        pushBoxLocal(hipRoofs, x, y, z, yaw, 0, 3.9, 0, 5.8, 1.8, 5.8, '#9A634C');
      }

      // Corner trees + flowerbed accents
      const offsets: Array<[number, number, boolean, string]> = isPlaza
        ? [
            [-width * 0.35, -depth * 0.35, false, '#58844D'],
            [width * 0.35, -depth * 0.35, true, '#416945'],
            [-width * 0.35, depth * 0.35, true, '#416945'],
            [width * 0.35, depth * 0.35, false, '#CFA8AC'],
            [0, -depth * 0.38, false, '#6A9155'],
            [0, depth * 0.38, false, '#6A9155'],
          ]
        : [
            [-width * 0.33, -depth * 0.33, false, '#5A854E'],
            [width * 0.33, -depth * 0.33, true, '#436B46'],
            [-width * 0.33, depth * 0.33, false, '#CFA8AC'],
            [width * 0.33, depth * 0.33, false, '#679054'],
          ];
      for (const [ox, oz, conifer, col] of offsets) {
        const [tx, ty, tz] = localToWorld(x, y + 0.45, z, yaw, ox, 0, oz);
        yardTrees.push({ x: tx, y: ty, z: tz, scale: isPlaza ? 0.92 : 0.78, conifer, color: col });
      }
      return;
    }

    // 12. Landfill: perimeter fence + sorting shed + terraced earthworks + dozer silhouette
    foundations.push({ x, y: y - 1.85, z, yaw, sx: width, sy: 4.1, sz: depth, color: '#786D59' });
    pushBoxLocal(solidTrim, x, y, z, yaw, 0, 1.0, 1.2, width * 0.86, 1.6, depth * 0.76, '#8B7D64');
    pushBoxLocal(solidTrim, x, y, z, yaw, -width * 0.08, 2.25, 2.0, width * 0.56, 1.4, depth * 0.48, '#9D8E73');
    pushBoxLocal(solidTrim, x, y, z, yaw, width * 0.16, 1.9, -1.5, width * 0.34, 1.1, depth * 0.32, '#7D725D');
    // Sorting / weighbridge shed near front entrance
    pushBoxLocal(facadeBuckets.ind, x, y, z, yaw, -width * 0.28, 2.3, -depth * 0.34, 7.2, 4.0, 5.0, '#8A8F94', 0, 0, bSeed);
    pushBoxLocal(shedRoofs, x, y, z, yaw, -width * 0.28, 4.7, -depth * 0.34, 7.6, 1.0, 5.4, '#677078');
    // Compact ochre dozer silhouette
    pushBoxLocal(solidTrim, x, y, z, yaw, -width * 0.04, 3.45, 2.2, 2.4, 1.3, 3.6, '#C99B3E');
    // Low perimeter fence walls
    pushBoxLocal(darkMetal, x, y, z, yaw, 0, 0.95, depth * 0.48, width * 0.96, 1.4, 0.35, '#6B7075');
    pushBoxLocal(darkMetal, x, y, z, yaw, -width * 0.48, 0.95, 0, 0.35, 1.4, depth * 0.96, '#6B7075');
    pushBoxLocal(darkMetal, x, y, z, yaw, width * 0.48, 0.95, 0, 0.35, 1.4, depth * 0.96, '#6B7075');
  }

  private addSolidBoxInstanced(
    items: BoxItem[],
    roughness: number,
    metalness: number,
    aoBottom: number
  ): void {
    if (items.length === 0) return;
    const geo = new THREE.BoxGeometry(1, 1, 1);
    applyVerticalAO(geo, -0.5, 0.5, aoBottom, 1.02);
    const mat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      vertexColors: true,
      roughness,
      metalness,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, items.length);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      dummy.position.set(it.x, it.y, it.z);
      dummy.rotation.set(it.rx ?? 0, it.yaw, 0);
      dummy.scale.set(it.sx, it.sy, it.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      col.set(it.color);
      mesh.setColorAt(i, col);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.group.add(mesh);
  }

  /**
   * Emits an InstancedMesh of solid closed boxes using archetype-specific facade textures
   * with world-meter UV scaling (never stretched!), baked vertical AO, and varied night lights.
   */
  private addFacadeInstanced(
    key: FacadeKey,
    items: BoxItem[],
    texSet: FacadeTextureSet,
    bayWidth: number,
    floorHeight: number,
    roughness: number,
    metalness: number,
    roofCapColor: string
  ): void {
    if (items.length === 0) return;

    const geo = new THREE.BoxGeometry(1, 1, 1);
    const metaArr = new Float32Array(items.length * 4);
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      metaArr[i * 4] = it.sx;
      metaArr[i * 4 + 1] = it.sy;
      metaArr[i * 4 + 2] = it.sz;
      metaArr[i * 4 + 3] = it.seed ?? (i * 0.37) % 1;
    }
    geo.setAttribute('aBuildingMeta', new THREE.InstancedBufferAttribute(metaArr, 4));

    const wallMat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      map: texSet.map,
      emissive: new THREE.Color('#FFE0A6'),
      emissiveMap: texSet.emissiveMap,
      emissiveIntensity: 0.0,
      roughness,
      metalness,
    });

    wallMat.customProgramCacheKey = () => `tidelight_facade_${key}`;
    wallMat.onBeforeCompile = (shader) => {
      shader.uniforms.uBayWidth = { value: bayWidth };
      shader.uniforms.uFloorHeight = { value: floorHeight };

      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <uv_pars_vertex>',
          `#include <uv_pars_vertex>
attribute vec4 aBuildingMeta;
uniform float uBayWidth;
uniform float uFloorHeight;
varying float vRawUvY;
varying float vLightSeed;`
        )
        .replace(
          '#include <uv_vertex>',
          `#include <uv_vertex>
vRawUvY = uv.y;
vLightSeed = aBuildingMeta.w;
float tlFaceW = abs(normal.x) > 0.5 ? aBuildingMeta.z : aBuildingMeta.x;
float tlFaceH = aBuildingMeta.y;
float tlBays = max(1.0, floor(tlFaceW / uBayWidth + 0.5));
float tlFloors = max(1.0, floor(tlFaceH / uFloorHeight + 0.5));
float tlUShift = floor(aBuildingMeta.w * 4.0) * 0.25;
vec2 tlScaledUv = vec2(uv.x * (tlBays * 0.25) + tlUShift, uv.y * (tlFloors * 0.25));
#ifdef USE_MAP
  vMapUv = tlScaledUv;
#endif
#ifdef USE_EMISSIVEMAP
  vEmissiveMapUv = tlScaledUv;
#endif`
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
varying float vRawUvY;
varying float vLightSeed;`
        )
        .replace(
          '#include <map_fragment>',
          `#include <map_fragment>
float tlBaseAO = mix(0.74, 1.0, smoothstep(0.0, 0.24, vRawUvY));
float tlTopAO = mix(0.91, 1.0, smoothstep(1.0, 0.91, vRawUvY));
diffuseColor.rgb *= tlBaseAO * tlTopAO;`
        )
        .replace(
          '#include <emissivemap_fragment>',
          `#ifdef USE_EMISSIVEMAP
  vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
  vec2 tlWinCell = floor(vEmissiveMapUv * 4.0);
  float tlWinHash = fract(sin(dot(tlWinCell + vec2(vLightSeed * 19.3, vLightSeed * 7.1), vec2(127.1, 311.7))) * 43758.5453);
  float tlBldBright = 0.56 + fract(vLightSeed * 3.73) * 0.64;
  float tlWinGate = smoothstep(0.20, 0.30, tlWinHash);
  vec3 tlRoomTint = mix(vec3(1.06, 0.92, 0.72), vec3(0.84, 0.94, 1.08), step(0.80, tlWinHash));
  totalEmissiveRadiance *= emissiveColor.rgb * tlWinGate * tlBldBright * tlRoomTint;
#endif`
        );
    };

    this.facadeMats.push(wallMat);

    const roofTopMat = new THREE.MeshStandardMaterial({
      color: roofCapColor,
      roughness: 0.88,
      metalness: 0.04,
    });
    const mat: THREE.MeshStandardMaterial[] = [
      wallMat,
      wallMat,
      roofTopMat,
      roofTopMat,
      wallMat,
      wallMat,
    ];

    const mesh = new THREE.InstancedMesh(geo, mat, items.length);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      dummy.position.set(it.x, it.y, it.z);
      dummy.rotation.set(0, it.yaw, 0);
      dummy.scale.set(it.sx, it.sy, it.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      col.set(it.color);
      mesh.setColorAt(i, col);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.group.add(mesh);
  }

  private addCustomPolyInstanced(
    items: BoxItem[],
    geo: THREE.BufferGeometry,
    roughness: number,
    metalness: number
  ): void {
    if (items.length === 0) {
      geo.dispose();
      return;
    }
    const mat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      vertexColors: true,
      roughness,
      metalness,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, items.length);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      dummy.position.set(it.x, it.y, it.z);
      dummy.rotation.set(it.rx ?? 0, it.yaw, 0);
      dummy.scale.set(it.sx, it.sy, it.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      col.set(it.color);
      mesh.setColorAt(i, col);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.group.add(mesh);
  }

  private addCylinderInstanced(items: CylinderItem[], taperedCone: boolean): void {
    if (items.length === 0) return;
    const geo = taperedCone
      ? new THREE.ConeGeometry(1, 1, 10, 1, false)
      : new THREE.CylinderGeometry(0.86, 1.0, 1, 10, 1, false);
    applyVerticalAO(geo, -0.5, 0.5, 0.82, 1.03);
    const mat = new THREE.MeshStandardMaterial({
      color: '#ffffff',
      vertexColors: true,
      roughness: 0.68,
      metalness: 0.16,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, items.length);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const dummy = new THREE.Object3D();
    const col = new THREE.Color();
    for (let i = 0; i < items.length; i++) {
      const c = items[i];
      const rad = taperedCone ? c.radiusBottom : (c.radiusTop + c.radiusBottom) * 0.5;
      dummy.position.set(c.x, c.y, c.z);
      dummy.rotation.set(c.rx ?? 0, c.yaw ?? 0, c.rz ?? 0);
      dummy.scale.set(rad, c.height, rad);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      col.set(c.color);
      mesh.setColorAt(i, col);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    this.group.add(mesh);
  }

  private addGroundAOInstanced(items: AoQuadItem[], aoTex: THREE.CanvasTexture): void {
    if (items.length === 0) return;
    const geo = new THREE.PlaneGeometry(1, 1);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      map: aoTex,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, items.length);
    mesh.renderOrder = 2;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      dummy.position.set(it.x, it.y, it.z);
      dummy.rotation.set(0, it.yaw, 0);
      dummy.scale.set(it.sx, 1, it.sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    this.group.add(mesh);
  }

  private addYardTreesInstanced(trees: YardTreeItem[]): void {
    if (trees.length === 0) return;
    const broadleaf = trees.filter((t) => !t.conifer);
    const conifers = trees.filter((t) => t.conifer);

    const emit = (list: YardTreeItem[], geo: THREE.BufferGeometry) => {
      if (list.length === 0) {
        geo.dispose();
        return;
      }
      const trunkGeo = new THREE.CylinderGeometry(0.22, 0.36, 2.5, 6);
      trunkGeo.translate(0, 1.25, 0);
      const trunkMat = new THREE.MeshStandardMaterial({ color: '#6A5342', roughness: 0.92 });
      const canopyMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        vertexColors: true,
        roughness: 0.86,
      });
      attachTreeWindSway(canopyMat, this.windTimeUniform, 0.2);

      const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, list.length);
      const canopies = new THREE.InstancedMesh(geo, canopyMat, list.length);
      canopies.castShadow = true;
      canopies.receiveShadow = true;

      const dummy = new THREE.Object3D();
      const col = new THREE.Color();
      for (let i = 0; i < list.length; i++) {
        const t = list[i];
        dummy.position.set(t.x, t.y - 0.2, t.z);
        dummy.rotation.set(0, i * 1.9, 0);
        dummy.scale.setScalar(t.scale);
        dummy.updateMatrix();
        trunks.setMatrixAt(i, dummy.matrix);
        canopies.setMatrixAt(i, dummy.matrix);
        col.set(t.color);
        canopies.setColorAt(i, col);
      }
      trunks.instanceMatrix.needsUpdate = true;
      canopies.instanceMatrix.needsUpdate = true;
      if (canopies.instanceColor) canopies.instanceColor.needsUpdate = true;
      this.group.add(trunks, canopies);
    };

    emit(broadleaf, createBroadleafCanopyGeo());
    emit(conifers, createConiferCanopyGeo());
  }

  private buildSmokeInstanced(): void {
    if (this.smokeSources.length === 0) return;
    const puffsPerStack = 4;
    const total = this.smokeSources.length * puffsPerStack;
    const geo = new THREE.IcosahedronGeometry(1.15, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: '#E6E4DF',
      transparent: true,
      opacity: 0.42,
      roughness: 1.0,
      metalness: 0.0,
      depthWrite: false,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, total);
    mesh.renderOrder = 4;
    mesh.visible = this.enableSmoke;
    this.smokeMesh = mesh;
    this.group.add(mesh);
    this.updateSmokeInstances();
  }

  private updateSmokeInstances(): void {
    if (!this.smokeMesh || !this.enableSmoke || this.smokeSources.length === 0) return;
    const puffsPerStack = 4;
    let idx = 0;
    for (let s = 0; s < this.smokeSources.length; s++) {
      const src = this.smokeSources[s];
      for (let p = 0; p < puffsPerStack; p++) {
        const life = ((this.smokeTime * 0.22 + src.phase * 0.16 + p / puffsPerStack) % 1 + 1) % 1;
        const rise = life * 16.0 * src.scale;
        const driftX = life * 7.5 * src.scale + Math.sin(this.smokeTime * 1.1 + src.phase + p) * 0.8;
        const driftZ = life * 3.8 * src.scale;
        // Grow as puff rises, shrink gently at the very end so reset is invisible
        const envelope = Math.sin(life * Math.PI);
        const radius = (0.55 + life * 1.65) * Math.max(0.12, envelope) * src.scale;

        this.smokeDummy.position.set(src.x + driftX, src.y + rise, src.z + driftZ);
        this.smokeDummy.rotation.set(life * 1.2, src.phase + life, 0);
        this.smokeDummy.scale.set(radius, radius * 0.82, radius);
        this.smokeDummy.updateMatrix();
        this.smokeMesh.setMatrixAt(idx++, this.smokeDummy.matrix);
      }
    }
    this.smokeMesh.instanceMatrix.needsUpdate = true;
  }

  private createWindRotor(): THREE.Group {
    const outer = new THREE.Group();
    const hub = new THREE.Group();
    hub.position.set(0, 0, 2.75);
    const bladeMat = new THREE.MeshStandardMaterial({ color: '#F3F6F9', roughness: 0.42, metalness: 0.12 });
    const hubMesh = new THREE.Mesh(new THREE.SphereGeometry(1.0, 8, 8), bladeMat);
    hub.add(hubMesh);

    // Tapered airfoil blade (closed tapered cylinder flattened cleanly)
    const bladeGeo = new THREE.CylinderGeometry(0.16, 0.62, 13.8, 5, 1, false);
    bladeGeo.scale(1.0, 1.0, 0.34);
    bladeGeo.translate(0, 6.9, 0);
    for (let b = 0; b < 3; b++) {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.z = (b * Math.PI * 2) / 3;
      blade.castShadow = true;
      hub.add(blade);
    }
    outer.add(hub);
    return outer;
  }

  update(dt: number, emissiveStrength: number): void {
    this.windTimeUniform.value += dt;
    this.smokeTime += dt;

    for (let i = 0; i < this.facadeMats.length; i++) {
      this.facadeMats[i].emissiveIntensity = emissiveStrength * 2.15;
    }
    for (let i = 0; i < this.turbineRotors.length; i++) {
      this.turbineRotors[i].rotation.z -= dt * 1.55;
    }
    this.updateSmokeInstances();
  }

  private clear(): void {
    this.turbineRotors = [];
    this.facadeMats = [];
    this.smokeSources = [];
    this.smokeMesh = null;
    while (this.group.children.length > 0) {
      const child = this.group.children[0];
      this.group.remove(child);
      child.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    }
  }
}
