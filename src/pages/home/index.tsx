import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <h2>Hi, here is conrad</h2>
      <p>
        <em>A Frontend developer, working hard to be a great developer.</em>
      </p>
      <p>Love coding. Love world. Enjoy now.</p>
      <p>🎨 Obsession with coding cleanness.</p>
      <p>
        🏡{" "}
        <a href="http://www.conradzc.com/" rel="noreferrer" target="_blank">
          <strong>Profile</strong>
        </a>{" "}
        |{" "}
        <a
          href="https://juejin.cn/user/395479916507422"
          rel="noreferrer"
          target="_blank"
        >
          <strong>Juejin</strong>
        </a>
      </p>
      <p dir="auto">
        📧 contact me via{" "}
        <a href="mailto:heisenberg0519@outlook.com">
          <strong>Outlook</strong>
        </a>
      </p>
    </div>
  );
};

export default Home;
