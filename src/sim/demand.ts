import type { ActiveZoneType } from './types.ts';
import type { CitizenStats } from './citizens.ts';

export interface DemandState {
  r: number; // -50..100
  c: number; // -50..100
  i: number; // -50..100
  o: number; // -50..100
  byZone: Record<ActiveZoneType, number>;
}

function clampDemand(v: number): number {
  return Math.max(-50, Math.min(100, v));
}

/**
 * Tax rate impact centered on neutral 9%.
 * Lower taxes stimulate growth; taxes above 9% sharply dampen demand,
 * turning negative past ~14%.
 */
export function computeTaxDemandModifier(rate: number): number {
  if (rate <= 9) {
    return (9 - rate) * 5.0;
  }
  return -(rate - 9) * 9.0;
}

export function computeDemand(
  citizens: CitizenStats,
  taxRates: Record<ActiveZoneType, number>,
  hasPowerAndWater: boolean
): DemandState {
  const pop = citizens.population;

  // Residential base demand: jobs vs workers + housing vacancy + starter town pull
  const starterResPull = pop < 160 ? 58 * (1 - pop / 220) : 12;
  const jobPull =
    (citizens.unfilledJobs / Math.max(25, citizens.jobsFilled + 25)) * 78 -
    citizens.unemploymentRate * 115;
  const vacancyAdjust = Math.max(-28, Math.min(24, (0.08 - citizens.housingVacancyRate) * 140));
  const moodAdjust = (citizens.avgHappiness - 55) * 0.45;
  const utilBonus = hasPowerAndWater ? 14 : -18;
  const rawRes = starterResPull + jobPull + vacancyAdjust + moodAdjust + utilBonus;

  const resLow = clampDemand(rawRes + computeTaxDemandModifier(taxRates.res_low));
  const resHigh = clampDemand(rawRes - 4 + computeTaxDemandModifier(taxRates.res_high));
  const r = clampDemand(Math.max(resLow, resHigh * 0.95));

  // Commercial base demand: population-to-commercial ratio (~7:1) + local goods supply
  const idealComJobs = Math.max(12, pop / 7.0);
  const comGap = ((idealComJobs - citizens.commercialJobs) / Math.max(18, idealComJobs)) * 82;
  const goodsBoost = Math.max(-18, Math.min(26, (citizens.goodsRatio - 0.75) * 28));
  const tourismStarter = pop > 10 ? 18 : 10;
  const rawCom = comGap + goodsBoost + tourismStarter + (hasPowerAndWater ? 8 : -12);

  const comLow = clampDemand(rawCom + computeTaxDemandModifier(taxRates.com_low));
  const comHigh = clampDemand(rawCom - 6 + computeTaxDemandModifier(taxRates.com_high));
  const c = clampDemand(Math.max(comLow, comHigh * 0.95));

  // Industrial base demand: unemployment + goods deficit + workforce suitability
  const unempPull = (citizens.unemploymentRate - 0.03) * 155;
  const starterIndPull = citizens.industrialJobs < Math.max(20, pop * 0.24) ? 38 : 8;
  const goodsDeficitPull = Math.max(0, 1.05 - citizens.goodsRatio) * 42;
  const indEduFit = (citizens.educationLow + citizens.educationMid * 0.55 - 0.4) * 26;
  const ind = clampDemand(
    unempPull +
      starterIndPull +
      goodsDeficitPull +
      indEduFit +
      (hasPowerAndWater ? 6 : -12) +
      computeTaxDemandModifier(taxRates.ind)
  );

  // Office base demand: unemployment + educated workforce + pop scale
  const officeEduFit = (citizens.educationHigh * 85 + citizens.educationMid * 22 - 14);
  const officeScale = pop > 200 ? 18 : 4;
  const office = clampDemand(
    unempPull * 0.9 +
      officeEduFit +
      officeScale +
      (hasPowerAndWater ? 6 : -12) +
      computeTaxDemandModifier(taxRates.office)
  );

  return {
    r,
    c,
    i: ind,
    o: office,
    byZone: {
      res_low: resLow,
      res_high: resHigh,
      com_low: comLow,
      com_high: comHigh,
      ind,
      office,
    },
  };
}
