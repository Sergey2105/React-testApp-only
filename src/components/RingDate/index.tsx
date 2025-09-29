import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { gsap } from "gsap";
import AnimatedNumber from "../AnimatedNumber";

const RingDate = (props: {
  dateStart: number;
  dateEnd: number;
  periodsData: IData[];
  activeIndex: number;
  onDotClick: (index: number) => void;
}) => {
  const { dateStart, dateEnd, periodsData, activeIndex, onDotClick } = props;

  const circleRef = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const [finishedIndex, setFinishedIndex] = useState<number | null>(null);

  const buttonPositions = Array.from(
    { length: periodsData.length },
    (_, i) => (360 / periodsData.length) * i
  );

  const targetPosition = 60;
  const [currentRotation, setCurrentRotation] = useState(60);

  const rotateCircle = (slideIndex: number) => {
    setFinishedIndex(null);
    const currentButtonPosition = buttonPositions[slideIndex];
    const targetRotation = targetPosition - currentButtonPosition;

    let rotationDiff = targetRotation - currentRotation;
    rotationDiff = ((rotationDiff % 360) + 360) % 360;

    if (rotationDiff > 180) rotationDiff = rotationDiff - 360;
    if (rotationDiff <= 0) rotationDiff += 360;

    const newRotation = currentRotation + rotationDiff;
    setCurrentRotation(newRotation);

    gsap.to(buttonsContainerRef.current, {
      rotation: newRotation,
      duration: 2,
      ease: "power2.out",
      onComplete: () => {
        setFinishedIndex(slideIndex);
        setCurrentRotation(newRotation);
      },
    });
  };

  useEffect(() => {
    rotateCircle(activeIndex);
  }, [activeIndex]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <div className={styles["date"]}>
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
      <div className={styles.wrapper}>
        <div className={styles.circleNav} ref={circleRef}>
          <div className={styles.buttons} ref={buttonsContainerRef}>
            {periodsData.map((_, index) => {
              const angle = buttonPositions[index];
              const radius = 264;
              const x = Math.cos(((angle - 90) * Math.PI) / 180) * radius;
              const y = Math.sin(((angle - 90) * Math.PI) / 180) * radius;

              const isActive = finishedIndex === index;
              const isHovered = hoveredIndex === index;
              const shouldShowLarge = isActive || isHovered;

              const [showNumber, setShowNumber] = useState(false);

              useEffect(() => {
                let timer: NodeJS.Timeout;

                if (shouldShowLarge) {
                  timer = setTimeout(() => setShowNumber(true), 100);
                } else {
                  setShowNumber(false);
                }

                return () => clearTimeout(timer);
              }, [shouldShowLarge]);

              return (
                <div
                  className={styles["dot-wrapper"]}
                  key={index}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${-currentRotation}deg)`,
                  }}
                >
                  <button
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    key={index}
                    className={`${styles.dot} ${
                      shouldShowLarge ? styles.active : styles.disabled
                    }`}
                    onClick={() => onDotClick(index)}
                  >
                    {/* {showNumber ? index + 1 : ""} */}
                    <span
                      className={`${styles.dotNumber} ${
                        showNumber ? styles.visible : ""
                      }`}
                    >
                      {index + 1}
                    </span>
                  </button>
                  {isActive && (
                    <span className={styles["theme"]}>
                      {periodsData[activeIndex].theme}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default RingDate;
