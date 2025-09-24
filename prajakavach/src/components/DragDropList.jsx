import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGripVertical, FiTrash2 } from "react-icons/fi";

const MotionBox = motion(Box);

const DragDropList = ({
  items,
  onReorder,
  onDelete,
  renderItem,
  itemHeight = "60px",
  showDelete = true,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const bgColor = useColorModeValue("white", "gray.800");
  const hoverBgColor = useColorModeValue("gray.50", "gray.700");
  const dragBgColor = useColorModeValue("blue.50", "blue.900");

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = draggedIndex;

    if (dragIndex === dropIndex) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    onReorder(newItems);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onReorder(newItems);
  };

  return (
    <VStack spacing={2} align="stretch">
      <AnimatePresence>
        {items.map((item, index) => (
          <MotionBox
            key={item.id || index}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Box
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              bg={
                draggedIndex === index
                  ? dragBgColor
                  : dragOverIndex === index
                  ? hoverBgColor
                  : bgColor
              }
              borderRadius="md"
              border="1px solid"
              borderColor="gray.200"
              p={3}
              minH={itemHeight}
              cursor="grab"
              _hover={{ bg: hoverBgColor }}
              _active={{ cursor: "grabbing" }}
              transition="all 0.2s"
              position="relative"
            >
              <HStack spacing={3} align="center">
                <IconButton
                  icon={<FiGripVertical />}
                  size="sm"
                  variant="ghost"
                  color="gray.400"
                  cursor="grab"
                  _active={{ cursor: "grabbing" }}
                  aria-label="Drag to reorder"
                />

                <Box flex={1}>
                  {renderItem ? renderItem(item, index) : <Text>{item.name || item.title}</Text>}
                </Box>

                {showDelete && (
                  <IconButton
                    icon={<FiTrash2 />}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleDelete(index)}
                    aria-label="Delete item"
                  />
                )}
              </HStack>

              {dragOverIndex === index && draggedIndex !== index && (
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  border="2px dashed"
                  borderColor="blue.400"
                  borderRadius="md"
                  bg="blue.50"
                  opacity={0.5}
                  pointerEvents="none"
                />
              )}
            </Box>
          </MotionBox>
        ))}
      </AnimatePresence>
    </VStack>
  );
};

export default DragDropList;
