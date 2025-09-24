import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import {
  Box, Button, Input, Heading, VStack, useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import BackButton from "../BackButton";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, pw);
      await updateProfile(user, { displayName: name });
      toast({ title: "Registration success!", status: "success" });
    } catch (err) {
      toast({ title: "Register failed!", description: err.message, status: "error" });
    }
    setLoading(false);
  }

  return (
    <>
      <BackButton />
      <Box as={motion.div} maxW="xs" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="xl" bg="white">
        <Heading size="md" mb={4}>Register</Heading>
      <form onSubmit={handleRegister}>
        <VStack spacing={4}>
          <Input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
          <Input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} required />
          <Button type="submit" colorScheme="saffron" isLoading={loading} w="full">Register</Button>
        </VStack>
      </form>
    </Box>
    </>
  );
}
