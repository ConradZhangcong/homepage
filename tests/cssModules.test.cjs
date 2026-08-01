const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const projectRoot = path.resolve(__dirname, "..");
const modulePairs = [
  ["src/pages/home/index.tsx", "src/pages/home/index.module.scss"],
  [
    "src/pages/home/components/TreeScene.tsx",
    "src/pages/home/components/TreeScene.module.scss",
  ],
];

const toCamelCase = (className) =>
  className.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

test("hyphenated CSS Module classes use explicit bracket access", () => {
  for (const [componentPath, stylesheetPath] of modulePairs) {
    const component = fs.readFileSync(
      path.join(projectRoot, componentPath),
      "utf8",
    );
    const stylesheet = fs.readFileSync(
      path.join(projectRoot, stylesheetPath),
      "utf8",
    );
    const hyphenatedClasses = [
      ...stylesheet.matchAll(/^\.([a-z][a-z0-9-]*-[a-z0-9-]+)\b/gm),
    ].map((match) => match[1]);

    for (const className of hyphenatedClasses) {
      const invalidAccess = `styles.${toCamelCase(className)}`;
      assert.equal(
        component.includes(invalidAccess),
        false,
        `${componentPath} must use styles["${className}"] instead of ${invalidAccess}`,
      );
    }
  }
});
