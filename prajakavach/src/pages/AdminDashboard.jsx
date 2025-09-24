import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Divider,
  Button,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdNotificationsActive } from "react-icons/md";
import ChartPreparedness from "../components/ChartPreparedness";
import DrillParticipationList from "../components/DrillParticipationList";
import UserManagement from "../components/UserManagement";
import DrillScheduling from "../components/DrillScheduling";
import Notifications from "../components/Notifications";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import BackButton from "../components/BackButton";

const MotionBox = motion(Box);

export default function AdminDashboard() {
  const bg = useColorModeValue("white", "gray.800");
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <MotionBox
      minH="100vh"
      py={10}
      px={2}
      bgGradient="linear(to-br, india.50, white, green.100)"
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <BackButton />
      <VStack spacing={6} align="center" maxW="900px" mx="auto">
        <Heading color="saffron.500">Admin Dashboard</Heading>
        <Divider />
        <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} variant="enclosed" w="100%">
          <TabList>
            <Tab>Preparedness</Tab>
            <Tab>Drill Participation</Tab>
            <Tab>User Management</Tab>
            <Tab>Drill Scheduling</Tab>
            <Tab>Notifications</Tab>
            <Tab>Analytics</Tab>
          </TabList>

          <TabPanels>
            <TabPanel bg={bg} borderRadius="xl" boxShadow="md" p={5}>
              <Heading size="md" mb={3} color="green.700">
                Preparedness Score
              </Heading>
              <ChartPreparedness />
            </TabPanel>

            <TabPanel bg={bg} borderRadius="xl" boxShadow="md" p={5}>
              <Heading size="md" mb={3} color="green.700">
                Drill Participation
              </Heading>
              <DrillParticipationList />
            </TabPanel>

            <TabPanel bg={bg} borderRadius="xl" boxShadow="md" p={5}>
              <UserManagement />
            </TabPanel>

            <TabPanel bg={bg} borderRadius="xl" boxShadow="md" p={5}>
              <DrillScheduling />
            </TabPanel>

            <TabPanel bg={bg} borderRadius="xl" boxShadow="md" p={5}>
              <Notifications />
            </TabPanel>

            <TabPanel bg={bg} borderRadius="xl" boxShadow="md" p={5}>
              <AnalyticsDashboard />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Divider />
        <Box fontSize="xs" color="gray.400">
          NDMA Guidelines | Demo Version | For SIH 2025
        </Box>
      </VStack>
    </MotionBox>
  );
}
