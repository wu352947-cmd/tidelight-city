export type QualityLevel = 'low' | 'medium' | 'high';

export interface QualityProfile {
  level: QualityLevel;
  pixelRatioCap: number;
  shadowMapSize: number;
  postProcessMode: 'lite' | 'full';
  bloomEnabled: boolean;
  treeDensityMult: number;
  enableSmoke: boolean;
  waterWaveDetail: number;
}

const PROFILES: Record<QualityLevel, QualityProfile> = {
  low: {
    level: 'low',
    pixelRatioCap: 1.0,
    shadowMapSize: 1024,
    postProcessMode: 'lite',
    bloomEnabled: true,
    treeDensityMult: 1.0,
    enableSmoke: false,
    waterWaveDetail: 0.65,
  },
  medium: {
    level: 'medium',
    pixelRatioCap: 1.5,
    shadowMapSize: 1536,
    postProcessMode: 'full',
    bloomEnabled: true,
    treeDensityMult: 1.65,
    enableSmoke: true,
    waterWaveDetail: 0.85,
  },
  high: {
    level: 'high',
    pixelRatioCap: 2.0,
    shadowMapSize: 2048,
    postProcessMode: 'full',
    bloomEnabled: true,
    treeDensityMult: 2.35,
    enableSmoke: true,
    waterWaveDetail: 1.0,
  },
};

export function detectQualityProfile(qs: URLSearchParams): QualityProfile {
  const explicit = (qs.get('quality') ?? '').toLowerCase();
  if (explicit === 'low' || explicit === 'medium' || explicit === 'high') {
    return PROFILES[explicit];
  }

  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 720;
  const isCoarsePointer =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches;
  const mobileUA =
    typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isSmallScreen || isCoarsePointer || mobileUA) {
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
    return cores <= 2 ? PROFILES.low : PROFILES.medium;
  }

  return PROFILES.high;
}

export function getQualityProfile(level: QualityLevel): QualityProfile {
  return PROFILES[level];
}
