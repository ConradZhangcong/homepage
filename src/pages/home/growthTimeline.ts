export interface GrowthState {
  roots: number;
  sprout: number;
  trunk: number;
  branches: number;
  canopy: number;
  seeds: number;
}

const COMPLETE_GROWTH_STATE: GrowthState = {
  roots: 1,
  sprout: 1,
  trunk: 1,
  branches: 1,
  canopy: 1,
  seeds: 1,
};

/** Keeps a numeric value inside the inclusive 0–1 range. */
export const clampProgress = (value: number): number =>
  Math.min(1, Math.max(0, value));

/** Maps a global scroll value to a normalized progress value for one stage. */
export const getStageProgress = (
  progress: number,
  start: number,
  end: number,
): number => {
  if (end <= start) return progress >= end ? 1 : 0;

  return clampProgress((progress - start) / (end - start));
};

/** Converts global page progress into the independent phases of tree growth. */
export const getGrowthState = (
  progress: number,
  reducedMotion = false,
): GrowthState => {
  if (reducedMotion) return COMPLETE_GROWTH_STATE;

  const safeProgress = clampProgress(progress);

  return {
    roots: getStageProgress(safeProgress, 0.04, 0.24),
    sprout: getStageProgress(safeProgress, 0.18, 0.35),
    trunk: getStageProgress(safeProgress, 0.27, 0.58),
    branches: getStageProgress(safeProgress, 0.43, 0.74),
    canopy: getStageProgress(safeProgress, 0.61, 0.9),
    seeds: getStageProgress(safeProgress, 0.86, 1),
  };
};

/** Returns the current semantic growth stage for diagnostics and styling. */
export const getGrowthStage = (progress: number): string => {
  const safeProgress = clampProgress(progress);

  if (safeProgress < 0.17) return "seed";
  if (safeProgress < 0.34) return "roots";
  if (safeProgress < 0.5) return "sprout";
  if (safeProgress < 0.68) return "branches";
  if (safeProgress < 0.86) return "canopy";
  return "seeds";
};
