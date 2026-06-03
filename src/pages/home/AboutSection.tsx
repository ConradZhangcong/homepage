import AnimateInView from "./components/AnimateInView";
import styles from "./AboutSection.module.scss";

const AboutSection = () => {
  return (
    <section className={styles.about}>
      <div className={styles["bg-glow"]} />
      <div className={styles.content}>
        <AnimateInView>
          <span className={styles.label}>About</span>
        </AnimateInView>
        <AnimateInView delay={100}>
          <p className={styles.text}>
            I build things for the web. Focused on crafting clean, performant
            interfaces with modern frontend technologies.
          </p>
        </AnimateInView>
        <AnimateInView delay={200}>
          <p className={styles.text}>
            Now exploring the world of AI Agents — bridging the gap between
            frontend craft and intelligent systems. Always learning, always
            shipping.
          </p>
        </AnimateInView>
      </div>
    </section>
  );
};

export default AboutSection;
