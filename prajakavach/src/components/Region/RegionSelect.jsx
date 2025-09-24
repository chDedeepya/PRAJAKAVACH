import React, { useState } from "react";
import {
  Box, Select, Heading, VStack, Button, useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Expand these as needed
const regions = [
  { value: "assam", label: "Assam (Flood Prone)" },
  { value: "odisha", label: "Odisha (Cyclone Prone)" },
  { value: "himachal", label: "Himachal (Earthquake Prone)" },
  { value: "bihar", label: "Bihar (Flood Prone)" },
  { value: "maharashtra", label: "Maharashtra (Urban/Fire)" },
];

export default function RegionSelect({ onChange }) {
  const [region, setRegion] = useState("");
  const toast = useToast();

  function handleSave() {
    toast({ title: "Region updated!", status: "success" });
    if (onChange) onChange(region);
  }

  return (
    <Box as={motion.div} maxW="sm" mx="auto" p={6} mt={8} bg="white" borderRadius="xl" boxShadow="md">
      <Heading size="md" mb={4}>Select Your Region</Heading>
      <VStack spacing={4}>
        <Select placeholder="Select region" value={region} onChange={e=>setRegion(e.target.value)}>
          {regions.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </Select>
        <Button colorScheme="green" onClick={handleSave} isDisabled={!region}>Save</Button>
      </VStack>
    </Box>
  );
}