import { ProblemFlags } from '../sim/types.ts';

function svg(paths: string, viewBox = '0 0 24 24', cls = 'tl-ico'): string {
  return `<svg class="${cls}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

// 100% original inline SVG iconography (ART_BIBLE Section 6)
export const ICONS: Record<string, string> = {
  // Primary toolbar categories
  road: svg('<path d="M7 20L10 4M17 20L14 4M12 7v2M12 12v2M12 17v2"/>'),
  zone: svg('<rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/>'),
  utility: svg('<path d="M13 3L6 13h6l-1 8 7-10h-6l1-8z"/>'),
  service: svg('<path d="M4 20h16M6 20V9l6-4 6 4v11M10 14h4M12 12v4"/>'),
  park: svg('<path d="M12 20v-6"/><circle cx="12" cy="9" r="4.5"/><path d="M6.5 14.5a3 3 0 1 1 2.2-5.1M17.5 14.5a3 3 0 1 0-2.2-5.1"/>'),
  bulldoze: svg('<path d="M3 16h11l3-6h3M5 16v3M14 16v3M7 10h6v6H7zM18 10l2 6M4 19h13"/>'),
  info: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>'),

  // Topbar actions
  budget: svg('<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="M12 9v6M9.5 11.2c0-1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.7-1.1 1.6-2.5 1.8-2.5.7-2.5 1.8 1.1 1.7 2.5 1.7 2.5-.7 2.5-1.7"/>'),
  save: svg('<path d="M5 4h11l3 3v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M8 4v5h7V4M8 20v-6h8v6"/>'),
  rotate: svg('<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>'),
  pause: svg('<path d="M9 6.5v11M15 6.5v11"/>'),
  lock: svg('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  close: svg('<path d="M6 6l12 12M18 6L6 18"/>'),

  // Road types
  small_2lane: svg('<path d="M8 20L10 4M16 20L14 4M12 8v3M12 14v3"/>'),
  tree_2lane: svg('<path d="M9 20L10.5 4M15 20L13.5 4"/><circle cx="5.5" cy="11" r="2.2"/><path d="M5.5 13.2V17"/><circle cx="18.5" cy="11" r="2.2"/><path d="M18.5 13.2V17"/>'),
  oneway_2lane: svg('<path d="M8 20V4M16 20V4M12 17V7M9.5 10L12 7l2.5 3"/>'),
  avenue_4lane: svg('<path d="M5 20L7 4M19 20L17 4M12 20V4M8.8 10v2M8.5 15v2M15.2 10v2M15.5 15v2"/>'),
  highway: svg('<path d="M4 20L7.5 4M20 20L16.5 4M11 20L11.5 4M13 20L12.5 4"/>'),

  // Road draw modes
  straight: svg('<path d="M5 19L19 5"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/>'),
  curve: svg('<path d="M4 19Q5 5 20 5"/><circle cx="4" cy="19" r="1.8"/><circle cx="20" cy="5" r="1.8"/>'),
  freeform: svg('<path d="M4 17c3-7 5 3 8-4s5 2 8-6"/>'),
  upgrade: svg('<path d="M12 19V5M7 10l5-5 5 5M5 19h14"/>'),
  snap: svg('<path d="M7 4v7a5 5 0 0 0 10 0V4M5 8h4M15 8h4"/>'),

  // Zone types
  res_low: svg('<path d="M4 12l8-6 8 6"/><path d="M6.5 10.5V19h11v-8.5M10.5 19v-4h3v4"/>'),
  res_high: svg('<rect x="6" y="4" width="12" height="16" rx="1.5"/><path d="M9.5 8h1.5M13 8h1.5M9.5 11.5h1.5M13 11.5h1.5M9.5 15h1.5M13 15h1.5"/>'),
  com_low: svg('<path d="M4 10l1.5-5h13L20 10M5 10v9h14v-9M4 10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/>'),
  com_high: svg('<path d="M5 20V8l4-3 4 3v12M13 20v-9l3-2 3 2v9M8 11h2M8 14.5h2M15.5 13h1.5"/>'),
  ind: svg('<path d="M3 20V11l5 3v-3l5 3V8h4v12H3zM17 8V4h2.5v4"/>'),
  office: svg('<path d="M7 20V6l5-2.5L17 6v14M10 9h4M10 12.5h4M10 16h4"/>'),
  dezone: svg('<rect x="4" y="4" width="16" height="16" rx="2" stroke-dasharray="3 2"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7"/>'),

  // Utilities
  power_line: svg('<path d="M12 3v18M8 7h8M6 11h12M9 21l3-10 3 10"/>'),
  wind_turbine: svg('<path d="M12 21v-9M12 12l-5-4M12 12l6-2M12 12l-1 6"/><circle cx="12" cy="12" r="1.5"/>'),
  coal_plant: svg('<path d="M4 20v-8h10v8M14 20V9h5v11M6 12V6h3v6M10.5 12V7h2.5v5"/>'),
  solar_plant: svg('<path d="M3 16l3-8h12l3 8H3zM8 12h8M12 8v8M9 19h6"/>'),
  water_pipe: svg('<path d="M3 12h18M7 9v6M17 9v6"/><circle cx="12" cy="12" r="2.2"/>'),
  water_pump: svg('<path d="M12 4s5.5 6 5.5 10a5.5 5.5 0 1 1-11 0C6.5 10 12 4 12 4z"/>'),
  water_tower: svg('<rect x="6.5" y="4.5" width="11" height="6.5" rx="2"/><path d="M8.5 11L7 20M15.5 11l1.5 9M7.5 16h9"/>'),
  sewage_outlet: svg('<path d="M4 8h9a3 3 0 0 1 3 3v3H4V8zM16 14c1.5 1 2.5 2 4 2M15 18c1.8 1 3.2 1 5 0"/>'),

  // Services
  clinic: svg('<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M12 9.5v7M8.5 13h7"/>'),
  hospital: svg('<rect x="3.5" y="4.5" width="17" height="15.5" rx="2"/><path d="M12 8v8M8 12h8"/>'),
  elementary_school: svg('<path d="M3 10l9-5 9 5-9 5-9-5z"/><path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>'),
  high_school: svg('<path d="M4 20V9l8-4.5L20 9v11M9 20v-5h6v5M12 9.5v2"/>'),
  police_station: svg('<path d="M12 3.5l7 3v5.5c0 4.5-3 7.3-7 8.5-4-1.2-7-4-7-8.5V6.5l7-3z"/>'),
  fire_station: svg('<path d="M12 4c2.8 2.8 5 5.6 5 9a5 5 0 1 1-10 0c0-2 1-4 2.3-5.6.3 1.7 1.3 2.6 2.2 2.6.2-2.2 0-4.2.5-6z"/>'),
  landfill: svg('<path d="M4 18l4-8 4 3 4-6 4 11H4z"/>'),

  // Parks
  park_small: svg('<path d="M12 20v-5"/><circle cx="12" cy="10" r="5"/><path d="M6 20h12"/>'),
  park_plaza: svg('<path d="M4 19h16M8 19c0-3 2-5 4-5s4 2 4 5M12 14V7M9 9.5c1-1.5 2-2.5 3-2.5s2 1 3 2.5"/>'),
};

export interface ProblemInfo {
  flag: number;
  labelZh: string;
  color: string;
  icon: string;
}

export const PROBLEM_DEFS: ProblemInfo[] = [
  {
    flag: ProblemFlags.ABANDONED,
    labelZh: '已废弃',
    color: '#6E7580',
    icon: svg('<path d="M6 6l12 12M18 6L6 18"/>', '0 0 24 24', 'tl-prob-svg'),
  },
  {
    flag: ProblemFlags.NO_POWER,
    labelZh: '电力不足',
    color: '#E59A28',
    icon: svg('<path d="M13 3L6 13h6l-1 8 7-10h-6l1-8z"/>', '0 0 24 24', 'tl-prob-svg'),
  },
  {
    flag: ProblemFlags.NO_WATER,
    labelZh: '供水不足',
    color: '#3B9ED8',
    icon: svg('<path d="M12 4s5 5.5 5 9.5a5 5 0 1 1-10 0C7 9.5 12 4 12 4z"/>', '0 0 24 24', 'tl-prob-svg'),
  },
  {
    flag: ProblemFlags.NO_SEWAGE,
    labelZh: '排污不足',
    color: '#8E6B47',
    icon: svg('<path d="M4 10h10a3 3 0 0 1 3 3v3H4v-6zM17 16l3 2"/>', '0 0 24 24', 'tl-prob-svg'),
  },
  {
    flag: ProblemFlags.POLLUTED_WATER,
    labelZh: '水源污染',
    color: '#9C5E7B',
    icon: svg('<path d="M12 4s5 5.5 5 9.5a5 5 0 1 1-10 0C7 9.5 12 4 12 4zM9 14l6-4"/>', '0 0 24 24', 'tl-prob-svg'),
  },
  {
    flag: ProblemFlags.HIGH_TAX,
    labelZh: '税率过高',
    color: '#D95050',
    icon: svg('<path d="M12 4v16M8 8h6a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h7"/>', '0 0 24 24', 'tl-prob-svg'),
  },
  {
    flag: ProblemFlags.HIGH_POLLUTION,
    labelZh: '空气/地面污染',
    color: '#8A567C',
    icon: svg('<path d="M6 17h12a3.5 3.5 0 0 0 .5-7A5 5 0 0 0 9 8.5 3.5 3.5 0 0 0 6 17z"/>', '0 0 24 24', 'tl-prob-svg'),
  },
  {
    flag: ProblemFlags.GARBAGE,
    labelZh: '垃圾堆积',
    color: '#8E7F65',
    icon: svg('<path d="M5 7h14M9 7V5h6v2M7 7l1 12h8l1-12"/>', '0 0 24 24', 'tl-prob-svg'),
  },
  {
    flag: ProblemFlags.CRIME,
    labelZh: '治安隐患',
    color: '#3D6EB8',
    icon: svg('<path d="M12 4l6 2.5V12c0 4-2.5 6.5-6 8-3.5-1.5-6-4-6-8V6.5L12 4z"/>', '0 0 24 24', 'tl-prob-svg'),
  },
];

export function decodeProblems(flags: number): ProblemInfo[] {
  if (flags === 0) return [];
  return PROBLEM_DEFS.filter((p) => (flags & p.flag) !== 0);
}
