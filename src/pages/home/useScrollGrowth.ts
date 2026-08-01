import { useEffect, useState, type RefObject } from "react";
import { getGrowthStage, getGrowthState } from "./growthTimeline";

const setGrowthVariables = (
  element: HTMLElement,
  progress: number,
  reducedMotion: boolean,
) => {
  const growthState = getGrowthState(progress, reducedMotion);

  element.style.setProperty("--page-progress", progress.toFixed(4));
  element.style.setProperty("--roots-progress", growthState.roots.toFixed(4));
  element.style.setProperty("--sprout-progress", growthState.sprout.toFixed(4));
  element.style.setProperty("--trunk-progress", growthState.trunk.toFixed(4));
  element.style.setProperty(
    "--branches-progress",
    growthState.branches.toFixed(4),
  );
  element.style.setProperty("--canopy-progress", growthState.canopy.toFixed(4));
  element.style.setProperty("--seeds-progress", growthState.seeds.toFixed(4));
  element.dataset.growthStage = getGrowthStage(progress);
};

/** Tracks the visitor's reduced-motion preference. */
export const usePrefersReducedMotion = (): boolean => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return reducedMotion;
};

/** Writes throttled scroll-driven growth values to a page container. */
export const useScrollGrowth = (
  containerRef: RefObject<HTMLElement>,
  reducedMotion: boolean,
): void => {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame = 0;

    const updateProgress = () => {
      animationFrame = 0;
      const bounds = container.getBoundingClientRect();
      const scrollableDistance = Math.max(
        1,
        bounds.height - window.innerHeight,
      );
      const progress = Math.min(
        1,
        Math.max(0, -bounds.top / scrollableDistance),
      );

      setGrowthVariables(container, progress, reducedMotion);
    };

    const requestUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [containerRef, reducedMotion]);
};
