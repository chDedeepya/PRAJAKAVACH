import React, { useState, useCallback, createContext, useContext } from "react";
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  useToast,
  Tooltip,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUndo, FiRedo, FiRotateCcw, FiRotateCw } from "react-icons/fi";

const MotionBox = motion(Box);

// Context for managing undo/redo state
const UndoRedoContext = createContext();

export const useUndoRedo = () => {
  const context = useContext(UndoRedoContext);
  if (!context) {
    throw new Error("useUndoRedo must be used within UndoRedoProvider");
  }
  return context;
};

export const UndoRedoProvider = ({ children, maxHistory = 50 }) => {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const toast = useToast();

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const addAction = useCallback((action) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(action);

    // Limit history size
    if (newHistory.length > maxHistory) {
      newHistory.shift();
    }

    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  }, [history, currentIndex, maxHistory]);

  const undo = useCallback(() => {
    if (!canUndo) return;

    const action = history[currentIndex];
    if (action.undo) {
      action.undo();
      setCurrentIndex(currentIndex - 1);

      toast({
        title: "Action undone",
        description: action.description || "Last action has been undone",
        status: "info",
        duration: 2000,
      });
    }
  }, [canUndo, history, currentIndex, toast]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    const action = history[currentIndex + 1];
    if (action.redo) {
      action.redo();
      setCurrentIndex(currentIndex + 1);

      toast({
        title: "Action redone",
        description: action.description || "Action has been redone",
        status: "success",
        duration: 2000,
      });
    }
  }, [canRedo, history, currentIndex, toast]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  const value = {
    addAction,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
    history: history.slice(0, currentIndex + 1),
  };

  return (
    <UndoRedoContext.Provider value={value}>
      {children}
    </UndoRedoContext.Provider>
  );
};

const UndoRedoControls = ({
  position = "fixed",
  top = 4,
  right = 4,
  showLabels = false,
  size = "md",
}) => {
  const { undo, redo, canUndo, canRedo } = useUndoRedo();
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <AnimatePresence>
      {(canUndo || canRedo) && (
        <MotionBox
          position={position}
          top={top}
          right={right}
          zIndex={1000}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Box
            bg={bgColor}
            p={2}
            borderRadius="lg"
            boxShadow="lg"
            border="1px solid"
            borderColor="gray.200"
          >
            <HStack spacing={1}>
              <Tooltip label="Undo (Ctrl+Z)" placement="bottom">
                <IconButton
                  icon={<FiUndo />}
                  size={size}
                  variant="ghost"
                  colorScheme="gray"
                  onClick={undo}
                  isDisabled={!canUndo}
                  aria-label="Undo"
                />
              </Tooltip>

              <Tooltip label="Redo (Ctrl+Y)" placement="bottom">
                <IconButton
                  icon={<FiRedo />}
                  size={size}
                  variant="ghost"
                  colorScheme="gray"
                  onClick={redo}
                  isDisabled={!canRedo}
                  aria-label="Redo"
                />
              </Tooltip>
            </HStack>
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

const UndoRedoHistory = ({ maxHeight = "300px" }) => {
  const { history, currentIndex } = useUndoRedo();
  const bgColor = useColorModeValue("gray.50", "gray.700");

  if (history.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Text color="gray.500">No actions to show</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={0} align="stretch" maxH={maxHeight} overflowY="auto">
      {history.map((action, index) => (
        <HStack
          key={index}
          p={3}
          bg={index === currentIndex ? bgColor : "transparent"}
          borderLeft={index === currentIndex ? "3px solid" : "3px solid transparent"}
          borderLeftColor={index === currentIndex ? "blue.500" : "transparent"}
          spacing={3}
        >
          <Box flex={1}>
            <Text fontSize="sm" fontWeight={index === currentIndex ? "medium" : "normal"}>
              {action.description || `Action ${index + 1}`}
            </Text>
            {action.timestamp && (
              <Text fontSize="xs" color="gray.500">
                {new Date(action.timestamp).toLocaleTimeString()}
              </Text>
            )}
          </Box>

          {index === currentIndex && (
            <Text fontSize="xs" color="blue.500" fontWeight="bold">
              Current
            </Text>
          )}
        </HStack>
      ))}
    </VStack>
  );
};

// Hook for creating undoable actions
export const useUndoableAction = () => {
  const { addAction } = useUndoRedo();

  const createUndoableAction = useCallback((description, doAction, undoAction) => {
    return () => {
      // Execute the action
      const result = doAction();

      // Add to history
      addAction({
        description,
        timestamp: Date.now(),
        undo: undoAction,
        redo: doAction,
      });

      return result;
    };
  }, [addAction]);

  return createUndoableAction;
};

export {
  UndoRedoProvider,
  useUndoRedo,
  UndoRedoControls,
  UndoRedoHistory,
  useUndoableAction,
};
