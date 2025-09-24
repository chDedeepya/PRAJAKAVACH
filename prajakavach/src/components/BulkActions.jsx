import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Text,
  Badge,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiTrash2, FiEdit, FiDownload, FiArchive } from "react-icons/fi";

const MotionBox = motion(Box);

const BulkActions = ({
  selectedItems = [],
  onDelete,
  onEdit,
  onExport,
  onArchive,
  itemName = "items",
}) => {
  const [action, setAction] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  const handleAction = (actionType) => {
    setAction(actionType);
    if (actionType === "delete") {
      onOpen();
    } else {
      executeAction(actionType);
    }
  };

  const executeAction = (actionType) => {
    const actions = {
      delete: onDelete,
      edit: onEdit,
      export: onExport,
      archive: onArchive,
    };

    if (actions[actionType]) {
      actions[actionType](selectedItems);
      toast({
        title: `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} successful`,
        description: `${selectedItems.length} ${itemName} ${actionType}d successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setAction(null);
  };

  const confirmDelete = () => {
    executeAction("delete");
    onClose();
  };

  if (selectedItems.length === 0) return null;

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        p={4}
        bg="blue.50"
        borderRadius="md"
        border="1px solid"
        borderColor="blue.200"
      >
        <HStack justify="space-between" align="center">
          <HStack>
            <Badge colorScheme="blue" fontSize="sm">
              {selectedItems.length} selected
            </Badge>
            <Text fontSize="sm" color="gray.600">
              {selectedItems.length} {itemName} selected
            </Text>
          </HStack>

          <HStack spacing={2}>
            {onEdit && (
              <Button
                size="sm"
                leftIcon={<FiEdit />}
                colorScheme="blue"
                variant="outline"
                onClick={() => handleAction("edit")}
              >
                Edit
              </Button>
            )}

            {onExport && (
              <Button
                size="sm"
                leftIcon={<FiDownload />}
                colorScheme="green"
                variant="outline"
                onClick={() => handleAction("export")}
              >
                Export
              </Button>
            )}

            {onArchive && (
              <Button
                size="sm"
                leftIcon={<FiArchive />}
                colorScheme="orange"
                variant="outline"
                onClick={() => handleAction("archive")}
              >
                Archive
              </Button>
            )}

            {onDelete && (
              <Button
                size="sm"
                leftIcon={<FiTrash2 />}
                colorScheme="red"
                variant="solid"
                onClick={() => handleAction("delete")}
              >
                Delete
              </Button>
            )}
          </HStack>
        </HStack>
      </MotionBox>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {itemName}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {selectedItems.length} {itemName}?
              This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default BulkActions;
