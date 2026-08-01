import { clampProgress, type GrowthState } from "./growthTimeline";

export interface TreePoint {
  x: number;
  y: number;
}

export interface TreeSegment {
  start: TreePoint;
  end: TreePoint;
  bend: number;
  depth: number;
  revealStart: number;
  revealEnd: number;
}

export interface TreeParticle extends TreePoint {
  alpha: number;
  radius: number;
  phase: number;
  hue: "leaf" | "gold";
}

export interface ParticleTreeGeometry {
  branches: TreeSegment[];
  roots: TreeSegment[];
  leaves: TreeParticle[];
  rootNodes: TreeParticle[];
}

interface SeededRandom {
  next: () => number;
}

const createSeededRandom = (seed: number): SeededRandom => {
  let currentSeed = seed >>> 0;

  return {
    next: () => {
      currentSeed = (currentSeed * 1664525 + 1013904223) >>> 0;
      return currentSeed / 4294967296;
    },
  };
};

const createPoint = (
  start: TreePoint,
  angle: number,
  length: number,
): TreePoint => ({
  x: start.x + Math.cos(angle) * length,
  y: start.y + Math.sin(angle) * length,
});

const growBranch = (
  segments: TreeSegment[],
  endpoints: TreePoint[],
  random: SeededRandom,
  start: TreePoint,
  angle: number,
  length: number,
  depth: number,
  maxDepth: number,
  revealStart: number,
) => {
  const angleJitter = (random.next() - 0.5) * 0.16;
  const end = createPoint(start, angle + angleJitter, length);
  const depthRatio = (maxDepth - depth) / maxDepth;

  segments.push({
    start,
    end,
    bend: (random.next() - 0.5) * (depth > 3 ? 0.018 : 0.032),
    depth,
    revealStart: clampProgress(revealStart + depthRatio * 0.58),
    revealEnd: clampProgress(revealStart + depthRatio * 0.58 + 0.2),
  });

  if (depth <= 0) {
    endpoints.push(end);
    return;
  }

  const nextLength = length * (0.7 + random.next() * 0.08);
  const spread = 0.36 + random.next() * 0.22;

  growBranch(
    segments,
    endpoints,
    random,
    end,
    angle - spread,
    nextLength,
    depth - 1,
    maxDepth,
    revealStart,
  );
  growBranch(
    segments,
    endpoints,
    random,
    end,
    angle + spread,
    nextLength * (0.9 + random.next() * 0.14),
    depth - 1,
    maxDepth,
    revealStart + 0.025,
  );

  if (depth > 2 && random.next() > 0.58) {
    growBranch(
      segments,
      endpoints,
      random,
      end,
      angle + (random.next() - 0.5) * 0.42,
      nextLength * 0.72,
      depth - 2,
      maxDepth,
      revealStart + 0.06,
    );
  }
};

const createParticles = (
  endpoints: TreePoint[],
  random: SeededRandom,
  particlesPerEndpoint: number,
  hue: TreeParticle["hue"],
): TreeParticle[] =>
  endpoints.flatMap((endpoint) =>
    Array.from({ length: particlesPerEndpoint }, () => {
      const radius = Math.sqrt(random.next()) * 0.042;
      const angle = random.next() * Math.PI * 2;

      return {
        x: endpoint.x + Math.cos(angle) * radius,
        y: endpoint.y + Math.sin(angle) * radius * 0.64,
        radius: 0.55 + random.next() * 1.45,
        alpha: 0.28 + random.next() * 0.68,
        phase: random.next() * Math.PI * 2,
        hue,
      };
    }),
  );

/** Produces deterministic normalized geometry for the technology-organic tree. */
export const createParticleTreeGeometry = (
  seed = 20260801,
): ParticleTreeGeometry => {
  const random = createSeededRandom(seed);
  const branches: TreeSegment[] = [];
  const roots: TreeSegment[] = [];
  const branchEndpoints: TreePoint[] = [];
  const rootEndpoints: TreePoint[] = [];
  const origin = { x: 0, y: 0 };
  const trunkNodes = [
    origin,
    { x: -0.004, y: -0.12 },
    { x: 0.006, y: -0.245 },
    { x: -0.002, y: -0.37 },
  ];

  trunkNodes.slice(0, -1).forEach((start, index) => {
    branches.push({
      start,
      end: trunkNodes[index + 1],
      bend: index % 2 === 0 ? 0.006 : -0.005,
      depth: 8 - index,
      revealStart: index / 3,
      revealEnd: (index + 1) / 3,
    });
  });

  const crownStarts = [
    { point: trunkNodes[1], angle: -2.75, length: 0.105, depth: 5 },
    { point: trunkNodes[1], angle: -0.38, length: 0.12, depth: 5 },
    { point: trunkNodes[2], angle: -2.55, length: 0.11, depth: 5 },
    { point: trunkNodes[2], angle: -0.62, length: 0.108, depth: 5 },
    { point: trunkNodes[3], angle: -2.18, length: 0.105, depth: 5 },
    { point: trunkNodes[3], angle: -0.96, length: 0.105, depth: 5 },
  ];

  crownStarts.forEach(({ point, angle, length, depth }, index) => {
    growBranch(
      branches,
      branchEndpoints,
      random,
      point,
      angle,
      length,
      depth,
      depth,
      index * 0.035,
    );
  });

  const rootAngles = [0.18, 0.48, 0.82, 1.12, 1.42, 1.82, 2.18, 2.62, 2.96];
  rootAngles.forEach((angle, index) => {
    growBranch(
      roots,
      rootEndpoints,
      random,
      origin,
      angle,
      0.11 + random.next() * 0.045,
      4,
      4,
      index * 0.02,
    );
  });

  return {
    branches,
    roots,
    leaves: createParticles(branchEndpoints, random, 7, "leaf"),
    rootNodes: createParticles(rootEndpoints, random, 3, "gold"),
  };
};

/** Maps a phase's progress to the visible fraction of one tree segment. */
export const getSegmentVisibility = (
  progress: number,
  segment: TreeSegment,
): number => {
  const duration = Math.max(0.0001, segment.revealEnd - segment.revealStart);
  return clampProgress((progress - segment.revealStart) / duration);
};

/** Returns the tree's horizontal anchor as it moves into the final C composition. */
export const getTreeHorizontalRatio = (
  canopyProgress: number,
  seedsProgress: number,
  compactLayout = false,
): number => {
  if (compactLayout) return 0.5;

  return clampProgress(
    0.67 -
      clampProgress(canopyProgress) * 0.17 +
      clampProgress(seedsProgress) * 0.2,
  );
};

export interface TreeRenderState {
  progress: number;
  growth: GrowthState;
  reducedMotion: boolean;
}
