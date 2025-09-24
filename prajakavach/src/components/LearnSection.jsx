import React from "react";
import { Box, SimpleGrid, Heading } from "@chakra-ui/react";
import { learnData } from "../data/disasterData";
import { useModal } from "../hooks/useModal";
import { DisasterCard, DisasterModal } from "./LearnSection/index";

export default function LearnSection() {
  const { isOpen, selectedItem, openModal, closeModal } = useModal();

  return (
    <Box>
      <Heading size="md" mb={4} color="saffron.500">
        Interactive Learning Adventures
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
        {learnData.map((disaster) => (
          <DisasterCard
            key={disaster.title}
            disaster={disaster}
            onCardClick={openModal}
          />
        ))}
      </SimpleGrid>

      <DisasterModal
        isOpen={isOpen}
        onClose={closeModal}
        disaster={selectedItem}
      />
    </Box>
  );
}
