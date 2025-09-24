import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Container,
  Grid,
  GridItem,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdEmail, MdPhone, MdLocationOn, MdSend } from "react-icons/md";
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import BackButton from "../components/BackButton";

const MotionBox = motion(Box);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const bg = useColorModeValue("white", "gray.800");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
        status: "success",
        duration: 3000,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 2000);
  };

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
        <VStack spacing={8} align="center">
          <Heading color="saffron.500" size="xl" textAlign="center">
            Contact Us
          </Heading>
          <Text fontSize="lg" textAlign="center" maxW="2xl">
            Have questions about disaster preparedness? Need help with our platform?
            We're here to assist you.
          </Text>

          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} w="full">
            <GridItem>
              <MotionBox
                bg={bg}
                p={8}
                borderRadius="xl"
                boxShadow="xl"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <VStack spacing={6} align="start">
                  <Heading size="md" color="green.700">
                    Get in Touch
                  </Heading>

                  <HStack>
                    <Icon as={MdEmail} color="saffron.500" boxSize={6} />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">Email</Text>
                      <Text>prajakavach@gmail.com</Text>
                    </VStack>
                  </HStack>

                  <HStack>
                    <Icon as={MdPhone} color="saffron.500" boxSize={6} />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">Phone</Text>
                      <Text>+91 1800-XXX-XXXX</Text>
                    </VStack>
                  </HStack>

                  <HStack>
                    <Icon as={MdLocationOn} color="saffron.500" boxSize={6} />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">Address</Text>
                      <Text>Vignan University , Vadlamudi , India</Text>
                    </VStack>
                  </HStack>

                  <VStack spacing={4} w="full">
                    <Text fontWeight="bold">Follow Us</Text>
                    <HStack spacing={4}>
                      <Icon as={FaTwitter} color="blue.500" boxSize={6} cursor="pointer" />
                      <Icon as={FaFacebook} color="blue.600" boxSize={6} cursor="pointer" />
                      <Icon as={FaInstagram} color="pink.500" boxSize={6} cursor="pointer" />
                    </HStack>
                  </VStack>
                </VStack>
              </MotionBox>
            </GridItem>

            <GridItem>
              <MotionBox
                bg={bg}
                p={8}
                borderRadius="xl"
                boxShadow="xl"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <Heading size="md" color="green.700">
                      Send us a Message
                    </Heading>

                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your Name"
                        required
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Subject</FormLabel>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Subject"
                        required
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message..."
                        rows={6}
                        required
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="saffron"
                      size="lg"
                      w="full"
                      leftIcon={<MdSend />}
                      isLoading={loading}
                      loadingText="Sending..."
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
              </MotionBox>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </MotionBox>
  );
}
