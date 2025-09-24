import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  useColorModeValue,
  Kbd,
  Divider,
} from "@chakra-ui/react";
import { FiSearch, FiCommand, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionModalContent = motion(ModalContent);

const GlobalSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Search results data
  const searchResults = [
    {
      category: "Pages",
      items: [
        { title: "Home", path: "/", description: "Main landing page" },
        { title: "Student Dashboard", path: "/student", description: "Student preparedness dashboard" },
        { title: "Admin Dashboard", path: "/admin", description: "Administrative controls" },
        { title: "Login", path: "/login", description: "User authentication" },
        { title: "Register", path: "/register", description: "Create new account" },
        { title: "Contact", path: "/contact", description: "Get in touch" },
        { title: "About", path: "/about", description: "About PRAJAKAVACH" },
      ]
    },
    {
      category: "Features",
      items: [
        { title: "User Management", path: "/admin", description: "Manage system users" },
        { title: "Drill Scheduling", path: "/admin", description: "Schedule disaster drills" },
        { title: "Analytics Dashboard", path: "/admin", description: "View preparedness analytics" },
        { title: "Quiz Section", path: "/student", description: "Take preparedness quizzes" },
        { title: "Learn Section", path: "/student", description: "Educational content" },
      ]
    }
  ];

  const filteredResults = searchResults.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const allItems = filteredResults.flatMap(category => category.items);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        onOpen();
      }

      if (!isOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, allItems.length - 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case "Enter":
          event.preventDefault();
          if (allItems[selectedIndex]) {
            navigate(allItems[selectedIndex].path);
            onClose();
            setSearchQuery("");
          }
          break;
        case "Escape":
          onClose();
          setSearchQuery("");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, allItems, navigate, onOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleItemClick = (path) => {
    navigate(path);
    onClose();
    setSearchQuery("");
  };

  return (
    <>
      {/* Search Trigger Button */}
      <Box position="relative">
        <InputGroup maxW="400px" mx="auto">
          <InputLeftElement>
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search... (Ctrl/Cmd + /)"
            readOnly
            onClick={onOpen}
            cursor="pointer"
            _hover={{ borderColor: "saffron.300" }}
            focusBorderColor="saffron.400"
            data-search-input
          />
        </InputGroup>
      </Box>

      {/* Search Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <MotionModalContent
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ModalHeader pb={2}>
            <InputGroup>
              <InputLeftElement>
                <FiSearch color="gray.400" />
              </InputLeftElement>
              <Input
                ref={inputRef}
                placeholder="Search pages, features, and content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                border="none"
                _focus={{ boxShadow: "none" }}
                fontSize="lg"
              />
            </InputGroup>
          </ModalHeader>

          <ModalBody pt={0}>
            {filteredResults.length > 0 ? (
              <VStack spacing={4} align="stretch">
                {filteredResults.map((category, categoryIndex) => (
                  <Box key={category.category}>
                    <Text fontSize="sm" fontWeight="bold" color="gray.500" mb={2}>
                      {category.category}
                    </Text>
                    <VStack spacing={1} align="stretch">
                      {category.items.map((item, itemIndex) => {
                        const globalIndex = filteredResults
                          .slice(0, categoryIndex)
                          .reduce((acc, cat) => acc + cat.items.length, 0) + itemIndex;

                        return (
                          <Box
                            key={item.path}
                            p={3}
                            borderRadius="md"
                            cursor="pointer"
                            bg={selectedIndex === globalIndex ? "saffron.50" : "transparent"}
                            _hover={{ bg: "saffron.50" }}
                            onClick={() => handleItemClick(item.path)}
                            border={selectedIndex === globalIndex ? "1px solid" : "none"}
                            borderColor={selectedIndex === globalIndex ? "saffron.200" : "transparent"}
                          >
                            <HStack justify="space-between" align="center">
                              <VStack spacing={0} align="start" flex={1}>
                                <Text fontWeight="medium">{item.title}</Text>
                                <Text fontSize="sm" color="gray.600">
                                  {item.description}
                                </Text>
                              </VStack>
                              <HStack spacing={2}>
                                {selectedIndex === globalIndex && (
                                  <Badge colorScheme="saffron" variant="subtle">
                                    Press Enter
                                  </Badge>
                                )}
                                <FiArrowRight size={16} color="gray.400" />
                              </HStack>
                            </HStack>
                          </Box>
                        );
                      })}
                    </VStack>
                    {categoryIndex < filteredResults.length - 1 && <Divider my={4} />}
                  </Box>
                ))}
              </VStack>
            ) : searchQuery ? (
              <Box textAlign="center" py={8}>
                <Text color="gray.500">No results found for "{searchQuery}"</Text>
              </Box>
            ) : (
              <Box textAlign="center" py={8}>
                <VStack spacing={2}>
                  <Text color="gray.500">Start typing to search...</Text>
                  <HStack spacing={2}>
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                    <Text fontSize="sm">Navigate</Text>
                    <Kbd>Enter</Kbd>
                    <Text fontSize="sm">Select</Text>
                    <Kbd>Esc</Kbd>
                    <Text fontSize="sm">Close</Text>
                  </HStack>
                </VStack>
              </Box>
            )}
          </ModalBody>
        </MotionModalContent>
      </Modal>
    </>
  );
};

export default GlobalSearch;
