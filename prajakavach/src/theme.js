import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  breakpoints: {
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
    "2xl": "96em", // 1536px
  },
  colors: {
    saffron: {
      50: "#fff8e1",
      100: "#ffe9b3",
      200: "#ffd980",
      300: "#ffc74d",
      400: "#ffb81a",
      500: "#FF9933",
      600: "#cc7a00",
      700: "#995c00",
      800: "#663d00",
      900: "#331f00",
    },
    white: "#FFFFFF",
    green: {
      50: "#f0fff4",
      100: "#c6f6d5",
      200: "#9ae6b4",
      300: "#68d391",
      400: "#48bb78",
      500: "#38a169",
      600: "#2f855a",
      700: "#276749",
      800: "#22543d",
      900: "#1a202c",
    },
    blue: "#1A73E8",
    india: {
      50: "#fff8e1",
      100: "#ffe9b3",
      200: "#ffd980",
      300: "#ffc74d",
      400: "#ffb81a",
      500: "#ff9900", // saffron
      600: "#cc7a00",
      700: "#995c00",
      800: "#663d00",
      900: "#331f00",
    },
    // South Blue Theme (Kerala/Tamil Nadu inspired)
    south: {
      50: "#e0f2fe",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
    },
    // Western Green Theme (Gujarat/Rajasthan inspired)
    western: {
      50: "#e8f5e8",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
    },
    // Bengali Pink Theme (West Bengal inspired)
    bengali: {
      50: "#fce4ec",
      100: "#f8bbd9",
      200: "#f48fb1",
      300: "#f06292",
      400: "#ec407a",
      500: "#e91e63",
      600: "#d81b60",
      700: "#c2185b",
      800: "#ad1457",
      900: "#880e4f",
    },
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  space: {
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem",
  },
  sizes: {
    max: "max-content",
    min: "min-content",
    full: "100%",
    "3xs": "14rem",
    "2xs": "16rem",
    xs: "20rem",
    sm: "24rem",
    md: "28rem",
    lg: "32rem",
    xl: "36rem",
    "2xl": "42rem",
    "3xl": "48rem",
    "4xl": "56rem",
    "5xl": "64rem",
    "6xl": "72rem",
    "7xl": "80rem",
    "8xl": "96rem",
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
        color: props.colorMode === "dark" ? "white" : "gray.900",
        fontFamily: "body",
        lineHeight: "base",
        fontFeatureSettings: '"kern"',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      html: {
        scrollBehavior: "smooth",
      },
      "*::placeholder": {
        color: props.colorMode === "dark" ? "gray.400" : "gray.500",
      },
      "*, *::before, &::after": {
        borderColor: props.colorMode === "dark" ? "gray.600" : "gray.200",
        wordWrap: "break-word",
      },
      ".sr-only": {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: "0",
      },
      ".sr-only:focus": {
        position: "static",
        width: "auto",
        height: "auto",
        padding: "inherit",
        margin: "inherit",
        overflow: "visible",
        clip: "auto",
        whiteSpace: "normal",
      },
      // Reduced motion support
      "@media (prefers-reduced-motion: reduce)": {
        "*": {
          animationDuration: "0.01ms !important",
          animationIterationCount: "1 !important",
          transitionDuration: "0.01ms !important",
        },
      },
      // High contrast mode support
      "@media (prefers-contrast: high)": {
        "*": {
          borderColor: props.colorMode === "dark" ? "white" : "black",
        },
      },
    }),
  },
  shadows: {
    xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    inner: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
    none: "none",
    dark: {
      lg: "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(0, 0, 0, 0.4) 0px 15px 40px",
    },
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "semibold",
        borderRadius: "lg",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: "translateY(0)",
        _hover: {
          transform: "translateY(-2px)",
          boxShadow: "lg",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
          outline: "2px solid transparent",
          outlineOffset: "2px",
          borderColor: "saffron.500",
          transform: "translateY(-1px)",
        },
        _focusVisible: {
          boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
          outline: "2px solid saffron.500",
          outlineOffset: "2px",
          transform: "translateY(-1px)",
        },
        _active: {
          transform: "translateY(0)",
          transition: "all 0.1s ease-in-out",
        },
      },
      sizes: {
        lg: {
          h: 12,
          minW: 12,
          fontSize: "lg",
          px: 6,
        },
      },
      variants: {
        solid: (props) => ({
          bg: `${props.colorScheme}.500`,
          color: "white",
          _hover: {
            bg: `${props.colorScheme}.600`,
            transform: "translateY(-1px)",
            boxShadow: "lg",
            _disabled: {
              bg: `${props.colorScheme}.500`,
              transform: "none",
              boxShadow: "none",
            },
          },
          _active: {
            bg: `${props.colorScheme}.700`,
            transform: "translateY(0)",
          },
          _focus: {
            bg: `${props.colorScheme}.500`,
            boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
          },
        }),
        ghost: (props) => ({
          _hover: {
            bg: `${props.colorScheme}.50`,
            transform: "translateY(-1px)",
            boxShadow: "sm",
          },
          _active: {
            transform: "translateY(0)",
          },
          _focus: {
            bg: `${props.colorScheme}.50`,
            boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
          },
        }),
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: "lg",
            _focus: {
              borderColor: "saffron.500",
              boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
              outline: "2px solid transparent",
            },
            _focusVisible: {
              borderColor: "saffron.500",
              boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
              outline: "2px solid saffron.500",
              outlineOffset: "2px",
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderRadius: "lg",
          _focus: {
            borderColor: "saffron.500",
            boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
            outline: "2px solid transparent",
          },
          _focusVisible: {
            borderColor: "saffron.500",
            boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
            outline: "2px solid saffron.500",
            outlineOffset: "2px",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        transition: "all 0.2s ease-in-out",
        _hover: {
          textDecoration: "underline",
          transform: "translateY(-1px)",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
          outline: "2px solid transparent",
          outlineOffset: "2px",
          textDecoration: "underline",
        },
        _focusVisible: {
          boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
          outline: "2px solid saffron.500",
          outlineOffset: "2px",
          textDecoration: "underline",
        },
      },
    },
    Card: {
      baseStyle: {
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        _hover: {
          transform: "translateY(-4px)",
          boxShadow: "xl",
        },
        _focus: {
          boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6), xl",
          outline: "2px solid saffron.500",
          outlineOffset: "2px",
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            borderRadius: "lg",
            _focus: {
              borderColor: "saffron.500",
              boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
              outline: "2px solid transparent",
            },
            _focusVisible: {
              borderColor: "saffron.500",
              boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
              outline: "2px solid saffron.500",
              outlineOffset: "2px",
            },
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          _focus: {
            boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
            outline: "2px solid transparent",
          },
          _focusVisible: {
            boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
            outline: "2px solid saffron.500",
            outlineOffset: "2px",
          },
        },
      },
    },
    Radio: {
      baseStyle: {
        control: {
          _focus: {
            boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
            outline: "2px solid transparent",
          },
          _focusVisible: {
            boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
            outline: "2px solid saffron.500",
            outlineOffset: "2px",
          },
        },
      },
    },
  },
});
export default theme;
