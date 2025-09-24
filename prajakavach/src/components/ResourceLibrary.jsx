import React from "react";
import {
  Box,
  Heading,
  VStack,
  List,
  ListItem,
  Link,
  Text,
  Divider,
} from "@chakra-ui/react";

const resources = [
  {
    title: "NDMA School Safety Guidelines",
    url: "https://ndma.gov.in/en/activities/school-safety",
  },
  {
    title: "Disaster Preparedness Posters",
    url: "https://www.ready.gov/sites/default/files/2020-03/DisasterPreparednessPosters.pdf",
  },
  {
    title: "Physical Drill Templates",
    url: "https://www.unisdr.org/files/26462_schooldisasterpreparedness.pdf",
  },
  {
    title: "NDMA Guidelines for Schools",
    url: "https://ndma.gov.in/en/activities/school-safety",
  },
];

export default function ResourceLibrary() {
  return (
    <Box maxW="800px" mx="auto" p={5}>
      <Heading size="lg" mb={5} color="saffron.500">
        Resource Library
      </Heading>
      <Text mb={4}>
        A curated collection of posters, checklists, guidelines, and templates to help schools and institutions prepare for disasters.
      </Text>
      <VStack align="start" spacing={3}>
        {resources.map((res) => (
          <Box key={res.title} p={3} borderWidth="1px" borderRadius="md" w="100%" bg="white">
            <Link href={res.url} color="green.700" isExternal fontWeight="bold" fontSize="md">
              {res.title}
            </Link>
          </Box>
        ))}
      </VStack>
      <Divider mt={6} />
      <Text fontSize="sm" color="gray.500" mt={3}>
        Resources sourced from NDMA, UNISDR, and Ready.gov.
      </Text>
    </Box>
  );
}
