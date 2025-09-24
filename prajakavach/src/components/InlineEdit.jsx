import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Input,
  Text,
  Button,
  HStack,
  VStack,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";

const MotionBox = motion(Box);

const InlineEdit = ({
  value,
  onSave,
  placeholder = "Enter value...",
  type = "text",
  validation,
  isEditable = true,
  size = "md",
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleStartEdit = () => {
    if (!isEditable) return;
    setIsEditing(true);
    setError("");
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    setError("");
  };

  const handleSave = async () => {
    // Validation
    if (validation) {
      const validationError = validation(editValue);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    try {
      await onSave(editValue);
      setIsEditing(false);
      setError("");
      toast({
        title: "Updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      setError("Failed to save changes");
      toast({
        title: "Update failed",
        description: err.message || "Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <MotionBox
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1 }}
      >
        <VStack spacing={1} align="stretch">
          <HStack spacing={2}>
            <Input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              type={type}
              size={size}
              isInvalid={!!error}
              {...props}
            />
            <IconButton
              icon={<FiCheck />}
              size={size}
              colorScheme="green"
              variant="solid"
              onClick={handleSave}
              aria-label="Save changes"
            />
            <IconButton
              icon={<FiX />}
              size={size}
              colorScheme="gray"
              variant="outline"
              onClick={handleCancel}
              aria-label="Cancel editing"
            />
          </HStack>
          {error && (
            <Text fontSize="xs" color="red.500">
              {error}
            </Text>
          )}
        </VStack>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      onClick={handleStartEdit}
      cursor={isEditable ? "pointer" : "default"}
      _hover={isEditable ? { bg: "gray.50", borderRadius: "md" } : {}}
      p={1}
      borderRadius="md"
      transition="all 0.2s"
    >
      <HStack spacing={2}>
        <Text {...props}>
          {value || <Text as="span" color="gray.400">{placeholder}</Text>}
        </Text>
        {isEditable && (
          <IconButton
            icon={<FiEdit2 />}
            size="xs"
            variant="ghost"
            colorScheme="gray"
            aria-label="Edit value"
            opacity={0.6}
            _groupHover={{ opacity: 1 }}
          />
        )}
      </HStack>
    </MotionBox>
  );
};

export default InlineEdit;
