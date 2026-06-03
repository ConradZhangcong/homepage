import { links } from "../../data/links";
import AnimateInView from "./components/AnimateInView";
import LinkCard from "./components/LinkCard";
import styles from "./LinksSection.module.scss";

const LinksSection = () => {
  return (
    <section className={styles.links}>
      <div className={styles["bg-glow"]} />
      <div className={styles.content}>
        <AnimateInView>
          <span className={styles.label}>Find Me</span>
        </AnimateInView>
        <AnimateInView delay={100}>
          <p className={styles.subtitle}>
            {"Let's connect and build something together."}
          </p>
        </AnimateInView>
        <div className={styles.grid}>
          {links.map((item, i) => (
            <AnimateInView key={item.id} delay={200 + i * 80}>
              <LinkCard item={item} />
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
