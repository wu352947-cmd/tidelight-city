import type {
  OverlayType,
  PloppableKind,
  RoadType,
  ZoneType,
} from '../sim/types.ts';
import type { UtilityLineKind } from '../sim/utilities.ts';

export type ToolCategory =
  | 'none'
  | 'road'
  | 'zone'
  | 'utility'
  | 'service'
  | 'park'
  | 'bulldoze'
  | 'info';

export type RoadDrawMode = 'straight' | 'curve' | 'freeform' | 'upgrade';
export type ZoneBrushMode = 'small' | 'medium' | 'large' | 'segment';

export type ActiveTool =
  | { kind: 'none' }
  | { kind: 'road'; roadType: RoadType; mode: RoadDrawMode; snap: boolean }
  | { kind: 'zone'; zone: ZoneType; brush: ZoneBrushMode }
  | { kind: 'ploppable'; ploppable: PloppableKind; yaw: number }
  | { kind: 'utility_line'; lineKind: UtilityLineKind }
  | { kind: 'bulldoze' }
  | { kind: 'info'; overlay: OverlayType };

export interface ToolReadout {
  visible: boolean;
  screenX: number;
  screenY: number;
  title: string;
  detail?: string;
  costText?: string;
  snapBadge?: string;
  valid: boolean;
  hint?: string;
}

export const ZONE_BRUSH_RADIUS: Record<ZoneBrushMode, number> = {
  small: 16,
  medium: 32,
  large: 56,
  segment: 24,
};

export interface SaveSlotMeta {
  slotId: string;
  label: string;
  isAuto: boolean;
  savedAt: number;
  population: number;
  money: number;
  simDay: number;
  milestoneNameZh: string;
}

export interface SaveSlotRecord extends SaveSlotMeta {
  formatVersion: 1;
  stateJson: string;
}
