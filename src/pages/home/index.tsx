import { useRef } from "react";
import { links } from "../../data/links";
import { skillGroups } from "../../data/skills";
import LinkCard from "./components/LinkCard";
import TreeScene from "./components/TreeScene";
import { usePrefersReducedMotion, useScrollGrowth } from "./useScrollGrowth";
import styles from "./index.module.scss";

const principles = [
  ["01", "Think clearly", "把复杂问题拆成可以验证的小步骤。"],
  ["02", "Build carefully", "让交互、性能与代码质量彼此支撑。"],
  ["03", "Ship continuously", "持续交付，也持续从真实反馈中生长。"],
];

/** Renders the complete scroll-driven personal homepage. */
const HomePage = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  useScrollGrowth(pageRef, reducedMotion);

  return (
    <div ref={pageRef} className={styles.wrapper}>
      <a className={styles["skip-link"]} href="#about">
        跳到主要内容
      </a>
      <header className={styles.topbar}>
        <a className={styles.wordmark} href="#seed" aria-label="返回页面顶部">
          C<span>.</span>
        </a>
        <span className={styles.status}>Frontend · AI Agent</span>
      </header>

      <TreeScene />

      <main className={styles.story}>
        <section id="seed" className={`${styles.section} ${styles.hero}`}>
          <div className={`${styles.panel} ${styles["hero-panel"]}`}>
            <p className={styles.eyebrow}>CONG · FRONTEND ENGINEER</p>
            <h1>
              Rooted in <span className={styles["accent-text"]}>Frontend.</span>
              <br />
              Growing with <span className={styles["accent-text"]}>AI.</span>
            </h1>
            <p className={styles.lead}>以工程为根，向智能生长。</p>
            <a className={styles["scroll-cue"]} href="#about">
              <span className={styles["cue-text"]}>Scroll to grow</span>
              <i />
            </a>
          </div>
        </section>

        <section id="about" className={styles.section}>
          <div className={`${styles.panel} ${styles["panel-left"]}`}>
            <p className={styles.chapter}>01 / ROOTS</p>
            <h2>先把根扎深。</h2>
            <p className={styles["body-copy"]}>
              我构建清晰、可靠且有温度的 Web
              体验。关注的不只是界面如何呈现，也包括它怎样运行、怎样被维护。
            </p>
            <div className={styles["root-notes"]}>
              <div>
                <span className={styles["root-title"]}>Frontend Craft</span>
                <p>Interface · Performance · Architecture</p>
              </div>
              <div>
                <span className={styles["root-title"]}>AI Exploration</span>
                <p>Agents · LLM · Human–AI Interaction</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={`${styles.panel} ${styles["panel-right"]}`}>
            <p className={styles.chapter}>02 / SPROUT</p>
            <h2>从想法，到可以触碰的东西。</h2>
            <div className={styles.principles}>
              {principles.map(([number, title, description]) => (
                <div key={number} className={styles.principle}>
                  <span className={styles["principle-number"]}>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className={styles.section}>
          <div
            className={`${styles.panel} ${styles["panel-left"]} ${styles["wide-panel"]}`}
          >
            <p className={styles.chapter}>03 / BRANCHES</p>
            <h2>能力沿着真实问题抽枝。</h2>
            <div className={styles["skill-groups"]}>
              {skillGroups.map((group) => (
                <div key={group.label} className={styles["skill-group"]}>
                  <h3>{group.label}</h3>
                  <div className={styles["skill-list"]}>
                    {group.skills.map((skill) => (
                      <span key={skill} className={styles["skill-tag"]}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="links" className={styles.section}>
          <div
            className={`${styles.panel} ${styles["panel-right"]} ${styles["links-panel"]}`}
          >
            <p className={styles.chapter}>04 / CANOPY</p>
            <h2>一些沿途长成的东西。</h2>
            <p className={styles["body-copy"]}>
              代码、文字、社区，以及下一次合作的开始。
            </p>
            <div className={styles["link-grid"]}>
              {links.map((item) => (
                <LinkCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.ending}`}>
          <div className={`${styles.panel} ${styles["ending-panel"]}`}>
            <p className={styles.chapter}>05 / SEEDS</p>
            <h2>Still growing.</h2>
            <p className={styles["body-copy"]}>
              Every project leaves a seed for what comes next.
            </p>
            <a
              className={styles["contact-link"]}
              href="mailto:heisenberg0519@outlook.com"
            >
              Start a conversation{" "}
              <span className={styles["contact-arrow"]}>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Built with React &amp; TypeScript</span>
        <span>© 2026 Cong</span>
        <span>苏ICP备2024068518号-1</span>
      </footer>
    </div>
  );
};

export default HomePage;
