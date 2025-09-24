import { useState } from "react";

export const useQuiz = (questions, categories) => {
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const filteredQuestions = selectedCategory === "All"
    ? questions
    : questions.filter(q => q.category === selectedCategory);

  const handleNext = () => {
    const isCorrect = parseInt(value) === filteredQuestions[idx].correct;
    const newAnswer = {
      question: filteredQuestions[idx].q,
      selected: parseInt(value),
      correct: filteredQuestions[idx].correct,
      isCorrect,
      explanation: filteredQuestions[idx].explanation
    };

    setAnswers(prev => [...prev, newAnswer]);

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setShowExplanation(true);

    setTimeout(() => {
      setShowExplanation(false);
      if (idx < filteredQuestions.length - 1) {
        setIdx(idx + 1);
        setValue("");
      } else {
        setShowResult(true);
      }
    }, 2500);
  };

  const resetQuiz = () => {
    setIdx(0);
    setScore(0);
    setValue("");
    setShowResult(false);
    setAnswers([]);
    setShowExplanation(false);
  };

  const getScoreBadge = () => {
    const percentage = (score / filteredQuestions.length) * 100;
    if (percentage >= 90) return { text: "Excellent!", color: "green", iconName: "FaTrophy" };
    if (percentage >= 70) return { text: "Good Job!", color: "blue", iconName: "FaStar" };
    if (percentage >= 50) return { text: "Keep Trying!", color: "orange", iconName: "FaRedo" };
    return { text: "Practice More!", color: "red", iconName: "FaRedo" };
  };

  return {
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
  };
};
