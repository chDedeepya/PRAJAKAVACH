import React from "react";
import { Box, Heading, Badge, Text, Progress, VStack, Button, Icon } from "@chakra-ui/react";
import { FaTrophy, FaStar, FaRedo } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const QuizResults = ({ score, totalQuestions, badge, onReview, onRestart }) => {
  const percentage = (score / totalQuestions) * 100;

  const getIcon = () => {
    switch (badge.iconName) {
      case "FaTrophy": return FaTrophy;
      case "FaStar": return FaStar;
      case "FaRedo": return FaRedo;
      default: return FaRedo;
    }
  };

  return (
    <MotionBox
      textAlign="center"
      py={8}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Icon as={getIcon()} boxSize={16} color={`${badge.color}.500`} mb={4} />
      <Heading size="lg" mb={2}>
        Quiz Complete!
      </Heading>
      <Badge colorScheme={badge.color} fontSize="lg" p={2} mb={4}>
        {badge.text}
      </Badge>
      <Text fontSize="2xl" color="green.600" fontWeight="bold" mb={2}>
        Score: {score} / {totalQuestions}
      </Text>
      <Progress
        value={percentage}
        size="lg"
        colorScheme={badge.color}
        borderRadius="md"
        mb={6}
      />
      <VStack spacing={4}>
        <Button colorScheme="blue" onClick={onReview}>
          Review Answers
        </Button>
        <Button colorScheme="green" onClick={onRestart}>
          Try Again
        </Button>
      </VStack>
    </MotionBox>
  );
};
