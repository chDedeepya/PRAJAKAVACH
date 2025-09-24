import React, { useState } from "react";
import { IconButton, Badge, Box, VStack, Text, Popover, PopoverTrigger, PopoverContent, PopoverBody } from "@chakra-ui/react";
import { MdNotificationsActive } from "react-icons/md";

// Example notification system (expand with Firebase messaging or Firestore)
const sampleNotifications = [
  { id: 1, text: "Drill scheduled tomorrow at 10am" },
  { id: 2, text: "NDMA Alert: Flood warning in your region" },
];

export default function NotificationsBell() {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Popover isOpen={open} onClose={()=>setOpen(false)} placement="bottom-end">
        <PopoverTrigger>
          <IconButton
            icon={
              <Badge colorScheme="red" borderRadius="full" px={2} fontSize="0.8em" mr={-1} mb={-3}>
                {sampleNotifications.length}
              </Badge>
            }
            aria-label="Notifications"
            colorScheme="orange"
            variant="ghost"
            fontSize="2xl"
            iconSpacing={0}
            onClick={() => setOpen(!open)}
          >
            <MdNotificationsActive />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent w="260px">
          <PopoverBody>
            <VStack align="start">
              {sampleNotifications.map((n) => (
                <Text key={n.id} fontSize="sm" py={1}>{n.text}</Text>
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}