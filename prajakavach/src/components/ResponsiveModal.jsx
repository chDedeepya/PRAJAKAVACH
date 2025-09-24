import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useBreakpointValue,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionModalContent = motion(ModalContent);

const ResponsiveModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  isCentered = true,
  closeOnOverlayClick = true,
  ...props
}) => {
  // Responsive values
  const modalSize = useBreakpointValue({
    base: "full",
    sm: size === "lg" ? "md" : size === "xl" ? "lg" : size,
    md: size,
  });

  const padding = useBreakpointValue({ base: 4, md: 6 });
  const headerSize = useBreakpointValue({ base: "lg", md: "xl" });
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSpacing = useBreakpointValue({ base: 2, md: 3 });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={modalSize}
      isCentered={isCentered}
      closeOnOverlayClick={closeOnOverlayClick}
      motionPreset="slideInBottom"
      {...props}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px)"
      />
      <MotionModalContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        mx={{ base: 0, md: 4 }}
        my={{ base: 0, md: 4 }}
        borderRadius={{ base: 0, md: "xl" }}
        overflow="hidden"
      >
        {title && (
          <ModalHeader
            pb={4}
            fontSize={headerSize}
            fontWeight="bold"
            color="saffron.500"
            borderBottom="1px"
            borderColor="gray.200"
          >
            {title}
          </ModalHeader>
        )}

        <ModalCloseButton
          size={buttonSize}
          _hover={{ bg: "red.50", color: "red.500" }}
          aria-label="Close modal"
        />

        <ModalBody p={padding}>
          {children}
        </ModalBody>

        {footer && (
          <ModalFooter
            borderTop="1px"
            borderColor="gray.200"
            pt={4}
          >
            <HStack spacing={buttonSpacing} w="full" justify="flex-end">
              {footer}
            </HStack>
          </ModalFooter>
        )}
      </MotionModalContent>
    </Modal>
  );
};

// Pre-built modal variants for common use cases
export const ConfirmationModal = ({
  isOpen,
  onClose,
  title = "Confirm Action",
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColorScheme = "red",
  isLoading = false,
}) => {
  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button
            variant="ghost"
            onClick={onClose}
            size="md"
            isDisabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            colorScheme={confirmColorScheme}
            onClick={onConfirm}
            size="md"
            isLoading={isLoading}
            loadingText="Processing..."
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <Box textAlign="center" py={4}>
        {message}
      </Box>
    </ResponsiveModal>
  );
};

export const InfoModal = ({
  isOpen,
  onClose,
  title,
  children,
  buttonText = "Close",
}) => {
  return (
    <ResponsiveModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={
        <Button
          colorScheme="saffron"
          onClick={onClose}
          size="md"
        >
          {buttonText}
        </Button>
      }
    >
      {children}
    </ResponsiveModal>
  );
};

export default ResponsiveModal;
