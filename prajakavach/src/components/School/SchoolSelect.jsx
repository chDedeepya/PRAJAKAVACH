import React, { useState } from "react";
import {
  Box, Select, Heading, VStack, Button, useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

// Example schools, expand or fetch from Firestore!
const schools = [
  { value: "dps-guwahati", label: "DPS Guwahati" },
  { value: "kv-bhubaneswar", label: "Kendriya Vidyalaya, Bhubaneswar" },
  { value: "mhs-shimla", label: "Modern High School, Shimla" },
  { value: "sps-patna", label: "St. Paul's, Patna" },
  { value: "others", label: "Other / Not Listed" },
];

export default function SchoolSelect({ onChange }) {
  const [school, setSchool] = useState("");
  const toast = useToast();

  function handleSave() {
    toast({ title: "School updated!", status: "success" });
    if (onChange) onChange(school);
  }

  return (
    <Box as={motion.div} maxW="sm" mx="auto" p={6} mt={8} bg="white" borderRadius="xl" boxShadow="md">
      <Heading size="md" mb={4}>Select Your School</Heading>
      <VStack spacing={4}>
        <Select placeholder="Select school" value={school} onChange={e=>setSchool(e.target.value)}>
          {schools.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </Select>
        <Button colorScheme="saffron" onClick={handleSave} isDisabled={!school}>Save</Button>
      </VStack>
    </Box>
  );
}