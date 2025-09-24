import { useState, useCallback, useEffect } from "react";

const useRealTimeValidation = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Common validation functions
  const validators = {
    required: (value) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && String(value).trim() !== "";
    },

    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !value || emailRegex.test(value);
    },

    minLength: (min) => (value) => {
      return !value || String(value).length >= min;
    },

    maxLength: (max) => (value) => {
      return !value || String(value).length <= max;
    },

    pattern: (regex) => (value) => {
      return !value || regex.test(value);
    },

    numeric: (value) => {
      return !value || !isNaN(value);
    },

    min: (min) => (value) => {
      return !value || Number(value) >= min;
    },

    max: (max) => (value) => {
      return !value || Number(value) <= max;
    },

    url: (value) => {
      try {
        if (!value) return true;
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },

    phone: (value) => {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return !value || phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""));
    },

    matches: (fieldName) => (value, allValues) => {
      return !value || value === allValues[fieldName];
    },
  };

  // Validate a single field
  const validateField = useCallback(
    (fieldName, value, allValues = values) => {
      const rules = validationRules[fieldName];
      if (!rules) return "";

      for (const rule of rules) {
        let isValid = true;
        let errorMessage = "";

        if (typeof rule === "function") {
          isValid = rule(value, allValues);
          errorMessage = isValid ? "" : "Invalid value";
        } else if (typeof rule === "object") {
          const { validator, message, params } = rule;

          if (typeof validator === "string") {
            const validatorFn = validators[validator];
            if (validatorFn) {
              if (params !== undefined) {
                isValid = validatorFn(params)(value);
              } else {
                isValid = validatorFn(value);
              }
            }
          } else if (typeof validator === "function") {
            isValid = validator(value, allValues);
          }

          errorMessage = message || "Validation failed";
        } else if (typeof rule === "string") {
          const validatorFn = validators[rule];
          if (validatorFn) {
            isValid = validatorFn(value);
          }
          errorMessage = "Invalid value";
        }

        if (!isValid) {
          return errorMessage;
        }
      }

      return "";
    },
    [validationRules, values, validators]
  );

  // Validate all fields
  const validateAll = useCallback(
    (currentValues = values) => {
      const newErrors = {};
      let hasErrors = false;

      Object.keys(validationRules).forEach((fieldName) => {
        const error = validateField(fieldName, currentValues[fieldName], currentValues);
        if (error) {
          newErrors[fieldName] = error;
          hasErrors = true;
        }
      });

      setErrors(newErrors);
      setIsValid(!hasErrors);
      return !hasErrors;
    },
    [values, validationRules, validateField]
  );

  // Handle field change
  const handleChange = useCallback(
    (fieldName, value) => {
      const newValues = { ...values, [fieldName]: value };
      setValues(newValues);

      // Real-time validation
      if (touched[fieldName]) {
        const error = validateField(fieldName, value, newValues);
        setErrors((prev) => ({
          ...prev,
          [fieldName]: error,
        }));
      }

      // Debounced full validation
      setIsValidating(true);
      setTimeout(() => {
        validateAll(newValues);
        setIsValidating(false);
      }, 300);
    },
    [values, touched, validateField, validateAll]
  );

  // Handle field blur
  const handleBlur = useCallback(
    (fieldName) => {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));

      const error = validateField(fieldName, values[fieldName]);
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }));
    },
    [values, validateField]
  );

  // Set multiple values
  const setMultipleValues = useCallback((newValues) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsValid(false);
    setIsValidating(false);
  }, [initialValues]);

  // Validate on mount and when validation rules change
  useEffect(() => {
    validateAll();
  }, [validateAll]);

  return {
    values,
    errors,
    touched,
    isValid,
    isValidating,
    handleChange,
    handleBlur,
    setMultipleValues,
    validateAll,
    validateField,
    reset,
    setValues,
    setErrors,
    setTouched,
  };
};

export default useRealTimeValidation;
