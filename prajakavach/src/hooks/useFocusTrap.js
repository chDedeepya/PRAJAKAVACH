import { useEffect, useRef } from "react";

const useFocusTrap = (isActive = true) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }

      // Escape key handling
      if (e.key === "Escape") {
        // Let parent component handle escape
        return;
      }
    };

    const handleFocusIn = (e) => {
      if (!container.contains(e.target)) {
        // Focus is trying to leave the container, redirect to first element
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);

    // Focus first element when trap becomes active
    if (firstElement) {
      setTimeout(() => firstElement.focus(), 100);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [isActive]);

  return containerRef;
};

export default useFocusTrap;
