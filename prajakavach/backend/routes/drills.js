const express = require('express');
const Drill = require('../models/Drill');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

// Get all drills
router.get('/', authenticate, async (req, res) => {
  try {
    const { type, status, limit = 20, page = 1 } = req.query;
    const query = { isActive: true };

    if (type) query.type = type;
    if (status) query.status = status;

    const drills = await Drill.find(query)
      .populate('instructor', 'name email')
      .sort({ scheduledDate: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Drill.countDocuments(query);

    res.json({
      drills,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalDrills: total
      }
    });
  } catch (error) {
    console.error('Get drills error:', error);
    res.status(500).json({ message: 'Server error fetching drills' });
  }
});

// Get upcoming drills
router.get('/upcoming', authenticate, async (req, res) => {
  try {
    const drills = await Drill.findUpcoming(10);
    res.json(drills);
  } catch (error) {
    console.error('Get upcoming drills error:', error);
    res.status(500).json({ message: 'Server error fetching upcoming drills' });
  }
});

// Get drill by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const drill = await Drill.findById(req.params.id)
      .populate('instructor', 'name email')
      .populate('participants.user', 'name email school grade');
    if (!drill) return res.status(404).json({ message: 'Drill not found' });
    res.json(drill);
  } catch (error) {
    console.error('Get drill error:', error);
    res.status(500).json({ message: 'Server error fetching drill' });
  }
});

// Create new drill (admin/teacher only)
router.post('/', authenticate, authorize('admin', 'teacher'), async (req, res) => {
  try {
    const drillData = { ...req.body, instructor: req.user._id };
    const drill = new Drill(drillData);
    await drill.save();
    await drill.populate('instructor', 'name email');
    res.status(201).json({ message: 'Drill created successfully', drill });
  } catch (error) {
    console.error('Create drill error:', error);
    res.status(500).json({ message: 'Server error creating drill' });
  }
});

// Update drill (admin or instructor only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const drill = await Drill.findById(req.params.id);
    if (!drill) return res.status(404).json({ message: 'Drill not found' });

    // Check if user is admin or the instructor
    if (req.user.role !== 'admin' && drill.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedDrill = await Drill.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('instructor', 'name email');
    res.json({ message: 'Drill updated', drill: updatedDrill });
  } catch (error) {
    console.error('Update drill error:', error);
    res.status(500).json({ message: 'Server error updating drill' });
  }
});

// Register for drill
router.post('/:id/register', authenticate, async (req, res) => {
  try {
    const drill = await Drill.findById(req.params.id);
    if (!drill) return res.status(404).json({ message: 'Drill not found' });

    if (drill.status !== 'scheduled') {
      return res.status(400).json({ message: 'Drill is not available for registration' });
    }

    if (drill.isFull) {
      return res.status(400).json({ message: 'Drill is full' });
    }

    // Check if user is already registered
    const existingParticipant = drill.participants.find(p => p.user.toString() === req.user._id.toString());
    if (existingParticipant) {
      return res.status(400).json({ message: 'Already registered for this drill' });
    }

    drill.participants.push({ user: req.user._id });
    await drill.save();

    res.json({ message: 'Successfully registered for drill' });
  } catch (error) {
    console.error('Register for drill error:', error);
    res.status(500).json({ message: 'Server error registering for drill' });
  }
});

// Unregister from drill
router.delete('/:id/register', authenticate, async (req, res) => {
  try {
    const drill = await Drill.findById(req.params.id);
    if (!drill) return res.status(404).json({ message: 'Drill not found' });

    const participantIndex = drill.participants.findIndex(p => p.user.toString() === req.user._id.toString());
    if (participantIndex === -1) {
      return res.status(400).json({ message: 'Not registered for this drill' });
    }

    drill.participants.splice(participantIndex, 1);
    await drill.save();

    res.json({ message: 'Successfully unregistered from drill' });
  } catch (error) {
    console.error('Unregister from drill error:', error);
    res.status(500).json({ message: 'Server error unregistering from drill' });
  }
});

// Delete drill (admin or instructor only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const drill = await Drill.findById(req.params.id);
    if (!drill) return res.status(404).json({ message: 'Drill not found' });

    // Check if user is admin or the instructor
    if (req.user.role !== 'admin' && drill.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Drill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Drill deleted' });
  } catch (error) {
    console.error('Delete drill error:', error);
    res.status(500).json({ message: 'Server error deleting drill' });
  }
});

module.exports = router;
