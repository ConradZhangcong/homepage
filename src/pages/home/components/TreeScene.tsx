import styles from "./TreeScene.module.scss";

const roots = ["root-one", "root-two", "root-three", "root-four", "root-five"];
const branches = [
  "branch-one",
  "branch-two",
  "branch-three",
  "branch-four",
  "branch-five",
  "branch-six",
];
const leaves = Array.from({ length: 22 }, (_, index) => index);

/** Renders the decorative tree that responds to the page growth variables. */
const TreeScene = () => {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.atmosphere} />
      <div className={styles.sun} />
      <div className={styles.ground} />
      <div className={styles.tree}>
        <div className={styles.seed} />
        <div className={styles.rootSystem}>
          {roots.map((root) => (
            <span key={root} className={`${styles.root} ${styles[root]}`} />
          ))}
        </div>
        <div className={styles.trunk}>
          {branches.map((branch) => (
            <span
              key={branch}
              className={`${styles.branch} ${styles[branch]}`}
            />
          ))}
          <div className={styles.canopy}>
            {leaves.map((leaf) => (
              <span key={leaf} className={styles.leaf} />
            ))}
          </div>
        </div>
        <span className={`${styles.fallingSeed} ${styles.fallingSeedOne}`} />
        <span className={`${styles.fallingSeed} ${styles.fallingSeedTwo}`} />
      </div>
    </div>
  );
};

export default TreeScene;
