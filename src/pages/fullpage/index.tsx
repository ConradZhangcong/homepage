import { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";
import { getWheelDirection } from "@utils";

const Home = () => {
  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 鼠标滚轮监听，火狐鼠标滚动事件不同其他
    if (navigator.userAgent.toLowerCase().indexOf("firefox") === -1) {
      containerRef.current?.addEventListener("mousewheel", scrollMouse);
    } else {
      containerRef.current?.addEventListener("DOMMouseScroll", scrollMouse);
    }

    return () => {
      if (navigator.userAgent.toLowerCase().indexOf("firefox") === -1) {
        containerRef.current?.removeEventListener("mousewheel", scrollMouse);
      } else {
        containerRef.current?.removeEventListener(
          "DOMMouseScroll",
          scrollMouse,
        );
      }
    };
  }, [page]);

  const scrollMouse = (event: any) => {
    const dir = getWheelDirection(event);
    console.log(page);
    if (dir === "up") {
      goUp();
    } else if (dir === "down") {
      goDown();
    } else {
      console.log(dir);
    }
  };

  const goUp = useCallback(() => {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  }, [page]);

  const goDown = useCallback(() => {
    if (page < 2) {
      setPage((p) => p + 1);
    }
  }, [page]);

  return (
    <div className={styles["visiable-container"]}>
      <div
        className={styles.container}
        ref={containerRef}
        style={{ top: `${-100 * page}vh` }}
      >
        <div className={classnames(styles.page, styles.pagea)}>1</div>
        <div className={classnames(styles.page, styles.pageb)}>2</div>
        <div className={classnames(styles.page, styles.pagec)}>3</div>
      </div>
    </div>
  );
};

export default Home;
