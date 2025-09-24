import { useCallback, useRef, useEffect } from "react";

const useScreenReader = () => {
  const liveRegionRef = useRef(null);

  useEffect(() => {
    // Create a persistent live region for announcements
    if (!liveRegionRef.current) {
      const liveRegion = document.createElement("div");
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.setAttribute("class", "sr-only");
      liveRegion.style.position = "absolute";
      liveRegion.style.left = "-10000px";
      liveRegion.style.width = "1px";
      liveRegion.style.height = "1px";
      liveRegion.style.overflow = "hidden";
      liveRegion.id = "sr-live-region";

      document.body.appendChild(liveRegion);
      liveRegionRef.current = liveRegion;
    }

    return () => {
      if (liveRegionRef.current && liveRegionRef.current.parentNode) {
        liveRegionRef.current.parentNode.removeChild(liveRegionRef.current);
      }
    };
  }, []);

  const announce = useCallback((message, priority = "polite") => {
    if (liveRegionRef.current) {
      liveRegionRef.current.setAttribute("aria-live", priority);
      liveRegionRef.current.textContent = message;

      // Clear after announcement for assertive messages
      if (priority === "assertive") {
        setTimeout(() => {
          if (liveRegionRef.current) {
            liveRegionRef.current.textContent = "";
          }
        }, 1000);
      }
    }
  }, []);

  const announceError = useCallback((message) => {
    announce(`Error: ${message}`, "assertive");
  }, [announce]);

  const announceSuccess = useCallback((message) => {
    announce(`Success: ${message}`, "polite");
  }, [announce]);

  const announceLoading = useCallback((message) => {
    announce(`Loading: ${message}`, "polite");
  }, [announce]);

  const announceNavigation = useCallback((message) => {
    announce(`Navigation: ${message}`, "polite");
  }, [announce]);

  return {
    announce,
    announceError,
    announceSuccess,
    announceLoading,
    announceNavigation,
  };
};

export default useScreenReader;
