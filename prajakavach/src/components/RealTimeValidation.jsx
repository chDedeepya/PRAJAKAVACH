import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Input,
  Textarea,
  Select,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

const MotionBox = motion(Box);

const validationRules = {
  required: (value) => ({
    isValid: value && value.toString().trim().length > 0,
    message: "This field is required",
  }),

  email: (value) => ({
    isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || ""),
    message: "Please enter a valid email address",
  }),

  minLength: (min) => (value) => ({
    isValid: (value || "").length >= min,
    message: `Must be at least ${min} characters`,
  }),

  maxLength: (max) => (value) => ({
    isValid: (value || "").length <= max,
    message: `Must be no more than ${max} characters`,
  }),

  pattern: (pattern, message) => (value) => ({
    isValid: pattern.test(value || ""),
    message: message || "Invalid format",
  }),

  number: (value) => ({
    isValid: !isNaN(value) && !isNaN(parseFloat(value)),
    message: "Please enter a valid number",
  }),

  min: (min) => (value) => ({
    isValid: parseFloat(value) >= min,
    message: `Must be at least ${min}`,
  }),

  max: (max) => (value) => ({
    isValid: parseFloat(value) <= max,
    message: `Must be no more than ${max}`,
  }),

  url: (value) => ({
    isValid: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(value || ""),
    message: "Please enter a valid URL",
  }),

  phone: (value) => ({
    isValid: /^[\+]?[1-9][\d]{0,15}$/.test(value || ""),
    message: "Please enter a valid phone number",
  }),
};

const ValidationIcon = ({ status, size = "16px" }) => {
  const iconProps = { size, style: { flexShrink: 0 } };

  switch (status) {
    case "valid":
      return <FiCheck color="green" {...iconProps} />;
    case "invalid":
      return <FiX color="red" {...iconProps} />;
    case "warning":
      return <FiAlertCircle color="orange" {...iconProps} />;
    default:
      return null;
  }
};

const ValidatedInput = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  validation = [],
  helperText,
  leftIcon,
  rightIcon,
  showPasswordToggle = false,
  size = "md",
  ...props
}) => {
  const [fieldValue, setFieldValue] = useState(value || "");
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  const validateField = useCallback((val) => {
    if (!touched && !val) return { status: null, message: "" };

    for (const rule of validation) {
      let ruleFunc;
      let ruleParams = [];

      if (typeof rule === "string") {
        ruleFunc = validationRules[rule];
      } else if (typeof rule === "object" && rule.type) {
        ruleFunc = validationRules[rule.type];
        ruleParams = rule.params || [];
      }

      if (ruleFunc) {
        const result = ruleFunc(...ruleParams)(val);
        if (!result.isValid) {
          return { status: "invalid", message: result.message };
        }
      }
    }

    if (touched && val) {
      return { status: "valid", message: "" };
    }

    return { status: null, message: "" };
  }, [validation, touched]);

  useEffect(() => {
    const result = validateField(fieldValue);
    setValidationStatus(result.status);
    setErrorMessage(result.message);
  }, [fieldValue, validateField]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setFieldValue(newValue);
    onChange && onChange(e);
  };

  const handleBlur = (e) => {
    setTouched(true);
    onBlur && onBlur(e);
  };

  const getBorderColor = () => {
    if (validationStatus === "valid") return "green.500";
    if (validationStatus === "invalid") return "red.500";
    if (validationStatus === "warning") return "orange.500";
    return borderColor;
  };

  const getBoxShadow = () => {
    if (validationStatus === "valid") return "0 0 0 1px green.500";
    if (validationStatus === "invalid") return "0 0 0 1px red.500";
    if (validationStatus === "warning") return "0 0 0 1px orange.500";
    return "none";
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <FormControl isInvalid={validationStatus === "invalid"}>
      {label && <FormLabel>{label}</FormLabel>}

      <InputGroup size={size}>
        {leftIcon && (
          <InputLeftElement>
            {leftIcon}
          </InputLeftElement>
        )}

        <Input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={fieldValue}
          onChange={handleChange}
          onBlur={handleBlur}
          bg={bgColor}
          borderColor={getBorderColor()}
          boxShadow={getBoxShadow()}
          transition="all 0.2s"
          _focus={{
            borderColor: getBorderColor(),
            boxShadow: `0 0 0 1px ${getBorderColor()}`,
          }}
          {...props}
        />

        <AnimatePresence>
          {(validationStatus || (showPasswordToggle && type === "password")) && (
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <InputRightElement>
                <HStack spacing={1}>
                  {showPasswordToggle && type === "password" && (
                    <Icon
                      as={showPassword ? FiEyeOff : FiEye}
                      cursor="pointer"
                      onClick={() => setShowPassword(!showPassword)}
                      color="gray.500"
                    />
                  )}
                  {validationStatus && (
                    <ValidationIcon status={validationStatus} />
                  )}
                </HStack>
              </InputRightElement>
            </MotionBox>
          )}
        </AnimatePresence>
      </InputGroup>

      <AnimatePresence>
        {errorMessage && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </MotionBox>
        )}
      </AnimatePresence>

      {helperText && !errorMessage && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

const ValidatedSelect = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  options = [],
  validation = [],
  helperText,
  size = "md",
  ...props
}) => {
  const [fieldValue, setFieldValue] = useState(value || "");
  const [touched, setTouched] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const validateField = useCallback((val) => {
    if (!touched && !val) return { status: null, message: "" };

    for (const rule of validation) {
      let ruleFunc;
      let ruleParams = [];

      if (typeof rule === "string") {
        ruleFunc = validationRules[rule];
      } else if (typeof rule === "object" && rule.type) {
        ruleFunc = validationRules[rule.type];
        ruleParams = rule.params || [];
      }

      if (ruleFunc) {
        const result = ruleFunc(...ruleParams)(val);
        if (!result.isValid) {
          return { status: "invalid", message: result.message };
        }
      }
    }

    if (touched && val) {
      return { status: "valid", message: "" };
    }

    return { status: null, message: "" };
  }, [validation, touched]);

  useEffect(() => {
    const result = validateField(fieldValue);
    setValidationStatus(result.status);
    setErrorMessage(result.message);
  }, [fieldValue, validateField]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setFieldValue(newValue);
    onChange && onChange(e);
  };

  const handleBlur = (e) => {
    setTouched(true);
    onBlur && onBlur(e);
  };

  return (
    <FormControl isInvalid={validationStatus === "invalid"}>
      {label && <FormLabel>{label}</FormLabel>}

      <Select
        name={name}
        placeholder={placeholder}
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
        size={size}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      <AnimatePresence>
        {errorMessage && (
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
          </MotionBox>
        )}
      </AnimatePresence>

      {helperText && !errorMessage && (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export { ValidatedInput, ValidatedSelect, validationRules };
