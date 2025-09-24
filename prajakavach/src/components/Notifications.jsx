import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListIcon,
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
  Textarea,
} from "@chakra-ui/react";
import { MdNotifications } from "react-icons/md";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [formData, setFormData] = useState({ title: "", message: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // TODO: Fetch notifications from backend API
    setNotifications([
      { _id: "1", title: "Flood Alert", message: "Heavy rains expected tomorrow." },
      { _id: "2", title: "Earthquake Drill", message: "Scheduled for next week." },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    // TODO: Add notification via API
    toast({ title: "Notification added (mock)", status: "success" });
    onClose();
  };

  const handleDelete = (id) => {
    // TODO: Delete notification via API
    toast({ title: "Notification deleted (mock)", status: "success" });
  };

  return (
    <Box>
      <Button colorScheme="blue" mb={4} onClick={onOpen}>
        Add Notification
      </Button>
      <List spacing={3}>
        {notifications.map((notif) => (
          <ListItem key={notif._id} borderWidth="1px" borderRadius="md" p={3} position="relative">
            <ListIcon as={MdNotifications} color="blue.500" />
            <strong>{notif.title}</strong>: {notif.message}
            <Button
              size="sm"
              colorScheme="red"
              position="absolute"
              top="5px"
              right="5px"
              onClick={() => handleDelete(notif._id)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              mb={3}
            />
            <Textarea
              placeholder="Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAdd}>
              Add
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
