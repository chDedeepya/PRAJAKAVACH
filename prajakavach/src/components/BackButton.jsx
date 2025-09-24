import React from "react";
import { IconButton, useColorModeValue } from "@chakra-ui/react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionIconButton = motion(IconButton);

export default function BackButton() {
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.800");

  return (
    <MotionIconButton
      icon={<MdArrowBack />}
      onClick={() => navigate("/")}
      position="fixed"
      top={4}
      left={4}
      zIndex={10}
      bg={bg}
      boxShadow="lg"
      size="lg"
      aria-label="Back to Home"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      _hover={{ bg: "saffron.100" }}
    />
  );
}
