import { GiEarthCrack, GiWaterDrop, GiWindHole, GiFire, GiWaveSurfer, GiFallingRocks } from "react-icons/gi";

export const learnData = [
  {
    title: "Earthquake Safety",
    icon: GiEarthCrack,
    region: "Himachal, North-East",
    steps: ["Drop, Cover, Hold!", "Move away from windows.", "Evacuate when safe."],
    color: "orange.400",
    story: "Imagine the ground shaking like a giant monster waking up! In 2001, Gujarat earthquake caused huge damage, but people who followed safety rules survived.",
    article: "https://en.wikipedia.org/wiki/2001_Gujarat_earthquake",
    examples: ["2001 Gujarat Earthquake", "2015 Nepal Earthquake"]
  },
  {
    title: "Flood Safety",
    icon: GiWaterDrop,
    region: "Assam, Bihar",
    steps: ["Move to higher ground.", "Avoid flood water.", "Disconnect appliances."],
    color: "blue.400",
    story: "Rivers can become angry and overflow! In 2017, Kerala floods affected millions, but those who moved to safe places were okay.",
    article: "https://en.wikipedia.org/wiki/2018_Kerala_floods",
    examples: ["2018 Kerala Floods", "2008 Bihar Floods"]
  },
  {
    title: "Cyclone Safety",
    icon: GiWindHole,
    region: "Odisha, Andhra",
    steps: ["Stay indoors.", "Close windows.", "Keep emergency kit ready."],
    color: "green.400",
    story: "Winds can be so strong they lift houses! Cyclone Phailin in 2013 was very powerful, but Odisha people were prepared and safe.",
    article: "https://en.wikipedia.org/wiki/Cyclone_Phailin",
    examples: ["Cyclone Phailin 2013", "Cyclone Hudhud 2014"]
  },
  {
    title: "Fire Safety",
    icon: GiFire,
    region: "All India",
    steps: ["Stay low.", "Use nearest exit.", "Don't use lifts."],
    color: "red.400",
    story: "Fire can spread quickly like a hungry tiger! In 2019, Delhi fire in a hospital showed how important quick evacuation is.",
    article: "https://en.wikipedia.org/wiki/Fire_safety",
    examples: ["Delhi Hospital Fire 2019", "Kolkata Building Fire 2010"]
  },
  {
    title: "Tsunami Safety",
    icon: GiWaveSurfer,
    region: "Coastal Areas",
    steps: ["Move to higher ground immediately.", "Follow tsunami warnings.", "Don't go to beach."],
    color: "blue.600",
    story: "Giant waves from the sea can crash inland! 2004 Indian Ocean Tsunami was devastating, but early warnings saved many lives.",
    article: "https://en.wikipedia.org/wiki/2004_Indian_Ocean_tsunami",
    examples: ["2004 Indian Ocean Tsunami", "2011 Japan Tsunami"]
  },
  {
    title: "Landslide Safety",
    icon: GiFallingRocks,
    region: "Hilly Areas",
    steps: ["Move away from loose soil.", "Don't build on slopes.", "Watch for warning signs."],
    color: "brown.400",
    story: "Hills can slide down like an avalanche! In 2013, Uttarakhand landslides caused by heavy rain showed the power of nature.",
    article: "https://en.wikipedia.org/wiki/Landslide",
    examples: ["2013 Uttarakhand Landslides", "2014 Malin Landslide"]
  },
];
