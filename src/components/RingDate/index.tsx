import styles from "./index.module.scss";
import AnimatedNumber from "../AnimatedNumber";
import CircleDots from "../CircleDots";

const RingDate = (props: IRingDate) => {
  const { periodsData, activeIndex, onDotClick } = props;

  return (
    <div className={styles["date"]}>
      <div className={styles["line"]}></div>
      <AnimatedNumber
        targetValue={periodsData[activeIndex].dateStart}
        duration={2}
        ease="power3.out"
        className={styles["date-start"]}
      />
      <AnimatedNumber
        targetValue={periodsData[activeIndex].dateEnd}
        duration={2}
        ease="power3.out"
        className={styles["date-end"]}
      />
      <div className={styles["wrapper"]}>
        <div className={styles["circle"]}>
          <CircleDots
            periodsData={periodsData}
            activeIndex={activeIndex}
            onDotClick={onDotClick}
          />
        </div>
      </div>
    </div>
  );
};

export default RingDate;
