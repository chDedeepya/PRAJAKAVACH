import React from "react";
import { Box, Avatar, Text, Button, Heading, VStack, Tag } from "@chakra-ui/react";
import { useAuth } from "../Auth/AuthProvider";
import { motion } from "framer-motion";

export default function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <Box as={motion.div} p={6} bg="white" borderRadius="xl" boxShadow="md" maxW="sm" mx="auto" mt={8}>
      <VStack spacing={3}>
        <Avatar name={user.displayName || user.email} size="xl" />
        <Heading size="md">{user.displayName || "No Name"}</Heading>
        <Text color="gray.500">{user.email}</Text>
        <Tag colorScheme="green">{user.emailVerified ? "Email Verified" : "Email Not Verified"}</Tag>
        <Button colorScheme="red" onClick={logout}>Logout</Button>
      </VStack>
    </Box>
  );
}