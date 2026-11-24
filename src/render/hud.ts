import {
  MILESTONES,
  PLOPPABLE_SPECS,
  ROAD_SPECS,
  ROAD_TYPE_LIST,
  ZONE_SPECS,
  ZONE_TYPES,
  type ActiveZoneType,
  type BudgetCategory,
  type OverlayType,
  type PloppableKind,
  type RoadType,
  type ZoneType,
} from '../sim/types.ts';
import type { BuildingDetail, SimSnapshot, SimSpeed } from '../sim/protocol.ts';
import type { CameraPreset } from './camera.ts';
import type { QualityLevel } from './quality.ts';
import type {
  ActiveTool,
  RoadDrawMode,
  SaveSlotMeta,
  ToolCategory,
  ToolReadout,
  ZoneBrushMode,
} from '../tools/toolTypes.ts';
import { decodeProblems, ICONS } from './icons.ts';

export interface HudCallbacks {
  onSpeedChange: (speed: SimSpeed) => void;
  onOverlayChange: (overlay: OverlayType) => void;
  onCameraPreset: (preset: CameraPreset) => void;
  onToolChange: (tool: ActiveTool, category: ToolCategory) => void;
  onRotatePloppable: () => void;
  onSetTaxRate: (zone: ActiveZoneType, rate: number) => void;
  onSetBudget: (category: BudgetCategory, percent: number) => void;
  onSaveSlot: (slotId: string) => void;
  onLoadSlot: (slotId: string) => void;
  onDeleteSlot: (slotId: string) => void;
  onNewCity: (demo: boolean) => void;
  onBulldozeBuilding: (buildingId: number) => void;
  onCloseInspect: () => void;
  onPickBuilding: (buildingId: number) => void;
  onQualityChange?: (level: QualityLevel) => void;
}

const OVERLAY_ITEMS: Array<{ id: OverlayType; zh: string; legend?: [string, string, string] }> = [
  { id: 'none', zh: '常规' },
  { id: 'traffic', zh: '交通', legend: ['畅通', '#4CC38A,#F2C94C,#EB7B3C,#D63E4F', '拥堵'] },
  { id: 'landvalue', zh: '地价', legend: ['普通', '#D4DCE3,#7BC8A4,#38A3A5,#F2C94C', '黄金地段'] },
  { id: 'pollution', zh: '污染', legend: ['洁净', '#DCE6DC,#A68A5B,#8A567C', '重度污染'] },
  { id: 'noise', zh: '噪音', legend: ['安静', '#DCE6DC,#A68A5B,#8A567C', '嘈杂'] },
  { id: 'power', zh: '电力', legend: ['无电', '#9BA4B0,#F6C84C', '已供电'] },
  { id: 'water', zh: '供水', legend: ['无水', '#9C8F82,#58B8EE', '已供水'] },
  { id: 'services', zh: '服务', legend: ['缺乏', '#CBD5DF,#4BC29A', '覆盖良好'] },
  { id: 'happiness', zh: '幸福', legend: ['不满', '#CBD5DF,#4BC29A', '幸福'] },
];

const CATEGORY_DEFS: Array<{ id: Exclude<ToolCategory, 'none'>; zh: string; icon: string }> = [
  { id: 'road', zh: '道路', icon: ICONS.road },
  { id: 'zone', zh: '分区', icon: ICONS.zone },
  { id: 'utility', zh: '设施', icon: ICONS.utility },
  { id: 'service', zh: '服务', icon: ICONS.service },
  { id: 'park', zh: '公园', icon: ICONS.park },
  { id: 'bulldoze', zh: '拆除', icon: ICONS.bulldoze },
  { id: 'info', zh: '信息', icon: ICONS.info },
];

const UTILITY_ITEMS: Array<
  | { kind: 'line'; lineKind: 'power_line' | 'water_pipe'; zh: string; costText: string; sub: string; icon: string; tier: number }
  | { kind: 'plop'; plop: PloppableKind }
> = [
  { kind: 'line', lineKind: 'power_line', zh: '输电线', costText: '¥6/m', sub: '连接电网', icon: ICONS.power_line, tier: 0 },
  { kind: 'plop', plop: 'wind_turbine' },
  { kind: 'plop', plop: 'coal_plant' },
  { kind: 'plop', plop: 'solar_plant' },
  { kind: 'line', lineKind: 'water_pipe', zh: '供水管道', costText: '¥8/m', sub: '地下管网', icon: ICONS.water_pipe, tier: 0 },
  { kind: 'plop', plop: 'water_pump' },
  { kind: 'plop', plop: 'water_tower' },
  { kind: 'plop', plop: 'sewage_outlet' },
];

const SERVICE_ITEMS: PloppableKind[] = [
  'clinic',
  'elementary_school',
  'landfill',
  'police_station',
  'fire_station',
  'high_school',
  'hospital',
];

const PARK_ITEMS: PloppableKind[] = ['park_small', 'park_plaza'];

const ZONE_SWATCH: Record<ZoneType, string> = {
  none: '#E55B5B',
  res_low: '#7ED389',
  res_high: '#2F9E66',
  com_low: '#69B8F5',
  com_high: '#2D74C4',
  ind: '#F0B94D',
  office: '#49C6C1',
};

const BUDGET_LABELS: Array<{ id: BudgetCategory; zh: string }> = [
  { id: 'roads', zh: '道路养护' },
  { id: 'power', zh: '电力系统' },
  { id: 'water', zh: '供水排污' },
  { id: 'health', zh: '医疗卫生' },
  { id: 'education', zh: '教育学校' },
  { id: 'police', zh: '警察治安' },
  { id: 'fire', zh: '消防应急' },
  { id: 'parks', zh: '公园广场' },
  { id: 'garbage', zh: '环卫垃圾' },
];

function formatTimePhase(hours: number): { clock: string; phaseZh: string } {
  const hNorm = ((hours % 24) + 24) % 24;
  const hh = Math.floor(hNorm);
  const mm = Math.floor((hNorm - hh) * 60);
  const clock = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;

  let phaseZh = '晴昼';
  if (hNorm >= 5.5 && hNorm < 7.8) phaseZh = '晨曦';
  else if (hNorm >= 17.0 && hNorm < 19.6) phaseZh = '暮光';
  else if (hNorm >= 19.6 || hNorm < 5.5) phaseZh = '星夜';

  return { clock, phaseZh };
}

function demandHeightPercent(v: number): number {
  return Math.max(8, Math.min(100, Math.round(((v + 50) / 150) * 100)));
}

function milestonePopForTier(tier: number): number {
  return MILESTONES.find((m) => m.tier === tier)?.populationRequired ?? 0;
}

export interface ProblemMarkerInput {
  buildingId: number;
  screenX: number;
  screenY: number;
  flags: number;
}

export class HudOverlay {
  private readonly root: HTMLDivElement;
  private readonly popEl: HTMLElement;
  private readonly moneyEl: HTMLElement;
  private readonly netEl: HTMLElement;
  private readonly dateEl: HTMLElement;
  private readonly milestoneEl: HTMLElement;
  private readonly rciBars: Record<'r' | 'c' | 'i' | 'o', HTMLElement>;
  private readonly speedBtns = new Map<SimSpeed, HTMLButtonElement>();
  private readonly catBtns = new Map<ToolCategory, HTMLButtonElement>();

  private readonly subpanelEl: HTMLDivElement;
  private readonly readoutEl: HTMLDivElement;
  private readonly toastContainer: HTMLDivElement;
  private readonly inspectCardEl: HTMLDivElement;
  private readonly budgetModalEl: HTMLDivElement;
  private readonly saveModalEl: HTMLDivElement;
  private readonly aboutModalEl: HTMLDivElement;
  private readonly problemLayerEl: HTMLDivElement;
  private readonly legendBarEl: HTMLDivElement;
  private readonly budgetBtn: HTMLButtonElement;
  private readonly saveBtn: HTMLButtonElement;

  private activeCategory: ToolCategory = 'none';
  private activeRoadType: RoadType = 'small_2lane';
  private activeRoadMode: RoadDrawMode = 'straight';
  private roadSnap = true;
  private activeZone: ZoneType = 'res_low';
  private activeZoneBrush: ZoneBrushMode = 'medium';
  private activeUtilitySel: 'power_line' | 'water_pipe' | PloppableKind = 'wind_turbine';
  private activeServiceSel: PloppableKind = 'clinic';
  private activeParkSel: PloppableKind = 'park_small';
  private currentOverlay: OverlayType = 'none';
  private currentPlopYaw = 0;

  private budgetOpen = false;
  private budgetTab: 'taxes' | 'budgets' = 'taxes';
  private saveOpen = false;
  private aboutOpen = false;
  private currentQuality: QualityLevel = 'high';
  private lastMilestoneTier = 0;
  private latestSnapshot: SimSnapshot | null = null;
  private saveSlotsCache: Array<{ slotId: string; label: string; isAuto: boolean; meta: SaveSlotMeta | null }> = [];
  private inspectedBuilding: BuildingDetail | null = null;
  private readonly problemBadgeNodes = new Map<number, { btn: HTMLButtonElement; flags: number }>();

  constructor(container: HTMLElement, private readonly callbacks: HudCallbacks) {
    this.injectStyles();

    // Floating 3D-projected problem badges sit beneath HUD dialogs
    this.problemLayerEl = document.createElement('div');
    this.problemLayerEl.className = 'tl-problem-layer';
    container.appendChild(this.problemLayerEl);

    this.root = document.createElement('div');
    this.root.className = 'tl-hud';
    this.root.innerHTML = `
      <div class="tl-topbar">
        <button type="button" class="tl-glass tl-brand tl-brand-btn" data-action="toggle-about" title="关于汐光市 · 画质与开源致谢">
          <svg class="tl-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 17c2.4-1.8 4.6-1.8 7 0s4.6 1.8 7 0 2.5-1.5 4-1"/>
            <path d="M5 13V7l4-2 4 2v6"/>
            <path d="M13 13V9l3-1.5L19 9v4"/>
          </svg>
          <div style="text-align:left;">
            <div class="tl-title">汐光市 <span class="tl-sub">Tidelight</span></div>
            <div class="tl-milestone" data-el="milestone">初建港湾</div>
          </div>
        </button>

        <div class="tl-glass tl-stats">
          <div class="tl-stat">
            <span class="tl-label">人口</span>
            <span class="tl-val" data-el="pop">0</span>
          </div>
          <div class="tl-sep"></div>
          <button type="button" class="tl-stat tl-stat-btn" data-action="open-budget" title="打开财政与税收面板">
            <span class="tl-label">资金</span>
            <span class="tl-val" data-el="money">¥120,000</span>
            <span class="tl-delta" data-el="net">+0/周</span>
          </button>
          <div class="tl-sep tl-hide-sm"></div>
          <div class="tl-stat tl-hide-sm">
            <span class="tl-label">历日</span>
            <span class="tl-val" data-el="date">第 1 天 · 10:30 晴昼</span>
          </div>
        </div>

        <div class="tl-glass tl-rci" title="需求指标 (住/商/工/办)">
          <div class="tl-rci-col"><div class="tl-rci-track"><div class="tl-rci-fill tl-r" data-rci="r"></div></div><span>住</span></div>
          <div class="tl-rci-col"><div class="tl-rci-track"><div class="tl-rci-fill tl-c" data-rci="c"></div></div><span>商</span></div>
          <div class="tl-rci-col"><div class="tl-rci-track"><div class="tl-rci-fill tl-i" data-rci="i"></div></div><span>工</span></div>
          <div class="tl-rci-col"><div class="tl-rci-track"><div class="tl-rci-fill tl-o" data-rci="o"></div></div><span>办</span></div>
        </div>

        <div class="tl-glass tl-speeds" role="group" aria-label="模拟速度">
          <button type="button" class="tl-btn tl-pause-btn" data-speed="0" title="暂停">${ICONS.pause}</button>
          <button type="button" class="tl-btn" data-speed="1" title="1倍速">1x</button>
          <button type="button" class="tl-btn" data-speed="2" title="2倍速">2x</button>
          <button type="button" class="tl-btn" data-speed="4" title="4倍速">4x</button>
        </div>

        <div class="tl-glass tl-top-actions">
          <button type="button" class="tl-btn tl-act-btn" data-action="toggle-budget" title="财政与税收">
            ${ICONS.budget}<span>预算</span>
          </button>
          <button type="button" class="tl-btn tl-act-btn" data-action="toggle-save" title="保存与读取存档">
            ${ICONS.save}<span>存档</span>
          </button>
        </div>
      </div>

      <div class="tl-toasts" data-el="toasts"></div>
      <div class="tl-legend-wrap" data-el="legend"></div>
      <div class="tl-inspect-wrap" data-el="inspect"></div>
      <div class="tl-modal-wrap" data-el="budget-modal"></div>
      <div class="tl-modal-wrap" data-el="save-modal"></div>
      <div class="tl-modal-wrap" data-el="about-modal"></div>
      <div class="tl-readout tl-glass" data-el="readout" style="display:none;"></div>

      <div class="tl-bottom-stack">
        <div class="tl-subpanel tl-glass" data-el="subpanel" style="display:none;"></div>

        <div class="tl-bottombar">
          <div class="tl-dock-spacer"></div>
          <div class="tl-glass tl-dock" role="toolbar" aria-label="建造工具栏">
            ${CATEGORY_DEFS.map(
              (c) => `
              <button type="button" class="tl-dock-btn" data-cat="${c.id}" aria-pressed="false">
                ${c.icon}
                <span>${c.zh}</span>
              </button>`
            ).join('')}
          </div>
          <div class="tl-glass tl-cams" role="group" aria-label="视角预设">
            <button type="button" class="tl-pill" data-cam="overview">鸟瞰</button>
            <button type="button" class="tl-pill" data-cam="street">街景</button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(this.root);

    this.popEl = this.root.querySelector('[data-el="pop"]')!;
    this.moneyEl = this.root.querySelector('[data-el="money"]')!;
    this.netEl = this.root.querySelector('[data-el="net"]')!;
    this.dateEl = this.root.querySelector('[data-el="date"]')!;
    this.milestoneEl = this.root.querySelector('[data-el="milestone"]')!;
    this.subpanelEl = this.root.querySelector('[data-el="subpanel"]')!;
    this.readoutEl = this.root.querySelector('[data-el="readout"]')!;
    this.toastContainer = this.root.querySelector('[data-el="toasts"]')!;
    this.inspectCardEl = this.root.querySelector('[data-el="inspect"]')!;
    this.budgetModalEl = this.root.querySelector('[data-el="budget-modal"]')!;
    this.saveModalEl = this.root.querySelector('[data-el="save-modal"]')!;
    this.aboutModalEl = this.root.querySelector('[data-el="about-modal"]')!;
    this.legendBarEl = this.root.querySelector('[data-el="legend"]')!;
    this.budgetBtn = this.root.querySelector('[data-action="toggle-budget"]')!;
    this.saveBtn = this.root.querySelector('[data-action="toggle-save"]')!;

    this.rciBars = {
      r: this.root.querySelector('[data-rci="r"]')!,
      c: this.root.querySelector('[data-rci="c"]')!,
      i: this.root.querySelector('[data-rci="i"]')!,
      o: this.root.querySelector('[data-rci="o"]')!,
    };

    for (const btn of Array.from(this.root.querySelectorAll<HTMLButtonElement>('[data-speed]'))) {
      const spd = Number(btn.dataset.speed) as SimSpeed;
      this.speedBtns.set(spd, btn);
      btn.addEventListener('click', () => callbacks.onSpeedChange(spd));
    }

    for (const btn of Array.from(this.root.querySelectorAll<HTMLButtonElement>('[data-cat]'))) {
      const cat = btn.dataset.cat as ToolCategory;
      this.catBtns.set(cat, btn);
      btn.addEventListener('click', () => this.toggleCategory(cat));
    }

    for (const btn of Array.from(this.root.querySelectorAll<HTMLButtonElement>('[data-cam]'))) {
      const preset = btn.dataset.cam as CameraPreset;
      btn.addEventListener('click', () => callbacks.onCameraPreset(preset));
    }

    this.root.querySelector('[data-action="open-budget"]')?.addEventListener('click', () => this.setBudgetOpen(!this.budgetOpen));
    this.root.querySelector('[data-action="toggle-about"]')?.addEventListener('click', () => this.setAboutOpen(!this.aboutOpen));
    this.budgetBtn.addEventListener('click', () => this.setBudgetOpen(!this.budgetOpen));
    this.saveBtn.addEventListener('click', () => this.setSaveOpen(!this.saveOpen));

    this.problemLayerEl.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-prob-bid]');
      if (btn) {
        const bid = Number(btn.dataset.probBid);
        if (Number.isFinite(bid)) callbacks.onPickBuilding(bid);
      }
    });
  }

  toggleCategory(cat: ToolCategory): void {
    if (this.activeCategory === cat) {
      this.selectCategory('none');
    } else {
      this.selectCategory(cat);
    }
  }

  selectCategory(cat: ToolCategory): void {
    this.activeCategory = cat;
    if (cat !== 'none') {
      this.setBudgetOpen(false);
      this.setSaveOpen(false);
      this.setAboutOpen(false);
    }

    for (const [id, btn] of this.catBtns.entries()) {
      const on = id === cat;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    this.emitActiveTool();
    this.renderSubpanel();
  }

  clearTool(): void {
    if (this.activeCategory === 'none') return;
    this.selectCategory('none');
  }

  setRoadOptions(roadType?: RoadType, mode?: RoadDrawMode, snap?: boolean): void {
    if (roadType) this.activeRoadType = roadType;
    if (mode) this.activeRoadMode = mode;
    if (snap !== undefined) this.roadSnap = snap;
    if (this.activeCategory === 'road') {
      this.emitActiveTool();
      this.renderSubpanel();
    }
  }

  setZoneOptions(zone?: ZoneType, brush?: ZoneBrushMode): void {
    if (zone !== undefined) this.activeZone = zone;
    if (brush) this.activeZoneBrush = brush;
    if (this.activeCategory === 'zone') {
      this.emitActiveTool();
      this.renderSubpanel();
    }
  }

  setBudgetOpen(open: boolean): void {
    this.budgetOpen = open;
    if (open) {
      this.saveOpen = false;
      this.saveModalEl.innerHTML = '';
      this.saveBtn.classList.remove('active');
      this.aboutOpen = false;
      this.aboutModalEl.innerHTML = '';
    }
    this.budgetBtn.classList.toggle('active', open);
    this.renderBudgetModal();
  }

  setSaveOpen(open: boolean): void {
    this.saveOpen = open;
    if (open) {
      this.budgetOpen = false;
      this.budgetModalEl.innerHTML = '';
      this.budgetBtn.classList.remove('active');
      this.aboutOpen = false;
      this.aboutModalEl.innerHTML = '';
    }
    this.saveBtn.classList.toggle('active', open);
    this.renderSaveModal();
  }

  setAboutOpen(open: boolean): void {
    this.aboutOpen = open;
    if (open) {
      this.budgetOpen = false;
      this.budgetModalEl.innerHTML = '';
      this.budgetBtn.classList.remove('active');
      this.saveOpen = false;
      this.saveModalEl.innerHTML = '';
      this.saveBtn.classList.remove('active');
    }
    this.renderAboutModal();
  }

  setQualityLevel(level: QualityLevel): void {
    this.currentQuality = level;
    if (this.aboutOpen) {
      this.renderAboutModal();
    }
  }

  setSaveSlots(slots: Array<{ slotId: string; label: string; isAuto: boolean; meta: SaveSlotMeta | null }>): void {
    this.saveSlotsCache = slots;
    if (this.saveOpen) {
      this.renderSaveModal();
    }
  }

  setInspectedBuilding(detail: BuildingDetail | null): void {
    this.inspectedBuilding = detail;
    this.renderInspectCard();
  }

  setPloppableYaw(yaw: number): void {
    this.currentPlopYaw = yaw;
  }

  updateReadout(readout: ToolReadout): void {
    if (!readout.visible) {
      this.readoutEl.style.display = 'none';
      return;
    }
    this.readoutEl.style.display = 'flex';
    this.readoutEl.classList.toggle('tl-invalid', !readout.valid);

    // Position neatly offset from pointer without overflowing screen edges
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw <= 640;
    if (isMobile) {
      this.readoutEl.style.left = '50%';
      this.readoutEl.style.top = 'auto';
      this.readoutEl.style.bottom = 'calc(env(safe-area-inset-bottom) + 172px)';
      this.readoutEl.style.transform = 'translateX(-50%)';
    } else {
      const left = Math.max(16, Math.min(vw - 290, readout.screenX + 20));
      const top = Math.max(76, Math.min(vh - 180, readout.screenY - 58));
      this.readoutEl.style.left = `${Math.round(left)}px`;
      this.readoutEl.style.top = `${Math.round(top)}px`;
      this.readoutEl.style.bottom = 'auto';
      this.readoutEl.style.transform = 'none';
    }

    this.readoutEl.innerHTML = `
      <div class="tl-ro-row">
        <span class="tl-ro-title">${readout.title}</span>
        ${readout.costText ? `<span class="tl-ro-cost">${readout.costText}</span>` : ''}
        ${readout.snapBadge ? `<span class="tl-ro-snap">${readout.snapBadge}</span>` : ''}
      </div>
      ${readout.hint ? `<div class="tl-ro-hint">${readout.hint}</div>` : ''}
    `;
  }

  showToast(message: string, tone: 'info' | 'warn' | 'success' | 'milestone' = 'info', subtitle?: string): void {
    const el = document.createElement('div');
    el.className = `tl-toast tl-glass tl-toast-${tone}`;
    el.innerHTML = `
      <div class="tl-toast-title">${message}</div>
      ${subtitle ? `<div class="tl-toast-sub">${subtitle}</div>` : ''}
    `;
    this.toastContainer.appendChild(el);
    const ttl = tone === 'milestone' ? 5200 : 3000;
    setTimeout(() => {
      el.classList.add('tl-toast-out');
      setTimeout(() => el.remove(), 300);
    }, ttl);
  }

  updateProblemMarkers(markers: ProblemMarkerInput[]): void {
    const activeIds = new Set<number>();
    for (let i = 0; i < markers.length; i++) {
      const m = markers[i];
      const probs = decodeProblems(m.flags);
      if (probs.length === 0) continue;
      activeIds.add(m.buildingId);
      const top = probs[0];

      let entry = this.problemBadgeNodes.get(m.buildingId);
      if (!entry) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'tl-prob-badge';
        btn.dataset.probBid = String(m.buildingId);
        this.problemLayerEl.appendChild(btn);
        entry = { btn, flags: -1 };
        this.problemBadgeNodes.set(m.buildingId, entry);
      }

      if (entry.flags !== m.flags) {
        entry.flags = m.flags;
        entry.btn.title = probs.map((p) => p.labelZh).join(' · ');
        entry.btn.style.setProperty('--prob-col', top.color);
        entry.btn.innerHTML = top.icon;
      }
      entry.btn.style.transform = `translate(${Math.round(m.screenX - 11)}px,${Math.round(m.screenY - 22)}px)`;
    }

    for (const [bid, entry] of this.problemBadgeNodes.entries()) {
      if (!activeIds.has(bid)) {
        entry.btn.remove();
        this.problemBadgeNodes.delete(bid);
      }
    }
  }

  update(snap: SimSnapshot, isNight: boolean): void {
    this.latestSnapshot = snap;
    this.root.classList.toggle('tl-night', isNight);

    const { stats } = snap;
    this.popEl.textContent = stats.population.toLocaleString('zh-CN');
    this.moneyEl.textContent = `¥${stats.money.toLocaleString('zh-CN')}`;

    const sign = stats.weeklyNet >= 0 ? '+' : '';
    this.netEl.textContent = `${sign}${stats.weeklyNet.toLocaleString('zh-CN')}/周`;
    this.netEl.classList.toggle('tl-pos', stats.weeklyNet >= 0);
    this.netEl.classList.toggle('tl-neg', stats.weeklyNet < 0);

    const { clock, phaseZh } = formatTimePhase(snap.timeOfDay);
    this.dateEl.textContent = `第 ${snap.simDay} 天 · ${clock} ${phaseZh}`;
    this.milestoneEl.textContent = `${stats.milestoneNameZh} · ${stats.vehicleCount} 车`;

    this.rciBars.r.style.height = `${demandHeightPercent(stats.demand.r)}%`;
    this.rciBars.c.style.height = `${demandHeightPercent(stats.demand.c)}%`;
    this.rciBars.i.style.height = `${demandHeightPercent(stats.demand.i)}%`;
    this.rciBars.o.style.height = `${demandHeightPercent(stats.demand.o)}%`;

    for (const [spd, btn] of this.speedBtns.entries()) {
      btn.classList.toggle('active', spd === snap.speed);
    }

    const overlayChanged = this.currentOverlay !== snap.overlayType;
    this.currentOverlay = snap.overlayType;
    if (overlayChanged) {
      this.renderLegend();
      if (this.activeCategory === 'info') {
        this.renderSubpanel();
      }
    }

    const tierChanged = stats.milestoneTier !== this.lastMilestoneTier;
    this.lastMilestoneTier = stats.milestoneTier;
    if (tierChanged && this.activeCategory !== 'none') {
      this.renderSubpanel();
    } else if (this.activeCategory === 'utility') {
      // Refresh live power/water capacity numbers in utility subpanel header
      const utilSummary = this.subpanelEl.querySelector('[data-el="util-summary"]');
      if (utilSummary) {
        utilSummary.innerHTML = this.renderUtilitySummaryHtml(snap);
      }
    }

    if (this.budgetOpen) {
      this.updateBudgetLiveNumbers(snap);
    }
  }

  private emitActiveTool(): void {
    const tier = this.latestSnapshot?.stats.milestoneTier ?? 0;

    if (this.activeCategory === 'none') {
      this.callbacks.onToolChange({ kind: 'none' }, 'none');
      return;
    }
    if (this.activeCategory === 'road') {
      if (ROAD_SPECS[this.activeRoadType].milestoneTier > tier) {
        this.activeRoadType = 'small_2lane';
      }
      this.callbacks.onToolChange(
        {
          kind: 'road',
          roadType: this.activeRoadType,
          mode: this.activeRoadMode,
          snap: this.roadSnap,
        },
        'road'
      );
      return;
    }
    if (this.activeCategory === 'zone') {
      if (this.activeZone !== 'none' && ZONE_SPECS[this.activeZone].milestoneTier > tier) {
        this.activeZone = 'res_low';
      }
      this.callbacks.onToolChange(
        { kind: 'zone', zone: this.activeZone, brush: this.activeZoneBrush },
        'zone'
      );
      return;
    }
    if (this.activeCategory === 'utility') {
      if (this.activeUtilitySel === 'power_line' || this.activeUtilitySel === 'water_pipe') {
        this.callbacks.onToolChange({ kind: 'utility_line', lineKind: this.activeUtilitySel }, 'utility');
      } else {
        if (PLOPPABLE_SPECS[this.activeUtilitySel].milestoneTier > tier) {
          this.activeUtilitySel = 'wind_turbine';
        }
        this.callbacks.onToolChange(
          { kind: 'ploppable', ploppable: this.activeUtilitySel, yaw: this.currentPlopYaw },
          'utility'
        );
      }
      return;
    }
    if (this.activeCategory === 'service') {
      const unlocked = SERVICE_ITEMS.find((k) => PLOPPABLE_SPECS[k].milestoneTier <= tier);
      if (PLOPPABLE_SPECS[this.activeServiceSel].milestoneTier > tier && unlocked) {
        this.activeServiceSel = unlocked;
      }
      if (PLOPPABLE_SPECS[this.activeServiceSel].milestoneTier <= tier) {
        this.callbacks.onToolChange(
          { kind: 'ploppable', ploppable: this.activeServiceSel, yaw: this.currentPlopYaw },
          'service'
        );
      } else {
        this.callbacks.onToolChange({ kind: 'none' }, 'service');
      }
      return;
    }
    if (this.activeCategory === 'park') {
      if (PLOPPABLE_SPECS[this.activeParkSel].milestoneTier > tier) {
        this.activeParkSel = 'park_small';
      }
      this.callbacks.onToolChange(
        { kind: 'ploppable', ploppable: this.activeParkSel, yaw: this.currentPlopYaw },
        'park'
      );
      return;
    }
    if (this.activeCategory === 'bulldoze') {
      this.callbacks.onToolChange({ kind: 'bulldoze' }, 'bulldoze');
      return;
    }
    if (this.activeCategory === 'info') {
      this.callbacks.onToolChange({ kind: 'info', overlay: this.currentOverlay }, 'info');
    }
  }

  private renderUtilitySummaryHtml(snap: SimSnapshot | null): string {
    if (!snap) return '';
    const s = snap.stats;
    const pOk = s.powerProducedMW >= s.powerConsumedMW;
    const wOk = s.waterProducedM3 >= s.waterConsumedM3;
    const swOk = s.sewageCapacityM3 >= s.sewageConsumedM3;
    return `
      <span class="tl-chip ${pOk ? 'ok' : 'warn'}">电力 ${s.powerConsumedMW}/${s.powerProducedMW} MW</span>
      <span class="tl-chip ${wOk ? 'ok' : 'warn'}">供水 ${s.waterConsumedM3}/${s.waterProducedM3} m³</span>
      <span class="tl-chip ${swOk ? 'ok' : 'warn'}">排污 ${s.sewageConsumedM3}/${s.sewageCapacityM3} m³</span>
    `;
  }

  private renderSubpanel(): void {
    const cat = this.activeCategory;
    if (cat === 'none') {
      this.subpanelEl.style.display = 'none';
      this.subpanelEl.innerHTML = '';
      return;
    }

    const tier = this.latestSnapshot?.stats.milestoneTier ?? 0;
    this.subpanelEl.style.display = 'flex';

    const handleHtml = `
      <div class="tl-sheet-header">
        <div class="tl-sheet-handle"></div>
        <button type="button" class="tl-sheet-close" data-sub-close title="收起面板">${ICONS.close}</button>
      </div>
    `;

    if (cat === 'road') {
      const modes: Array<{ id: RoadDrawMode; zh: string; icon: string }> = [
        { id: 'straight', zh: '直线', icon: ICONS.straight },
        { id: 'curve', zh: '曲线', icon: ICONS.curve },
        { id: 'freeform', zh: '自由', icon: ICONS.freeform },
        { id: 'upgrade', zh: '升级', icon: ICONS.upgrade },
      ];
      this.subpanelEl.innerHTML = `
        ${handleHtml}
        <div class="tl-sub-controls">
          <div class="tl-seg-group">
            ${modes
              .map(
                (m) =>
                  `<button type="button" class="tl-mini-btn ${this.activeRoadMode === m.id ? 'active' : ''}" data-road-mode="${m.id}">${m.icon}<span>${m.zh}</span></button>`
              )
              .join('')}
          </div>
          <button type="button" class="tl-mini-btn ${this.roadSnap ? 'active' : ''}" data-road-snap="1" title="节点、路口与15°角度吸附">
            ${ICONS.snap}<span>吸附 15°</span>
          </button>
        </div>
        <div class="tl-sub-items">
          ${ROAD_TYPE_LIST.map((rt) => {
            const spec = ROAD_SPECS[rt];
            const locked = spec.milestoneTier > tier;
            const reqPop = milestonePopForTier(spec.milestoneTier);
            const selected = !locked && this.activeRoadType === rt;
            return `
              <button type="button" class="tl-item-card ${selected ? 'active' : ''} ${locked ? 'locked' : ''}" data-road-type="${rt}" ${locked ? 'disabled' : ''}>
                <div class="tl-item-ico">${ICONS[rt] ?? ICONS.road}</div>
                <div class="tl-item-name">${spec.labelZh}</div>
                <div class="tl-item-meta">${locked ? `${ICONS.lock} 需${reqPop}人` : `¥${spec.costPerMeter}/m`}</div>
              </button>`;
          }).join('')}
        </div>
      `;
    } else if (cat === 'zone') {
      const brushes: Array<{ id: ZoneBrushMode; zh: string }> = [
        { id: 'small', zh: '小刷' },
        { id: 'medium', zh: '中刷' },
        { id: 'large', zh: '大刷' },
        { id: 'segment', zh: '整段填充' },
      ];
      this.subpanelEl.innerHTML = `
        ${handleHtml}
        <div class="tl-sub-controls">
          <div class="tl-seg-group">
            ${brushes
              .map(
                (b) =>
                  `<button type="button" class="tl-mini-btn ${this.activeZoneBrush === b.id ? 'active' : ''}" data-zone-brush="${b.id}">${b.zh}</button>`
              )
              .join('')}
          </div>
          <span class="tl-sub-hint">点击或拖动涂抹道路旁 8m 格子</span>
        </div>
        <div class="tl-sub-items">
          ${ZONE_TYPES.map((z) => {
            const spec = ZONE_SPECS[z];
            const locked = spec.milestoneTier > tier;
            const reqPop = milestonePopForTier(spec.milestoneTier);
            const selected = !locked && this.activeZone === z;
            return `
              <button type="button" class="tl-item-card ${selected ? 'active' : ''} ${locked ? 'locked' : ''}" data-zone-type="${z}" ${locked ? 'disabled' : ''}>
                <div class="tl-item-ico" style="color:${ZONE_SWATCH[z]};">${ICONS[z]}</div>
                <div class="tl-item-name">${spec.labelZh}</div>
                <div class="tl-item-meta">${locked ? `${ICONS.lock} 需${reqPop}人` : `<span class="tl-swatch" style="background:${ZONE_SWATCH[z]};"></span>免费`}</div>
              </button>`;
          }).join('')}
          <button type="button" class="tl-item-card ${this.activeZone === 'none' ? 'active' : ''}" data-zone-type="none">
            <div class="tl-item-ico" style="color:#D95050;">${ICONS.dezone}</div>
            <div class="tl-item-name">取消分区</div>
            <div class="tl-item-meta">擦除规划</div>
          </button>
        </div>
      `;
    } else if (cat === 'utility') {
      const isPlop = this.activeUtilitySel !== 'power_line' && this.activeUtilitySel !== 'water_pipe';
      this.subpanelEl.innerHTML = `
        ${handleHtml}
        <div class="tl-sub-controls">
          <div class="tl-util-summary" data-el="util-summary">${this.renderUtilitySummaryHtml(this.latestSnapshot)}</div>
          ${
            isPlop
              ? `<button type="button" class="tl-mini-btn" data-rotate-plop="1">${ICONS.rotate}<span>旋转 (R)</span></button>`
              : `<span class="tl-sub-hint">拖动或两点铺设管线</span>`
          }
        </div>
        <div class="tl-sub-items">
          ${UTILITY_ITEMS.map((item) => {
            if (item.kind === 'line') {
              const selected = this.activeUtilitySel === item.lineKind;
              return `
                <button type="button" class="tl-item-card ${selected ? 'active' : ''}" data-util-line="${item.lineKind}">
                  <div class="tl-item-ico">${item.icon}</div>
                  <div class="tl-item-name">${item.zh}</div>
                  <div class="tl-item-meta">${item.costText}</div>
                </button>`;
            }
            const spec = PLOPPABLE_SPECS[item.plop];
            const locked = spec.milestoneTier > tier;
            const reqPop = milestonePopForTier(spec.milestoneTier);
            const selected = !locked && this.activeUtilitySel === item.plop;
            return `
              <button type="button" class="tl-item-card ${selected ? 'active' : ''} ${locked ? 'locked' : ''}" data-util-plop="${item.plop}" ${locked ? 'disabled' : ''}>
                <div class="tl-item-ico">${ICONS[item.plop] ?? ICONS.utility}</div>
                <div class="tl-item-name">${spec.labelZh}</div>
                <div class="tl-item-meta">${locked ? `${ICONS.lock} 需${reqPop}人` : `¥${spec.cost.toLocaleString('zh-CN')}`}</div>
              </button>`;
          }).join('')}
        </div>
      `;
    } else if (cat === 'service') {
      const anyUnlocked = SERVICE_ITEMS.some((k) => PLOPPABLE_SPECS[k].milestoneTier <= tier);
      this.subpanelEl.innerHTML = `
        ${handleHtml}
        <div class="tl-sub-controls">
          <span class="tl-sub-hint">${anyUnlocked ? '公共服务提升地价与幸福度，助建筑升级' : '人口达到 250（海风村落）解锁首批公共服务'}</span>
          ${anyUnlocked ? `<button type="button" class="tl-mini-btn" data-rotate-plop="1">${ICONS.rotate}<span>旋转 (R)</span></button>` : ''}
        </div>
        <div class="tl-sub-items">
          ${SERVICE_ITEMS.map((k) => {
            const spec = PLOPPABLE_SPECS[k];
            const locked = spec.milestoneTier > tier;
            const reqPop = milestonePopForTier(spec.milestoneTier);
            const selected = !locked && this.activeServiceSel === k;
            return `
              <button type="button" class="tl-item-card ${selected ? 'active' : ''} ${locked ? 'locked' : ''}" data-service-plop="${k}" ${locked ? 'disabled' : ''}>
                <div class="tl-item-ico">${ICONS[k] ?? ICONS.service}</div>
                <div class="tl-item-name">${spec.labelZh}</div>
                <div class="tl-item-meta">${locked ? `${ICONS.lock} 需${reqPop}人` : `¥${spec.cost.toLocaleString('zh-CN')}`}</div>
              </button>`;
          }).join('')}
        </div>
      `;
    } else if (cat === 'park') {
      this.subpanelEl.innerHTML = `
        ${handleHtml}
        <div class="tl-sub-controls">
          <span class="tl-sub-hint">公园可大幅提升周边地价、降低噪音</span>
          <button type="button" class="tl-mini-btn" data-rotate-plop="1">${ICONS.rotate}<span>旋转 (R)</span></button>
        </div>
        <div class="tl-sub-items">
          ${PARK_ITEMS.map((k) => {
            const spec = PLOPPABLE_SPECS[k];
            const locked = spec.milestoneTier > tier;
            const reqPop = milestonePopForTier(spec.milestoneTier);
            const selected = !locked && this.activeParkSel === k;
            return `
              <button type="button" class="tl-item-card ${selected ? 'active' : ''} ${locked ? 'locked' : ''}" data-park-plop="${k}" ${locked ? 'disabled' : ''}>
                <div class="tl-item-ico">${ICONS[k] ?? ICONS.park}</div>
                <div class="tl-item-name">${spec.labelZh}</div>
                <div class="tl-item-meta">${locked ? `${ICONS.lock} 需${reqPop}人` : `¥${spec.cost.toLocaleString('zh-CN')}`}</div>
              </button>`;
          }).join('')}
        </div>
      `;
    } else if (cat === 'bulldoze') {
      this.subpanelEl.innerHTML = `
        ${handleHtml}
        <div class="tl-sub-controls">
          <span class="tl-sub-hint" style="color:#C84646;font-weight:600;">拆除模式：点击任意建筑、路段或管线即可拆除（道路与设施返还 50% 费用）· Esc 或右键退出</span>
        </div>
      `;
    } else if (cat === 'info') {
      this.subpanelEl.innerHTML = `
        ${handleHtml}
        <div class="tl-sub-controls">
          <span class="tl-sub-hint">切换城市数据热力图与管网视图</span>
        </div>
        <div class="tl-overlay-grid">
          ${OVERLAY_ITEMS.map(
            (o) =>
              `<button type="button" class="tl-pill tl-ov-btn ${this.currentOverlay === o.id ? 'active' : ''}" data-overlay-pick="${o.id}">${o.zh}</button>`
          ).join('')}
        </div>
      `;
    }

    this.bindSubpanelEvents();
  }

  private bindSubpanelEvents(): void {
    this.subpanelEl.querySelector('[data-sub-close]')?.addEventListener('click', () => {
      this.selectCategory('none');
    });

    for (const btn of Array.from(this.subpanelEl.querySelectorAll<HTMLButtonElement>('[data-road-mode]'))) {
      btn.addEventListener('click', () => {
        this.activeRoadMode = btn.dataset.roadMode as RoadDrawMode;
        this.emitActiveTool();
        this.renderSubpanel();
      });
    }

    this.subpanelEl.querySelector('[data-road-snap]')?.addEventListener('click', () => {
      this.roadSnap = !this.roadSnap;
      this.emitActiveTool();
      this.renderSubpanel();
    });

    for (const btn of Array.from(this.subpanelEl.querySelectorAll<HTMLButtonElement>('[data-road-type]'))) {
      btn.addEventListener('click', () => {
        this.activeRoadType = btn.dataset.roadType as RoadType;
        this.emitActiveTool();
        this.renderSubpanel();
      });
    }

    for (const btn of Array.from(this.subpanelEl.querySelectorAll<HTMLButtonElement>('[data-zone-brush]'))) {
      btn.addEventListener('click', () => {
        this.activeZoneBrush = btn.dataset.zoneBrush as ZoneBrushMode;
        this.emitActiveTool();
        this.renderSubpanel();
      });
    }

    for (const btn of Array.from(this.subpanelEl.querySelectorAll<HTMLButtonElement>('[data-zone-type]'))) {
      btn.addEventListener('click', () => {
        this.activeZone = btn.dataset.zoneType as ZoneType;
        this.emitActiveTool();
        this.renderSubpanel();
      });
    }

    for (const btn of Array.from(this.subpanelEl.querySelectorAll<HTMLButtonElement>('[data-util-line]'))) {
      btn.addEventListener('click', () => {
        this.activeUtilitySel = btn.dataset.utilLine as 'power_line' | 'water_pipe';
        this.emitActiveTool();
        this.renderSubpanel();
      });
    }

    for (const btn of Array.from(this.subpanelEl.querySelectorAll<HTMLButtonElement>('[data-util-plop]'))) {
      btn.addEventListener('click', () => {
        this.activeUtilitySel = btn.dataset.utilPlop as PloppableKind;
        this.emitActiveTool();
        this.renderSubpanel();
      });
    }

    for (const btn of Array.from(this.subpanelEl.querySelectorAll<HTMLButtonElement>('[data-service-plop]'))) {
      btn.addEventListener('click', () => {
        this.activeServiceSel = btn.dataset.servicePlop as PloppableKind;
        this.emitActiveTool();
        this.renderSubpanel();
      });
    }

    for (const btn of Array.from(this.subpanelEl.querySelectorAll<HTMLButtonElement>('[data-park-plop]'))) {
      btn.addEventListener('click', () => {
        this.activeParkSel = btn.dataset.parkPlop as PloppableKind;
        this.emitActiveTool();
        this.renderSubpanel();
      });
    }

    this.subpanelEl.querySelector('[data-rotate-plop]')?.addEventListener('click', () => {
      this.callbacks.onRotatePloppable();
    });

    for (const btn of Array.from(this.subpanelEl.querySelectorAll<HTMLButtonElement>('[data-overlay-pick]'))) {
      btn.addEventListener('click', () => {
        const ov = btn.dataset.overlayPick as OverlayType;
        this.callbacks.onOverlayChange(ov);
      });
    }
  }

  private renderLegend(): void {
    const def = OVERLAY_ITEMS.find((o) => o.id === this.currentOverlay);
    if (!def || !def.legend) {
      this.legendBarEl.innerHTML = '';
      return;
    }
    const [low, stops, high] = def.legend;
    this.legendBarEl.innerHTML = `
      <div class="tl-glass tl-legend">
        <span class="tl-legend-name">${def.zh}视图</span>
        <span class="tl-legend-lbl">${low}</span>
        <span class="tl-legend-grad" style="background:linear-gradient(90deg, ${stops});"></span>
        <span class="tl-legend-lbl">${high}</span>
        <button type="button" class="tl-legend-close" data-clear-ov title="关闭视图">${ICONS.close}</button>
      </div>
    `;
    this.legendBarEl.querySelector('[data-clear-ov]')?.addEventListener('click', () => {
      this.callbacks.onOverlayChange('none');
    });
  }

  private renderInspectCard(): void {
    const d = this.inspectedBuilding;
    if (!d) {
      this.inspectCardEl.innerHTML = '';
      return;
    }

    const probs = decodeProblems(d.problems);
    const isRes = d.zone === 'res_low' || d.zone === 'res_high';
    const swatch = d.kind === 'growable' ? ZONE_SWATCH[d.zone] : '#2B7A9B';
    const levelText = d.kind === 'growable' ? `Lv.${d.level} / ${d.maxLevel}` : '公共设施';

    this.inspectCardEl.innerHTML = `
      <div class="tl-glass tl-inspect-card">
        <div class="tl-card-head">
          <div class="tl-card-title-wrap">
            <span class="tl-card-dot" style="background:${swatch};"></span>
            <div>
              <div class="tl-card-title">${d.labelZh} <span class="tl-card-lvl">${levelText}</span></div>
              <div class="tl-card-sub">${d.labelEn}${d.abandoned ? ' · 已废弃' : d.progress < 0.99 ? ` · 建造中 ${Math.round(d.progress * 100)}%` : ''}</div>
            </div>
          </div>
          <button type="button" class="tl-icon-btn" data-inspect-close title="关闭">${ICONS.close}</button>
        </div>

        <div class="tl-card-grid">
          ${
            isRes
              ? `<div class="tl-kv"><span>居民</span><strong>${d.residents} 人 (${d.households}/${d.capacityHouseholds} 户)</strong></div>`
              : `<div class="tl-kv"><span>岗位</span><strong>${d.workers} / ${d.capacityJobs}</strong></div>`
          }
          <div class="tl-kv"><span>幸福度</span><strong>${d.happiness}%</strong></div>
          <div class="tl-kv"><span>地价</span><strong>${d.landValue}</strong></div>
          <div class="tl-kv"><span>服务覆盖</span><strong>${d.serviceCoverage}%</strong></div>
          ${
            d.taxRate !== undefined
              ? `<div class="tl-kv"><span>适用税率</span><strong>${d.taxRate}%</strong></div>`
              : d.upkeepPerDay !== undefined
                ? `<div class="tl-kv"><span>每日维护</span><strong>¥${d.upkeepPerDay}/天</strong></div>`
                : ''
          }
          <div class="tl-kv"><span>噪音/污染</span><strong>${d.noise} / ${d.pollution}</strong></div>
        </div>

        <div class="tl-chip-row">
          <span class="tl-chip ${d.hasPower ? 'ok' : 'warn'}">电力 ${d.hasPower ? '✓' : '✗'}</span>
          <span class="tl-chip ${d.hasWater ? 'ok' : 'warn'}">供水 ${d.hasWater ? '✓' : '✗'}</span>
          <span class="tl-chip ${d.hasSewage ? 'ok' : 'warn'}">排污 ${d.hasSewage ? '✓' : '✗'}</span>
        </div>

        ${
          probs.length > 0
            ? `<div class="tl-prob-list">
                ${probs
                  .map(
                    (p) =>
                      `<span class="tl-prob-pill" style="--prob-col:${p.color};">${p.icon}<span>${p.labelZh}</span></span>`
                  )
                  .join('')}
              </div>`
            : ''
        }

        <div class="tl-card-foot">
          <button type="button" class="tl-danger-btn" data-inspect-bulldoze="${d.id}">${ICONS.bulldoze}<span>拆除建筑</span></button>
        </div>
      </div>
    `;

    this.inspectCardEl.querySelector('[data-inspect-close]')?.addEventListener('click', () => {
      this.callbacks.onCloseInspect();
    });
    this.inspectCardEl.querySelector('[data-inspect-bulldoze]')?.addEventListener('click', () => {
      this.callbacks.onBulldozeBuilding(d.id);
    });
  }

  private renderBudgetModal(): void {
    if (!this.budgetOpen || !this.latestSnapshot) {
      this.budgetModalEl.innerHTML = '';
      return;
    }

    const s = this.latestSnapshot.stats;
    const fin = s.finance;
    const nextMs = MILESTONES.find((m) => m.tier === s.milestoneTier + 1);
    const msProgress = nextMs
      ? Math.min(100, Math.round((s.population / nextMs.populationRequired) * 100))
      : 100;

    this.budgetModalEl.innerHTML = `
      <div class="tl-glass tl-panel-card">
        <div class="tl-card-head">
          <div>
            <div class="tl-card-title">财政、税收与里程碑</div>
            <div class="tl-card-sub">Budget & Taxation · 调整税率与公共服务预算</div>
          </div>
          <button type="button" class="tl-icon-btn" data-budget-close title="关闭">${ICONS.close}</button>
        </div>

        <div class="tl-fin-summary">
          <div class="tl-fin-box">
            <span>当前资金</span>
            <strong data-fin="money">¥${s.money.toLocaleString('zh-CN')}</strong>
          </div>
          <div class="tl-fin-box">
            <span>每周收入</span>
            <strong class="tl-pos" data-fin="inc">+¥${fin.weeklyIncome.toLocaleString('zh-CN')}</strong>
          </div>
          <div class="tl-fin-box">
            <span>每周支出</span>
            <strong class="tl-neg" data-fin="exp">-¥${fin.weeklyExpenses.toLocaleString('zh-CN')}</strong>
          </div>
          <div class="tl-fin-box">
            <span>每周净结余</span>
            <strong class="${s.weeklyNet >= 0 ? 'tl-pos' : 'tl-neg'}" data-fin="net">${s.weeklyNet >= 0 ? '+' : ''}¥${s.weeklyNet.toLocaleString('zh-CN')}</strong>
          </div>
        </div>

        <div class="tl-ms-bar-wrap">
          <div class="tl-ms-row">
            <span>当前阶段：<strong>${s.milestoneNameZh}</strong></span>
            <span>${nextMs ? `下一阶段 ${nextMs.nameZh} (${s.population}/${nextMs.populationRequired} 人口)` : '已达最高阶段'}</span>
          </div>
          <div class="tl-ms-track"><div class="tl-ms-fill" style="width:${msProgress}%;"></div></div>
        </div>

        <div class="tl-tabs">
          <button type="button" class="tl-tab ${this.budgetTab === 'taxes' ? 'active' : ''}" data-btab="taxes">分区税率 (1%–29%)</button>
          <button type="button" class="tl-tab ${this.budgetTab === 'budgets' ? 'active' : ''}" data-btab="budgets">服务预算 (50%–150%)</button>
        </div>

        <div class="tl-slider-list">
          ${
            this.budgetTab === 'taxes'
              ? ZONE_TYPES.map((z) => {
                  const spec = ZONE_SPECS[z];
                  const rate = s.taxRates[z];
                  const rev = fin.incomeByZone[z] ?? 0;
                  return `
                    <label class="tl-slider-row">
                      <span class="tl-sl-name"><span class="tl-swatch" style="background:${ZONE_SWATCH[z]};"></span>${spec.labelZh}</span>
                      <input type="range" min="1" max="29" step="1" value="${rate}" data-tax-zone="${z}" />
                      <span class="tl-sl-val" data-tax-val="${z}">${rate}%</span>
                      <span class="tl-sl-amt tl-pos" data-tax-rev="${z}">+¥${rev.toLocaleString('zh-CN')}/周</span>
                    </label>`;
                }).join('')
              : BUDGET_LABELS.map((b) => {
                  const pct = s.budgets[b.id];
                  const exp = fin.expenseByCategory[b.id] ?? 0;
                  return `
                    <label class="tl-slider-row">
                      <span class="tl-sl-name">${b.zh}</span>
                      <input type="range" min="50" max="150" step="5" value="${pct}" data-bud-cat="${b.id}" />
                      <span class="tl-sl-val" data-bud-val="${b.id}">${pct}%</span>
                      <span class="tl-sl-amt tl-neg" data-bud-exp="${b.id}">-¥${exp.toLocaleString('zh-CN')}/周</span>
                    </label>`;
                }).join('')
          }
        </div>
      </div>
    `;

    this.budgetModalEl.querySelector('[data-budget-close]')?.addEventListener('click', () => this.setBudgetOpen(false));

    for (const btn of Array.from(this.budgetModalEl.querySelectorAll<HTMLButtonElement>('[data-btab]'))) {
      btn.addEventListener('click', () => {
        this.budgetTab = btn.dataset.btab as 'taxes' | 'budgets';
        this.renderBudgetModal();
      });
    }

    for (const input of Array.from(this.budgetModalEl.querySelectorAll<HTMLInputElement>('[data-tax-zone]'))) {
      const z = input.dataset.taxZone as ActiveZoneType;
      input.addEventListener('input', () => {
        const val = Number(input.value);
        const lbl = this.budgetModalEl.querySelector(`[data-tax-val="${z}"]`);
        if (lbl) lbl.textContent = `${val}%`;
        this.callbacks.onSetTaxRate(z, val);
      });
    }

    for (const input of Array.from(this.budgetModalEl.querySelectorAll<HTMLInputElement>('[data-bud-cat]'))) {
      const cat = input.dataset.budCat as BudgetCategory;
      input.addEventListener('input', () => {
        const val = Number(input.value);
        const lbl = this.budgetModalEl.querySelector(`[data-bud-val="${cat}"]`);
        if (lbl) lbl.textContent = `${val}%`;
        this.callbacks.onSetBudget(cat, val);
      });
    }
  }

  private updateBudgetLiveNumbers(snap: SimSnapshot): void {
    const s = snap.stats;
    const fin = s.finance;
    const moneyEl = this.budgetModalEl.querySelector('[data-fin="money"]');
    const incEl = this.budgetModalEl.querySelector('[data-fin="inc"]');
    const expEl = this.budgetModalEl.querySelector('[data-fin="exp"]');
    const netEl = this.budgetModalEl.querySelector('[data-fin="net"]');
    if (moneyEl) moneyEl.textContent = `¥${s.money.toLocaleString('zh-CN')}`;
    if (incEl) incEl.textContent = `+¥${fin.weeklyIncome.toLocaleString('zh-CN')}`;
    if (expEl) expEl.textContent = `-¥${fin.weeklyExpenses.toLocaleString('zh-CN')}`;
    if (netEl) {
      netEl.textContent = `${s.weeklyNet >= 0 ? '+' : ''}¥${s.weeklyNet.toLocaleString('zh-CN')}`;
      netEl.className = s.weeklyNet >= 0 ? 'tl-pos' : 'tl-neg';
    }
    for (const z of ZONE_TYPES) {
      const revEl = this.budgetModalEl.querySelector(`[data-tax-rev="${z}"]`);
      if (revEl) revEl.textContent = `+¥${(fin.incomeByZone[z] ?? 0).toLocaleString('zh-CN')}/周`;
    }
    for (const b of BUDGET_LABELS) {
      const eEl = this.budgetModalEl.querySelector(`[data-bud-exp="${b.id}"]`);
      if (eEl) eEl.textContent = `-¥${(fin.expenseByCategory[b.id] ?? 0).toLocaleString('zh-CN')}/周`;
    }
  }

  private renderSaveModal(): void {
    if (!this.saveOpen) {
      this.saveModalEl.innerHTML = '';
      return;
    }

    const fmtDate = (ts: number) => {
      const d = new Date(ts);
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${d.getMonth() + 1}/${d.getDate()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    this.saveModalEl.innerHTML = `
      <div class="tl-glass tl-panel-card">
        <div class="tl-card-head">
          <div>
            <div class="tl-card-title">城市存档管理</div>
            <div class="tl-card-sub">Save & Load · 本地自动存档 + 3 个手动存档槽</div>
          </div>
          <button type="button" class="tl-icon-btn" data-save-close title="关闭">${ICONS.close}</button>
        </div>

        <div class="tl-slot-list">
          ${this.saveSlotsCache
            .map((s) => {
              const m = s.meta;
              return `
                <div class="tl-slot-row">
                  <div class="tl-slot-info">
                    <div class="tl-slot-name">${s.label} ${s.isAuto ? '<span class="tl-tag">自动</span>' : ''}</div>
                    <div class="tl-slot-meta">
                      ${
                        m
                          ? `第 ${m.simDay} 天 · ${m.population.toLocaleString('zh-CN')} 人 · ¥${m.money.toLocaleString('zh-CN')} · ${m.milestoneNameZh} · ${fmtDate(m.savedAt)}`
                          : '空存档槽'
                      }
                    </div>
                  </div>
                  <div class="tl-slot-actions">
                    ${!s.isAuto ? `<button type="button" class="tl-mini-btn active" data-slot-save="${s.slotId}">保存</button>` : ''}
                    <button type="button" class="tl-mini-btn" data-slot-load="${s.slotId}" ${m ? '' : 'disabled'}>读取</button>
                    ${m && !s.isAuto ? `<button type="button" class="tl-mini-btn tl-btn-del" data-slot-del="${s.slotId}">删除</button>` : ''}
                  </div>
                </div>`;
            })
            .join('')}
        </div>

        <div class="tl-save-footer">
          <button type="button" class="tl-mini-btn" data-new-city="empty">新建空白海湾城</button>
          <button type="button" class="tl-mini-btn" data-new-city="demo">载入示例小镇</button>
          <button type="button" class="tl-mini-btn" data-open-about="1">关于 · 致谢</button>
        </div>
      </div>
    `;

    this.saveModalEl.querySelector('[data-save-close]')?.addEventListener('click', () => this.setSaveOpen(false));
    this.saveModalEl.querySelector('[data-open-about]')?.addEventListener('click', () => this.setAboutOpen(true));

    for (const btn of Array.from(this.saveModalEl.querySelectorAll<HTMLButtonElement>('[data-slot-save]'))) {
      btn.addEventListener('click', () => this.callbacks.onSaveSlot(btn.dataset.slotSave!));
    }
    for (const btn of Array.from(this.saveModalEl.querySelectorAll<HTMLButtonElement>('[data-slot-load]'))) {
      btn.addEventListener('click', () => this.callbacks.onLoadSlot(btn.dataset.slotLoad!));
    }
    for (const btn of Array.from(this.saveModalEl.querySelectorAll<HTMLButtonElement>('[data-slot-del]'))) {
      btn.addEventListener('click', () => this.callbacks.onDeleteSlot(btn.dataset.slotDel!));
    }
    this.saveModalEl.querySelector('[data-new-city="empty"]')?.addEventListener('click', () => {
      this.setSaveOpen(false);
      this.callbacks.onNewCity(false);
    });
    this.saveModalEl.querySelector('[data-new-city="demo"]')?.addEventListener('click', () => {
      this.setSaveOpen(false);
      this.callbacks.onNewCity(true);
    });
  }

  private renderAboutModal(): void {
    if (!this.aboutOpen) {
      this.aboutModalEl.innerHTML = '';
      return;
    }

    const qOptions: Array<{ id: QualityLevel; zh: string }> = [
      { id: 'low', zh: '流畅 (低)' },
      { id: 'medium', zh: '均衡 (中)' },
      { id: 'high', zh: '精致 (高)' },
    ];

    this.aboutModalEl.innerHTML = `
      <div class="tl-glass tl-panel-card">
        <div class="tl-card-head">
          <div>
            <div class="tl-card-title">关于汐光市 · Tidelight</div>
            <div class="tl-card-sub">原创海滨微缩城市建造模拟 · Original Coastal City-Builder</div>
          </div>
          <button type="button" class="tl-icon-btn" data-about-close title="关闭">${ICONS.close}</button>
        </div>

        <div class="tl-about-sec">
          <div class="tl-about-lbl">画质预设 · Visual Quality</div>
          <div class="tl-seg-group">
            ${qOptions
              .map(
                (q) =>
                  `<button type="button" class="tl-mini-btn ${this.currentQuality === q.id ? 'active' : ''}" data-set-quality="${q.id}">${q.zh}</button>`
              )
              .join('')}
          </div>
        </div>

        <div class="tl-about-sec">
          <div class="tl-about-lbl">开源致谢与原创声明 · Credits</div>
          <ul class="tl-credit-list">
            <li><strong>Three.js</strong> (MIT) — WebGL2 3D 场景渲染与自定义着色器</li>
            <li><strong>Vite</strong> (MIT) &amp; <strong>TypeScript</strong> (Apache-2.0) — 构建与类型系统</li>
            <li><strong>Vitest</strong> (MIT) — 仿真核心自动化测试</li>
            <li><strong>100% 原创程序化资产</strong> — 所有建筑网格、立面/地形纹理、海面/移轴着色器及 SVG 图标均为本项目原创生成（详见 CREDITS.md）。</li>
          </ul>
        </div>
      </div>
    `;

    this.aboutModalEl.querySelector('[data-about-close]')?.addEventListener('click', () => this.setAboutOpen(false));
    for (const btn of Array.from(this.aboutModalEl.querySelectorAll<HTMLButtonElement>('[data-set-quality]'))) {
      btn.addEventListener('click', () => {
        const level = btn.dataset.setQuality as QualityLevel;
        this.currentQuality = level;
        this.callbacks.onQualityChange?.(level);
        this.renderAboutModal();
      });
    }
  }

  private injectStyles(): void {
    if (document.getElementById('tl-hud-styles')) return;
    const style = document.createElement('style');
    style.id = 'tl-hud-styles';
    style.textContent = `
      html, body, #app {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        overscroll-behavior: none;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        font-family: "PingFang SC", "Noto Sans SC", "Inter", system-ui, -apple-system, sans-serif;
        background: #D7ECFA;
      }
      .tl-ico {
        width: 19px;
        height: 19px;
        flex-shrink: 0;
      }
      .tl-problem-layer {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 6;
        overflow: hidden;
      }
      .tl-prob-badge {
        position: absolute;
        left: 0;
        top: 0;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1.5px solid rgba(255, 255, 255, 0.94);
        background: var(--prob-col, #E55B5B);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        cursor: pointer;
        pointer-events: auto;
        opacity: 0.9;
        box-shadow: 0 2px 8px rgba(20, 32, 48, 0.24);
      }
      .tl-prob-svg {
        width: 12px;
        height: 12px;
      }
      .tl-pause-btn .tl-ico {
        width: 15px;
        height: 15px;
      }
      .tl-hud {
        position: fixed;
        inset: 0;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: max(10px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(10px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
        box-sizing: border-box;
        z-index: 10;
        color: #1F3245;
      }
      .tl-topbar {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .tl-glass {
        pointer-events: auto;
        background: rgba(252, 250, 246, 0.86);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(40, 62, 82, 0.14);
        border-radius: 14px;
        box-shadow: 0 8px 24px rgba(24, 42, 62, 0.12);
        transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
      }
      .tl-night {
        color: #EDF3FA;
      }
      .tl-night .tl-glass {
        background: rgba(18, 28, 52, 0.84);
        border-color: rgba(164, 198, 238, 0.22);
        box-shadow: 0 8px 24px rgba(4, 10, 24, 0.42);
      }
      .tl-brand {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 6px 13px;
      }
      .tl-brand-btn {
        appearance: none;
        color: inherit;
        font: inherit;
        cursor: pointer;
      }
      .tl-brand-btn:hover {
        border-color: rgba(43, 122, 155, 0.36);
      }
      .tl-about-sec {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .tl-about-lbl {
        font-size: 11.5px;
        font-weight: 700;
        opacity: 0.78;
      }
      .tl-credit-list {
        margin: 0;
        padding-left: 18px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        line-height: 1.45;
      }
      .tl-logo {
        width: 24px;
        height: 24px;
        color: #2B7A9B;
        flex-shrink: 0;
      }
      .tl-night .tl-logo { color: #5CC4C8; }
      .tl-title {
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.15;
      }
      .tl-sub {
        font-size: 11px;
        font-weight: 500;
        opacity: 0.65;
        margin-left: 3px;
      }
      .tl-milestone {
        font-size: 11px;
        opacity: 0.72;
        margin-top: 1px;
      }
      .tl-stats {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 6px 14px;
        font-variant-numeric: tabular-nums;
      }
      .tl-stat {
        display: flex;
        align-items: baseline;
        gap: 5px;
      }
      .tl-stat-btn {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        font: inherit;
        padding: 2px 5px;
        margin: -2px -5px;
        border-radius: 8px;
        cursor: pointer;
      }
      .tl-stat-btn:hover { background: rgba(43, 122, 155, 0.1); }
      .tl-label { font-size: 11px; opacity: 0.66; font-weight: 600; }
      .tl-val { font-size: 14px; font-weight: 700; }
      .tl-delta { font-size: 11px; font-weight: 600; }
      .tl-pos { color: #2B935E; }
      .tl-neg { color: #D95050; }
      .tl-night .tl-pos { color: #67D49A; }
      .tl-night .tl-neg { color: #F57A7A; }
      .tl-sep { width: 1px; height: 18px; background: rgba(40, 62, 82, 0.16); }
      .tl-night .tl-sep { background: rgba(164, 198, 238, 0.2); }
      .tl-rci {
        display: flex;
        align-items: flex-end;
        gap: 5px;
        padding: 5px 10px;
      }
      .tl-rci-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        font-size: 10px;
        font-weight: 600;
      }
      .tl-rci-track {
        width: 8px;
        height: 24px;
        border-radius: 4px;
        background: rgba(40, 62, 82, 0.12);
        display: flex;
        align-items: flex-end;
        overflow: hidden;
      }
      .tl-night .tl-rci-track { background: rgba(255, 255, 255, 0.14); }
      .tl-rci-fill { width: 100%; height: 40%; border-radius: 4px; transition: height 0.2s ease; }
      .tl-r { background: #5EC96F; }
      .tl-c { background: #56ACEE; }
      .tl-i { background: #EEA93B; }
      .tl-o { background: #41BEB9; }
      .tl-speeds, .tl-top-actions, .tl-cams {
        display: flex;
        align-items: center;
        gap: 3px;
        padding: 4px;
      }
      .tl-btn, .tl-pill, .tl-mini-btn {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 10px;
        border-radius: 9px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        transition: background 0.15s ease, color 0.15s ease;
        white-space: nowrap;
      }
      .tl-act-btn .tl-ico { width: 16px; height: 16px; }
      .tl-mini-btn {
        background: rgba(40, 62, 82, 0.06);
        padding: 5px 10px;
      }
      .tl-night .tl-mini-btn { background: rgba(255, 255, 255, 0.08); }
      .tl-mini-btn .tl-ico { width: 15px; height: 15px; }
      .tl-btn:hover, .tl-pill:hover, .tl-mini-btn:hover {
        background: rgba(43, 122, 155, 0.14);
      }
      .tl-btn.active, .tl-pill.active, .tl-mini-btn.active {
        background: #2B7A9B;
        color: #FFFFFF;
      }
      .tl-night .tl-btn.active, .tl-night .tl-pill.active, .tl-night .tl-mini-btn.active {
        background: #4CB2C4;
        color: #0D1B2A;
      }
      .tl-mini-btn:disabled { opacity: 0.42; cursor: not-allowed; }
      .tl-btn-del { color: #C84646; }

      /* Bottom build dock + subpanel */
      .tl-bottom-stack {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        width: 100%;
        pointer-events: none;
      }
      .tl-bottombar {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: end;
        width: 100%;
        gap: 8px;
        pointer-events: none;
      }
      .tl-cams { justify-self: end; }
      .tl-dock {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 5px 6px;
        justify-self: center;
      }
      .tl-dock-btn {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        font: inherit;
        min-width: 56px;
        min-height: 46px;
        padding: 5px 9px;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        font-size: 11px;
        font-weight: 600;
        transition: background 0.15s ease, color 0.15s ease, transform 0.1s ease;
      }
      .tl-dock-btn:hover { background: rgba(43, 122, 155, 0.12); }
      .tl-dock-btn.active {
        background: #2B7A9B;
        color: #FFFFFF;
      }
      .tl-night .tl-dock-btn.active {
        background: #4CB2C4;
        color: #0D1B2A;
      }

      .tl-subpanel {
        max-width: min(860px, 100%);
        padding: 8px 12px 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;
      }
      .tl-sheet-header {
        display: none;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 16px;
      }
      .tl-sheet-handle {
        width: 36px;
        height: 4px;
        border-radius: 99px;
        background: rgba(40, 62, 82, 0.25);
      }
      .tl-sheet-close {
        position: absolute;
        right: 0;
        top: -4px;
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
      }
      .tl-sub-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
      }
      .tl-seg-group {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-wrap: wrap;
      }
      .tl-sub-hint {
        font-size: 11.5px;
        opacity: 0.75;
      }
      .tl-util-summary {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }
      .tl-sub-items {
        display: flex;
        align-items: stretch;
        gap: 6px;
        overflow-x: auto;
        padding-bottom: 2px;
        scrollbar-width: thin;
        touch-action: pan-x;
      }
      .tl-item-card {
        appearance: none;
        border: 1px solid rgba(40, 62, 82, 0.12);
        background: rgba(255, 255, 255, 0.62);
        color: inherit;
        font: inherit;
        min-width: 82px;
        min-height: 66px;
        padding: 7px 8px;
        border-radius: 11px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        flex-shrink: 0;
        transition: background 0.14s ease, border-color 0.14s ease, transform 0.1s ease;
      }
      .tl-night .tl-item-card {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(164, 198, 238, 0.18);
      }
      .tl-item-card:hover:not(:disabled) {
        border-color: #2B7A9B;
        background: rgba(43, 122, 155, 0.1);
      }
      .tl-item-card.active {
        background: #2B7A9B;
        border-color: #2B7A9B;
        color: #FFFFFF;
      }
      .tl-night .tl-item-card.active {
        background: #4CB2C4;
        border-color: #4CB2C4;
        color: #0D1B2A;
      }
      .tl-item-card.locked {
        opacity: 0.52;
        cursor: not-allowed;
      }
      .tl-item-ico .tl-ico { width: 21px; height: 21px; }
      .tl-item-name { font-size: 11.5px; font-weight: 700; line-height: 1.15; }
      .tl-item-meta {
        font-size: 10.5px;
        opacity: 0.78;
        display: inline-flex;
        align-items: center;
        gap: 3px;
        font-variant-numeric: tabular-nums;
      }
      .tl-item-meta .tl-ico { width: 11px; height: 11px; }
      .tl-swatch {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 3px;
        margin-right: 3px;
      }
      .tl-overlay-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
      .tl-ov-btn {
        background: rgba(40, 62, 82, 0.06);
        min-height: 34px;
      }
      .tl-night .tl-ov-btn { background: rgba(255, 255, 255, 0.08); }

      /* Floating legend */
      .tl-legend-wrap {
        position: fixed;
        top: max(68px, calc(env(safe-area-inset-top) + 58px));
        left: 12px;
        pointer-events: none;
      }
      .tl-legend {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        font-size: 11.5px;
      }
      .tl-legend-name { font-weight: 700; }
      .tl-legend-lbl { opacity: 0.72; font-size: 11px; }
      .tl-legend-grad { width: 88px; height: 8px; border-radius: 99px; }
      .tl-legend-close {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 2px;
        display: flex;
      }
      .tl-legend-close .tl-ico { width: 14px; height: 14px; }

      /* Live cursor readout */
      .tl-readout {
        position: fixed;
        pointer-events: none;
        padding: 7px 11px;
        border-radius: 11px;
        display: flex;
        flex-direction: column;
        gap: 2px;
        z-index: 25;
        font-variant-numeric: tabular-nums;
      }
      .tl-readout.tl-invalid {
        border-color: rgba(229, 91, 91, 0.6);
      }
      .tl-ro-row { display: flex; align-items: center; gap: 7px; white-space: nowrap; }
      .tl-ro-title { font-size: 12.5px; font-weight: 700; }
      .tl-ro-cost { font-size: 12px; font-weight: 700; color: #2B7A9B; }
      .tl-night .tl-ro-cost { color: #67D4E0; }
      .tl-readout.tl-invalid .tl-ro-cost, .tl-readout.tl-invalid .tl-ro-hint { color: #D95050; }
      .tl-ro-snap {
        font-size: 10.5px;
        font-weight: 700;
        padding: 1px 6px;
        border-radius: 6px;
        background: rgba(47, 183, 164, 0.18);
        color: #1A7F72;
      }
      .tl-night .tl-ro-snap { color: #7EEAD8; }
      .tl-ro-hint { font-size: 10.5px; opacity: 0.74; }

      /* Toasts */
      .tl-toasts {
        position: fixed;
        top: max(66px, calc(env(safe-area-inset-top) + 56px));
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        pointer-events: none;
        z-index: 30;
      }
      .tl-toast {
        padding: 9px 16px;
        border-radius: 12px;
        text-align: center;
        transition: opacity 0.25s ease, transform 0.25s ease;
      }
      .tl-toast-title { font-size: 13px; font-weight: 700; }
      .tl-toast-sub { font-size: 11.5px; opacity: 0.8; margin-top: 2px; }
      .tl-toast-warn { border-color: rgba(229, 91, 91, 0.55); }
      .tl-toast-milestone {
        border-color: rgba(232, 184, 75, 0.85);
        background: rgba(255, 249, 232, 0.94);
      }
      .tl-night .tl-toast-milestone {
        background: rgba(34, 46, 74, 0.94);
        border-color: rgba(242, 201, 76, 0.75);
      }
      .tl-toast-out { opacity: 0; transform: translateY(-6px); }

      /* Inspect card & Modals */
      .tl-inspect-wrap {
        position: fixed;
        right: max(12px, env(safe-area-inset-right));
        top: max(70px, calc(env(safe-area-inset-top) + 60px));
        pointer-events: none;
        z-index: 18;
      }
      .tl-inspect-card {
        width: 274px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .tl-modal-wrap {
        position: fixed;
        top: max(68px, calc(env(safe-area-inset-top) + 58px));
        right: max(12px, env(safe-area-inset-right));
        pointer-events: none;
        z-index: 22;
      }
      .tl-panel-card {
        width: min(440px, calc(100vw - 24px));
        max-height: calc(100vh - 180px);
        overflow-y: auto;
        touch-action: pan-y;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 11px;
        box-sizing: border-box;
      }
      .tl-card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }
      .tl-card-title-wrap { display: flex; align-items: center; gap: 9px; }
      .tl-card-dot { width: 12px; height: 12px; border-radius: 4px; flex-shrink: 0; }
      .tl-card-title { font-size: 14.5px; font-weight: 700; }
      .tl-card-lvl { font-size: 11.5px; font-weight: 600; opacity: 0.7; margin-left: 4px; }
      .tl-card-sub { font-size: 11px; opacity: 0.68; margin-top: 1px; }
      .tl-icon-btn {
        appearance: none;
        border: none;
        background: transparent;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        border-radius: 8px;
        display: flex;
      }
      .tl-icon-btn:hover { background: rgba(40, 62, 82, 0.1); }
      .tl-card-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 6px 10px;
        font-variant-numeric: tabular-nums;
      }
      .tl-kv {
        display: flex;
        flex-direction: column;
        background: rgba(40, 62, 82, 0.05);
        padding: 6px 8px;
        border-radius: 8px;
      }
      .tl-night .tl-kv { background: rgba(255, 255, 255, 0.06); }
      .tl-kv span { font-size: 10.5px; opacity: 0.68; }
      .tl-kv strong { font-size: 12.5px; margin-top: 1px; }
      .tl-chip-row { display: flex; flex-wrap: wrap; gap: 5px; }
      .tl-chip {
        font-size: 11px;
        font-weight: 600;
        padding: 3px 8px;
        border-radius: 99px;
        font-variant-numeric: tabular-nums;
      }
      .tl-chip.ok { background: rgba(47, 158, 102, 0.14); color: #22784C; }
      .tl-chip.warn { background: rgba(229, 91, 91, 0.16); color: #C23E3E; }
      .tl-night .tl-chip.ok { color: #7EE0AC; }
      .tl-night .tl-chip.warn { color: #FF8E8E; }
      .tl-prob-list { display: flex; flex-wrap: wrap; gap: 5px; }
      .tl-prob-pill {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 8px;
        border-radius: 99px;
        background: var(--prob-col, #E55B5B);
        color: #fff;
        font-size: 11px;
        font-weight: 600;
      }
      .tl-card-foot { display: flex; justify-content: flex-end; }
      .tl-danger-btn {
        appearance: none;
        border: 1px solid rgba(217, 80, 80, 0.35);
        background: rgba(217, 80, 80, 0.1);
        color: #C84040;
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        padding: 6px 11px;
        border-radius: 9px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
      }
      .tl-danger-btn:hover { background: rgba(217, 80, 80, 0.2); }
      .tl-danger-btn .tl-ico { width: 15px; height: 15px; }

      /* Budget panel internals */
      .tl-fin-summary {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 7px;
        font-variant-numeric: tabular-nums;
      }
      .tl-fin-box {
        background: rgba(40, 62, 82, 0.05);
        padding: 7px 10px;
        border-radius: 9px;
        display: flex;
        flex-direction: column;
      }
      .tl-night .tl-fin-box { background: rgba(255, 255, 255, 0.06); }
      .tl-fin-box span { font-size: 11px; opacity: 0.7; }
      .tl-fin-box strong { font-size: 14px; margin-top: 2px; }
      .tl-ms-bar-wrap { display: flex; flex-direction: column; gap: 4px; }
      .tl-ms-row { display: flex; justify-content: space-between; font-size: 11.5px; }
      .tl-ms-track {
        height: 7px;
        border-radius: 99px;
        background: rgba(40, 62, 82, 0.12);
        overflow: hidden;
      }
      .tl-ms-fill { height: 100%; background: linear-gradient(90deg, #2B7A9B, #5CC4C8); border-radius: 99px; }
      .tl-tabs { display: flex; gap: 6px; }
      .tl-tab {
        flex: 1;
        appearance: none;
        border: none;
        background: rgba(40, 62, 82, 0.07);
        color: inherit;
        font: inherit;
        font-size: 12px;
        font-weight: 600;
        padding: 7px 10px;
        border-radius: 9px;
        cursor: pointer;
      }
      .tl-tab.active { background: #2B7A9B; color: #fff; }
      .tl-slider-list { display: flex; flex-direction: column; gap: 7px; font-variant-numeric: tabular-nums; }
      .tl-slider-row {
        display: grid;
        grid-template-columns: 84px 1fr 40px 84px;
        align-items: center;
        gap: 8px;
        font-size: 12px;
      }
      .tl-slider-row input[type="range"] {
        width: 100%;
        accent-color: #2B7A9B;
        cursor: pointer;
        touch-action: pan-x;
      }
      .tl-sl-name { font-weight: 600; display: flex; align-items: center; }
      .tl-sl-val { font-weight: 700; text-align: right; }
      .tl-sl-amt { font-size: 11px; font-weight: 600; text-align: right; }

      /* Save slots */
      .tl-slot-list { display: flex; flex-direction: column; gap: 7px; }
      .tl-slot-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 9px 11px;
        border-radius: 10px;
        background: rgba(40, 62, 82, 0.05);
      }
      .tl-night .tl-slot-row { background: rgba(255, 255, 255, 0.06); }
      .tl-slot-name { font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 5px; }
      .tl-slot-meta { font-size: 11px; opacity: 0.72; margin-top: 2px; font-variant-numeric: tabular-nums; }
      .tl-slot-actions { display: flex; gap: 5px; flex-shrink: 0; }
      .tl-tag {
        font-size: 10px;
        padding: 1px 5px;
        border-radius: 5px;
        background: rgba(43, 122, 155, 0.16);
        color: #2B7A9B;
      }
      .tl-save-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 4px;
        border-top: 1px solid rgba(40, 62, 82, 0.1);
      }

      /* Mobile Portrait (e.g. 390x844) -> compact topbar + bottom sheet dock */
      @media (max-width: 720px) {
        .tl-hud {
          padding: max(8px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-right)) max(8px, env(safe-area-inset-bottom)) max(8px, env(safe-area-inset-left));
        }
        .tl-topbar { gap: 5px; }
        .tl-brand { padding: 5px 9px; gap: 6px; }
        .tl-logo { width: 20px; height: 20px; }
        .tl-title { font-size: 13px; }
        .tl-sub { display: none; }
        .tl-milestone { font-size: 10px; }
        .tl-stats { padding: 5px 9px; gap: 7px; }
        .tl-val { font-size: 12.5px; }
        .tl-delta { display: none; }
        .tl-hide-sm { display: none; }
        .tl-rci { padding: 4px 7px; gap: 4px; }
        .tl-rci-track { width: 7px; height: 20px; }
        .tl-speeds { padding: 3px; gap: 2px; }
        .tl-speeds .tl-btn { padding: 5px 7px; font-size: 11px; min-height: 32px; }
        .tl-top-actions { padding: 3px; }
        .tl-top-actions .tl-btn { padding: 5px 7px; font-size: 11px; min-height: 32px; }
        .tl-bottombar {
          grid-template-columns: 1fr;
          justify-items: stretch;
        }
        .tl-dock-spacer, .tl-cams { display: none; }
        .tl-dock {
          width: 100%;
          box-sizing: border-box;
          justify-content: space-between;
          padding: 4px;
          gap: 2px;
        }
        .tl-dock-btn {
          flex: 1;
          min-width: 0;
          min-height: 48px;
          padding: 5px 2px;
          font-size: 10.5px;
        }
        .tl-dock-btn .tl-ico { width: 18px; height: 18px; }
        .tl-subpanel {
          width: 100%;
          border-radius: 16px;
          padding: 6px 10px 10px;
          max-height: 34vh;
        }
        .tl-sheet-header { display: flex; }
        .tl-item-card { min-width: 76px; min-height: 62px; }
        .tl-inspect-wrap {
          left: 8px;
          right: 8px;
          top: auto;
          bottom: calc(env(safe-area-inset-bottom) + 74px);
        }
        .tl-inspect-card { width: 100%; box-sizing: border-box; }
        .tl-modal-wrap {
          left: 8px;
          right: 8px;
          top: max(96px, calc(env(safe-area-inset-top) + 86px));
        }
        .tl-panel-card { width: 100%; max-height: 60vh; }
        .tl-slider-row { grid-template-columns: 74px 1fr 36px 70px; gap: 5px; font-size: 11.5px; }
      }

      /* Mobile Landscape compact */
      @media (max-height: 460px) {
        .tl-hud { padding: 6px max(10px, env(safe-area-inset-right)) max(6px, env(safe-area-inset-bottom)) max(10px, env(safe-area-inset-left)); }
        .tl-brand { padding: 4px 8px; }
        .tl-stats { padding: 4px 9px; }
        .tl-dock-btn { min-height: 40px; min-width: 48px; padding: 3px 6px; }
        .tl-subpanel { padding: 5px 9px; gap: 5px; }
        .tl-item-card { min-height: 50px; min-width: 72px; padding: 4px 6px; }
      }
    `;
    document.head.appendChild(style);
  }
}
