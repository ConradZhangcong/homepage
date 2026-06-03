import { skillGroups } from "../../data/skills";
import AnimateInView from "./components/AnimateInView";
import styles from "./SkillsSection.module.scss";

const SkillsSection = () => {
  return (
    <section className={styles.skills}>
      <div className={styles["bg-glow"]} />
      <div className={styles.content}>
        <AnimateInView>
          <span className={styles.label}>Skills</span>
        </AnimateInView>
        <div className={styles.groups}>
          {skillGroups.map((group, gi) => (
            <AnimateInView key={group.label} delay={gi * 120}>
              <div className={styles.group}>
                <span className={styles["group-label"]}>{group.label}</span>
                <div className={styles.tags}>
                  {group.skills.map((skill, si) => (
                    <span
                      key={skill}
                      className={styles.tag}
                      style={{
                        animationDelay: `${gi * 120 + si * 60}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
