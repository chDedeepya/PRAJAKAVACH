import React, { useState, useEffect } from "react";
import {
  IconButton,
  useColorMode,
  useColorModeValue,
  Tooltip,
  Box,
  VStack,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiSettings, FiPalette } from "react-icons/fi";
import useUserPreferences from "../hooks/useUserPreferences";

const MotionIconButton = motion(IconButton);

const ThemeToggle = () => {
  const { colorMode, toggleColorMode, setColorMode } = useColorMode();
  const { preferences, updatePreference } = useUserPreferences();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAnimating, setIsAnimating] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Sync with user preferences
  useEffect(() => {
    if (preferences.theme && preferences.theme !== "auto") {
      setColorMode(preferences.theme);
    } else if (preferences.theme === "auto") {
      // Handle system preference
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setColorMode(mediaQuery.matches ? "dark" : "light");

      const handleChange = (e) => {
        setColorMode(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [preferences.theme, setColorMode]);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleColorMode();

    // Update preference if not set to auto
    if (preferences.theme !== "auto") {
      updatePreference("theme", colorMode === "light" ? "dark" : "light");
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleThemeSelect = (theme) => {
    updatePreference("theme", theme);
    if (theme !== "auto") {
      setColorMode(theme);
    }
    onClose();
  };

  const themes = [
    {
      value: "light",
      label: "Light",
      icon: FiSun,
      description: "Clean and bright interface",
      preview: "🌞",
    },
    {
      value: "dark",
      label: "Dark",
      icon: FiMoon,
      description: "Easy on the eyes",
      preview: "🌙",
    },
    {
      value: "auto",
      label: "Auto",
      icon: FiSettings,
      description: "Follow system preference",
      preview: "🔄",
    },
  ];

  const currentTheme = themes.find((t) => t.value === preferences.theme) || themes[0];

  return (
    <>
      <HStack spacing={2}>
        <Tooltip label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}>
          <MotionIconButton
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={handleToggle}
            variant="ghost"
            size="md"
            aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
            animate={isAnimating ? { rotate: 180 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        </Tooltip>

        <Tooltip label="Theme settings">
          <IconButton
            icon={<FiPalette />}
            onClick={onOpen}
            variant="ghost"
            size="md"
            aria-label="Theme settings"
          />
        </Tooltip>
      </HStack>

      {/* Theme Settings Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader>
            <HStack spacing={2}>
              <FiPalette />
              <Text>Theme Settings</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm" color="gray.600">
                Choose your preferred theme or let the system decide automatically.
              </Text>

              <VStack spacing={3} align="stretch">
                {themes.map((theme) => (
                  <Box
                    key={theme.value}
                    p={4}
                    border="2px solid"
                    borderColor={
                      preferences.theme === theme.value ? "saffron.300" : borderColor
                    }
                    borderRadius="lg"
                    cursor="pointer"
                    onClick={() => handleThemeSelect(theme.value)}
                    bg={preferences.theme === theme.value ? "saffron.50" : "transparent"}
                    _hover={{
                      borderColor: "saffron.300",
                      bg: "saffron.50",
                    }}
                    transition="all 0.2s"
                  >
                    <HStack spacing={4} align="center">
                      <Box
                        p={3}
                        bg={theme.value === "light" ? "yellow.100" : theme.value === "dark" ? "gray.100" : "blue.100"}
                        borderRadius="full"
                        color={theme.value === "light" ? "yellow.600" : theme.value === "dark" ? "gray.600" : "blue.600"}
                      >
                        <theme.icon size={20} />
                      </Box>

                      <VStack spacing={1} align="start" flex={1}>
                        <HStack spacing={2} align="center">
                          <Text fontWeight="medium">{theme.label}</Text>
                          {preferences.theme === theme.value && (
                            <Badge colorScheme="saffron" variant="subtle" fontSize="xs">
                              Active
                            </Badge>
                          )}
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          {theme.description}
                        </Text>
                      </VStack>

                      <Text fontSize="2xl">{theme.preview}</Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>

              <Box
                p={4}
                bg="gray.50"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              >
                <HStack spacing={2} mb={2}>
                  <FiSettings size={16} />
                  <Text fontSize="sm" fontWeight="medium">
                    Current Theme
                  </Text>
                </HStack>
                <HStack spacing={2}>
                  <currentTheme.icon size={16} />
                  <Text fontSize="sm">
                    {currentTheme.label} ({colorMode === "light" ? "Light" : "Dark"} mode active)
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ThemeToggle;
