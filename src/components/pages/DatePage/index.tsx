import periodsData from "../../../data/info";
import RingSwiper from "../../RingSwiper";
import styles from "./index.module.scss";

const DatePage = () => {
  return (
    <div className={styles["main"]}>
      <div className={styles["center-line"]}></div>

      <h1 className={styles["title"]}>
        Исторические <br /> даты
      </h1>
      <div className={styles["date"]}>
        <RingSwiper periodsData={periodsData} />
      </div>
    </div>
  );
};

export default DatePage;
