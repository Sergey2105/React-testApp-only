import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedNumber = (props: IAnimatedNumberProps) => {
  const { targetValue, duration = 1, ease = "power1.out", className } = props;
  const numberRef = useRef<HTMLSpanElement>(null);
  const currentValueRef = useRef({ value: targetValue });

  useEffect(() => {
    if (!numberRef.current) return;

    const startValue = currentValueRef.current.value;

    if (startValue === targetValue) return;

    gsap.to(currentValueRef.current, {
      value: targetValue,
      duration: duration,
      ease: ease,
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.round(
            currentValueRef.current.value
          ).toString();
        }
      },
      onComplete: () => {
        if (numberRef.current) {
          numberRef.current.textContent = targetValue.toString();
        }
      },
    });
  }, [targetValue, duration, ease]);

  return (
    <span ref={numberRef} className={className}>
      {targetValue}
    </span>
  );
};
export default AnimatedNumber;
