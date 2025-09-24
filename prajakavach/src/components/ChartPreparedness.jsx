import React, { useState, useEffect } from "react";
import {
  VStack,
  Text,
  Progress,
  Box,
  HStack,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  IconButton,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiPlus, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import useScreenReader from "../hooks/useScreenReader";
import useFocusTrap from "../hooks/useFocusTrap";
import useScrollTrigger from "../hooks/useScrollTrigger";

const MotionBox = motion(Box);

export default function ChartPreparedness() {
  const [classes, setClasses] = useState([
    { id: 1, label: "Class 1-5", value: 65, color: "orange", trend: "up", change: 5 },
    { id: 2, label: "Class 6-10", value: 51, color: "green", trend: "down", change: 2 },
    { id: 3, label: "Class 11-12", value: 39, color: "blue", trend: "up", change: 8 },
  ]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({ label: "", value: 0, color: "orange" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { announceSuccess, announceError, announceNavigation } = useScreenReader();
  const focusTrapRef = useFocusTrap(isOpen);
  const [scrollRef, isInView] = useScrollTrigger(0.2);

  const openAddModal = () => {
    setSelectedClass(null);
    setFormData({ label: "", value: 0, color: "orange" });
    onOpen();
    announceNavigation("Add new class modal opened");
  };

  const openEditModal = (cls) => {
    setSelectedClass(cls);
    setFormData({ label: cls.label, value: cls.value, color: cls.color });
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (selectedClass) {
      setClasses((prev) =>
        prev.map((cls) =>
          cls.id === selectedClass.id ? { ...cls, ...formData } : cls
        )
      );
      toast({ title: "Class updated", status: "success" });
      announceSuccess("Class data updated successfully");
    } else {
      setClasses((prev) => [...prev, { id: Date.now(), ...formData }]);
      toast({ title: "Class added", status: "success" });
      announceSuccess("New class added successfully");
    }
    onClose();
  };

  const handleDelete = (id) => {
    const classToDelete = classes.find(cls => cls.id === id);
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
    toast({ title: "Class deleted", status: "success" });
    announceSuccess(`${classToDelete?.label || 'Class'} deleted successfully`);
  };

  return (
    <MotionBox
      ref={scrollRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <VStack spacing={6} align="stretch" w="100%">
        <MotionBox
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HStack justify="space-between" wrap="wrap" spacing={4}>
            <Text fontSize="2xl" fontWeight="bold" color="saffron.600">
              Preparedness Analytics
            </Text>
            <Tooltip label="Add new class data">
              <IconButton
                icon={<FiPlus />}
                colorScheme="saffron"
                onClick={openAddModal}
                size={isMobile ? "md" : "lg"}
                aria-label="Add new class"
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              />
            </Tooltip>
          </HStack>
        </MotionBox>

      <SimpleGrid columns={gridColumns} spacing={6} w="100%">
        {classes.map((c, index) => (
          <MotionBox
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Box
              p={6}
              bg="white"
              borderRadius="xl"
              boxShadow="lg"
              border="1px solid"
              borderColor="gray.100"
              _hover={{ boxShadow: "xl", borderColor: "saffron.200" }}
              transition="all 0.3s"
            >
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="center">
                  <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                    {c.label}
                  </Text>
                  <Badge
                    colorScheme={c.trend === "up" ? "green" : "red"}
                    variant="subtle"
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    {c.trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
                    {c.change}%
                  </Badge>
                </HStack>

                <Stat>
                  <StatLabel fontSize="sm" color="gray.500">Preparedness Level</StatLabel>
                  <StatNumber fontSize="3xl" color={`${c.color}.500`}>
                    {c.value}%
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type={c.trend} />
                    {c.change}% from last month
                  </StatHelpText>
                </Stat>

                <MotionBox
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 1.5, delay: index * 0.2 + 0.5, ease: "easeOut" }}
                >
                  <Progress
                    hasStripe
                    value={c.value}
                    size="lg"
                    colorScheme={c.color}
                    borderRadius="md"
                    bg="gray.100"
                  />
                </MotionBox>

                <HStack spacing={2} justify="flex-end">
                  <Tooltip label="Edit class">
                    <IconButton
                      icon={<FiEdit2 />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => openEditModal(c)}
                      aria-label={`Edit ${c.label}`}
                    />
                  </Tooltip>
                  <Tooltip label="Delete class">
                    <IconButton
                      icon={<FiTrash2 />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDelete(c.id)}
                      aria-label={`Delete ${c.label}`}
                    />
                  </Tooltip>
                </HStack>
              </VStack>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? "full" : "md"}>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent
          ref={focusTrapRef}
          as={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ModalHeader color="saffron.600">
            {selectedClass ? "Edit Class Data" : "Add New Class"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={2} fontWeight="medium">Class Label</Text>
                <Input
                  placeholder="e.g., Class 1-5"
                  name="label"
                  value={formData.label}
                  onChange={handleInputChange}
                  focusBorderColor="saffron.400"
                  isRequired
                />
              </Box>
              <Box w="100%">
                <Text mb={2} fontWeight="medium">Preparedness Value (%)</Text>
                <Input
                  placeholder="0-100"
                  name="value"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.value}
                  onChange={handleInputChange}
                  focusBorderColor="saffron.400"
                  isRequired
                />
              </Box>
              <Box w="100%">
                <Text mb={2} fontWeight="medium">Color Theme</Text>
                <Input
                  placeholder="orange, green, blue, etc."
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  focusBorderColor="saffron.400"
                />
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="saffron"
              onClick={handleSubmit}
              isDisabled={!formData.label || formData.value < 0 || formData.value > 100}
            >
              {selectedClass ? "Update Class" : "Add Class"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </VStack>
    </MotionBox>
  );
}
