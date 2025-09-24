import React, { useState } from "react";
import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function EmergencySOS() {
  const [sent, setSent] = useState(false);
  const toast = useToast();

  function handleSOS() {
    setSent(true);
    toast({
      title: "SOS sent!",
      description: "Your location/alert has been sent to admin/parents.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <Box textAlign="center" py={8}>
      <Heading size="md" color="red.500" mb={2}>
        <FaExclamationTriangle style={{ display: "inline", marginRight: 10 }} /> Emergency SOS
      </Heading>
      <Button
        colorScheme="red"
        size="lg"
        leftIcon={<FaExclamationTriangle />}
        onClick={handleSOS}
        isDisabled={sent}
        as={motion.button}
        whileTap={{ scale: 0.96 }}
      >
        {sent ? "SOS Sent!" : "Send SOS Now"}
      </Button>
      <Text fontSize="xs" color="gray.500" mt={4}>
        (Demo: would send live location to admins/parents)
      </Text>
    </Box>
  );
}