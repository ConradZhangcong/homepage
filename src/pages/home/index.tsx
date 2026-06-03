import { useEffect, useRef, useState, type ReactNode } from "react";
import TargetList from "./TargetList";
import styles from "./index.module.scss";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

interface AnimateOnViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimateOnView = ({
  children,
  className = "",
  delay = 0,
}: AnimateOnViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${styles["animate-item"]} ${
        visible ? styles.visible : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      {/* Section 1: Hero */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles["bg-orb"]} />
        <div className={styles["bg-orb-secondary"]} />
        <div className={styles.content}>
          <AnimateOnView className={styles.greeting}>
            {getGreeting()}
          </AnimateOnView>
          <AnimateOnView className={styles.name} delay={100}>
            <h1>Cong</h1>
          </AnimateOnView>
          <AnimateOnView className={styles.divider} delay={200}>
            <div className={styles["divider-line"]} />
          </AnimateOnView>
          <AnimateOnView className={styles.role} delay={300}>
            Frontend Developer
          </AnimateOnView>
          <AnimateOnView className={styles.bio} delay={400}>
            Love coding. Love world. Enjoy now.
          </AnimateOnView>
          <AnimateOnView className={styles["scroll-cue"]} delay={600}>
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
          </AnimateOnView>
        </div>
      </section>

      {/* Section 2: About */}
      <section className={`${styles.section} ${styles.about}`}>
        <div className={styles["bg-orb"]} />
        <div className={styles.content}>
          <AnimateOnView className={styles["section-label"]}>
            About
          </AnimateOnView>
          <AnimateOnView className={styles["about-text"]} delay={150}>
            <p>
              I build things for the web. Focused on crafting clean, performant
              interfaces with modern frontend technologies.
            </p>
            <p>
              Always learning. Always shipping. Turning ideas into polished
              experiences, one pixel at a time.
            </p>
          </AnimateOnView>
          <AnimateOnView className={styles["tech-stack"]} delay={300}>
            <div className={styles["stack-title"]}>Tech Stack</div>
            <div className={styles["stack-items"]}>
              {["React", "TypeScript", "SCSS", "Node.js", "Vite"].map(
                (tech) => (
                  <span key={tech} className={styles["stack-tag"]}>
                    {tech}
                  </span>
                ),
              )}
            </div>
          </AnimateOnView>
        </div>
      </section>

      {/* Section 3: Connect */}
      <section className={`${styles.section} ${styles.connect}`}>
        <div className={styles["bg-orb"]} />
        <div className={styles.content}>
          <AnimateOnView className={styles["section-label"]}>
            Connect
          </AnimateOnView>
          <AnimateOnView className={styles["connect-text"]} delay={150}>
            <p>{"Let&apos;s build something together."}</p>
          </AnimateOnView>
          <AnimateOnView delay={300}>
            <TargetList />
          </AnimateOnView>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
