import { useEffect, useState, useRef } from "react";

const useScrollTrigger = (threshold = 0.1, triggerOnce = true) => {
  const [isTriggered, setIsTriggered] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTriggered(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsTriggered(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before element enters viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, triggerOnce]);

  return [elementRef, isTriggered];
};

export default useScrollTrigger;
