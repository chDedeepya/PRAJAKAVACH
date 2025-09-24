import React from "react";
import {
  Box, Heading, VStack, HStack, Icon, Text, Tag, Stack,
} from "@chakra-ui/react";
import {
  MdLocalPolice, MdLocalHospital, MdLocalFireDepartment, MdPhoneIphone,
} from "react-icons/md";

const contacts = [
  {
    name: "Police",
    icon: MdLocalPolice,
    number: "100",
    tag: "Emergency",
    color: "blue.500",
  },
  {
    name: "Fire Brigade",
    icon: MdLocalFireDepartment,
    number: "101",
    tag: "Fire",
    color: "red.500",
  },
  {
    name: "Ambulance",
    icon: MdLocalHospital,
    number: "102",
    tag: "Medical",
    color: "green.500",
  },
  {
    name: "NDMA Helpline",
    icon: MdPhoneIphone,
    number: "1078",
    tag: "Disaster",
    color: "orange.500",
  },
];

export default function ContactsSection() {
  return (
    <Box>
      <Heading size="md" color="green.700" mb={4}>
        Emergency Contacts
      </Heading>
      <VStack spacing={3} align="start">
        {contacts.map((c) => (
          <HStack key={c.name} spacing={5} borderLeft="7px solid" borderLeftColor={c.color} p={3} borderRadius="md" bg="white">
            <Icon as={c.icon} boxSize={7} color={c.color} />
            <Stack spacing={0}>
              <Text fontWeight="bold">{c.name}</Text>
              <Text color="gray.500" fontSize="md">
                {c.number}
              </Text>
            </Stack>
            <Tag colorScheme="saffron" ml={2}>{c.tag}</Tag>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}