import React, { useState, useEffect, createContext, useContext } from "react";
import { Box, Spinner, Text, VStack, HStack, useToast } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiLoader } from "react-icons/fi";

const MotionBox = motion(Box);

// Context for managing optimistic updates
const OptimisticUpdateContext = createContext();

export const useOptimisticUpdate = () => {
  const context = useContext(OptimisticUpdateContext);
  if (!context) {
    throw new Error("useOptimisticUpdate must be used within OptimisticUpdateProvider");
  }
  return context;
};

export const OptimisticUpdateProvider = ({ children }) => {
  const [updates, setUpdates] = useState(new Map());
  const toast = useToast();

  const addUpdate = (id, optimisticData, actualUpdate) => {
    setUpdates(prev => new Map(prev.set(id, {
      status: "pending",
      optimisticData,
      actualUpdate,
      timestamp: Date.now(),
    })));

    // Perform the actual update
    actualUpdate()
      .then((result) => {
        setUpdates(prev => {
          const newMap = new Map(prev);
          newMap.set(id, {
            ...newMap.get(id),
            status: "success",
            result,
          });
          return newMap;
        });

        // Remove successful update after a delay
        setTimeout(() => {
          setUpdates(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
          });
        }, 2000);
      })
      .catch((error) => {
        setUpdates(prev => {
          const newMap = new Map(prev);
          newMap.set(id, {
            ...newMap.get(id),
            status: "error",
            error,
          });
          return newMap;
        });

        toast({
          title: "Update failed",
          description: "Your changes couldn't be saved. Please try again.",
          status: "error",
          duration: 5000,
        });

        // Remove failed update after a delay
        setTimeout(() => {
          setUpdates(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
          });
        }, 5000);
      });
  };

  const getUpdateStatus = (id) => {
    return updates.get(id);
  };

  const value = {
    addUpdate,
    getUpdateStatus,
    updates: Array.from(updates.entries()),
  };

  return (
    <OptimisticUpdateContext.Provider value={value}>
      {children}
    </OptimisticUpdateContext.Provider>
  );
};

const UpdateIndicator = ({ id, position = "absolute", top = 2, right = 2 }) => {
  const { getUpdateStatus } = useOptimisticUpdate();
  const update = getUpdateStatus(id);

  if (!update) return null;

  const getIcon = () => {
    switch (update.status) {
      case "pending":
        return <FiLoader className="animate-spin" />;
      case "success":
        return <FiCheck />;
      case "error":
        return <FiX />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (update.status) {
      case "pending":
        return "blue";
      case "success":
        return "green";
      case "error":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <AnimatePresence>
      <MotionBox
        position={position}
        top={top}
        right={right}
        zIndex={10}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Box
          bg={`${getColor()}.500`}
          color="white"
          p={1}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="md"
        >
          {getIcon()}
        </Box>
      </MotionBox>
    </AnimatePresence>
  );
};

const OptimisticListItem = ({
  id,
  children,
  optimisticData,
  onUpdate,
  renderOptimistic,
}) => {
  const { getUpdateStatus, addUpdate } = useOptimisticUpdate();
  const update = getUpdateStatus(id);

  const handleOptimisticUpdate = (newData) => {
    addUpdate(id, newData, () => onUpdate(newData));
  };

  // Show optimistic data if there's a pending update
  if (update?.status === "pending" && renderOptimistic) {
    return renderOptimistic(update.optimisticData);
  }

  return (
    <Box position="relative">
      {children}
      <UpdateIndicator id={id} />
    </Box>
  );
};

const OptimisticForm = ({
  id,
  children,
  onSubmit,
  optimisticData,
  renderOptimistic,
}) => {
  const { addUpdate } = useOptimisticUpdate();

  const handleSubmit = (formData) => {
    addUpdate(id, optimisticData || formData, () => onSubmit(formData));
  };

  return (
    <Box position="relative">
      {children}
      <UpdateIndicator id={id} position="fixed" top={4} right={4} />
    </Box>
  );
};

export {
  OptimisticUpdateProvider,
  useOptimisticUpdate,
  UpdateIndicator,
  OptimisticListItem,
  OptimisticForm,
};
