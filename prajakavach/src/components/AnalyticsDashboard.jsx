import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useToast,
} from "@chakra-ui/react";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // TODO: Fetch analytics data from backend API
    setAnalytics([
      { _id: "1", label: "Preparedness Score", value: 75, change: 5 },
      { _id: "2", label: "Drill Participation", value: 80, change: -3 },
      { _id: "3", label: "User Registrations", value: 120, change: 10 },
    ]);
  }, []);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
        {analytics.map((item) => (
          <Stat key={item._id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <StatLabel>{item.label}</StatLabel>
            <StatNumber>{item.value}</StatNumber>
            <StatHelpText>
              <StatArrow type={item.change >= 0 ? "increase" : "decrease"} />
              {Math.abs(item.change)}%
            </StatHelpText>
          </Stat>
        ))}
      </SimpleGrid>
    </Box>
  );
}
