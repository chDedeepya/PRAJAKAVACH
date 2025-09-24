import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Only trigger shortcuts when not typing in input fields
      if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
        return;
      }

      const isCtrlOrCmd = event.ctrlKey || event.metaKey;

      switch (event.key.toLowerCase()) {
        case "h":
          if (isCtrlOrCmd) {
            event.preventDefault();
            navigate("/");
          }
          break;
        case "s":
          if (isCtrlOrCmd) {
            event.preventDefault();
            navigate("/student");
          }
          break;
        case "a":
          if (isCtrlOrCmd) {
            event.preventDefault();
            navigate("/admin");
          }
          break;
        case "l":
          if (isCtrlOrCmd) {
            event.preventDefault();
            navigate("/login");
          }
          break;
        case "/":
          if (isCtrlOrCmd) {
            event.preventDefault();
            // Focus search if available
            const searchInput = document.querySelector('[data-search-input]');
            if (searchInput) {
              searchInput.focus();
            }
          }
          break;
        case "escape":
          // Close modals, drawers, etc.
          const modal = document.querySelector('[role="dialog"]');
          if (modal) {
            const closeButton = modal.querySelector('[aria-label="Close"]') ||
                               modal.querySelector('.chakra-modal__close-btn') ||
                               modal.querySelector('[data-testid="modal-close"]');
            if (closeButton) {
              closeButton.click();
            }
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return {
    shortcuts: [
      { key: "Ctrl/Cmd + H", description: "Go to Home" },
      { key: "Ctrl/Cmd + S", description: "Go to Student Dashboard" },
      { key: "Ctrl/Cmd + A", description: "Go to Admin Dashboard" },
      { key: "Ctrl/Cmd + L", description: "Go to Login" },
      { key: "Ctrl/Cmd + /", description: "Focus search" },
      { key: "Escape", description: "Close modals/drawers" },
    ]
  };
};

export default useKeyboardShortcuts;
