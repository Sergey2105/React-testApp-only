import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { gsap } from "gsap";

interface IRingData {
  periodsData: IData;
}

const RingDate = (props: IRingData) => {
  const { periodsData } = props;
  console.log(periodsData);
  const [currentYear, setCurrentYear] = useState(periodsData.dateStart);

  useEffect(() => {
    const obj = { val: periodsData.dateStart };
    gsap.to(obj, {
      val: periodsData.dateEnd,
      duration: 1,
      roundProps: "val",
      onUpdate: () => setCurrentYear(obj.val),
    });
  }, [periodsData]);

  return (
    <div>
      <div className={styles.date}>
        <span className={styles["date-start"]}>{currentYear}</span>
        <span className={styles["date-end"]}>{periodsData.dateEnd}</span>
      </div>
    </div>
  );
};
export default RingDate;
