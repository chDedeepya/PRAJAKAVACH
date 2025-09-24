import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  IconButton,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorModeValue,
  Text,
  Divider,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaHome, FaUserGraduate, FaUserShield, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const MotionBox = motion(Box);

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navHeight = useBreakpointValue({ base: "60px", md: "70px" });

  const navItems = [
    { label: "Home", path: "/", icon: FaHome },
    { label: "Student", path: "/student", icon: FaUserGraduate },
    { label: "Admin", path: "/admin", icon: FaUserShield },
    { label: "About", path: "/about", icon: FaInfoCircle },
    { label: "Contact", path: "/contact", icon: FaEnvelope },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) onClose();
  };

  const NavItem = ({ item, isMobile = false }) => {
    const isActive = location.pathname === item.path;
    const activeBg = useColorModeValue("saffron.50", "saffron.900");
    const activeColor = "saffron.500";

    return (
      <MotionBox
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant={isActive ? "solid" : "ghost"}
          colorScheme={isActive ? "saffron" : "gray"}
          onClick={() => handleNavigation(item.path)}
          w={isMobile ? "full" : "auto"}
          justifyContent={isMobile ? "flex-start" : "center"}
          leftIcon={<item.icon />}
          size={isMobile ? "lg" : "md"}
          bg={isActive ? activeBg : "transparent"}
          color={isActive ? activeColor : "inherit"}
          _hover={{
            bg: isActive ? activeBg : useColorModeValue("gray.100", "gray.700"),
          }}
          aria-label={`Navigate to ${item.label}`}
        >
          {item.label}
        </Button>
      </MotionBox>
    );
  };

  return (
    <>
      <MotionBox
        as="nav"
        position="sticky"
        top={0}
        zIndex={1000}
        bg={bg}
        borderBottom={1}
        borderStyle="solid"
        borderColor={borderColor}
        boxShadow="sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Flex
          minH={navHeight}
          alignItems="center"
          justifyContent="space-between"
          px={{ base: 4, md: 6, lg: 8 }}
          maxW="1200px"
          mx="auto"
        >
          {/* Logo/Brand */}
          <MotionBox
            whileHover={{ scale: 1.05 }}
            cursor="pointer"
            onClick={() => handleNavigation("/")}
            display="flex"
            alignItems="center"
            gap={3}
          >
            <Image
              src="https://via.placeholder.com/40x40/FF9933/FFFFFF?text=🇮🇳"
              alt="PRAJAKAVACH Logo"
              boxSize="40px"
              borderRadius="md"
            />
            <VStack spacing={0} align="flex-start" display={{ base: "none", md: "flex" }}>
              <Text fontSize="lg" fontWeight="bold" color="saffron.500">
                प्रजाकवच
              </Text>
              <Text fontSize="xs" color="gray.500">
                PRAJAKAVACH
              </Text>
            </VStack>
          </MotionBox>

          {/* Desktop Navigation */}
          {!isMobile && (
            <HStack spacing={4}>
              {navItems.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </HStack>
          )}

          {/* Mobile Navigation Button */}
          {isMobile && (
            <IconButton
              aria-label="Open navigation menu"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              onClick={isOpen ? onClose : onOpen}
              variant="ghost"
              size="lg"
            />
          )}
        </Flex>
      </MotionBox>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          <DrawerHeader borderBottomWidth="1px">
            <VStack spacing={2} align="center">
              <Image
                src="https://via.placeholder.com/60x60/FF9933/FFFFFF?text=🇮🇳"
                alt="PRAJAKAVACH Logo"
                boxSize="60px"
                borderRadius="md"
              />
              <Text fontSize="xl" fontWeight="bold" color="saffron.500">
                प्रजाकवच
              </Text>
              <Text fontSize="sm" color="gray.500">
                PRAJAKAVACH
              </Text>
            </VStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={4} align="stretch" pt={8}>
              {navItems.map((item, index) => (
                <React.Fragment key={item.path}>
                  <NavItem item={item} isMobile={true} />
                  {index < navItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </VStack>

            <Box mt={8} pt={8} borderTopWidth="1px">
              <Text fontSize="sm" color="gray.500" textAlign="center">
                Smart India Hackathon 2025
                <br />
                #DisasterReadyIndia
              </Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navigation;
