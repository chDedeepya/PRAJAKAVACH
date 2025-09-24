import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Switch,
  Select,
  Button,
  Divider,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Badge,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiSettings,
  FiDownload,
  FiUpload,
  FiRotateCcw,
  FiSave,
} from "react-icons/fi";
import useUserPreferences from "../hooks/useUserPreferences";

const MotionCard = motion(Card);

const UserPreferences = () => {
  const { preferences, updatePreference, resetPreferences, exportPreferences, importPreferences } = useUserPreferences();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [importData, setImportData] = useState("");
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleExport = () => {
    const data = exportPreferences();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prajakavach-preferences.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Preferences exported",
      description: "Your preferences have been downloaded as a JSON file.",
      status: "success",
      duration: 3000,
    });
  };

  const handleImport = () => {
    if (importPreferences(importData)) {
      toast({
        title: "Preferences imported",
        description: "Your preferences have been successfully imported.",
        status: "success",
        duration: 3000,
      });
      onClose();
      setImportData("");
    } else {
      toast({
        title: "Import failed",
        description: "Invalid preferences data. Please check the format.",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleReset = () => {
    resetPreferences();
    toast({
      title: "Preferences reset",
      description: "All preferences have been reset to default values.",
      status: "info",
      duration: 3000,
    });
  };

  const preferenceSections = [
    {
      title: "Appearance",
      icon: "🎨",
      items: [
        {
          key: "theme",
          label: "Theme",
          type: "select",
          options: [
            { value: "light", label: "Light" },
            { value: "dark", label: "Dark" },
            { value: "auto", label: "Auto (System)" },
          ],
        },
        {
          key: "fontSize",
          label: "Font Size",
          type: "select",
          options: [
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ],
        },
        {
          key: "compactView",
          label: "Compact View",
          type: "switch",
          description: "Use less spacing for a denser layout",
        },
        {
          key: "showAnimations",
          label: "Show Animations",
          type: "switch",
          description: "Enable smooth transitions and animations",
        },
      ],
    },
    {
      title: "Behavior",
      icon: "⚙️",
      items: [
        {
          key: "language",
          label: "Language",
          type: "select",
          options: [
            { value: "en", label: "English" },
            { value: "hi", label: "हिंदी (Hindi)" },
            { value: "te", label: "తెలుగు (Telugu)" },
            { value: "ta", label: "தமிழ் (Tamil)" },
          ],
        },
        {
          key: "autoSave",
          label: "Auto Save",
          type: "switch",
          description: "Automatically save changes as you work",
        },
        {
          key: "notifications",
          label: "Notifications",
          type: "switch",
          description: "Show notification messages",
        },
        {
          key: "soundEnabled",
          label: "Sound Effects",
          type: "switch",
          description: "Play sound effects for actions",
        },
      ],
    },
  ];

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg={bgColor}
      shadow="md"
      borderRadius="lg"
    >
      <CardHeader>
        <HStack justify="space-between" align="center">
          <HStack spacing={3}>
            <Text fontSize="2xl">{preferenceSections[0].icon}</Text>
            <VStack spacing={0} align="start">
              <Heading size="lg" color="saffron.600">
                User Preferences
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Customize your experience
              </Text>
            </VStack>
          </HStack>

          <HStack spacing={2}>
            <Tooltip label="Export preferences">
              <IconButton
                icon={<FiDownload />}
                size="sm"
                variant="ghost"
                onClick={handleExport}
                aria-label="Export preferences"
              />
            </Tooltip>
            <Tooltip label="Import preferences">
              <IconButton
                icon={<FiUpload />}
                size="sm"
                variant="ghost"
                onClick={onOpen}
                aria-label="Import preferences"
              />
            </Tooltip>
            <Tooltip label="Reset to defaults">
              <IconButton
                icon={<FiRotateCcw />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={handleReset}
                aria-label="Reset preferences"
              />
            </Tooltip>
          </HStack>
        </HStack>
      </CardHeader>

      <CardBody>
        <VStack spacing={6} align="stretch">
          {preferenceSections.map((section, sectionIndex) => (
            <Box key={section.title}>
              <HStack spacing={2} mb={4}>
                <Text fontSize="lg">{section.icon}</Text>
                <Heading size="md">{section.title}</Heading>
              </HStack>

              <VStack spacing={4} align="stretch">
                {section.items.map((item) => (
                  <Box
                    key={item.key}
                    p={4}
                    border="1px solid"
                    borderColor={borderColor}
                    borderRadius="md"
                  >
                    <HStack justify="space-between" align="center">
                      <VStack spacing={1} align="start" flex={1}>
                        <Text fontWeight="medium">{item.label}</Text>
                        {item.description && (
                          <Text fontSize="sm" color="gray.600">
                            {item.description}
                          </Text>
                        )}
                      </VStack>

                      {item.type === "switch" && (
                        <Switch
                          isChecked={preferences[item.key]}
                          onChange={(e) => updatePreference(item.key, e.target.checked)}
                          colorScheme="saffron"
                        />
                      )}

                      {item.type === "select" && (
                        <Select
                          value={preferences[item.key]}
                          onChange={(e) => updatePreference(item.key, e.target.value)}
                          size="sm"
                          w="150px"
                        >
                          {item.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      )}
                    </HStack>
                  </Box>
                ))}
              </VStack>

              {sectionIndex < preferenceSections.length - 1 && <Divider my={6} />}
            </Box>
          ))}
        </VStack>
      </CardBody>

      {/* Import Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import Preferences</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text>
                Paste your exported preferences JSON data below. This will replace your current preferences.
              </Text>
              <Textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="Paste JSON data here..."
                rows={10}
                fontFamily="mono"
                fontSize="sm"
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="saffron"
              onClick={handleImport}
              isDisabled={!importData.trim()}
            >
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionCard>
  );
};

export default UserPreferences;
