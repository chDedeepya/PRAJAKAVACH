import React, { useState, useEffect } from "react";
import {
  VStack,
  HStack,
  Text,
  Tag,
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
} from "@chakra-ui/react";

export default function DrillParticipationList() {
  const [participation, setParticipation] = useState([
    { id: 1, name: "Class 3A", percent: 92 },
    { id: 2, name: "Class 7B", percent: 88 },
    { id: 3, name: "Class 12C", percent: 71 },
  ]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({ name: "", percent: 0 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const openAddModal = () => {
    setSelectedClass(null);
    setFormData({ name: "", percent: 0 });
    onOpen();
  };

  const openEditModal = (cls) => {
    setSelectedClass(cls);
    setFormData({ name: cls.name, percent: cls.percent });
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "percent" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    if (selectedClass) {
      setParticipation((prev) =>
        prev.map((cls) =>
          cls.id === selectedClass.id ? { ...cls, ...formData } : cls
        )
      );
      toast({ title: "Participation updated", status: "success" });
    } else {
      setParticipation((prev) => [...prev, { id: Date.now(), ...formData }]);
      toast({ title: "Participation added", status: "success" });
    }
    onClose();
  };

  const handleDelete = (id) => {
    setParticipation((prev) => prev.filter((cls) => cls.id !== id));
    toast({ title: "Participation deleted", status: "success" });
  };

  return (
    <VStack align="start" spacing={3}>
      <Button colorScheme="blue" mb={4} onClick={openAddModal}>
        Add Participation
      </Button>
      {participation.map((c) => (
        <HStack
          key={c.id}
          bg="india.50"
          p={3}
          borderRadius="md"
          w="100%"
          justify="space-between"
        >
          <Text fontWeight="bold">{c.name}</Text>
          <Tag colorScheme={c.percent > 80 ? "green" : "orange"} fontWeight="bold">
            {c.percent}%
          </Tag>
          <Button size="sm" onClick={() => openEditModal(c)}>
            Edit
          </Button>
          <Button size="sm" colorScheme="red" onClick={() => handleDelete(c.id)}>
            Delete
          </Button>
        </HStack>
      ))}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedClass ? "Edit Participation" : "Add Participation"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Class Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              placeholder="Participation %"
              name="percent"
              type="number"
              value={formData.percent}
              onChange={handleInputChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
