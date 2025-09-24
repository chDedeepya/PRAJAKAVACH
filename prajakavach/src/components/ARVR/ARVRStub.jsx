import React from "react";
import { Box, Heading, Alert, AlertIcon, Button, Text } from "@chakra-ui/react";
import { SiUnity, SiWebxr } from "react-icons/si";

// This is a stub. For actual AR/VR, integrate with Unity WebGL or Three.js/WebXR.
export default function ARVRStub() {
  function handleLaunchVR() {
    window.open("https://sketchfab.com/3d-models/earthquake-drill-demo-12345", "_blank"); // Example AR/VR link
  }

  return (
    <Box p={8} bg="white" mt={10} borderRadius="xl" boxShadow="md" textAlign="center">
      <Heading size="md" mb={4}>AR/VR Drill (Demo)</Heading>
      <Alert status="info" mb={4} borderRadius="md">
        <AlertIcon />
        For immersive training, run our AR/VR drill on a VR headset or browser.
      </Alert>
      <Button
        leftIcon={<SiWebxr />}
        colorScheme="green"
        size="lg"
        onClick={handleLaunchVR}
      >
        Launch AR/VR Demo
      </Button>
      <Text fontSize="xs" mt={4} color="gray.500">
        (Stub: Integrate Unity/WebXR or embed WebGL here for real drills)
      </Text>
    </Box>
  );
}