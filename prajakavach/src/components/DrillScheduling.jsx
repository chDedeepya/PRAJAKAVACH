import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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

export default function DrillScheduling() {
  const [drills, setDrills] = useState([]);
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "", date: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // TODO: Fetch drills from backend API
    setDrills([
      { _id: "1", title: "Earthquake Drill", description: "Practice evacuation", date: "2024-07-01" },
      { _id: "2", title: "Fire Drill", description: "Fire safety procedures", date: "2024-07-15" },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setSelectedDrill(null);
    setFormData({ title: "", description: "", date: "" });
    onOpen();
  };

  const openEditModal = (drill) => {
    setSelectedDrill(drill);
    setFormData({ title: drill.title, description: drill.description, date: drill.date });
    onOpen();
  };

  const handleSubmit = () => {
    if (selectedDrill) {
      // TODO: Update drill via API
      toast({ title: "Drill updated (mock)", status: "success" });
    } else {
      // TODO: Add drill via API
      toast({ title: "Drill added (mock)", status: "success" });
    }
    onClose();
  };

  const handleDelete = (id) => {
    // TODO: Delete drill via API
    toast({ title: "Drill deleted (mock)", status: "success" });
  };

  return (
    <Box>
      <Button colorScheme="blue" mb={4} onClick={openAddModal}>
        Add Drill
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {drills.map((drill) => (
            <Tr key={drill._id}>
              <Td>{drill.title}</Td>
              <Td>{drill.description}</Td>
              <Td>{drill.date}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => openEditModal(drill)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete(drill._id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedDrill ? "Edit Drill" : "Add Drill"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              placeholder="Date"
              name="date"
              type="date"
              value={formData.date}
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
    </Box>
  );
}
