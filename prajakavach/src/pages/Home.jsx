import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Image,
  Flex,
  Spacer,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import indiaFlag from "../assets/india-flag.svg"; // Add svg to assets
import ThemeSelector from "../components/ThemeSelector";

const MotionBox = motion(Box);

export default function Home() {
  const navigate = useNavigate();
  const bg = useColorModeValue("india.50", "gray.700");

  return (
    <MotionBox
      minH="100vh"
      bgGradient="linear(to-br, saffron.500, white, green.500)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      px={{ base: 4, md: 8 }}
      py={{ base: 8, md: 12 }}
    >
      <Container maxW={{ base: "100%", md: "6xl" }} px={0}>
        <Flex justify="flex-end" mb={{ base: 2, md: 4 }}>
          <ThemeSelector />
        </Flex>
        <Container
          id="main-content"
          maxW={{ base: "100%", sm: "md", lg: "lg" }}
          p={{ base: 6, md: 8 }}
          boxShadow="lg"
          borderRadius="2xl"
          bg={bg}
          mx="auto"
        >
          <VStack spacing={{ base: 4, md: 6 }} align="center">
            <Image
              src={indiaFlag}
              alt="Indian National Flag - symbolizing the PRAJAKAVACH disaster management platform"
              boxSize={{ base: "50px", md: "60px" }}
              aria-hidden="false"
            />
            <Heading
              as="h1"
              size={{ base: "xl", md: "2xl" }}
              color="saffron.500"
              fontWeight="900"
              textShadow="1px 2px #fff"
              letterSpacing="wider"
              textAlign="center"
              id="main-heading"
            >
              प्रजाकवच<br />
              PRAJAKAVACH
            </Heading>
            <Text
              color="green.600"
              fontWeight="bold"
              fontSize={{ base: "lg", md: "xl" }}
              textAlign="center"
              aria-describedby="main-heading"
            >
              Safe Citizens, Strong India
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="gray.700"
              textAlign="center"
              px={{ base: 2, md: 0 }}
              as="p"
            >
              Empowering schools & communities for disaster resilience, with India's first digital disaster-readiness platform.
            </Text>

            {/* Main Action Buttons */}
            <SimpleGrid
              columns={{ base: 1, sm: 2 }}
              spacing={{ base: 3, md: 4 }}
              w="full"
              maxW="400px"
              role="group"
              aria-labelledby="main-actions-heading"
            >
              <Text as="h2" id="main-actions-heading" srOnly>
                Main Application Actions
              </Text>
              <Button
                leftIcon={<FaUserGraduate />}
                colorScheme="green"
                size={{ base: "md", md: "lg" }}
                onClick={() => navigate("/student")}
                as={motion.button}
                whileHover={{ scale: 1.06, boxShadow: "0 0 10px #ff9900" }}
                w="full"
                minH={{ base: "48px", md: "56px" }}
                aria-label="Access Student Application for disaster preparedness learning"
              >
                Student App
              </Button>
              <Button
                leftIcon={<MdAdminPanelSettings />}
                colorScheme="saffron"
                size={{ base: "md", md: "lg" }}
                variant="outline"
                borderColor="saffron.500"
                onClick={() => navigate("/admin")}
                as={motion.button}
                whileHover={{ scale: 1.06, boxShadow: "0 0 10px #138808" }}
                w="full"
                minH={{ base: "48px", md: "56px" }}
                aria-label="Access Admin Dashboard for managing disaster drills and analytics"
              >
                Admin Dashboard
              </Button>
            </SimpleGrid>

            {/* Secondary Buttons */}
            <SimpleGrid
              columns={{ base: 2, sm: 4 }}
              spacing={{ base: 2, md: 3 }}
              w="full"
              maxW="500px"
              role="group"
              aria-labelledby="secondary-actions-heading"
            >
              <Text as="h2" id="secondary-actions-heading" srOnly>
                Additional Navigation Options
              </Text>
              <Button
                colorScheme="blue"
                size={{ base: "sm", md: "md" }}
                variant="ghost"
                onClick={() => navigate("/login")}
                as={motion.button}
                whileHover={{ scale: 1.05, boxShadow: "0 0 8px #3182ce" }}
                w="full"
                minH={{ base: "40px", md: "48px" }}
                aria-label="Navigate to login page"
              >
                Login
              </Button>
              <Button
                colorScheme="purple"
                size={{ base: "sm", md: "md" }}
                variant="ghost"
                onClick={() => navigate("/register")}
                as={motion.button}
                whileHover={{ scale: 1.05, boxShadow: "0 0 8px #805ad5" }}
                w="full"
                minH={{ base: "40px", md: "48px" }}
                aria-label="Navigate to registration page"
              >
                Register
              </Button>
              <Button
                colorScheme="teal"
                size={{ base: "sm", md: "md" }}
                variant="ghost"
                onClick={() => navigate("/contact")}
                as={motion.button}
                whileHover={{ scale: 1.05, boxShadow: "0 0 8px #319795" }}
                w="full"
                minH={{ base: "40px", md: "48px" }}
                aria-label="Navigate to contact page"
              >
                Contact
              </Button>
              <Button
                colorScheme="orange"
                size={{ base: "sm", md: "md" }}
                variant="ghost"
                onClick={() => navigate("/about")}
                as={motion.button}
                whileHover={{ scale: 1.05, boxShadow: "0 0 8px #dd6b20" }}
                w="full"
                minH={{ base: "40px", md: "48px" }}
                aria-label="Navigate to about page"
              >
                About
              </Button>
            </SimpleGrid>

            <Text
              fontSize={{ base: "xs", md: "sm" }}
              color="gray.400"
              mt={{ base: 2, md: 4 }}
              textAlign="center"
            >
              Smart India Hackathon 2025 | #DisasterReadyIndia
            </Text>
          </VStack>
        </Container>
      </Container>
    </MotionBox>
  );
}
