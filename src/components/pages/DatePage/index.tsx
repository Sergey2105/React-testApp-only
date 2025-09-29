import periodsData from "../../../data/info";
import RingSwiper from "../../RingSwiper";
import styles from "./index.module.scss";

const DatePage = () => {
  return (
    <div className={styles["main"]}>
      <div className={styles["main-line"]}></div>

      <h1 className={styles["main-title"]}>
        Исторические <br /> даты
      </h1>
      <div className={styles["main-date"]}>
        <RingSwiper periodsData={periodsData} />
      </div>
    </div>
  );
};

export default DatePage;
