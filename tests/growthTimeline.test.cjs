const assert = require("node:assert/strict");
const test = require("node:test");
const {
  clampProgress,
  getGrowthStage,
  getGrowthState,
  getStageProgress,
} = require("./.compiled/growthTimeline.js");

test("clampProgress keeps progress inside page bounds", () => {
  assert.equal(clampProgress(-0.4), 0);
  assert.equal(clampProgress(0.42), 0.42);
  assert.equal(clampProgress(1.8), 1);
});

test("getStageProgress maps and clamps a stage interval", () => {
  assert.equal(getStageProgress(0.1, 0.2, 0.4), 0);
  assert.ok(Math.abs(getStageProgress(0.3, 0.2, 0.4) - 0.5) < 0.000001);
  assert.equal(getStageProgress(0.7, 0.2, 0.4), 1);
});

test("growth phases start and complete in narrative order", () => {
  const beginning = getGrowthState(0);
  const middle = getGrowthState(0.5);
  const ending = getGrowthState(1);

  assert.deepEqual(beginning, {
    roots: 0,
    sprout: 0,
    trunk: 0,
    branches: 0,
    canopy: 0,
    seeds: 0,
  });
  assert.equal(middle.roots, 1);
  assert.equal(middle.sprout, 1);
  assert.ok(middle.trunk > 0 && middle.trunk < 1);
  assert.ok(middle.branches > 0 && middle.branches < 1);
  assert.equal(middle.canopy, 0);
  assert.equal(middle.seeds, 0);
  assert.deepEqual(ending, {
    roots: 1,
    sprout: 1,
    trunk: 1,
    branches: 1,
    canopy: 1,
    seeds: 1,
  });
});

test("reduced motion presents a complete static tree", () => {
  assert.deepEqual(getGrowthState(0, true), getGrowthState(1, true));
  assert.deepEqual(getGrowthState(0, true), {
    roots: 1,
    sprout: 1,
    trunk: 1,
    branches: 1,
    canopy: 1,
    seeds: 1,
  });
});

test("semantic stages cover every narrative chapter", () => {
  assert.equal(getGrowthStage(0), "seed");
  assert.equal(getGrowthStage(0.2), "roots");
  assert.equal(getGrowthStage(0.4), "sprout");
  assert.equal(getGrowthStage(0.6), "branches");
  assert.equal(getGrowthStage(0.75), "canopy");
  assert.equal(getGrowthStage(1), "seeds");
});
