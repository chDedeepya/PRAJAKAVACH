import React from "react";
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

const MotionCard = motion(Card);

const games = [
  {
    title: "Flood Simulation",
    description: "Experience and learn how to respond during a flood disaster.",
    script: "floods.py",
    icon: "🌊",
    color: "blue",
  },
  {
    title: "Earthquake Drill",
    description: "Practice safety measures during an earthquake scenario.",
    script: "earthquake.py",
    icon: "🏠",
    color: "orange",
  },
  {
    title: "Heatwave Safety",
    description: "Understand precautions and responses to heatwave conditions.",
    script: "heatwave.py",
    icon: "☀️",
    color: "red",
  },
  {
    title: "Drought Awareness",
    description: "Learn about water conservation and drought management.",
    script: "drought.py",
    icon: "🏜️",
    color: "yellow",
  },
];

export default function GamingSection() {
  const cardBg = useColorModeValue("white", "gray.800");

  const handlePlayGame = async (script) => {
    try {
      const endpointMap = {
        "floods.py": "flood",
        "earthquake.py": "earthquake",
        "heatwave.py": "heatwave",
        "drought.py": "drought",
      };
      const endpoint = endpointMap[script];
      if (!endpoint) {
        toast.error("Game not supported");
        return;
      }
      const response = await axios.post(`http://localhost:5000/api/games/${endpoint}`);
      if (response.data.status) {
        toast.success(response.data.status);
      } else {
        toast.error("Failed to start game");
      }
    } catch (error) {
      toast.error("Error starting game: " + error.message);
    }
  };

  return (
    <Box p={4}>
      <Heading size="lg" mb={6} color="saffron.500" textAlign="center">
        Disaster Preparedness Games
      </Heading>
      <Text mb={6} textAlign="center" color="gray.600">
        Interactive simulations to enhance your disaster readiness skills. Click "Play" to launch a game.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {games.map((game, index) => (
          <MotionCard
            key={index}
            bg={cardBg}
            shadow="md"
            borderRadius="lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <CardHeader>
              <VStack spacing={2}>
                <Text fontSize="3xl">{game.icon}</Text>
                <Heading size="md" color={`${game.color}.500`}>
                  {game.title}
                </Heading>
              </VStack>
            </CardHeader>
            <CardBody>
              <Text mb={4} color="gray.600">
                {game.description}
              </Text>
              <Button
                leftIcon={<Icon as={FaPlay} />}
                colorScheme={game.color}
                onClick={() => handlePlayGame(game.script)}
                w="full"
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Game
              </Button>
            </CardBody>
          </MotionCard>
        ))}
      </SimpleGrid>
    </Box>
  );
}
