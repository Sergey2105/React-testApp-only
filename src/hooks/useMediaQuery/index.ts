import { useCallback, useEffect, useState } from "react";

export const useMediaQuery = (width: string | number, queryType = "min") => {
  const [targetReached, setTargetReached] = useState<boolean>();

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(${queryType}-width: ${width}px)`);
    setTargetReached(media.matches);

    media.addEventListener("change", updateTarget);

    return () => {
      media.removeEventListener("change", updateTarget);
    };
  }, []);

  return targetReached;
};
