import { useEffect, useCallback } from "react";

const useKeyboardNavigation = (navigationItems, onNavigate) => {
  const handleKeyDown = useCallback(
    (event) => {
      const { key, ctrlKey, metaKey, shiftKey } = event;

      // Handle common keyboard shortcuts
      switch (key) {
        case "h":
          if (ctrlKey || metaKey) {
            event.preventDefault();
            onNavigate("/");
          }
          break;
        case "s":
          if (ctrlKey || metaKey) {
            event.preventDefault();
            onNavigate("/student");
          }
          break;
        case "a":
          if (ctrlKey || metaKey) {
            event.preventDefault();
            onNavigate("/admin");
          }
          break;
        case "l":
          if (ctrlKey || metaKey) {
            event.preventDefault();
            onNavigate("/login");
          }
          break;
        case "r":
          if (ctrlKey || metaKey) {
            event.preventDefault();
            onNavigate("/register");
          }
          break;
        case "c":
          if (ctrlKey || metaKey) {
            event.preventDefault();
            onNavigate("/contact");
          }
          break;
        case "?":
          if (shiftKey) {
            event.preventDefault();
            // Show keyboard shortcuts help
            showKeyboardShortcuts();
          }
          break;
        case "Escape":
          // Close modals, drawers, etc.
          closeActiveOverlays();
          break;
        case "Tab":
          // Enhanced tab navigation with focus management
          handleTabNavigation(event);
          break;
        default:
          break;
      }
    },
    [onNavigate]
  );

  const showKeyboardShortcuts = () => {
    // Implementation for showing keyboard shortcuts modal
    console.log("Keyboard shortcuts:");
    console.log("Ctrl/Cmd + H: Home");
    console.log("Ctrl/Cmd + S: Student App");
    console.log("Ctrl/Cmd + A: Admin Dashboard");
    console.log("Ctrl/Cmd + L: Login");
    console.log("Ctrl/Cmd + R: Register");
    console.log("Ctrl/Cmd + C: Contact");
    console.log("Shift + ?: Show this help");
  };

  const closeActiveOverlays = () => {
    // Close any open modals, drawers, etc.
    const openOverlays = document.querySelectorAll('[role="dialog"], [role="alertdialog"]');
    openOverlays.forEach((overlay) => {
      const closeButton = overlay.querySelector('[aria-label="Close"], .chakra-modal__close-btn, .chakra-drawer__close-btn');
      if (closeButton) {
        closeButton.click();
      }
    });
  };

  const handleTabNavigation = (event) => {
    // Enhanced tab navigation with focus trapping
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    showKeyboardShortcuts,
  };
};

export default useKeyboardNavigation;
