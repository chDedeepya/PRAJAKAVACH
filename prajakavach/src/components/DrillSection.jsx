import React, { useState } from "react";
import {
  Box, Heading, VStack, List, ListItem, Icon, HStack, Button, Divider,
  Alert, AlertIcon, AlertTitle, AlertDescription, useToast, Text
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  GiEarthCrack, GiFire, GiWaterDrop, GiWindHole,
  GiCheckMark
} from "react-icons/gi";
import { MdPlayCircle, MdReplay } from "react-icons/md";

const drills = [
  {
    title: "Earthquake Survival Drill",
    icon: GiEarthCrack,
    category: "Earthquake",
    duration: "2 min",
    difficulty: "Beginner",
    steps: [
      "Drop to the ground immediately",
      "Take cover under a sturdy desk or table",
      "Hold onto the furniture until shaking stops",
      "Protect your head and neck with your arms",
      "Stay away from windows and heavy objects",
      "Wait for the 'all clear' signal before moving"
    ],
    color: "orange.400",
    scenario: "You're in your classroom when the ground starts shaking violently. Books fall from shelves and the lights flicker. What do you do?",
    tips: [
      "If you're outdoors, move to an open area away from buildings",
      "If you're driving, pull over and stay in your vehicle",
      "After the quake, check for injuries and hazards before moving"
    ]
  },
  {
    title: "Fire Evacuation Drill",
    icon: GiFire,
    category: "Fire",
    duration: "3 min",
    difficulty: "Intermediate",
    steps: [
      "Stop what you're doing and assess the situation",
      "Alert others if you see smoke or fire",
      "Feel doors for heat before opening them",
      "Stay low to avoid smoke inhalation",
      "Use the nearest safe exit",
      "Never use elevators during a fire",
      "Cover your mouth with a wet cloth if needed",
      "Assemble at the designated meeting point"
    ],
    color: "red.400",
    scenario: "You smell smoke in the hallway and see flames coming from a nearby room. The fire alarm is ringing. How do you escape safely?",
    tips: [
      "If your clothes catch fire, stop, drop, and roll",
      "Close doors behind you to contain the fire",
      "If trapped, signal for help from a window"
    ]
  },
  {
    title: "Flood Emergency Response",
    icon: GiWaterDrop,
    category: "Flood",
    duration: "4 min",
    difficulty: "Intermediate",
    steps: [
      "Move to higher ground immediately",
      "Avoid walking or driving through floodwaters",
      "Listen to emergency broadcasts for updates",
      "Prepare an emergency kit with essentials",
      "Follow evacuation orders promptly"
    ],
    color: "blue.400",
    scenario: "Heavy rains have caused flooding in your area. Water is rising quickly. What actions do you take?",
    tips: [
      "Do not attempt to swim through floodwaters",
      "Keep children and pets close",
      "Avoid electrical equipment if wet"
    ]
  }
];

const MotionBox = motion(Box);

export default function DrillSection() {
  const [selectedDrill, setSelectedDrill] = useState(drills[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [drillEndTime, setDrillEndTime] = useState(null);
  const toast = useToast();

  const startDrill = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setCompletedSteps([]);
    setDrillEndTime(null);
  };

  const nextStep = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < selectedDrill.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
      setDrillEndTime(Date.now());
      toast({
        title: "Drill Completed!",
        description: `You completed the ${selectedDrill.title}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const resetDrill = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    setDrillEndTime(null);
  };

  const getDrillTime = () => {
    if (!drillEndTime) return 0;
    return Math.floor((drillEndTime - Date.now()) / 1000);
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Heading size="lg" mb={4}>
        {selectedDrill.title}
      </Heading>
      <Box>
        <Text fontWeight="bold">Scenario:</Text>
        <Text mb={3}>{selectedDrill.scenario}</Text>
        <Text fontWeight="bold">Steps:</Text>
        <List spacing={2} mb={3}>
          {selectedDrill.steps.map((step, index) => (
            <ListItem key={index} color={completedSteps.includes(index) ? "green.500" : "black"}>
              {completedSteps.includes(index) ? <Icon as={GiCheckMark} color="green.500" mr={2} /> : null}
              {step}
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box mt={3}>
          <Text fontWeight="bold">Tips:</Text>
          <List spacing={2}>
            {selectedDrill.tips.map((tip, index) => (
              <ListItem key={index}>{tip}</ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <HStack spacing={4} justify="center">
        {!isPlaying ? (
          <Button leftIcon={<MdPlayCircle />} colorScheme="green" onClick={startDrill}>
            Start Drill
          </Button>
        ) : (
          <>
            <Button onClick={nextStep} colorScheme="blue" isDisabled={completedSteps.includes(currentStep)}>
              {currentStep === selectedDrill.steps.length - 1 ? "Complete Drill" : "Next Step"}
            </Button>
            <Button leftIcon={<MdReplay />} onClick={resetDrill}>
              Reset
            </Button>
          </>
        )}
      </HStack>
    </VStack>
  );
}
