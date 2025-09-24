import React from "react";
import { motion } from "framer-motion";
import { VStack } from "@chakra-ui/react";

const MotionVStack = motion(VStack);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

const StaggeredList = ({
  children,
  spacing = 4,
  align = "stretch",
  direction = "column",
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <MotionVStack
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      spacing={spacing}
      align={align}
      direction={direction}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </MotionVStack>
  );
};

export default StaggeredList;
