import React, { useState, useRef } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
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
  Progress,
  Badge,
  IconButton,
  Tooltip,
  Select,
  Checkbox,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiUpload,
  FiFileText,
  FiDatabase,
  FiSettings,
  FiUsers,
  FiBarChart,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import useNotifications from "../hooks/useNotifications";

const MotionCard = motion(Card);

const DataExportImport = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importData, setImportData] = useState(null);
  const [selectedDataTypes, setSelectedDataTypes] = useState({
    users: true,
    drills: true,
    analytics: true,
    settings: true,
  });
  const [exportFormat, setExportFormat] = useState("json");
  const fileInputRef = useRef(null);

  const toast = useToast();
  const { showSuccess, showError } = useNotifications();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const dataTypes = [
    {
      key: "users",
      label: "User Data",
      icon: FiUsers,
      description: "User accounts, profiles, and permissions",
      size: "~2.5 MB",
    },
    {
      key: "drills",
      label: "Drill Data",
      icon: FiSettings,
      description: "Disaster drills, schedules, and participation",
      size: "~1.8 MB",
    },
    {
      key: "analytics",
      label: "Analytics Data",
      icon: FiBarChart,
      description: "Preparedness metrics and reports",
      size: "~3.2 MB",
    },
    {
      key: "settings",
      label: "System Settings",
      icon: FiDatabase,
      description: "Application configuration and preferences",
      size: "~0.5 MB",
    },
  ];

  const exportFormats = [
    { value: "json", label: "JSON", description: "Human-readable format" },
    { value: "csv", label: "CSV", description: "Spreadsheet compatible" },
    { value: "xml", label: "XML", description: "Structured data format" },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate export process
      const selectedTypes = Object.entries(selectedDataTypes)
        .filter(([_, selected]) => selected)
        .map(([key]) => key);

      for (let i = 0; i < selectedTypes.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setExportProgress(((i + 1) / selectedTypes.length) * 100);
      }

      // Generate mock data based on selected types
      const exportData = {
        metadata: {
          exportedAt: new Date().toISOString(),
          version: "1.0.0",
          format: exportFormat,
          dataTypes: selectedTypes,
        },
        data: {},
      };

      selectedTypes.forEach((type) => {
        switch (type) {
          case "users":
            exportData.data.users = [
              { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
              { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
            ];
            break;
          case "drills":
            exportData.data.drills = [
              { id: 1, title: "Earthquake Drill", date: "2024-01-15", participants: 150 },
              { id: 2, title: "Flood Drill", date: "2024-02-20", participants: 200 },
            ];
            break;
          case "analytics":
            exportData.data.analytics = {
              totalDrills: 24,
              averageParticipation: 85,
              preparednessScore: 78,
            };
            break;
          case "settings":
            exportData.data.settings = {
              theme: "light",
              notifications: true,
              language: "en",
            };
            break;
        }
      });

      // Convert to selected format
      let content, mimeType, extension;
      switch (exportFormat) {
        case "json":
          content = JSON.stringify(exportData, null, 2);
          mimeType = "application/json";
          extension = "json";
          break;
        case "csv":
          content = convertToCSV(exportData);
          mimeType = "text/csv";
          extension = "csv";
          break;
        case "xml":
          content = convertToXML(exportData);
          mimeType = "application/xml";
          extension = "xml";
          break;
      }

      // Download file
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prajakavach-export-${new Date().toISOString().split("T")[0]}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showSuccess(
        "Export Complete",
        `Successfully exported ${selectedTypes.length} data types in ${exportFormat.toUpperCase()} format.`
      );
    } catch (error) {
      showError("Export Failed", "An error occurred during export. Please try again.");
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const handleImport = async () => {
    if (!importData) {
      showError("No File Selected", "Please select a file to import.");
      return;
    }

    setIsImporting(true);

    try {
      // Simulate import process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock validation and import
      const importedData = JSON.parse(await importData.text());

      if (!importedData.metadata || !importedData.data) {
        throw new Error("Invalid file format");
      }

      showSuccess(
        "Import Complete",
        `Successfully imported ${Object.keys(importedData.data).length} data types.`
      );

      onClose();
      setImportData(null);
    } catch (error) {
      showError("Import Failed", "Invalid file format or corrupted data.");
    } finally {
      setIsImporting(false);
    }
  };

  const convertToCSV = (data) => {
    // Simple CSV conversion for demonstration
    const rows = ["Type,Count,Status"];
    Object.entries(data.data).forEach(([type, items]) => {
      const count = Array.isArray(items) ? items.length : 1;
      rows.push(`${type},${count},Imported`);
    });
    return rows.join("\n");
  };

  const convertToXML = (data) => {
    // Simple XML conversion for demonstration
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<prajakavach-export>\n';
    Object.entries(data.data).forEach(([type, items]) => {
      xml += `  <${type}>\n`;
      if (Array.isArray(items)) {
        items.forEach((item, index) => {
          xml += `    <item id="${index + 1}">\n`;
          Object.entries(item).forEach(([key, value]) => {
            xml += `      <${key}>${value}</${key}>\n`;
          });
          xml += `    </item>\n`;
        });
      }
      xml += `  </${type}>\n`;
    });
    xml += '</prajakavach-export>';
    return xml;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImportData(file);
    }
  };

  const totalSelectedSize = dataTypes
    .filter((type) => selectedDataTypes[type.key])
    .reduce((total, type) => {
      const size = parseFloat(type.size.replace("~", "").replace(" MB", ""));
      return total + size;
    }, 0);

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
            <Text fontSize="2xl">💾</Text>
            <VStack spacing={0} align="start">
              <Heading size="lg" color="saffron.600">
                Data Export & Import
              </Heading>
              <Text fontSize="sm" color="gray.600">
                Backup and restore your data
              </Text>
            </VStack>
          </HStack>

          <HStack spacing={2}>
            <Tooltip label="Export data">
              <IconButton
                icon={<FiDownload />}
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsExporting(false);
                  onOpen();
                }}
                aria-label="Export data"
              />
            </Tooltip>
            <Tooltip label="Import data">
              <IconButton
                icon={<FiUpload />}
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsImporting(false);
                  onOpen();
                }}
                aria-label="Import data"
              />
            </Tooltip>
          </HStack>
        </HStack>
      </CardHeader>

      <CardBody>
        <VStack spacing={6} align="stretch">
          {/* Quick Stats */}
          <HStack spacing={4} justify="space-around">
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="saffron.600">
                4
              </Text>
              <Text fontSize="sm" color="gray.600">
                Data Types
              </Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                ~7.5 MB
              </Text>
              <Text fontSize="sm" color="gray.600">
                Total Size
              </Text>
            </VStack>
            <VStack spacing={1}>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                3
              </Text>
              <Text fontSize="sm" color="gray.600">
                Formats
              </Text>
            </VStack>
          </HStack>

          <Divider />

          {/* Data Types Overview */}
          <VStack spacing={3} align="stretch">
            <Text fontWeight="medium">Available Data Types:</Text>
            {dataTypes.map((type) => (
              <HStack
                key={type.key}
                p={3}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="md"
                justify="space-between"
              >
                <HStack spacing={3}>
                  <Box
                    p={2}
                    bg="saffron.100"
                    borderRadius="full"
                    color="saffron.600"
                  >
                    <type.icon size={16} />
                  </Box>
                  <VStack spacing={0} align="start">
                    <Text fontWeight="medium">{type.label}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {type.description}
                    </Text>
                  </VStack>
                </HStack>
                <Badge colorScheme="gray" variant="subtle">
                  {type.size}
                </Badge>
              </HStack>
            ))}
          </VStack>

          {/* Action Buttons */}
          <HStack spacing={4}>
            <Button
              leftIcon={<FiDownload />}
              colorScheme="saffron"
              onClick={() => {
                setIsExporting(false);
                onOpen();
              }}
              flex={1}
            >
              Export Data
            </Button>
            <Button
              leftIcon={<FiUpload />}
              variant="outline"
              onClick={() => {
                setIsImporting(false);
                onOpen();
              }}
              flex={1}
            >
              Import Data
            </Button>
          </HStack>
        </VStack>
      </CardBody>

      {/* Export/Import Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isExporting ? "Export Data" : isImporting ? "Import Data" : "Data Operations"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isExporting ? (
              <VStack spacing={4} align="stretch">
                <Text>Select data types and format for export:</Text>

                <VStack spacing={3} align="stretch">
                  {dataTypes.map((type) => (
                    <HStack key={type.key} justify="space-between">
                      <HStack spacing={3}>
                        <Checkbox
                          isChecked={selectedDataTypes[type.key]}
                          onChange={(e) =>
                            setSelectedDataTypes((prev) => ({
                              ...prev,
                              [type.key]: e.target.checked,
                            }))
                          }
                        />
                        <VStack spacing={0} align="start">
                          <Text fontWeight="medium">{type.label}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {type.size}
                          </Text>
                        </VStack>
                      </HStack>
                    </HStack>
                  ))}
                </VStack>

                <HStack justify="space-between">
                  <Text fontWeight="medium">Export Format:</Text>
                  <Select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    size="sm"
                    w="150px"
                  >
                    {exportFormats.map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </Select>
                </HStack>

                <Box>
                  <HStack justify="space-between" mb={2}>
                    <Text fontSize="sm">Export Progress</Text>
                    <Text fontSize="sm">{Math.round(exportProgress)}%</Text>
                  </HStack>
                  <Progress value={exportProgress} colorScheme="saffron" />
                </Box>

                <Text fontSize="sm" color="gray.600">
                  Total size: ~{totalSelectedSize.toFixed(1)} MB
                </Text>
              </VStack>
            ) : isImporting ? (
              <VStack spacing={4} align="stretch">
                <Text>Select a file to import:</Text>

                <Box
                  border="2px dashed"
                  borderColor={borderColor}
                  borderRadius="md"
                  p={6}
                  textAlign="center"
                  cursor="pointer"
                  onClick={() => fileInputRef.current?.click()}
                  _hover={{ borderColor: "saffron.300" }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,.csv,.xml"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />
                  <FiFileText size={48} color="gray" />
                  <Text mt={2}>
                    {importData ? importData.name : "Click to select file"}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Supports JSON, CSV, and XML formats
                  </Text>
                </Box>

                {importData && (
                  <HStack justify="center">
                    <FiCheckCircle color="green" />
                    <Text fontSize="sm" color="green.600">
                      File selected: {importData.name}
                    </Text>
                  </HStack>
                )}
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch">
                <Text>Choose an operation:</Text>

                <HStack spacing={4}>
                  <Button
                    leftIcon={<FiDownload />}
                    colorScheme="saffron"
                    onClick={() => setIsExporting(true)}
                    flex={1}
                  >
                    Export Data
                  </Button>
                  <Button
                    leftIcon={<FiUpload />}
                    variant="outline"
                    onClick={() => setIsImporting(true)}
                    flex={1}
                  >
                    Import Data
                  </Button>
                </HStack>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            {isExporting && (
              <Button
                colorScheme="saffron"
                onClick={handleExport}
                isLoading={isExporting}
                loadingText="Exporting..."
                isDisabled={Object.values(selectedDataTypes).every((v) => !v)}
              >
                Start Export
              </Button>
            )}
            {isImporting && (
              <Button
                colorScheme="saffron"
                onClick={handleImport}
                isLoading={isImporting}
                loadingText="Importing..."
                isDisabled={!importData}
              >
                Start Import
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MotionCard>
  );
};

export default DataExportImport;
