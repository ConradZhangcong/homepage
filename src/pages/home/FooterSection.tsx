import styles from "./FooterSection.module.scss";

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>Built with React & TypeScript</p>
      <p className={styles.copyright}>© 2026 Cong. All rights reserved.</p>
      <p className={styles.icp}>苏ICP备2024068518号-1</p>
    </footer>
  );
};

export default FooterSection;
