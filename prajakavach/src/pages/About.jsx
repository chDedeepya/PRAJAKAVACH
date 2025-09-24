import React from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Container,
  Grid,
  GridItem,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdShield, MdSchool, MdPeople, MdTrendingUp } from "react-icons/md";
import { FaAward, FaUsers, FaGlobe } from "react-icons/fa";
import BackButton from "../components/BackButton";

const MotionBox = motion(Box);

const stats = [
  { label: "Students Trained", value: "50,000+", icon: MdSchool },
  { label: "Schools Covered", value: "1,200+", icon: MdPeople },
  { label: "Drills Conducted", value: "15,000+", icon: MdShield },
  { label: "Success Rate", value: "95%", icon: MdTrendingUp },
];

const features = [
  {
    icon: MdShield,
    title: "Comprehensive Safety",
    description: "Complete disaster preparedness training covering all major disaster types in India.",
  },
  {
    icon: FaUsers,
    title: "Community Focus",
    description: "Building resilient communities through education and practical training programs.",
  },
  {
    icon: FaAward,
    title: "NDMA Certified",
    description: "Aligned with National Disaster Management Authority guidelines and best practices.",
  },
  {
    icon: FaGlobe,
    title: "Nationwide Reach",
    description: "Operating across all states and union territories with localized content.",
  },
];

export default function About() {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <MotionBox
      minH="100vh"
      py={10}
      bgGradient="linear(to-br, india.50, white, green.100)"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <BackButton />
      <Container maxW="6xl">
        <VStack spacing={12} align="center">
          <MotionBox
            textAlign="center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Heading
              color="saffron.500"
              size="2xl"
              mb={4}
              bgGradient="linear(to-r, saffron.500, green.500)"
              bgClip="text"
              _hover={{ bgGradient: "linear(to-r, green.500, saffron.500)" }}
              transition="all 0.3s"
            >
              About PRAJAKAVACH
            </Heading>
            <Text
              fontSize="xl"
              maxW="3xl"
              _hover={{ transform: "translateY(-2px)" }}
              transition="all 0.3s"
            >
              Empowering India's youth with disaster preparedness knowledge and skills
              to build a safer, more resilient nation.
            </Text>
          </MotionBox>

          <MotionBox
            bg={bg}
            p={8}
            borderRadius="xl"
            boxShadow="xl"
            w="full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <VStack spacing={6}>
              <Heading size="lg" color="green.700">
                Our Mission
              </Heading>
              <Text fontSize="lg" textAlign="center" maxW="4xl">
                PRAJAKAVACH is India's premier disaster preparedness education platform,
                dedicated to equipping students, teachers, and communities with the knowledge
                and skills needed to respond effectively to natural disasters. Through
                interactive learning, practical drills, and cutting-edge technology, we
                aim to reduce disaster impact and save lives across our nation.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox
            w="full"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
              {stats.map((stat, index) => (
                <MotionBox
                  key={stat.label}
                  bg={bg}
                  p={6}
                  borderRadius="xl"
                  boxShadow="lg"
                  textAlign="center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    y: -5
                  }}
                  whileTap={{ scale: 0.95 }}
                  cursor="pointer"
                >
                  <Icon
                    as={stat.icon}
                    color="saffron.500"
                    boxSize={10}
                    mb={3}
                    transition="all 0.3s"
                    _hover={{ transform: "scale(1.1)", color: "green.500" }}
                  />
                  <Stat>
                    <StatLabel fontSize="sm" color="gray.600">
                      {stat.label}
                    </StatLabel>
                    <StatNumber
                      fontSize="2xl"
                      color="green.600"
                      transition="color 0.3s"
                      _hover={{ color: "saffron.500" }}
                    >
                      {stat.value}
                    </StatNumber>
                    <StatHelpText>
                      <StatArrow type="increase" />
                      Growing daily
                    </StatHelpText>
                  </Stat>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>

          <MotionBox
            w="full"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Heading size="lg" color="green.700" mb={8} textAlign="center">
              What Makes Us Different
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              {features.map((feature, index) => (
                <MotionBox
                  key={feature.title}
                  bg={bg}
                  p={6}
                  borderRadius="xl"
                  boxShadow="lg"
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    y: -3
                  }}
                  whileTap={{ scale: 0.97 }}
                  cursor="pointer"
                >
                  <HStack spacing={4} align="start">
                    <Icon
                      as={feature.icon}
                      color="saffron.500"
                      boxSize={8}
                      mt={1}
                      transition="all 0.3s"
                      _hover={{ transform: "scale(1.2) rotate(5deg)", color: "green.500" }}
                    />
                    <VStack align="start" spacing={2}>
                      <Heading
                        size="md"
                        color="green.700"
                        transition="color 0.3s"
                        _hover={{ color: "saffron.500" }}
                      >
                        {feature.title}
                      </Heading>
                      <Text
                        transition="all 0.3s"
                        _hover={{ transform: "translateX(5px)" }}
                      >
                        {feature.description}
                      </Text>
                    </VStack>
                  </HStack>
                </MotionBox>
              ))}
            </Grid>
          </MotionBox>

          <MotionBox
            bg={bg}
            p={8}
            borderRadius="xl"
            boxShadow="xl"
            w="full"
            textAlign="center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <Heading size="lg" color="green.700" mb={4}>
              Our Vision
            </Heading>
            <Text fontSize="lg" maxW="4xl">
              To create a disaster-resilient India where every citizen, especially the
              younger generation, is equipped with the knowledge and skills to protect
              themselves and their communities during emergencies. Through innovative
              technology and comprehensive education, we envision a future where
              disasters are met with preparedness, not panic.
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </MotionBox>
  );
}
