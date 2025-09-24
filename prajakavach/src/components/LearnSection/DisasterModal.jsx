import React from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  VStack, Text, List, ListItem, HStack, Tag, Box, Link
} from "@chakra-ui/react";

export const DisasterModal = ({ isOpen, onClose, disaster }) => {
  if (!disaster) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack>
            <Box as={disaster.icon} boxSize={6} color={disaster.color} />
            <Text>{disaster.title}</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack align="start" spacing={4}>
            <Text fontWeight="bold" color="saffron.500">Story:</Text>
            <Text>{disaster.story}</Text>
            <Text fontWeight="bold" color="green.500">Safety Steps:</Text>
            <List spacing={2}>
              {disaster.steps.map((step, idx) => (
                <ListItem key={idx}>• {step}</ListItem>
              ))}
            </List>
            <Text fontWeight="bold" color="blue.500">Real Examples:</Text>
            <HStack spacing={2}>
              {disaster.examples.map((ex) => (
                <Tag key={ex} colorScheme="red">{ex}</Tag>
              ))}
            </HStack>
            <Link href={disaster.article} isExternal color="blue.500">
              Read more on Wikipedia →
            </Link>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
