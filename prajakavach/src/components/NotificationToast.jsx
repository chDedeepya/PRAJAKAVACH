import React, { useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  useToast,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const NotificationToast = ({
  title,
  description,
  status = "info",
  duration = 5000,
  isClosable = true,
  position = "top-right",
}) => {
  const toast = useToast();

  useEffect(() => {
    toast({
      position,
      duration,
      render: ({ onClose }) => (
        <MotionBox
          initial={{ opacity: 0, x: 300, scale: 0.3 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 40,
            mass: 1,
          }}
        >
          <Alert status={status} borderRadius="md" boxShadow="lg" maxW="400px">
            <AlertIcon />
            <Box flex="1">
              {title && <AlertTitle>{title}</AlertTitle>}
              {description && <AlertDescription>{description}</AlertDescription>}
            </Box>
            {isClosable && <CloseButton onClick={onClose} />}
          </Alert>
        </MotionBox>
      ),
    });
  }, [toast, title, description, status, duration, isClosable, position]);

  return null;
};

export default NotificationToast;
