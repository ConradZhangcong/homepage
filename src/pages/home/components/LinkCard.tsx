import type { LinkItem } from "../../../data/links";
import styles from "./LinkCard.module.scss";

const platformLabels: Record<string, string> = {
  github: "GH",
  juejin: "掘",
  linuxdo: "L",
  email: "@",
};

interface LinkCardProps {
  item: LinkItem;
}

/** Renders an accessible external destination in the tree canopy. */
const LinkCard = ({ item }: LinkCardProps) => {
  const isEmail = item.url.startsWith("mailto:");

  return (
    <a
      className={styles.card}
      href={item.url}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noreferrer"}
    >
      <span className={styles.icon} aria-hidden="true">
        {platformLabels[item.icon] ?? item.name.slice(0, 1)}
      </span>
      <span className={styles.info}>
        <span className={styles.name}>{item.name}</span>
        <span className={styles.desc}>{item.description}</span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        ↗
      </span>
    </a>
  );
};

export default LinkCard;
