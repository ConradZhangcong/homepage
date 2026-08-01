import { useEffect, useRef } from "react";
import { getGrowthState } from "../growthTimeline";
import {
  createParticleTreeGeometry,
  getSegmentVisibility,
  getTreeHorizontalRatio,
  type TreeParticle,
  type TreePoint,
  type TreeRenderState,
  type TreeSegment,
} from "../particleTree";
import {
  GROWTH_UPDATE_EVENT,
  type GrowthUpdateDetail,
} from "../useScrollGrowth";
import styles from "./TreeScene.module.scss";

const treeGeometry = createParticleTreeGeometry();

interface CanvasPoint {
  x: number;
  y: number;
}

type SegmentKind = "root" | "trunk" | "branch";

const toCanvasPoint = (
  point: TreePoint,
  origin: CanvasPoint,
  scale: number,
): CanvasPoint => ({
  x: origin.x + point.x * scale,
  y: origin.y + point.y * scale,
});

const drawSegment = (
  context: CanvasRenderingContext2D,
  segment: TreeSegment,
  visibility: number,
  origin: CanvasPoint,
  scale: number,
  kind: SegmentKind,
) => {
  if (visibility <= 0) return;
  const start = toCanvasPoint(segment.start, origin, scale);
  const end = toCanvasPoint(segment.end, origin, scale);
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const length = Math.hypot(deltaX, deltaY) || 1;
  const control = {
    x: (start.x + end.x) / 2 - (deltaY / length) * segment.bend * scale,
    y: (start.y + end.y) / 2 + (deltaX / length) * segment.bend * scale,
  };
  const partialControl = {
    x: start.x + (control.x - start.x) * visibility,
    y: start.y + (control.y - start.y) * visibility,
  };
  const inverseVisibility = 1 - visibility;
  const visibleEnd = {
    x:
      inverseVisibility * inverseVisibility * start.x +
      2 * inverseVisibility * visibility * control.x +
      visibility * visibility * end.x,
    y:
      inverseVisibility * inverseVisibility * start.y +
      2 * inverseVisibility * visibility * control.y +
      visibility * visibility * end.y,
  };
  const widthMultiplier =
    kind === "trunk" ? 1.08 : kind === "root" ? 0.72 : 0.5;
  const lineWidth = Math.max(0.42, segment.depth * widthMultiplier);
  const gradient = context.createLinearGradient(
    start.x,
    start.y,
    visibleEnd.x,
    visibleEnd.y,
  );
  if (kind === "root") {
    gradient.addColorStop(0, "rgb(113 71 40 / 88%)");
    gradient.addColorStop(0.55, "rgb(164 108 61 / 72%)");
    gradient.addColorStop(1, "rgb(205 151 91 / 38%)");
  } else if (kind === "trunk") {
    gradient.addColorStop(0, "rgb(92 59 35 / 96%)");
    gradient.addColorStop(0.58, "rgb(153 105 61 / 92%)");
    gradient.addColorStop(1, "rgb(177 135 77 / 82%)");
  } else {
    gradient.addColorStop(0, "rgb(132 111 64 / 82%)");
    gradient.addColorStop(1, "rgb(156 190 105 / 52%)");
  }

  context.save();
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.quadraticCurveTo(
    partialControl.x,
    partialControl.y,
    visibleEnd.x,
    visibleEnd.y,
  );
  context.lineWidth = lineWidth;
  context.strokeStyle = gradient;
  context.shadowBlur = kind === "branch" ? 3 : 1.5;
  context.shadowColor =
    kind === "root" ? "rgb(197 138 85 / 24%)" : "rgb(184 217 134 / 18%)";
  context.stroke();

  if (lineWidth > 2.2) {
    context.lineWidth = Math.max(0.45, lineWidth * 0.18);
    context.strokeStyle =
      kind === "root" ? "rgb(225 175 112 / 28%)" : "rgb(224 186 119 / 24%)";
    context.shadowBlur = 0;
    context.stroke();
  }
  context.restore();
};

const drawParticle = (
  context: CanvasRenderingContext2D,
  particle: TreeParticle,
  origin: CanvasPoint,
  scale: number,
  time: number,
  reducedMotion: boolean,
) => {
  const point = toCanvasPoint(particle, origin, scale);
  const pulse = reducedMotion
    ? 1
    : 0.78 + Math.sin(time * 0.0012 + particle.phase) * 0.22;

  context.save();
  context.translate(point.x, point.y);
  context.rotate(particle.phase);
  context.beginPath();
  if (particle.hue === "leaf") {
    context.ellipse(
      0,
      0,
      particle.radius * 1.75 * pulse,
      Math.max(0.4, particle.radius * 0.58),
      0,
      0,
      Math.PI * 2,
    );
    context.fillStyle = `rgb(151 188 101 / ${particle.alpha * pulse})`;
    context.shadowColor = "rgb(184 217 134 / 38%)";
  } else {
    context.arc(0, 0, particle.radius * 0.72 * pulse, 0, Math.PI * 2);
    context.fillStyle = `rgb(213 157 94 / ${particle.alpha * pulse})`;
    context.shadowColor = "rgb(213 157 94 / 42%)";
  }
  context.shadowBlur = particle.radius * 2.4;
  context.fill();
  context.restore();
};

const drawNetworkBackdrop = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  centerX: number,
) => {
  context.save();
  context.globalAlpha = 0.04 + progress * 0.09;
  context.strokeStyle = "#b8d986";
  context.lineWidth = 0.5;

  for (let radius = 90; radius < 520; radius += 72) {
    context.beginPath();
    context.arc(centerX, height * 0.42, radius, 0, Math.PI * 2);
    context.stroke();
  }

  for (let x = width * 0.44; x < width; x += 64) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  context.restore();
};

const drawSeed = (
  context: CanvasRenderingContext2D,
  origin: CanvasPoint,
  sproutProgress: number,
) => {
  const opacity = 1 - sproutProgress * 0.82;
  const glow = context.createRadialGradient(
    origin.x,
    origin.y,
    1,
    origin.x,
    origin.y,
    28,
  );
  glow.addColorStop(0, `rgb(216 160 96 / ${opacity})`);
  glow.addColorStop(0.25, `rgb(197 138 85 / ${opacity * 0.55})`);
  glow.addColorStop(1, "rgb(197 138 85 / 0%)");
  context.fillStyle = glow;
  context.fillRect(origin.x - 30, origin.y - 30, 60, 60);
  context.beginPath();
  context.ellipse(origin.x, origin.y - 2, 8, 13, 0.7, 0, Math.PI * 2);
  context.fillStyle = `rgb(205 145 87 / ${opacity})`;
  context.fill();
};

const drawTreeFrame = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: TreeRenderState,
  time: number,
) => {
  context.clearRect(0, 0, width, height);
  const compactLayout = width <= 760;
  const horizontalRatio = getTreeHorizontalRatio(
    state.growth.canopy,
    state.growth.seeds,
    compactLayout,
  );
  const origin = {
    x: width * horizontalRatio,
    y: height * (compactLayout ? 0.72 : 0.68),
  };
  const scale =
    Math.min(width, height) *
    (compactLayout ? 1.05 : 1.25 + state.growth.seeds * 0.17);
  drawNetworkBackdrop(context, width, height, state.growth.canopy, origin.x);

  context.lineCap = "round";
  context.lineJoin = "round";
  treeGeometry.roots.forEach((segment) => {
    drawSegment(
      context,
      segment,
      getSegmentVisibility(state.growth.roots, segment),
      origin,
      scale,
      "root",
    );
  });
  treeGeometry.branches.forEach((segment) => {
    const progress =
      segment.depth >= 6 ? state.growth.trunk : state.growth.branches;
    drawSegment(
      context,
      segment,
      getSegmentVisibility(progress, segment),
      origin,
      scale,
      segment.depth >= 6 ? "trunk" : "branch",
    );
  });

  const visibleLeaves = Math.floor(
    treeGeometry.leaves.length * state.growth.canopy,
  );
  treeGeometry.leaves
    .slice(0, visibleLeaves)
    .forEach((particle) =>
      drawParticle(context, particle, origin, scale, time, state.reducedMotion),
    );
  const visibleRootNodes = Math.floor(
    treeGeometry.rootNodes.length * state.growth.roots,
  );
  treeGeometry.rootNodes
    .slice(0, visibleRootNodes)
    .forEach((particle) =>
      drawParticle(context, particle, origin, scale, time, state.reducedMotion),
    );
  drawSeed(context, origin, state.growth.sprout);
};

/** Renders the scroll-driven technology-organic particle tree. */
const TreeScene = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const page = scene?.parentElement;
    if (!scene || !canvas || !page) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let width = 1;
    let height = 1;
    let renderState: TreeRenderState = {
      progress: 0,
      growth: getGrowthState(0),
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
    };

    const render = (time = 0) => {
      drawTreeFrame(context, width, height, renderState, time);
      if (!renderState.reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const resize = () => {
      const bounds = scene.getBoundingClientRect();
      const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
      const pageStyles = window.getComputedStyle(page);
      const pageProgress = Number.parseFloat(
        pageStyles.getPropertyValue("--page-progress"),
      );
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      renderState = {
        progress: Number.isFinite(pageProgress) ? pageProgress : 0,
        growth: getGrowthState(
          Number.isFinite(pageProgress) ? pageProgress : 0,
        ),
        reducedMotion: page.dataset.motion === "reduced",
      };
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      render();
    };

    const updateGrowth = (event: Event) => {
      const detail = (event as CustomEvent<GrowthUpdateDetail>).detail;
      renderState = {
        progress: detail.progress,
        growth: detail.growth,
        reducedMotion: detail.reducedMotion,
      };
      if (renderState.reducedMotion) render();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(scene);
    page.addEventListener(GROWTH_UPDATE_EVENT, updateGrowth);
    resize();

    return () => {
      resizeObserver.disconnect();
      page.removeEventListener(GROWTH_UPDATE_EVENT, updateGrowth);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div ref={sceneRef} className={styles.scene} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles["progress-rail"]}>
        <span />
      </div>
      <div className={styles.atmosphere} />
      <div className={styles.ground} />
    </div>
  );
};

export default TreeScene;
