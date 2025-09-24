import React from "react";
import {
  Card, CardBody, Text, RadioGroup, Stack, Radio, Button,
  HStack, Badge, Box, Divider
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

export const QuestionCard = ({
  question,
  value,
  setValue,
  onNext,
  showExplanation,
  isLastQuestion
}) => {
  return (
    <MotionCard
      key={question.q}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      bg="white"
      shadow="md"
    >
      <CardBody>
        <HStack mb={4}>
          <Box as={question.icon} boxSize={6} color="green.500" />
          <Badge colorScheme="blue">{question.category}</Badge>
        </HStack>

        <Text fontWeight="bold" mb={4} fontSize="lg">
          {question.q}
        </Text>

        <RadioGroup
          onChange={setValue}
          value={value}
          colorScheme="green"
          mb={6}
        >
          <Stack spacing={3}>
            {question.options.map((opt, i) => (
              <motion.div
                key={opt}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Radio value={i.toString()} fontWeight="medium" size="lg">
                  {opt}
                </Radio>
              </motion.div>
            ))}
          </Stack>
        </RadioGroup>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Divider mb={3} />
            <Text fontSize="sm" color="blue.600" fontStyle="italic">
              💡 {question.explanation}
            </Text>
          </motion.div>
        )}

        <Button
          colorScheme="saffron"
          isDisabled={value === ""}
          onClick={onNext}
          size="lg"
          w="full"
          mt={4}
        >
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
        </Button>
      </CardBody>
    </MotionCard>
  );
};
