import React from "react";
import {
  Card, CardHeader, CardBody,
  Heading, List, ListItem, Tag, HStack, Text, Button, Box
} from "@chakra-ui/react";
import { FaBookOpen, FaWikipediaW } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "@chakra-ui/react";

const MotionCard = motion(Card);

export const DisasterCard = ({ disaster, onCardClick }) => {
  return (
    <MotionCard
      bg="white"
      borderLeftWidth={8}
      borderLeftColor={disaster.color}
      whileHover={{ scale: 1.05, boxShadow: "2xl", rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
      cursor="pointer"
      onClick={() => onCardClick(disaster)}
    >
      <CardHeader>
        <HStack>
          <Box as={disaster.icon} boxSize={8} color={disaster.color} />
          <Heading size="md">{disaster.title}</Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <Tag colorScheme="green" mb={2}>
          {disaster.region}
        </Tag>
        <Text fontSize="sm" mb={2} color="gray.600">
          {disaster.story.substring(0, 100)}...
        </Text>
        <List spacing={1}>
          {disaster.steps.slice(0, 2).map((step) => (
            <ListItem key={step} fontSize="sm">• {step}</ListItem>
          ))}
        </List>
        <HStack mt={3}>
          <Button size="sm" leftIcon={<FaBookOpen />} colorScheme="blue" variant="outline">
            Learn More
          </Button>
          <Link href={disaster.article} isExternal>
            <Button size="sm" leftIcon={<FaWikipediaW />} colorScheme="gray" variant="outline">
              Wiki
            </Button>
          </Link>
        </HStack>
      </CardBody>
    </MotionCard>
  );
};
