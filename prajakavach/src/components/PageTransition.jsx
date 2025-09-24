import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.05,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const PageTransition = ({ children, key }) => {
  return (
    <motion.div
      key={key}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
