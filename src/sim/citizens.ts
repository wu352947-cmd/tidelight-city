import { PLOPPABLE_SPECS, type ActiveZoneType } from './types.ts';
import type { Building } from './buildings.ts';
import type { ScalarFields } from './fields.ts';
import type { ServiceSummary } from './services.ts';

export interface CitizenStats {
  population: number;
  households: number;
  housingCapacity: number;
  housingVacancyRate: number;
  workers: number;
  jobsTotal: number;
  jobsFilled: number;
  unfilledJobs: number;
  unemploymentRate: number;
  commercialJobs: number;
  industrialJobs: number;
  officeJobs: number;
  civicJobs: number;
  educationLow: number;
  educationMid: number;
  educationHigh: number;
  goodsProduced: number;
  goodsDemanded: number;
  goodsRatio: number;
  avgHappiness: number;
  avgLandValue: number;
}

const CITIZENS_PER_HOUSEHOLD = 3.4;
const WORKER_SHARE = 0.62;

export class CitizenSystem {
  stats: CitizenStats = {
    population: 0,
    households: 0,
    housingCapacity: 0,
    housingVacancyRate: 0,
    workers: 0,
    jobsTotal: 0,
    jobsFilled: 0,
    unfilledJobs: 0,
    unemploymentRate: 0,
    commercialJobs: 0,
    industrialJobs: 0,
    officeJobs: 0,
    civicJobs: 0,
    educationLow: 0.65,
    educationMid: 0.25,
    educationHigh: 0.1,
    goodsProduced: 0,
    goodsDemanded: 0,
    goodsRatio: 1,
    avgHappiness: 65,
    avgLandValue: 32,
  };

  update(
    buildings: readonly Building[],
    fields: ScalarFields,
    services: ServiceSummary,
    taxRates: Record<ActiveZoneType, number>,
    hasHighwayAccess: boolean,
    preserveResidents = false
  ): void {
    let housingCapacity = 0;
    let totalHouseholds = 0;
    let totalPop = 0;

    let commercialJobs = 0;
    let industrialJobs = 0;
    let officeJobs = 0;
    let civicJobs = 0;

    let happinessSum = 0;
    let landValueSum = 0;
    let activeGrowables = 0;

    // 1. Update household move-in / move-out on residential buildings and tally job capacities
    const avgResTax = (taxRates.res_low + taxRates.res_high) * 0.5;
    const taxPull = avgResTax <= 12 ? 1.0 : Math.max(0.2, 1.0 - (avgResTax - 12) * 0.12);
    const highwayFactor = hasHighwayAccess ? 1.0 : 0.35;

    for (const b of buildings) {
      if (b.abandoned) {
        b.households = 0;
        b.residents = 0;
        b.workers = 0;
        continue;
      }

      if (b.kind === 'ploppable' && b.ploppableKind) {
        const spec = PLOPPABLE_SPECS[b.ploppableKind];
        b.capacityJobs = spec.jobs;
        civicJobs += spec.jobs;
        continue;
      }

      if (b.progress < 1) continue;

      activeGrowables++;
      const lv = fields.sample(fields.landValue, b.x, b.z);
      const hap = fields.sample(fields.happiness, b.x, b.z);
      landValueSum += lv;
      happinessSum += hap;

      if (b.zone === 'res_low' || b.zone === 'res_high') {
        housingCapacity += b.capacityHouseholds;
        if (!preserveResidents) {
          const utilOk = b.hasPower && b.hasWater;
          const targetFill = utilOk ? Math.min(1, 0.94 * taxPull * highwayFactor) : 0.25;
          const targetHouseholds = b.capacityHouseholds * targetFill;
          // Move in rapidly when underfilled
          const blend = targetHouseholds > b.households ? 0.45 : 0.25;
          b.households = b.households + (targetHouseholds - b.households) * blend;
          if (Math.abs(b.households - targetHouseholds) < 0.15) {
            b.households = targetHouseholds;
          }
          b.residents = Math.round(b.households * CITIZENS_PER_HOUSEHOLD);
        }
        totalHouseholds += b.households;
        totalPop += b.residents;
      } else if (b.zone === 'com_low' || b.zone === 'com_high') {
        commercialJobs += b.capacityJobs;
      } else if (b.zone === 'ind') {
        industrialJobs += b.capacityJobs;
      } else if (b.zone === 'office') {
        officeJobs += b.capacityJobs;
      }
    }

    const jobsTotal = commercialJobs + industrialJobs + officeJobs + civicJobs;
    const workers = Math.round(totalPop * WORKER_SHARE);
    const jobsFilled = Math.min(workers, jobsTotal);
    const unfilledJobs = Math.max(0, jobsTotal - jobsFilled);
    const unemploymentRate = workers > 0 ? Math.max(0, (workers - jobsFilled) / workers) : 0;
    const fillRatio = jobsTotal > 0 ? Math.min(1, workers / jobsTotal) : 0;

    // 2. Assign actual worker counts to workplaces proportionally
    for (const b of buildings) {
      if (b.abandoned || b.progress < 1) continue;
      if (b.kind === 'ploppable' || (b.zone !== 'res_low' && b.zone !== 'res_high')) {
        const utilFactor = b.hasPower && b.hasWater ? 1 : 0.35;
        b.workers = Math.round(b.capacityJobs * fillRatio * utilFactor);
      }
    }

    // 3. Smoothly update education mix from school coverage & capacities
    const edCov = services.avgEducationCoverage;
    const elemRatio = totalPop > 0 ? Math.min(1, services.elementaryCapacity / Math.max(60, totalPop * 0.25)) : 0;
    const highRatio = totalPop > 0 ? Math.min(1, services.highSchoolCapacity / Math.max(80, totalPop * 0.2)) : 0;

    const targetHigh = Math.min(0.55, 0.08 + edCov * 0.28 + highRatio * 0.22);
    const targetMid = Math.min(0.55, 0.24 + edCov * 0.2 + elemRatio * 0.16);

    this.stats.educationHigh += (targetHigh - this.stats.educationHigh) * 0.08;
    this.stats.educationMid += (targetMid - this.stats.educationMid) * 0.08;
    this.stats.educationLow = Math.max(0.05, 1 - this.stats.educationHigh - this.stats.educationMid);

    // 4. Goods production vs commercial demand
    let goodsProduced = 0;
    let goodsDemanded = 0;
    for (const b of buildings) {
      if (b.abandoned || b.progress < 1 || b.kind !== 'growable') continue;
      if (b.zone === 'ind') {
        goodsProduced += b.workers * (1.2 + (b.level - 1) * 0.35);
      } else if (b.zone === 'com_low' || b.zone === 'com_high') {
        goodsDemanded += b.workers * (1.15 + (b.level - 1) * 0.25);
      }
    }
    const goodsRatio = goodsDemanded <= 1 ? (goodsProduced > 0 ? 1.3 : 1.0) : goodsProduced / goodsDemanded;

    const housingVacancyRate =
      housingCapacity > 0 ? Math.max(0, (housingCapacity - totalHouseholds) / housingCapacity) : 0;

    this.stats.population = totalPop;
    this.stats.households = Math.round(totalHouseholds);
    this.stats.housingCapacity = Math.round(housingCapacity);
    this.stats.housingVacancyRate = housingVacancyRate;
    this.stats.workers = workers;
    this.stats.jobsTotal = jobsTotal;
    this.stats.jobsFilled = jobsFilled;
    this.stats.unfilledJobs = unfilledJobs;
    this.stats.unemploymentRate = unemploymentRate;
    this.stats.commercialJobs = commercialJobs;
    this.stats.industrialJobs = industrialJobs;
    this.stats.officeJobs = officeJobs;
    this.stats.civicJobs = civicJobs;
    this.stats.goodsProduced = goodsProduced;
    this.stats.goodsDemanded = goodsDemanded;
    this.stats.goodsRatio = goodsRatio;
    this.stats.avgHappiness = activeGrowables > 0 ? happinessSum / activeGrowables : 65;
    this.stats.avgLandValue = activeGrowables > 0 ? landValueSum / activeGrowables : 32;
  }
}
