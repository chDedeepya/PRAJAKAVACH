import { GiEarthCrack, GiWaterDrop, GiWhirlwind, GiFire } from "react-icons/gi"; 
// Removed GiTsunami & GiWindHole (not available in react-icons)
// Replaced GiWindHole with GiWhirlwind (cyclone-like symbol)
// For tsunami/flood, GiWaterDrop or GiBigWave can be used

export const categories = ["All", "Earthquake", "Flood", "Cyclone", "Fire"];

export const questions = [
  {
    q: "What should you do during an earthquake?",
    options: [
      "Run outside",
      "Drop, Cover, Hold",
      "Stand near windows",
      "Use the lift"
    ],
    correct: 1,
    category: "Earthquake",
    icon: GiEarthCrack,
    explanation:
      "Drop, Cover, and Hold is the safest position during an earthquake. It protects you from falling objects."
  },
  {
    q: "After an earthquake, what should you do first?",
    options: [
      "Call friends immediately",
      "Check for injuries and hazards",
      "Turn on all lights",
      "Go outside to see damage"
    ],
    correct: 1,
    category: "Earthquake",
    icon: GiEarthCrack,
    explanation:
      "First check yourself and others for injuries, then assess your surroundings for hazards like gas leaks."
  },
  {
    q: "Flood warning is issued. What is the safest action?",
    options: [
      "Go to the basement",
      "Move to higher ground",
      "Drive through water",
      "Wait at home"
    ],
    correct: 1,
    category: "Flood",
    icon: GiWaterDrop, // could also use GiBigWave
    explanation:
      "Moving to higher ground is crucial during floods. Never drive through flood waters."
  },
  {
    q: "How deep can flood water be before it's dangerous to walk in?",
    options: [
      "Any depth is safe",
      "6 inches deep",
      "2 feet deep",
      "10 feet deep"
    ],
    correct: 1,
    category: "Flood",
    icon: GiWaterDrop,
    explanation:
      "Even 6 inches of moving water can knock you down. 12 inches can sweep away a car."
  },
  {
    q: "During a cyclone, you should:",
    options: [
      "Go to the beach to watch",
      "Stay indoors away from windows",
      "Open all windows",
      "Go outside to secure objects"
    ],
    correct: 1,
    category: "Cyclone",
    icon: GiWhirlwind, // cyclone-style icon
    explanation:
      "Stay indoors and away from windows during cyclones. Flying debris can be extremely dangerous."
  },
  {
    q: "If your clothes catch fire, you should:",
    options: ["Run fast", "Stop, Drop, and Roll", "Use water immediately", "Call for help"],
    correct: 1,
    category: "Fire",
    icon: GiFire,
    explanation: "Stop, Drop, and Roll helps extinguish flames on your clothes."
  }
];
