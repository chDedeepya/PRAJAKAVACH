import React from "react";
import {
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";

const LoadingSkeleton = ({ type = "card", count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <Box padding="6" boxShadow="lg" bg="white" borderRadius="lg">
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <Skeleton height="40px" mt="4" />
          </Box>
        );

      case "list":
        return (
          <VStack spacing={4} align="stretch">
            {Array.from({ length: count }, (_, i) => (
              <HStack key={i} spacing={4} p={4} borderWidth="1px" borderRadius="md">
                <SkeletonCircle size="8" />
                <VStack align="start" flex={1}>
                  <Skeleton height="20px" width="60%" />
                  <Skeleton height="16px" width="40%" />
                </VStack>
                <Skeleton height="32px" width="80px" />
              </HStack>
            ))}
          </VStack>
        );

      case "table":
        return (
          <VStack spacing={2}>
            <Skeleton height="40px" />
            {Array.from({ length: count }, (_, i) => (
              <HStack key={i} spacing={4} p={3}>
                <Skeleton height="20px" width="20%" />
                <Skeleton height="20px" width="30%" />
                <Skeleton height="20px" width="25%" />
                <Skeleton height="20px" width="25%" />
              </HStack>
            ))}
          </VStack>
        );

      case "dashboard":
        return (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {Array.from({ length: count }, (_, i) => (
              <Box key={i} p={6} boxShadow="lg" bg="white" borderRadius="lg">
                <Skeleton height="24px" width="60%" mb={4} />
                <Skeleton height="32px" width="40%" mb={2} />
                <SkeletonText noOfLines={2} spacing="3" />
              </Box>
            ))}
          </SimpleGrid>
        );

      default:
        return <Skeleton height="40px" />;
    }
  };

  return renderSkeleton();
};

export default LoadingSkeleton;
