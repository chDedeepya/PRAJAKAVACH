import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Box,
  Text,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FiHome, FiChevronRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Define route mappings for breadcrumbs
  const routeMap = {
    "/": { label: "Home", icon: FiHome },
    "/student": { label: "Student Dashboard", icon: null },
    "/admin": { label: "Admin Dashboard", icon: null },
    "/login": { label: "Login", icon: null },
    "/register": { label: "Register", icon: null },
    "/contact": { label: "Contact", icon: null },
    "/about": { label: "About", icon: null },
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [{ path: "/", label: "Home", icon: FiHome }];

    let currentPath = "";
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      if (routeInfo) {
        breadcrumbs.push({
          path: currentPath,
          label: routeInfo.label,
          icon: routeInfo.icon,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      bg={bgColor}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
      px={{ base: 4, md: 6 }}
      py={3}
      position="sticky"
      top="60px" // Below navigation
      zIndex={9}
    >
      <Breadcrumb
        separator={
          <Icon
            as={FiChevronRight}
            color="gray.400"
            boxSize={4}
          />
        }
        fontSize={{ base: "sm", md: "md" }}
      >
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={crumb.path} isCurrentPage={index === breadcrumbs.length - 1}>
            <BreadcrumbLink
              onClick={() => navigate(crumb.path)}
              cursor={index === breadcrumbs.length - 1 ? "default" : "pointer"}
              color={index === breadcrumbs.length - 1 ? "saffron.600" : "gray.600"}
              fontWeight={index === breadcrumbs.length - 1 ? "semibold" : "normal"}
              _hover={{
                color: index === breadcrumbs.length - 1 ? "saffron.600" : "saffron.500",
                textDecoration: index === breadcrumbs.length - 1 ? "none" : "underline",
              }}
              display="flex"
              alignItems="center"
              gap={2}
            >
              {crumb.icon && (
                <Icon
                  as={crumb.icon}
                  boxSize={4}
                  color={index === breadcrumbs.length - 1 ? "saffron.600" : "gray.500"}
                />
              )}
              <Text as="span">{crumb.label}</Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </MotionBox>
  );
};

export default BreadcrumbNavigation;
