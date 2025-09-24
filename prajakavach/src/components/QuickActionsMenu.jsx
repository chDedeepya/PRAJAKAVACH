import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  useColorModeValue,
  IconButton,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiUser,
  FiCalendar,
  FiBarChart,
  FiSettings,
  FiZap,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const QuickActionsMenu = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const isMobile = useBreakpointValue({ base: true, md: false });

  const quickActions = [
    {
      label: "Add User",
      icon: FiUser,
      action: () => navigate("/admin"),
      color: "blue",
      description: "Create new user account",
    },
    {
      label: "Schedule Drill",
      icon: FiCalendar,
      action: () => navigate("/admin"),
      color: "green",
      description: "Plan disaster drill",
    },
    {
      label: "View Analytics",
      icon: FiBarChart,
      action: () => navigate("/admin"),
      color: "purple",
      description: "Check preparedness data",
    },
    {
      label: "Quick Quiz",
      icon: FiZap,
      action: () => navigate("/student"),
      color: "orange",
      description: "Take a quick assessment",
    },
  ];

  if (isMobile) {
    return (
      <MotionBox
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        position="fixed"
        bottom={6}
        right={6}
        zIndex={1000}
      >
        <Popover placement="top">
          <PopoverTrigger>
            <IconButton
              icon={<FiPlus />}
              colorScheme="saffron"
              size="lg"
              borderRadius="full"
              boxShadow="lg"
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Quick actions menu"
            />
          </PopoverTrigger>
          <PopoverContent w="200px">
            <PopoverArrow />
            <PopoverBody p={2}>
              <VStack spacing={1}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    leftIcon={<action.icon />}
                    variant="ghost"
                    size="sm"
                    w="full"
                    justifyContent="flex-start"
                    colorScheme={action.color}
                    onClick={action.action}
                    as={motion.button}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.label}
                  </Button>
                ))}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      position="fixed"
      top="50%"
      right={4}
      transform="translateY(-50%)"
      zIndex={100}
    >
      <VStack spacing={2}>
        {quickActions.map((action, index) => (
          <Tooltip
            key={index}
            label={
              <VStack spacing={1} align="start">
                <Text fontWeight="bold">{action.label}</Text>
                <Text fontSize="xs">{action.description}</Text>
              </VStack>
            }
            placement="left"
            hasArrow
          >
            <IconButton
              icon={<action.icon />}
              colorScheme={action.color}
              variant="solid"
              size="md"
              borderRadius="full"
              boxShadow="md"
              onClick={action.action}
              as={motion.button}
              whileHover={{ scale: 1.1, boxShadow: "lg" }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              aria-label={action.description}
            />
          </Tooltip>
        ))}
      </VStack>
    </MotionBox>
  );
};

export default QuickActionsMenu;
