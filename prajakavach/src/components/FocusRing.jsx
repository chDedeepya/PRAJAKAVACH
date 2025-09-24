import React from "react";
import { Box } from "@chakra-ui/react";

const FocusRing = ({ children, ...props }) => {
  return (
    <Box
      _focus={{
        outline: "2px solid",
        outlineColor: "saffron.500",
        outlineOffset: "2px",
        boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
      }}
      _focusVisible={{
        outline: "2px solid",
        outlineColor: "saffron.500",
        outlineOffset: "2px",
        boxShadow: "0 0 0 3px rgba(255, 153, 51, 0.6)",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default FocusRing;
