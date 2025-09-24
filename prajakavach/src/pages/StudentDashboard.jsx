import React from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaBookOpen, FaQuestionCircle, FaRunning, FaPhoneAlt, FaExclamationTriangle, FaGamepad } from "react-icons/fa";
import LearnSection from "../components/LearnSection";
import QuizSection from "../components/QuizSection";
import DrillSection from "../components/DrillSection";
import EmergencySOS from "../components/EmergencySOS";
import ContactsSection from "../components/ContactsSection";
import GamingSection from "../components/GamingSection";
import BackButton from "../components/BackButton";

const MotionBox = motion(Box);

export default function StudentDashboard() {
  const tabBg = useColorModeValue("white", "gray.800");

  // Responsive values
  const maxW = useBreakpointValue({ base: "100%", md: "760px" });
  const px = useBreakpointValue({ base: 4, md: 0 });
  const py = useBreakpointValue({ base: 4, md: 6 });
  const fontSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const mb = useBreakpointValue({ base: 2, md: 3 });
  const tabOrientation = useBreakpointValue({ base: "vertical", md: "horizontal" });
  const tabSpacing = useBreakpointValue({ base: 2, md: 0 });
  const tabListDirection = useBreakpointValue({ base: "column", md: "row" });

  const tabData = [
    { icon: FaBookOpen, label: "Learn", component: LearnSection },
    { icon: FaQuestionCircle, label: "Quiz", component: QuizSection },
    { icon: FaRunning, label: "Drill", component: DrillSection },
    { icon: FaExclamationTriangle, label: "SOS", component: EmergencySOS },
    { icon: FaPhoneAlt, label: "Contacts", component: ContactsSection },
    { icon: FaGamepad, label: "Games", component: GamingSection },
  ];

  return (
    <MotionBox
      minH="100vh"
      px={px}
      py={py}
      bgGradient="linear(to-br, india.50, white, green.100)"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <BackButton />
      <Flex direction="column" align="center" maxW={maxW} mx="auto" w="full">
        <Text
          fontSize={fontSize}
          fontWeight="bold"
          color="saffron.500"
          mb={mb}
          textAlign="center"
          id="dashboard-heading"
        >
          Student Dashboard
        </Text>
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          orientation={tabOrientation}
          w="full"
          isFitted
        >
          <TabList
            flexDirection={tabListDirection}
            spacing={tabSpacing}
            mb={{ base: 4, md: 2 }}
            overflowX={{ base: "auto", md: "visible" }}
            pb={{ base: 2, md: 0 }}
          >
            {tabData.map((tab, index) => (
              <Tab
                key={index}
                minW={{ base: "120px", md: "auto" }}
                whiteSpace="nowrap"
                aria-label={`${tab.label} section`}
              >
                <Icon as={tab.icon} mr={{ base: 1, md: 2 }} />
                <Text display={{ base: "inline", md: "inline" }}>{tab.label}</Text>
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabData.map((tab, index) => (
              <TabPanel
                key={index}
                bg={tabBg}
                borderRadius="xl"
                mt={2}
                p={{ base: 3, md: 4 }}
              >
                <tab.component />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>
    </MotionBox>
  );
}
