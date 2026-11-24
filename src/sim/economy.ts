import {
  MILESTONES,
  PLOPPABLE_SPECS,
  ZONE_SPECS,
  type ActiveZoneType,
  type BudgetCategory,
  type MilestoneDef,
} from './types.ts';
import type { Building } from './buildings.ts';
import type { RoadNetwork } from './roads.ts';
import type { UtilitySystem } from './utilities.ts';

export interface FinanceBreakdown {
  dailyIncome: number;
  dailyExpenses: number;
  weeklyIncome: number;
  weeklyExpenses: number;
  incomeByZone: Record<ActiveZoneType, number>;
  expenseByCategory: Record<BudgetCategory, number>;
}

export interface SerializedEconomy {
  treasury: number;
  taxRates: Record<ActiveZoneType, number>;
  budgets: Record<BudgetCategory, number>;
  milestoneTier: number;
  dailyIncome: number;
  dailyExpenses: number;
}

function emptyZoneIncome(): Record<ActiveZoneType, number> {
  return {
    res_low: 0,
    res_high: 0,
    com_low: 0,
    com_high: 0,
    ind: 0,
    office: 0,
  };
}

function emptyCategoryExpense(): Record<BudgetCategory, number> {
  return {
    power: 0,
    water: 0,
    roads: 0,
    police: 0,
    fire: 0,
    health: 0,
    education: 0,
    parks: 0,
    garbage: 0,
  };
}

export class EconomySystem {
  treasury = 120000;
  taxRates: Record<ActiveZoneType, number> = {
    res_low: 9,
    res_high: 9,
    com_low: 9,
    com_high: 9,
    ind: 9,
    office: 9,
  };
  budgets: Record<BudgetCategory, number> = {
    power: 100,
    water: 100,
    roads: 100,
    police: 100,
    fire: 100,
    health: 100,
    education: 100,
    parks: 100,
    garbage: 100,
  };
  milestoneTier = 0;
  dailyIncome = 0;
  dailyExpenses = 0;
  lastBreakdown: FinanceBreakdown = {
    dailyIncome: 0,
    dailyExpenses: 0,
    weeklyIncome: 0,
    weeklyExpenses: 0,
    incomeByZone: emptyZoneIncome(),
    expenseByCategory: emptyCategoryExpense(),
  };

  get weeklyNet(): number {
    return Math.round((this.dailyIncome - this.dailyExpenses) * 7);
  }

  get dailyNet(): number {
    return Math.round(this.dailyIncome - this.dailyExpenses);
  }

  getCurrentMilestone(): MilestoneDef {
    return MILESTONES[Math.min(MILESTONES.length - 1, this.milestoneTier)];
  }

  getAverageTaxRate(): number {
    const vals = Object.values(this.taxRates);
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }

  setTaxRate(zone: ActiveZoneType, rate: number): void {
    this.taxRates[zone] = Math.max(1, Math.min(29, Math.round(rate)));
  }

  setBudget(category: BudgetCategory, percent: number): void {
    this.budgets[category] = Math.max(50, Math.min(150, Math.round(percent)));
  }

  canAfford(cost: number): boolean {
    return this.treasury >= cost;
  }

  spend(cost: number): void {
    this.treasury -= cost;
  }

  refund(amount: number): void {
    this.treasury += amount;
  }

  /**
   * Computes current daily/weekly income & expense breakdown without mutating treasury.
   */
  recalculateRates(
    buildings: readonly Building[],
    roads: RoadNetwork,
    utilities: UtilitySystem
  ): { incomePerDay: number; expensePerDay: number } {
    let incomePerDay = 0;
    let expensePerDay = 0;
    const rawZoneIncome = emptyZoneIncome();
    const rawCatExpense = emptyCategoryExpense();

    // 1. Tax income from active growables & ploppable upkeep
    for (const b of buildings) {
      if (b.abandoned || b.progress < 1) continue;
      if (b.kind === 'growable' && b.zone !== 'none') {
        const spec = ZONE_SPECS[b.zone];
        const rate = this.taxRates[b.zone];
        const activity = b.residents * 0.55 + b.workers * 0.8;
        const levelMult = 1 + (b.level - 1) * 0.25;
        const amt = activity * spec.taxBasePerUnit * (rate / 9) * levelMult;
        incomePerDay += amt;
        rawZoneIncome[b.zone] += amt;
      } else if (b.kind === 'ploppable' && b.ploppableKind) {
        const spec = PLOPPABLE_SPECS[b.ploppableKind];
        const budMult = this.budgets[spec.category] / 100;
        const amt = spec.upkeepPerDay * budMult;
        expensePerDay += amt;
        rawCatExpense[spec.category] += amt;
      }
    }

    // 2. Road & utility line upkeep
    const roadUpkeep = roads.getTotalUpkeepPerDay() * (this.budgets.roads / 100);
    const utilUpkeep = utilities.getUpkeepPerDay() * ((this.budgets.power + this.budgets.water) / 200);
    expensePerDay += roadUpkeep;
    expensePerDay += utilUpkeep;
    rawCatExpense.roads += roadUpkeep;
    rawCatExpense.power += utilUpkeep * 0.5;
    rawCatExpense.water += utilUpkeep * 0.5;

    this.dailyIncome = incomePerDay;
    this.dailyExpenses = expensePerDay;

    const incomeByZone = emptyZoneIncome();
    for (const z of Object.keys(rawZoneIncome) as ActiveZoneType[]) {
      incomeByZone[z] = Math.round(rawZoneIncome[z] * 7);
    }
    const expenseByCategory = emptyCategoryExpense();
    for (const c of Object.keys(rawCatExpense) as BudgetCategory[]) {
      expenseByCategory[c] = Math.round(rawCatExpense[c] * 7);
    }

    this.lastBreakdown = {
      dailyIncome: Math.round(incomePerDay),
      dailyExpenses: Math.round(expensePerDay),
      weeklyIncome: Math.round(incomePerDay * 7),
      weeklyExpenses: Math.round(expensePerDay * 7),
      incomeByZone,
      expenseByCategory,
    };

    return { incomePerDay, expensePerDay };
  }

  getLastBreakdown(): FinanceBreakdown {
    return {
      ...this.lastBreakdown,
      incomeByZone: { ...this.lastBreakdown.incomeByZone },
      expenseByCategory: { ...this.lastBreakdown.expenseByCategory },
    };
  }

  /**
   * Called every quarter simulated day (60 ticks).
   */
  stepQuarterDay(
    buildings: readonly Building[],
    roads: RoadNetwork,
    utilities: UtilitySystem,
    population: number
  ): MilestoneDef | null {
    const { incomePerDay, expensePerDay } = this.recalculateRates(buildings, roads, utilities);
    this.treasury += (incomePerDay - expensePerDay) * 0.25;

    // 3. Milestone check
    let unlocked: MilestoneDef | null = null;
    for (const m of MILESTONES) {
      if (m.tier > this.milestoneTier && population >= m.populationRequired) {
        this.milestoneTier = m.tier;
        this.treasury += m.bonusMoney;
        unlocked = m;
      }
    }
    return unlocked;
  }

  serialize(): SerializedEconomy {
    return {
      treasury: this.treasury,
      taxRates: { ...this.taxRates },
      budgets: { ...this.budgets },
      milestoneTier: this.milestoneTier,
      dailyIncome: this.dailyIncome,
      dailyExpenses: this.dailyExpenses,
    };
  }

  deserialize(data: SerializedEconomy): void {
    this.treasury = data.treasury;
    this.taxRates = { ...data.taxRates };
    this.budgets = { ...data.budgets };
    this.milestoneTier = data.milestoneTier;
    this.dailyIncome = data.dailyIncome;
    this.dailyExpenses = data.dailyExpenses;
  }
}
