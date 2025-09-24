import React from "react";
import {
  Box, Heading, VStack, Card, CardBody, HStack, Text, Icon
} from "@chakra-ui/react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const AnswerReview = ({ answers, questions, onStartNewQuiz }) => {
  return (
    <Box>
      <Heading size="md" mb={4} color="green.700">
        Answer Review
      </Heading>
      <VStack spacing={4} align="start">
        {answers.map((answer, i) => {
          const question = questions.find(q => q.q === answer.question);
          return (
            <Card key={i} w="100%" bg={answer.isCorrect ? "green.50" : "red.50"}>
              <CardBody>
                <HStack spacing={3} mb={2}>
                  <Icon
                    as={answer.isCorrect ? FaCheckCircle : FaTimesCircle}
                    color={answer.isCorrect ? "green.500" : "red.500"}
                  />
                  <Text fontWeight="bold">Question {i + 1}</Text>
                </HStack>
                <Text mb={2}>{answer.question}</Text>
                <Text fontSize="sm" color="gray.600">
                  Your answer: {question?.options[answer.selected]}
                </Text>
                {!answer.isCorrect && (
                  <Text fontSize="sm" color="green.600">
                    Correct answer: {question?.options[answer.correct]}
                  </Text>
                )}
                <Text fontSize="sm" mt={2} fontStyle="italic">
                  {answer.explanation}
                </Text>
              </CardBody>
            </Card>
          );
        })}
      </VStack>
      <Box mt={6} textAlign="center">
        <Text fontSize="sm" color="gray.500" mb={4}>
          Review complete! Ready for another quiz?
        </Text>
      </Box>
    </Box>
  );
};
