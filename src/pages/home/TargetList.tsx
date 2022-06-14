import classnames from "classnames";

import styles from "./index.module.scss";

const TargetList = () => {
  const targetList = [
    { id: "Profile", name: "Profile", url: "http://www.conradzc.com/" },
    {
      id: "Juejin",
      name: "Juejin",
      url: "https://juejin.cn/user/395479916507422/",
    },
    {
      id: "Github",
      name: "Github",
      url: "https://github.com/ConradZhangcong/",
    },
  ];

  return (
    <div className={classnames(styles["target-container"], styles["line"])}>
      🏡
      {targetList.map((item) => (
        <a
          className={styles["target-icon"]}
          key={item.id}
          href={item.url}
          rel="noreferrer"
          target="_blank"
        >
          <strong>{item.name}</strong>
        </a>
      ))}
    </div>
  );
};

export default TargetList;
