import styles from "./index.module.scss";

const InfoElement = (props: IInfoElement) => {
  const { date, text } = props;

  return (
    <div className={styles["main"]}>
      <span className={styles["main-title"]}>{date}</span>
      <span className={styles["main-info"]}>{text}</span>
    </div>
  );
};
export default InfoElement;
