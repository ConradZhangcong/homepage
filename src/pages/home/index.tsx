import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import LinksSection from "./LinksSection";
import FooterSection from "./FooterSection";
import styles from "./index.module.scss";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <LinksSection />
      <FooterSection />
    </div>
  );
};

export default HomePage;
