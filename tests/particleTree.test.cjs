const assert = require("node:assert/strict");
const test = require("node:test");
const {
  createParticleTreeGeometry,
  getSegmentVisibility,
  getTreeHorizontalRatio,
} = require("./.compiled/particleTree.js");

test("particle tree geometry is deterministic and detailed", () => {
  const firstTree = createParticleTreeGeometry(42);
  const secondTree = createParticleTreeGeometry(42);

  assert.deepEqual(firstTree, secondTree);
  assert.ok(firstTree.branches.length > 300);
  assert.ok(firstTree.roots.length > 150);
  assert.ok(firstTree.leaves.length > 500);
  assert.ok(firstTree.rootNodes.length > 100);
});

test("different seeds produce distinct organic geometry", () => {
  const firstTree = createParticleTreeGeometry(1);
  const secondTree = createParticleTreeGeometry(2);

  assert.notDeepEqual(firstTree.branches, secondTree.branches);
});

test("segment visibility follows its reveal interval", () => {
  const segment = {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    bend: 0,
    depth: 1,
    revealStart: 0.2,
    revealEnd: 0.6,
  };

  assert.equal(getSegmentVisibility(0.1, segment), 0);
  assert.ok(Math.abs(getSegmentVisibility(0.4, segment) - 0.5) < 0.000001);
  assert.equal(getSegmentVisibility(0.8, segment), 1);
});

test("tree moves right into the final C composition", () => {
  assert.equal(getTreeHorizontalRatio(0, 0), 0.67);
  assert.equal(getTreeHorizontalRatio(1, 0), 0.5);
  assert.equal(getTreeHorizontalRatio(1, 1), 0.7);
  assert.equal(getTreeHorizontalRatio(1, 1, true), 0.5);
});
