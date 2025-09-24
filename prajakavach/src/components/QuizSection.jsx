import React from "react";
import { Box, Heading, SimpleGrid, Button, Text, HStack, Progress, useToast } from "@chakra-ui/react";
import { questions, categories } from "../data/quizData";
import { useQuiz } from "../hooks/useQuiz";
import { QuestionCard, QuizResults, AnswerReview } from "./QuizSection/index";

export default function QuizSection() {
  const toast = useToast();
  const {
    idx,
    value,
    setValue,
    score,
    showResult,
    setShowResult,
    selectedCategory,
    setSelectedCategory,
    answers,
    showExplanation,
    filteredQuestions,
    handleNext,
    resetQuiz,
    getScoreBadge
  } = useQuiz(questions, categories);

  const handleNextWithToast = () => {
    const isCorrect = parseInt(value) === filteredQuestions[idx].correct;

    if (isCorrect) {
      toast({
        title: "Correct! 🎉",
        description: "Great job!",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Keep learning!",
        status: "warning",
        duration: 1500,
        isClosable: true,
      });
    }

    handleNext();
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    resetQuiz();
  };

  if (showResult) {
    const badge = getScoreBadge();
    return (
      <QuizResults
        score={score}
        totalQuestions={filteredQuestions.length}
        badge={badge}
        onReview={() => setShowResult(false)}
        onRestart={resetQuiz}
      />
    );
  }

  if (answers.length > 0 && !showResult) {
    return (
      <AnswerReview
        answers={answers}
        questions={questions}
        onStartNewQuiz={resetQuiz}
      />
    );
  }

  return (
    <Box>
      <Heading size="md" mb={4} color="green.700">
        Safety Quiz Challenge
      </Heading>

      <SimpleGrid columns={{ base: 2, md: 4, lg: 8 }} spacing={2} mb={6}>
        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={selectedCategory === cat ? "solid" : "outline"}
            colorScheme={selectedCategory === cat ? "green" : "gray"}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </Button>
        ))}
      </SimpleGrid>

      <HStack spacing={4} mb={6}>
        <Text fontSize="sm" color="gray.600">
          Progress: {idx + 1} / {filteredQuestions.length}
        </Text>
        <Progress
          value={((idx + 1) / filteredQuestions.length) * 100}
          size="sm"
          colorScheme="green"
          w="200px"
        />
      </HStack>

      <QuestionCard
        question={filteredQuestions[idx]}
        value={value}
        setValue={setValue}
        onNext={handleNextWithToast}
        showExplanation={showExplanation}
        isLastQuestion={idx === filteredQuestions.length - 1}
      />
    </Box>
  );
}
