import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { gsap } from "gsap";
import AnimatedNumber from "../AnimatedNumber";

const RingDate = (props: IRingData) => {
  const { dateStart, dateEnd } = props;

  return (
    <div className={styles.date}>
      <AnimatedNumber
        targetValue={dateStart}
        duration={2}
        ease="power3.out"
        className={styles["date-start"]}
      />
      <AnimatedNumber
        targetValue={dateEnd}
        duration={2}
        ease="power3.out"
        className={styles["date-end"]}
      />
    </div>
  );
};
export default RingDate;
