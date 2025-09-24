import { useState, useEffect } from "react";

const useUserPreferences = () => {
  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    notifications: true,
    soundEnabled: true,
    autoSave: true,
    compactView: false,
    showAnimations: true,
    fontSize: "medium",
    colorScheme: "default",
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("prajakavach-preferences");
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences(prev => ({ ...prev, ...parsed }));
      }
    } catch (error) {
      console.warn("Failed to load user preferences:", error);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("prajakavach-preferences", JSON.stringify(preferences));
    } catch (error) {
      console.warn("Failed to save user preferences:", error);
    }
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateMultiplePreferences = (updates) => {
    setPreferences(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const resetPreferences = () => {
    const defaultPreferences = {
      theme: "light",
      language: "en",
      notifications: true,
      soundEnabled: true,
      autoSave: true,
      compactView: false,
      showAnimations: true,
      fontSize: "medium",
      colorScheme: "default",
    };
    setPreferences(defaultPreferences);
  };

  const exportPreferences = () => {
    return JSON.stringify(preferences, null, 2);
  };

  const importPreferences = (preferencesString) => {
    try {
      const imported = JSON.parse(preferencesString);
      setPreferences(prev => ({ ...prev, ...imported }));
      return true;
    } catch (error) {
      console.error("Failed to import preferences:", error);
      return false;
    }
  };

  return {
    preferences,
    updatePreference,
    updateMultiplePreferences,
    resetPreferences,
    exportPreferences,
    importPreferences,
  };
};

export default useUserPreferences;
