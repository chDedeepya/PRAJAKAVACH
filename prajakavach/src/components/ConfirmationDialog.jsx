import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiTrash2, FiArchive, FiEdit } from "react-icons/fi";

const MotionAlertDialogContent = motion(AlertDialogContent);

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColorScheme = "red",
  type = "danger",
  items = [],
  isLoading = false,
}) => {
  const cancelRef = React.useRef();
  const bgColor = useColorModeValue("red.50", "red.900");

  const getIcon = () => {
    switch (type) {
      case "delete":
        return <FiTrash2 size={24} />;
      case "archive":
        return <FiArchive size={24} />;
      case "edit":
        return <FiEdit size={24} />;
      default:
        return <FiAlertTriangle size={24} />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "delete":
        return "red";
      case "archive":
        return "orange";
      case "edit":
        return "blue";
      default:
        return "yellow";
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <MotionAlertDialogContent
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <HStack spacing={3}>
              <Badge colorScheme={getTypeColor()} p={2} borderRadius="full">
                {getIcon()}
              </Badge>
              <Text>{title}</Text>
            </HStack>
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack spacing={4} align="stretch">
              <Text>{description}</Text>

              {items.length > 0 && (
                <VStack spacing={2} align="stretch" maxH="200px" overflowY="auto">
                  <Text fontSize="sm" fontWeight="medium">
                    The following {items.length} item{items.length !== 1 ? "s" : ""} will be affected:
                  </Text>
                  {items.map((item, index) => (
                    <HStack key={index} spacing={2} p={2} bg={bgColor} borderRadius="md">
                      <Text fontSize="sm" flex={1}>
                        {typeof item === "string" ? item : item.name || item.title || `Item ${index + 1}`}
                      </Text>
                      {item.type && (
                        <Badge size="sm" colorScheme="gray">
                          {item.type}
                        </Badge>
                      )}
                    </HStack>
                  ))}
                </VStack>
              )}

              {type === "delete" && (
                <Text fontSize="sm" color="red.600" fontWeight="medium">
                  ⚠️ This action cannot be undone.
                </Text>
              )}
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} isDisabled={isLoading}>
              {cancelText}
            </Button>
            <Button
              colorScheme={confirmColorScheme}
              onClick={onConfirm}
              ml={3}
              isLoading={isLoading}
              loadingText="Processing..."
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </MotionAlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
