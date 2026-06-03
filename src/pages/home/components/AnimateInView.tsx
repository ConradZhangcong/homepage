import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./AnimateInView.module.scss";

interface AnimateInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimateInView = ({
  children,
  className = "",
  delay = 0,
}: AnimateInViewProps) => {
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
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.item} ${visible ? styles.visible : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimateInView;
