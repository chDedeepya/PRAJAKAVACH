const express = require('express');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Get all disaster types and information
router.get('/', authenticate, async (req, res) => {
  try {
    const disasters = [
      {
        id: 'earthquake',
        name: 'Earthquake',
        description: 'Sudden shaking of the ground caused by tectonic plate movement',
        preparedness: [
          'Secure heavy furniture and appliances',
          'Know your building\'s evacuation plan',
          'Keep emergency supplies ready',
          'Learn the "Drop, Cover, Hold On" technique'
        ],
        during: [
          'Drop to the ground',
          'Take cover under sturdy furniture',
          'Hold on until shaking stops',
          'Stay away from windows and exterior walls'
        ],
        after: [
          'Check for injuries and provide first aid',
          'Check for structural damage',
          'Avoid damaged buildings',
          'Follow local authorities\' instructions'
        ]
      },
      {
        id: 'flood',
        name: 'Flood',
        description: 'Overflow of water that submerges land',
        preparedness: [
          'Know your flood risk',
          'Prepare an emergency kit',
          'Make a family emergency plan',
          'Elevate electrical appliances'
        ],
        during: [
          'Move to higher ground immediately',
          'Avoid walking or driving through flood waters',
          'Stay tuned to local radio/TV for updates',
          'Do not attempt to cross flowing water'
        ],
        after: [
          'Return home only when authorities say it\'s safe',
          'Avoid floodwaters as they may be contaminated',
          'Take photos of damage for insurance',
          'Clean and disinfect everything'
        ]
      },
      {
        id: 'cyclone',
        name: 'Cyclone',
        description: 'Large scale air mass that rotates around a strong center of low pressure',
        preparedness: [
          'Know cyclone warning signals',
          'Prepare emergency kit with essentials',
          'Secure your home and property',
          'Know evacuation routes and shelters'
        ],
        during: [
          'Stay indoors in a safe room',
          'Keep away from windows and doors',
          'Listen to radio for updates',
          'Avoid using telephone except for emergencies'
        ],
        after: [
          'Stay away from damaged areas',
          'Follow instructions from authorities',
          'Check for injuries and damage',
          'Be cautious of fallen power lines'
        ]
      },
      {
        id: 'fire',
        name: 'Fire',
        description: 'Uncontrolled burning that can cause damage and harm',
        preparedness: [
          'Install smoke detectors and fire extinguishers',
          'Know your building\'s fire escape routes',
          'Practice fire drills regularly',
          'Keep emergency numbers handy'
        ],
        during: [
          'Alert others and evacuate immediately',
          'Use stairs, never elevators',
          'Crawl low under smoke',
          'Cover mouth with wet cloth if needed'
        ],
        after: [
          'Call emergency services if fire is still burning',
          'Do not re-enter the building',
          'Account for all family members',
          'Seek medical attention for smoke inhalation'
        ]
      },
      {
        id: 'landslide',
        name: 'Landslide',
        description: 'Movement of rock, earth, or debris down a slope',
        preparedness: [
          'Know landslide-prone areas in your region',
          'Plant ground cover on slopes',
          'Divert runoff water away from slopes',
          'Know evacuation routes'
        ],
        during: [
          'Move away from the path of the landslide',
          'Run to the nearest high ground',
          'Stay alert for secondary landslides',
          'Avoid river valleys and low-lying areas'
        ],
        after: [
          'Stay away from the slide area',
          'Check for injured people',
          'Watch for flooding from blocked rivers',
          'Seek professional help for structural damage'
        ]
      },
      {
        id: 'tsunami',
        name: 'Tsunami',
        description: 'Series of large ocean waves caused by underwater earthquakes',
        preparedness: [
          'Know tsunami warning signs',
          'Know evacuation routes to higher ground',
          'Prepare emergency supplies',
          'Learn tsunami safety rules'
        ],
        during: [
          'Move immediately to higher ground',
          'Stay away from the coast',
          'Follow tsunami evacuation routes',
          'Do not return until authorities say it\'s safe'
        ],
        after: [
          'Stay tuned to official warnings',
          'Be prepared for aftershocks',
          'Check for contamination of water supplies',
          'Follow local authorities\' instructions'
        ]
      }
    ];

    res.json(disasters);
  } catch (error) {
    console.error('Get disasters error:', error);
    res.status(500).json({ message: 'Server error fetching disasters' });
  }
});

// Get specific disaster information
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    // For now, return static data. In production, this could come from database
    const disaster = {
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      description: `Information about ${id} disasters`,
      preparedness: ['General preparedness tips'],
      during: ['Actions to take during the disaster'],
      after: ['Post-disaster recovery steps']
    };

    res.json(disaster);
  } catch (error) {
    console.error('Get disaster error:', error);
    res.status(500).json({ message: 'Server error fetching disaster' });
  }
});

module.exports = router;
