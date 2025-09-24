import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {
  Box, Button, Input, Heading, VStack, useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import BackButton from "../BackButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      toast({ title: "Login success!", status: "success" });
    } catch (err) {
      toast({ title: "Login failed!", description: err.message, status: "error" });
    }
    setLoading(false);
  }

  return (
    <>
      <BackButton />
      <Box as={motion.div} maxW="xs" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="xl" bg="white">
        <Heading size="md" mb={4}>Login</Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <Input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} required />
          <Button type="submit" colorScheme="green" isLoading={loading} w="full">Login</Button>
        </VStack>
      </form>
      {/* Add Google login if desired */}
    </Box>
    </>
  );
}
