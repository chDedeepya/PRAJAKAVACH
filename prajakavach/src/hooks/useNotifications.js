import { useState, useCallback } from "react";
import { useToast } from "@chakra-ui/react";

const useNotifications = () => {
  const toast = useToast();
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(
    (options) => {
      const {
        title,
        description,
        status = "info",
        duration = 5000,
        isClosable = true,
        position = "top-right",
        variant = "subtle",
        ...rest
      } = options;

      const id = Date.now().toString();

      const notification = {
        id,
        title,
        description,
        status,
        duration,
        isClosable,
        position,
        variant,
        timestamp: new Date(),
        ...rest,
      };

      setNotifications((prev) => [...prev, notification]);

      toast({
        title,
        description,
        status,
        duration,
        isClosable,
        position,
        variant,
        ...rest,
      });

      return id;
    },
    [toast]
  );

  const showSuccess = useCallback(
    (title, description, options = {}) => {
      return showNotification({
        title,
        description,
        status: "success",
        ...options,
      });
    },
    [showNotification]
  );

  const showError = useCallback(
    (title, description, options = {}) => {
      return showNotification({
        title,
        description,
        status: "error",
        duration: 7000,
        ...options,
      });
    },
    [showNotification]
  );

  const showWarning = useCallback(
    (title, description, options = {}) => {
      return showNotification({
        title,
        description,
        status: "warning",
        ...options,
      });
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (title, description, options = {}) => {
      return showNotification({
        title,
        description,
        status: "info",
        ...options,
      });
    },
    [showNotification]
  );

  const dismissNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const showLoading = useCallback(
    (title, description = "Please wait...", options = {}) => {
      return showNotification({
        title,
        description,
        status: "info",
        duration: null, // Persistent until manually dismissed
        ...options,
      });
    },
    [showNotification]
  );

  const updateLoading = useCallback(
    (id, title, description, status = "success") => {
      // Note: Chakra UI doesn't support updating existing toasts directly
      // This would require a more complex implementation with a custom toast system
      dismissNotification(id);
      return showNotification({
        title,
        description,
        status,
        duration: 3000,
      });
    },
    [dismissNotification, showNotification]
  );

  return {
    notifications,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showLoading,
    updateLoading,
    dismissNotification,
    clearAllNotifications,
  };
};

export default useNotifications;
