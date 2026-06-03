import githubIcon from "@assets/github.svg";
import juejinIcon from "@assets/juejin.svg";
import styles from "./index.module.scss";

const EmailIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const links = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/ConradZhangcong/",
    icon: <img src={githubIcon} alt="GitHub" />,
  },
  {
    id: "juejin",
    name: "Juejin",
    url: "https://juejin.cn/user/395479916507422/",
    icon: <img src={juejinIcon} alt="Juejin" />,
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:heisenberg0519@outlook.com",
    icon: <EmailIcon />,
  },
];

const TargetList = () => {
  return (
    <div className={styles["social-links"]}>
      {links.map((item) => (
        <a
          className={styles["social-icon"]}
          key={item.id}
          href={item.url}
          rel="noreferrer"
          target="_blank"
          aria-label={item.name}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default TargetList;
