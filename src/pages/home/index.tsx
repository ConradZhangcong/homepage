import TargetList from "./TargetList";

import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles["line"]}>Hi, here is conrad</h2>
      <p className={styles["line"]}>
        <em>A Frontend developer, working hard to be a great developer.</em>
      </p>
      <p className={styles["line"]}>Love coding. Love world. Enjoy now.</p>
      <p className={styles["line"]}>🎨 Obsession with coding cleanness.</p>
      <TargetList />
      <p className={styles["line"]}>
        📧 contact me via{" "}
        <a href="mailto:heisenberg0519@outlook.com">
          <strong>Outlook</strong>
        </a>
      </p>
    </div>
  );
};

export default Home;
