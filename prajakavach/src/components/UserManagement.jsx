import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
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
  useBreakpointValue,
  SimpleGrid,
  Card,
  CardBody,
  Text,
  Badge,
  IconButton,
  Tooltip,
  FormControl,
  FormLabel,
  Select,
  useColorModeValue,
  Flex,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2, FiPlus, FiUser, FiMail, FiShield } from "react-icons/fi";
import useScreenReader from "../hooks/useScreenReader";
import useFocusTrap from "../hooks/useFocusTrap";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const cardColumns = useBreakpointValue({ base: 1, sm: 2, lg: 3 });
  const bgColor = useColorModeValue("white", "gray.800");

  const { announceSuccess, announceError } = useScreenReader();
  const focusTrapRef = useFocusTrap(isOpen);

  useEffect(() => {
    // TODO: Fetch users from backend API
    // For now, using sample data
    setUsers([
      { _id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
      { _id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
      { _id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Moderator" },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setFormData({ name: "", email: "", role: "" });
    onOpen();
    announceSuccess("Add new user modal opened");
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    onOpen();
    announceSuccess(`Edit user ${user.name} modal opened`);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (selectedUser) {
        // TODO: Update user via API
        setUsers(prev => prev.map(u => u._id === selectedUser._id ? { ...u, ...formData } : u));
        toast({ title: "User updated successfully", status: "success" });
        announceSuccess("User updated successfully");
      } else {
        // TODO: Add user via API
        const newUser = { _id: Date.now().toString(), ...formData };
        setUsers(prev => [...prev, newUser]);
        toast({ title: "User added successfully", status: "success" });
        announceSuccess("New user added successfully");
      }
      onClose();
    } catch (error) {
      toast({ title: "Error saving user", status: "error" });
      announceError("Error saving user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const userToDelete = users.find(u => u._id === id);
    setIsLoading(true);
    try {
      // TODO: Delete user via API
      setUsers(prev => prev.filter(u => u._id !== id));
      toast({ title: "User deleted successfully", status: "success" });
      announceSuccess(`${userToDelete?.name || 'User'} deleted successfully`);
    } catch (error) {
      toast({ title: "Error deleting user", status: "error" });
      announceError("Error deleting user");
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case "admin": return "red";
      case "moderator": return "orange";
      case "user": return "green";
      default: return "gray";
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Heading size="lg" color="saffron.600">
            User Management
          </Heading>
          <Tooltip label="Add new user">
            <Button
              leftIcon={<FiPlus />}
              colorScheme="saffron"
              onClick={openAddModal}
              size={isMobile ? "md" : "lg"}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add User
            </Button>
          </Tooltip>
        </Flex>

        <SimpleGrid columns={cardColumns} spacing={4}>
          {users.map((user, index) => (
            <MotionCard
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              bg={bgColor}
              shadow="md"
              borderRadius="lg"
            >
              <CardBody>
                <VStack spacing={3} align="stretch">
                  <HStack spacing={3}>
                    <Box
                      p={2}
                      bg="saffron.100"
                      borderRadius="full"
                      color="saffron.600"
                    >
                      <FiUser size={20} />
                    </Box>
                    <VStack spacing={0} align="start" flex={1}>
                      <Text fontWeight="bold" fontSize="md">
                        {user.name}
                      </Text>
                      <HStack spacing={2}>
                        <FiMail size={14} />
                        <Text fontSize="sm" color="gray.600">
                          {user.email}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  <HStack justify="space-between" align="center">
                    <HStack spacing={2}>
                      <FiShield size={14} />
                      <Badge
                        colorScheme={getRoleColor(user.role)}
                        variant="subtle"
                        fontSize="xs"
                      >
                        {user.role}
                      </Badge>
                    </HStack>

                    <HStack spacing={1}>
                      <Tooltip label="Edit user">
                        <IconButton
                          icon={<FiEdit2 />}
                          size="sm"
                          variant="ghost"
                          colorScheme="blue"
                          onClick={() => openEditModal(user)}
                          aria-label={`Edit ${user.name}`}
                        />
                      </Tooltip>
                      <Tooltip label="Delete user">
                        <IconButton
                          icon={<FiTrash2 />}
                          size="sm"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDelete(user._id)}
                          aria-label={`Delete ${user.name}`}
                        />
                      </Tooltip>
                    </HStack>
                  </HStack>
                </VStack>
              </CardBody>
            </MotionCard>
          ))}
        </SimpleGrid>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={isMobile ? "full" : "md"}
          isCentered
        >
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
              {selectedUser ? "Edit User" : "Add New User"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Enter full name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    focusBorderColor="saffron.400"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    focusBorderColor="saffron.400"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select
                    placeholder="Select role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    focusBorderColor="saffron.400"
                  >
                    <option value="User">User</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                  </Select>
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isLoading}>
                Cancel
              </Button>
              <Button
                colorScheme="saffron"
                onClick={handleSubmit}
                isLoading={isLoading}
                loadingText="Saving..."
                isDisabled={!formData.name || !formData.email || !formData.role}
              >
                {selectedUser ? "Update User" : "Add User"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </MotionBox>
  );
}
