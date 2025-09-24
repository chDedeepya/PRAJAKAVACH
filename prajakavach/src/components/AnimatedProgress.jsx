import React, { useEffect, useState } from "react";
import {
  Box,
  Progress,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";

const MotionBox = motion(Box);

const AnimatedProgress = ({
  value,
  max = 100,
  size = "md",
  colorScheme = "blue",
  showPercentage = true,
  label,
  animated = true,
  duration = 1,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();
  const bgColor = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
        controls.start({
          width: `${(value / max) * 100}%`,
          transition: { duration, ease: "easeOut" },
        });
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, max, animated, duration, controls]);

  const sizeProps = {
    xs: { height: "2", fontSize: "xs" },
    sm: { height: "3", fontSize: "sm" },
    md: { height: "4", fontSize: "md" },
    lg: { height: "6", fontSize: "lg" },
  };

  const { height, fontSize } = sizeProps[size] || sizeProps.md;

  return (
    <VStack spacing={2} align="stretch" w="full">
      {label && (
        <HStack justify="space-between">
          <Text fontSize={fontSize} fontWeight="medium">
            {label}
          </Text>
          {showPercentage && (
            <Text fontSize={fontSize} color="gray.600">
              {Math.round(displayValue)}%
            </Text>
          )}
        </HStack>
      )}

      <Box position="relative" bg={bgColor} borderRadius="full" overflow="hidden">
        <MotionBox
          position="absolute"
          top="0"
          left="0"
          height="full"
          bg={`${colorScheme}.500`}
          borderRadius="full"
          initial={{ width: 0 }}
          animate={controls}
        />
        <Progress
          value={displayValue}
          max={max}
          size={height}
          colorScheme={colorScheme}
          opacity="0"
          pointerEvents="none"
        />
      </Box>

      {!label && showPercentage && (
        <Text fontSize={fontSize} textAlign="center" color="gray.600">
          {Math.round(displayValue)}%
        </Text>
      )}
    </VStack>
  );
};

export default AnimatedProgress;
