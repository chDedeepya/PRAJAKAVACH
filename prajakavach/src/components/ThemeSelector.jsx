import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  useColorMode,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdBrightness6, MdBrightnessHigh, MdPalette } from "react-icons/md";

import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const MotionBox = motion(Box);

const themes = [
  { name: "Light", value: "light", icon: MdBrightnessHigh, type: "colorMode" },
  { name: "Dark", value: "dark", icon: MdBrightness6, type: "colorMode" },
  { name: "Indian Saffron", value: "default", icon: MdPalette, type: "custom" },
  { name: "South Blue", value: "southBlue", icon: MdPalette, type: "custom" },
  { name: "Western Green", value: "westernGreen", icon: MdPalette, type: "custom" },
  { name: "Bengali Pink", value: "bengaliPink", icon: MdPalette, type: "custom" },
];

export default function ThemeSelector() {
  const { colorMode, setColorMode } = useColorMode();
  const { setCurrentTheme, theme: currentCustomTheme } = useTheme();
  const [currentTheme, setCurrentThemeState] = useState("light");
  const bg = useColorModeValue("white", "gray.800");

  useEffect(() => {
    setCurrentThemeState(colorMode);
  }, [colorMode]);

  const handleThemeChange = (theme) => {
    if (theme.type === "colorMode") {
      setColorMode(theme.value);
      setCurrentThemeState(theme.value);
    } else {
      setColorMode("light"); // Set to light mode for custom themes
      setCurrentTheme(theme.value);
      setCurrentThemeState(theme.value);
    }
  };

  const getCurrentThemeValue = () => {
    if (colorMode === "light" || colorMode === "dark") {
      return colorMode;
    }
    return currentCustomTheme ? "default" : "light"; // Default fallback
  };

  return (
    <MotionBox
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<MdPalette />}
          variant="ghost"
          size="lg"
          aria-label="Theme selector"
          _hover={{ bg: "saffron.100" }}
        />
        <MenuList bg={bg} borderRadius="xl" boxShadow="xl">
          <VStack spacing={2} p={2}>
            {themes.map((theme) => (
              <MenuItem
                key={theme.value}
                onClick={() => handleThemeChange(theme)}
                bg={getCurrentThemeValue() === theme.value ? "saffron.100" : "transparent"}
                borderRadius="md"
                _hover={{ bg: "saffron.50" }}
              >
                <HStack>
                  <theme.icon />
                  <Text>{theme.name}</Text>
                  {getCurrentThemeValue() === theme.value && <Text color="saffron.500">✓</Text>}
                </HStack>
              </MenuItem>
            ))}
          </VStack>
        </MenuList>
      </Menu>
    </MotionBox>
  );
}
