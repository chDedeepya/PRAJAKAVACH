import React from "react";
import { Box } from "@chakra-ui/react";

const ScreenReaderOnly = ({ children, ...props }) => {
  return (
    <Box
      className="sr-only"
      {...props}
    >
      {children}
    </Box>
  );
};

export default ScreenReaderOnly;
