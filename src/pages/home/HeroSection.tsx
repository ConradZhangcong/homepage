import AnimateInView from "./components/AnimateInView";
import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles["bg-glow"]} />
      <div className={styles["bg-glow-secondary"]} />
      <div className={styles.content}>
        <AnimateInView>
          <h1 className={styles.name}>Cong</h1>
        </AnimateInView>
        <AnimateInView delay={150}>
          <p className={styles.tagline}>
            From Frontend to AI Agent
            <br />
            <span className={styles.sub}>
              Building the future, one commit at a time
            </span>
          </p>
        </AnimateInView>
        <AnimateInView delay={300}>
          <div className={styles["scroll-hint"]}>
            <span>Scroll</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
};

export default HeroSection;
