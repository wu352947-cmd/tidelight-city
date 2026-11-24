import type { SaveSlotMeta, SaveSlotRecord } from './toolTypes.ts';

const STORAGE_PREFIX = 'tidelight_save_v1_';

export const SAVE_SLOTS: Array<{ slotId: string; label: string; isAuto: boolean }> = [
  { slotId: 'autosave', label: '自动存档', isAuto: true },
  { slotId: 'slot1', label: '存档槽 1', isAuto: false },
  { slotId: 'slot2', label: '存档槽 2', isAuto: false },
  { slotId: 'slot3', label: '存档槽 3', isAuto: false },
];

export function listSaveSlots(): Array<{ slotId: string; label: string; isAuto: boolean; meta: SaveSlotMeta | null }> {
  return SAVE_SLOTS.map((s) => {
    const rec = readSaveSlot(s.slotId);
    return {
      ...s,
      meta: rec
        ? {
            slotId: rec.slotId,
            label: s.label,
            isAuto: s.isAuto,
            savedAt: rec.savedAt,
            population: rec.population,
            money: rec.money,
            simDay: rec.simDay,
            milestoneNameZh: rec.milestoneNameZh,
          }
        : null,
    };
  });
}

export function readSaveSlot(slotId: string): SaveSlotRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + slotId);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveSlotRecord;
    if (!parsed || parsed.formatVersion !== 1 || typeof parsed.stateJson !== 'string') {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeSaveSlot(
  slotId: string,
  meta: {
    population: number;
    money: number;
    simDay: number;
    milestoneNameZh: string;
  },
  stateJson: string
): { ok: boolean; reason?: string } {
  const def = SAVE_SLOTS.find((s) => s.slotId === slotId);
  const record: SaveSlotRecord = {
    formatVersion: 1,
    slotId,
    label: def?.label ?? slotId,
    isAuto: def?.isAuto ?? false,
    savedAt: Date.now(),
    population: meta.population,
    money: meta.money,
    simDay: meta.simDay,
    milestoneNameZh: meta.milestoneNameZh,
    stateJson,
  };
  try {
    window.localStorage.setItem(STORAGE_PREFIX + slotId, JSON.stringify(record));
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : '浏览器存储空间不足',
    };
  }
}

export function deleteSaveSlot(slotId: string): boolean {
  try {
    window.localStorage.removeItem(STORAGE_PREFIX + slotId);
    return true;
  } catch {
    return false;
  }
}
