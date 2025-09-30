import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";
import { gsap } from "gsap";

const TARGET_POSITION = 60;
const RADIUS = 264;

const CircleDots = (props: ICircleDots) => {
  const { periodsData, activeIndex, onDotClick } = props;
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [finishedIndex, setFinishedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentRotation, setCurrentRotation] = useState(TARGET_POSITION);

  const buttonPositions = useMemo(
    () =>
      Array.from(
        { length: periodsData.length },
        (_, i) => (360 / periodsData.length) * i
      ),
    [periodsData.length]
  );

  const rotateCircle = (slideIndex: number) => {
    setFinishedIndex(null);
    gsap.killTweensOf(buttonsRef.current);

    const currentButtonPosition = buttonPositions[slideIndex];
    const targetRotation = TARGET_POSITION - currentButtonPosition;

    let rotationDiff = targetRotation - currentRotation;
    rotationDiff = ((rotationDiff % 360) + 360) % 360;
    if (rotationDiff > 180) {
      rotationDiff -= 360;
    }

    const newRotation = currentRotation + rotationDiff;
    setCurrentRotation(newRotation);

    gsap.to(buttonsRef.current, {
      rotation: newRotation,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        const current = gsap.getProperty(
          buttonsRef.current,
          "rotation"
        ) as number;
        setCurrentRotation(current);
      },
      onComplete: () => {
        setFinishedIndex(slideIndex);
        setCurrentRotation(newRotation);
      },
    });
  };

  useEffect(() => {
    rotateCircle(activeIndex);
  }, [activeIndex]);

  const dots = useMemo(
    () =>
      periodsData.map((period, index) => {
        const angle = buttonPositions[index];
        const x = Math.cos(((angle - 90) * Math.PI) / 180) * RADIUS;
        const y = Math.sin(((angle - 90) * Math.PI) / 180) * RADIUS;

        const isActive = finishedIndex === index;
        const isHovered = hoveredIndex === index;
        const shouldShowLarge = isActive || isHovered;

        return (
          <div
            className={styles["dots"]}
            key={index}
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${-currentRotation}deg)`,
            }}
          >
            <button
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`${styles["dots-btn"]} ${
                shouldShowLarge
                  ? styles["dots-btn_active"]
                  : styles["dots-btn_disabled"]
              }`}
              onClick={() => onDotClick(index)}
            >
              <span
                className={`${styles["dots-btn-text"]} ${
                  shouldShowLarge && styles["dots-btn-text_visible"]
                }`}
              >
                {index + 1}
              </span>
            </button>
            {isActive && (
              <span className={styles["dots-theme"]}>{period.theme}</span>
            )}
          </div>
        );
      }),
    [
      periodsData,
      buttonPositions,
      currentRotation,
      finishedIndex,
      hoveredIndex,
      onDotClick,
    ]
  );

  return (
    <div className={styles["wrapper"]} ref={buttonsRef}>
      {dots}
    </div>
  );
};

export default CircleDots;
