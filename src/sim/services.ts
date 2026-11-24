import {
  FIELD_RES,
  PLOPPABLE_SPECS,
  type BudgetCategory,
} from './types.ts';
import type { Building } from './buildings.ts';
import type { ScalarFields } from './fields.ts';

export interface ServiceSummary {
  elementaryCapacity: number;
  highSchoolCapacity: number;
  healthCapacity: number;
  garbageCapacity: number;
  avgEducationCoverage: number;
  avgServiceCoverage: number;
}

/**
 * Nonlinear budget effectiveness curve per DESIGN_carbon.md:
 * 50% -> 0.25, 100% -> 1.00, 150% -> 1.25.
 */
export function budgetEfficiency(percent: number): number {
  const clamped = Math.max(50, Math.min(150, percent));
  if (clamped <= 100) {
    const t = (clamped - 50) / 50;
    return 0.25 + 0.75 * t;
  }
  const t = (clamped - 100) / 50;
  return 1.0 + 0.25 * t;
}

export function updateServiceCoverages(
  buildings: readonly Building[],
  fields: ScalarFields,
  budgets: Record<BudgetCategory, number>
): ServiceSummary {
  fields.policeCoverage.fill(0);
  fields.fireCoverage.fill(0);
  fields.healthCoverage.fill(0);
  fields.educationCoverage.fill(0);
  fields.parkCoverage.fill(0);
  fields.garbageCoverage.fill(0);
  fields.serviceCoverage.fill(0);

  let elementaryCapacity = 0;
  let highSchoolCapacity = 0;
  let healthCapacity = 0;
  let garbageCapacity = 0;

  for (const b of buildings) {
    if (b.kind !== 'ploppable' || !b.ploppableKind || b.abandoned) continue;
    const spec = PLOPPABLE_SPECS[b.ploppableKind];
    const eff = budgetEfficiency(budgets[spec.category]);
    const isPark = spec.category === 'parks';
    const utilFactor = isPark
      ? b.hasPower
        ? 1.0
        : 0.75
      : b.hasPower && b.hasWater
        ? 1.0
        : b.hasPower
          ? 0.45
          : 0.1;

    const strength = spec.serviceStrength * eff * utilFactor;
    const radius = spec.coverageRadius * (0.75 + 0.25 * Math.min(1.25, eff));
    if (strength <= 0.05 || radius <= 0) continue;

    switch (b.ploppableKind) {
      case 'police_station':
        fields.paintMaxRadial(fields.policeCoverage, b.x, b.z, radius, Math.min(1, strength));
        break;
      case 'fire_station':
        fields.paintMaxRadial(fields.fireCoverage, b.x, b.z, radius, Math.min(1, strength));
        break;
      case 'clinic':
        healthCapacity += Math.round(250 * eff * utilFactor);
        fields.paintMaxRadial(fields.healthCoverage, b.x, b.z, radius, Math.min(1, strength));
        break;
      case 'hospital':
        healthCapacity += Math.round(1200 * eff * utilFactor);
        fields.paintMaxRadial(fields.healthCoverage, b.x, b.z, radius, Math.min(1, strength));
        break;
      case 'elementary_school':
        elementaryCapacity += Math.round(350 * eff * utilFactor);
        fields.paintMaxRadial(fields.educationCoverage, b.x, b.z, radius, Math.min(1, strength * 0.75));
        break;
      case 'high_school':
        highSchoolCapacity += Math.round(650 * eff * utilFactor);
        fields.paintMaxRadial(fields.educationCoverage, b.x, b.z, radius, Math.min(1, strength));
        break;
      case 'park_small':
      case 'park_plaza':
        fields.paintMaxRadial(fields.parkCoverage, b.x, b.z, radius, Math.min(1, strength));
        break;
      case 'landfill':
        garbageCapacity += Math.round(900 * eff * utilFactor);
        fields.paintMaxRadial(fields.garbageCoverage, b.x, b.z, radius, Math.min(1, strength));
        break;
      default:
        break;
    }
  }

  const totalCells = FIELD_RES * FIELD_RES;
  for (let i = 0; i < totalCells; i++) {
    const score =
      (fields.policeCoverage[i] * 0.16 +
        fields.fireCoverage[i] * 0.16 +
        fields.healthCoverage[i] * 0.18 +
        fields.educationCoverage[i] * 0.2 +
        fields.parkCoverage[i] * 0.18 +
        fields.garbageCoverage[i] * 0.12) *
      100;
    fields.serviceCoverage[i] = Math.min(100, score);
  }

  // Average over active buildings so stats reflect actual town coverage rather than empty mountains
  let edSum = 0;
  let srvSum = 0;
  let count = 0;
  for (const b of buildings) {
    if (b.kind !== 'growable' || b.abandoned) continue;
    edSum += fields.sample(fields.educationCoverage, b.x, b.z);
    srvSum += fields.sample(fields.serviceCoverage, b.x, b.z);
    count++;
  }

  return {
    elementaryCapacity,
    highSchoolCapacity,
    healthCapacity,
    garbageCapacity,
    avgEducationCoverage: count > 0 ? edSum / count : 0,
    avgServiceCoverage: count > 0 ? srvSum / count : 0,
  };
}
