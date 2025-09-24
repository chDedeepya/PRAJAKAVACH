import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  HStack,
  VStack,
  Button,
  Badge,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

const MotionBox = motion(Box);

const AdvancedSearch = ({
  onSearch,
  onFilter,
  searchFields = [],
  filterOptions = [],
  placeholder = "Search...",
  showFilters = true,
  debounceMs = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch, debounceMs]);

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    onFilter(newFilters);
  };

  const removeFilter = (filterKey) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterKey];
    setActiveFilters(newFilters);
    onFilter(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilter({});
  };

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).length;
  };

  const renderFilterControl = (filter) => {
    switch (filter.type) {
      case "select":
        return (
          <Select
            size="sm"
            placeholder={`Select ${filter.label}`}
            value={activeFilters[filter.key] || ""}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
          >
            {filter.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );

      case "multiselect":
        return (
          <VStack align="start" spacing={2}>
            {filter.options?.map((option) => (
              <Checkbox
                key={option.value}
                size="sm"
                isChecked={(activeFilters[filter.key] || []).includes(option.value)}
                onChange={(e) => {
                  const currentValues = activeFilters[filter.key] || [];
                  const newValues = e.target.checked
                    ? [...currentValues, option.value]
                    : currentValues.filter((v) => v !== option.value);
                  handleFilterChange(filter.key, newValues);
                }}
              >
                {option.label}
              </Checkbox>
            ))}
          </VStack>
        );

      case "range":
        const [min, max] = activeFilters[filter.key] || [filter.min || 0, filter.max || 100];
        return (
          <VStack spacing={3}>
            <RangeSlider
              min={filter.min || 0}
              max={filter.max || 100}
              value={[min, max]}
              onChange={(values) => handleFilterChange(filter.key, values)}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <HStack spacing={4}>
              <NumberInput
                size="sm"
                value={min}
                min={filter.min || 0}
                max={max}
                onChange={(value) => handleFilterChange(filter.key, [parseInt(value), max])}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Text>to</Text>
              <NumberInput
                size="sm"
                value={max}
                min={min}
                max={filter.max || 100}
                onChange={(value) => handleFilterChange(filter.key, [min, parseInt(value)])}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </VStack>
        );

      case "date":
        return (
          <Input
            type="date"
            size="sm"
            value={activeFilters[filter.key] || ""}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
          />
        );

      default:
        return (
          <Input
            size="sm"
            placeholder={`Enter ${filter.label}`}
            value={activeFilters[filter.key] || ""}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
          />
        );
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={2}>
        <InputGroup flex={1}>
          <InputLeftElement>
            <FiSearch />
          </InputLeftElement>
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg={bgColor}
          />
        </InputGroup>

        {showFilters && (
          <Popover isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
            <PopoverTrigger>
              <Button
                leftIcon={<FiFilter />}
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                position="relative"
              >
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge
                    position="absolute"
                    top="-2"
                    right="-2"
                    colorScheme="blue"
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent w="400px">
              <PopoverArrow />
              <PopoverBody>
                <VStack spacing={4} align="stretch">
                  <Text fontWeight="bold">Filters</Text>
                  <SimpleGrid columns={1} spacing={4}>
                    {filterOptions.map((filter) => (
                      <Box key={filter.key}>
                        <Text fontSize="sm" fontWeight="medium" mb={2}>
                          {filter.label}
                        </Text>
                        {renderFilterControl(filter)}
                      </Box>
                    ))}
                  </SimpleGrid>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </HStack>

      {getActiveFilterCount() > 0 && (
        <MotionBox
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <HStack spacing={2} flexWrap="wrap">
            {Object.entries(activeFilters).map(([key, value]) => {
              const filter = filterOptions.find((f) => f.key === key);
              if (!filter) return null;

              const getDisplayValue = () => {
                if (Array.isArray(value)) {
                  if (filter.type === "range") {
                    return `${value[0]} - ${value[1]}`;
                  }
                  return value.map((v) => {
                    const option = filter.options?.find((o) => o.value === v);
                    return option?.label || v;
                  }).join(", ");
                }
                if (filter.type === "select") {
                  const option = filter.options?.find((o) => o.value === value);
                  return option?.label || value;
                }
                return value;
              };

              return (
                <Badge
                  key={key}
                  variant="solid"
                  colorScheme="blue"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Text fontSize="xs">
                    {filter.label}: {getDisplayValue()}
                  </Text>
                  <FiX
                    size={12}
                    cursor="pointer"
                    onClick={() => removeFilter(key)}
                  />
                </Badge>
              );
            })}
            <Button size="xs" variant="ghost" onClick={clearAllFilters}>
              Clear all
            </Button>
          </HStack>
        </MotionBox>
      )}
    </VStack>
  );
};

export default AdvancedSearch;
