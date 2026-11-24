import {
  PLOPPABLE_SPECS,
  ZONE_SPECS,
  type BudgetCategory,
} from './types.ts';
import type { Building } from './buildings.ts';
import type { ScalarFields } from './fields.ts';
import { budgetEfficiency } from './services.ts';

export type UtilityLineKind = 'power_line' | 'water_pipe';

export interface UtilityLine {
  id: number;
  kind: UtilityLineKind;
  x0: number;
  z0: number;
  x1: number;
  z1: number;
  active: boolean;
}

export interface UtilityStats {
  powerProducedMW: number;
  powerConsumedMW: number;
  powerRatio: number;
  waterProducedM3: number;
  waterConsumedM3: number;
  waterRatio: number;
  sewageCapacityM3: number;
  sewageConsumedM3: number;
  sewageRatio: number;
  waterIntakePollution: number;
}

export interface SerializedUtilities {
  nextLineId: number;
  lines: UtilityLine[];
}

const POWER_CONDUCT_RADIUS = 76;
const PIPE_COVERAGE_RADIUS = 96;
const PIPE_CONNECT_RADIUS = 108;

function pointToSegmentDistSq(
  px: number,
  pz: number,
  x0: number,
  z0: number,
  x1: number,
  z1: number
): number {
  const dx = x1 - x0;
  const dz = z1 - z0;
  const lenSq = dx * dx + dz * dz;
  if (lenSq < 1e-6) {
    return (px - x0) ** 2 + (pz - z0) ** 2;
  }
  const t = Math.max(0, Math.min(1, ((px - x0) * dx + (pz - z0) * dz) / lenSq));
  const cx = x0 + t * dx;
  const cz = z0 + t * dz;
  return (px - cx) ** 2 + (pz - cz) ** 2;
}

function segmentToSegmentDistSq(
  ax0: number,
  az0: number,
  ax1: number,
  az1: number,
  bx0: number,
  bz0: number,
  bx1: number,
  bz1: number
): number {
  // Check exact intersection first
  const rX = ax1 - ax0;
  const rZ = az1 - az0;
  const sX = bx1 - bx0;
  const sZ = bz1 - bz0;
  const denom = rX * sZ - rZ * sX;
  if (Math.abs(denom) > 1e-6) {
    const qpx = bx0 - ax0;
    const qpz = bz0 - az0;
    const u = (qpx * sZ - qpz * sX) / denom;
    const v = (qpx * rZ - qpz * rX) / denom;
    if (u >= 0 && u <= 1 && v >= 0 && v <= 1) return 0;
  }
  return Math.min(
    pointToSegmentDistSq(ax0, az0, bx0, bz0, bx1, bz1),
    pointToSegmentDistSq(ax1, az1, bx0, bz0, bx1, bz1),
    pointToSegmentDistSq(bx0, bz0, ax0, az0, ax1, az1),
    pointToSegmentDistSq(bx1, bz1, ax0, az0, ax1, az1)
  );
}

export class UtilitySystem {
  readonly lines: UtilityLine[] = [];
  private nextLineId = 1;
  revision = 1;

  stats: UtilityStats = {
    powerProducedMW: 0,
    powerConsumedMW: 0,
    powerRatio: 1,
    waterProducedM3: 0,
    waterConsumedM3: 0,
    waterRatio: 1,
    sewageCapacityM3: 0,
    sewageConsumedM3: 0,
    sewageRatio: 1,
    waterIntakePollution: 0,
  };

  addLine(kind: UtilityLineKind, x0: number, z0: number, x1: number, z1: number): { line: UtilityLine; cost: number } {
    const len = Math.hypot(x1 - x0, z1 - z0);
    const line: UtilityLine = {
      id: this.nextLineId++,
      kind,
      x0,
      z0,
      x1,
      z1,
      active: false,
    };
    this.lines.push(line);
    this.revision++;
    const costPerMeter = kind === 'power_line' ? 6 : 8;
    return { line, cost: Math.max(40, Math.round(len * costPerMeter)) };
  }

  removeLine(lineId: number): { ok: boolean; refund: number } {
    const idx = this.lines.findIndex((l) => l.id === lineId);
    if (idx === -1) return { ok: false, refund: 0 };
    const line = this.lines[idx];
    this.lines.splice(idx, 1);
    this.revision++;
    const len = Math.hypot(line.x1 - line.x0, line.z1 - line.z0);
    const costPerMeter = line.kind === 'power_line' ? 6 : 8;
    const refund = Math.max(20, Math.round(len * costPerMeter * 0.5));
    return { ok: true, refund };
  }

  getUpkeepPerDay(): number {
    let sum = 0;
    for (const line of this.lines) {
      const len = Math.hypot(line.x1 - line.x0, line.z1 - line.z0);
      sum += len * (line.kind === 'power_line' ? 0.03 : 0.04);
    }
    return sum;
  }

  update(
    buildings: readonly Building[],
    fields: ScalarFields,
    budgets: Record<BudgetCategory, number>,
    timeOfDay: number
  ): void {
    this.updatePower(buildings, fields, budgets, timeOfDay);
    this.updateWaterAndSewage(buildings, fields, budgets);
  }

  private getBuildingPowerMW(b: Building, powerEff: number, timeOfDay: number): number {
    if (b.abandoned) return 0;
    if (b.kind === 'ploppable' && b.ploppableKind) {
      const spec = PLOPPABLE_SPECS[b.ploppableKind];
      if (spec.powerMW > 0) {
        let factor = powerEff;
        if (b.ploppableKind === 'solar_plant') {
          // Daylight full output, battery reserve at night (45%)
          const isDay = timeOfDay >= 6.5 && timeOfDay <= 18.5;
          factor *= isDay ? 1.0 : 0.45;
        }
        return spec.powerMW * factor;
      }
      return spec.powerMW;
    }
    if (b.zone === 'none') return 0;
    const spec = ZONE_SPECS[b.zone];
    const cells = Math.max(1, (b.width * b.depth) / 64);
    return -spec.powerPerCell * cells * (1 + (b.level - 1) * 0.25);
  }

  private getBuildingWaterM3(b: Building, waterEff: number): number {
    if (b.abandoned) return 0;
    if (b.kind === 'ploppable' && b.ploppableKind) {
      const spec = PLOPPABLE_SPECS[b.ploppableKind];
      if (spec.waterM3 > 0) {
        return b.hasPower ? spec.waterM3 * waterEff : 0;
      }
      return spec.waterM3;
    }
    if (b.zone === 'none') return 0;
    const spec = ZONE_SPECS[b.zone];
    const cells = Math.max(1, (b.width * b.depth) / 64);
    return -spec.waterPerCell * cells * (1 + (b.level - 1) * 0.22);
  }

  private getBuildingSewageM3(b: Building, waterEff: number): number {
    if (b.abandoned) return 0;
    if (b.kind === 'ploppable' && b.ploppableKind) {
      const spec = PLOPPABLE_SPECS[b.ploppableKind];
      if (spec.sewageM3 > 0) {
        return b.hasPower ? spec.sewageM3 * waterEff : 0;
      }
      return spec.sewageM3;
    }
    if (b.zone === 'none') return 0;
    const spec = ZONE_SPECS[b.zone];
    const cells = Math.max(1, (b.width * b.depth) / 64);
    return -spec.waterPerCell * 0.85 * cells * (1 + (b.level - 1) * 0.22);
  }

  private updatePower(
    buildings: readonly Building[],
    fields: ScalarFields,
    budgets: Record<BudgetCategory, number>,
    timeOfDay: number
  ): void {
    fields.powerCoverage.fill(0);
    const powerEff = budgetEfficiency(budgets.power);
    const powerLines = this.lines.filter((l) => l.kind === 'power_line');

    // Nodes in BFS: 0..B-1 = buildings, B..B+L-1 = power lines
    const bCount = buildings.length;
    const totalNodes = bCount + powerLines.length;
    const visited = new Uint8Array(totalNodes);
    const queue: number[] = [];

    let totalProduced = 0;
    let totalConsumed = 0;
    const bPower = new Float32Array(bCount);

    for (let i = 0; i < bCount; i++) {
      const mw = this.getBuildingPowerMW(buildings[i], powerEff, timeOfDay);
      bPower[i] = mw;
      buildings[i].hasPower = false;
      if (mw > 0) {
        totalProduced += mw;
        visited[i] = 1;
        queue.push(i);
      } else {
        totalConsumed += -mw;
      }
    }

    for (const line of powerLines) line.active = false;

    const rSq = POWER_CONDUCT_RADIUS * POWER_CONDUCT_RADIUS;
    const lineRSq = (POWER_CONDUCT_RADIUS + 14) ** 2;

    // BFS propagation from all power generators through buildings and power lines
    let head = 0;
    while (head < queue.length) {
      const u = queue[head++];
      if (u < bCount) {
        const bu = buildings[u];
        const buRad = bu.kind === 'ploppable' && bu.ploppableKind ? Math.max(POWER_CONDUCT_RADIUS, PLOPPABLE_SPECS[bu.ploppableKind].coverageRadius) : POWER_CONDUCT_RADIUS;
        const buRadSq = buRad * buRad;

        for (let j = 0; j < bCount; j++) {
          if (visited[j]) continue;
          const bj = buildings[j];
          const d2 = (bu.x - bj.x) ** 2 + (bu.z - bj.z) ** 2;
          if (d2 <= buRadSq) {
            visited[j] = 1;
            queue.push(j);
          }
        }
        for (let k = 0; k < powerLines.length; k++) {
          const nid = bCount + k;
          if (visited[nid]) continue;
          const l = powerLines[k];
          if (pointToSegmentDistSq(bu.x, bu.z, l.x0, l.z0, l.x1, l.z1) <= Math.max(buRadSq, lineRSq)) {
            visited[nid] = 1;
            queue.push(nid);
          }
        }
      } else {
        const lu = powerLines[u - bCount];
        for (let j = 0; j < bCount; j++) {
          if (visited[j]) continue;
          const bj = buildings[j];
          if (pointToSegmentDistSq(bj.x, bj.z, lu.x0, lu.z0, lu.x1, lu.z1) <= lineRSq) {
            visited[j] = 1;
            queue.push(j);
          }
        }
        for (let k = 0; k < powerLines.length; k++) {
          const nid = bCount + k;
          if (visited[nid]) continue;
          const lk = powerLines[k];
          if (segmentToSegmentDistSq(lu.x0, lu.z0, lu.x1, lu.z1, lk.x0, lk.z0, lk.x1, lk.z1) <= rSq) {
            visited[nid] = 1;
            queue.push(nid);
          }
        }
      }
    }

    // Allocate available MW in BFS order (nearest to power plants served first if underpowered)
    let remainingMW = totalProduced;
    for (let idx = 0; idx < queue.length; idx++) {
      const u = queue[idx];
      if (u < bCount) {
        const b = buildings[u];
        const mw = bPower[u];
        if (mw >= 0) {
          b.hasPower = true;
          const rad = b.ploppableKind ? PLOPPABLE_SPECS[b.ploppableKind].coverageRadius : 72;
          fields.paintMaxRadial(fields.powerCoverage, b.x, b.z, rad, 1.0);
        } else if (remainingMW >= -mw * 0.8) {
          remainingMW = Math.max(0, remainingMW + mw);
          b.hasPower = true;
          fields.paintMaxRadial(fields.powerCoverage, b.x, b.z, 72, 1.0);
        }
      } else {
        const l = powerLines[u - bCount];
        l.active = totalProduced > 0;
        if (l.active) {
          fields.paintSegmentMax(fields.powerCoverage, l.x0, l.z0, l.x1, l.z1, 68, 1.0);
        }
      }
    }

    this.stats.powerProducedMW = totalProduced;
    this.stats.powerConsumedMW = totalConsumed;
    this.stats.powerRatio = totalConsumed <= 0.01 ? (totalProduced > 0 ? 1 : 0) : Math.min(1.5, totalProduced / totalConsumed);
  }

  private updateWaterAndSewage(
    buildings: readonly Building[],
    fields: ScalarFields,
    budgets: Record<BudgetCategory, number>
  ): void {
    fields.waterCoverage.fill(0);
    const waterEff = budgetEfficiency(budgets.water);
    const pipes = this.lines.filter((l) => l.kind === 'water_pipe');

    const waterSources: Building[] = [];
    const sewageOutlets: Building[] = [];
    let totalWaterProd = 0;
    let totalWaterCons = 0;
    let totalSewageCap = 0;
    let totalSewageCons = 0;
    let maxIntakePoll = 0;

    for (const b of buildings) {
      b.hasWater = false;
      b.hasSewage = false;
      const w = this.getBuildingWaterM3(b, waterEff);
      const s = this.getBuildingSewageM3(b, waterEff);
      if (w > 0) {
        totalWaterProd += w;
        waterSources.push(b);
        const intakeP = fields.sample(fields.waterPollution, b.x, b.z);
        if (intakeP > maxIntakePoll) maxIntakePoll = intakeP;
      } else {
        totalWaterCons += -w;
      }
      if (s > 0) {
        totalSewageCap += s;
        sewageOutlets.push(b);
      } else {
        totalSewageCons += -s;
      }
    }

    // BFS over pipes starting from waterSources
    const pCount = pipes.length;
    const pipeHasWater = new Uint8Array(pCount);
    const pipeHasSewage = new Uint8Array(pCount);
    const connRSq = PIPE_CONNECT_RADIUS * PIPE_CONNECT_RADIUS;

    const bfsPipes = (sources: Building[], flags: Uint8Array) => {
      const q: number[] = [];
      for (let i = 0; i < pCount; i++) {
        const p = pipes[i];
        for (const src of sources) {
          const rad = src.ploppableKind ? Math.max(PIPE_CONNECT_RADIUS, PLOPPABLE_SPECS[src.ploppableKind].coverageRadius) : PIPE_CONNECT_RADIUS;
          if (pointToSegmentDistSq(src.x, src.z, p.x0, p.z0, p.x1, p.z1) <= rad * rad) {
            flags[i] = 1;
            q.push(i);
            break;
          }
        }
      }
      let head = 0;
      while (head < q.length) {
        const u = q[head++];
        const pu = pipes[u];
        for (let v = 0; v < pCount; v++) {
          if (flags[v]) continue;
          const pv = pipes[v];
          if (segmentToSegmentDistSq(pu.x0, pu.z0, pu.x1, pu.z1, pv.x0, pv.z0, pv.x1, pv.z1) <= connRSq) {
            flags[v] = 1;
            q.push(v);
          }
        }
      }
    };

    bfsPipes(waterSources, pipeHasWater);
    bfsPipes(sewageOutlets, pipeHasSewage);

    for (let i = 0; i < pCount; i++) {
      const p = pipes[i];
      p.active = pipeHasWater[i] === 1 || pipeHasSewage[i] === 1;
      if (pipeHasWater[i]) {
        fields.paintSegmentMax(fields.waterCoverage, p.x0, p.z0, p.x1, p.z1, PIPE_COVERAGE_RADIUS, 1.0);
      }
    }

    for (const src of waterSources) {
      const rad = src.ploppableKind ? PLOPPABLE_SPECS[src.ploppableKind].coverageRadius : PIPE_COVERAGE_RADIUS;
      fields.paintMaxRadial(fields.waterCoverage, src.x, src.z, rad, 1.0);
    }

    const waterRatio =
      totalWaterCons <= 0.1
        ? totalWaterProd > 0
          ? 1
          : 0
        : Math.min(1.5, totalWaterProd / totalWaterCons);
    const sewageRatio =
      totalSewageCons <= 0.1
        ? totalSewageCap > 0
          ? 1
          : 0
        : Math.min(1.5, totalSewageCap / totalSewageCons);

    const covRSq = PIPE_COVERAGE_RADIUS * PIPE_COVERAGE_RADIUS;
    for (const b of buildings) {
      if (b.abandoned) continue;

      // Water check
      let inWaterNet = false;
      for (const src of waterSources) {
        const rad = src.ploppableKind ? PLOPPABLE_SPECS[src.ploppableKind].coverageRadius : PIPE_COVERAGE_RADIUS;
        if ((b.x - src.x) ** 2 + (b.z - src.z) ** 2 <= rad * rad) {
          inWaterNet = true;
          break;
        }
      }
      if (!inWaterNet) {
        for (let i = 0; i < pCount; i++) {
          if (!pipeHasWater[i]) continue;
          const p = pipes[i];
          if (pointToSegmentDistSq(b.x, b.z, p.x0, p.z0, p.x1, p.z1) <= covRSq) {
            inWaterNet = true;
            break;
          }
        }
      }
      b.hasWater = inWaterNet && waterRatio >= 0.78;

      // Sewage check
      let inSewageNet = false;
      for (const out of sewageOutlets) {
        const rad = out.ploppableKind ? PLOPPABLE_SPECS[out.ploppableKind].coverageRadius : PIPE_COVERAGE_RADIUS;
        if ((b.x - out.x) ** 2 + (b.z - out.z) ** 2 <= rad * rad) {
          inSewageNet = true;
          break;
        }
      }
      if (!inSewageNet) {
        for (let i = 0; i < pCount; i++) {
          if (!pipeHasSewage[i]) continue;
          const p = pipes[i];
          if (pointToSegmentDistSq(b.x, b.z, p.x0, p.z0, p.x1, p.z1) <= covRSq) {
            inSewageNet = true;
            break;
          }
        }
      }
      // If city has zero sewage outlets yet and very tiny pop, still report false unless connected
      b.hasSewage = inSewageNet && sewageRatio >= 0.75;
    }

    this.stats.waterProducedM3 = totalWaterProd;
    this.stats.waterConsumedM3 = totalWaterCons;
    this.stats.waterRatio = waterRatio;
    this.stats.sewageCapacityM3 = totalSewageCap;
    this.stats.sewageConsumedM3 = totalSewageCons;
    this.stats.sewageRatio = sewageRatio;
    this.stats.waterIntakePollution = maxIntakePoll;
  }

  serialize(): SerializedUtilities {
    return {
      nextLineId: this.nextLineId,
      lines: this.lines.map((l) => ({ ...l })),
    };
  }

  deserialize(data: SerializedUtilities): void {
    this.lines.length = 0;
    this.nextLineId = data.nextLineId;
    for (const l of data.lines) {
      this.lines.push({ ...l });
    }
    this.revision++;
  }
}
