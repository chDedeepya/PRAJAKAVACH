const express = require('express');
const User = require('../models/User');
const Drill = require('../models/Drill');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

// Get dashboard analytics (admin only)
router.get('/dashboard', authenticate, authorize('admin'), async (req, res) => {
  try {
    // User statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    // Drill statistics
    const totalDrills = await Drill.countDocuments();
    const upcomingDrills = await Drill.countDocuments({
      scheduledDate: { $gte: new Date() },
      status: 'scheduled'
    });
    const completedDrills = await Drill.countDocuments({ status: 'completed' });

    // Drill participation statistics
    const drillParticipation = await Drill.aggregate([
      { $unwind: '$participants' },
      { $group: { _id: null, totalParticipants: { $sum: 1 } } }
    ]);

    // Quiz performance statistics
    const quizStats = await User.aggregate([
      { $unwind: '$quizScores' },
      {
        $group: {
          _id: null,
          totalQuizzes: { $sum: 1 },
          averageScore: { $avg: '$quizScores.score' },
          highestScore: { $max: '$quizScores.score' }
        }
      }
    ]);

    // Monthly user registrations
    const monthlyRegistrations = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    // Drill types distribution
    const drillTypes = await Drill.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    res.json({
      userStats: {
        total: totalUsers,
        active: activeUsers,
        byRole: usersByRole
      },
      drillStats: {
        total: totalDrills,
        upcoming: upcomingDrills,
        completed: completedDrills,
        totalParticipants: drillParticipation[0]?.totalParticipants || 0,
        types: drillTypes
      },
      quizStats: quizStats[0] || {
        totalQuizzes: 0,
        averageScore: 0,
        highestScore: 0
      },
      monthlyRegistrations,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Dashboard analytics error:', error);
    res.status(500).json({ message: 'Server error fetching analytics' });
  }
});

// Get user activity analytics
router.get('/users/activity', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { period = '30' } = req.query; // days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    const userActivity = await User.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json(userActivity);
  } catch (error) {
    console.error('User activity analytics error:', error);
    res.status(500).json({ message: 'Server error fetching user activity' });
  }
});

// Get drill performance analytics
router.get('/drills/performance', authenticate, authorize('admin'), async (req, res) => {
  try {
    const drillPerformance = await Drill.aggregate([
      {
        $match: {
          status: 'completed',
          'participants.0': { $exists: true }
        }
      },
      {
        $project: {
          title: 1,
          type: 1,
          scheduledDate: 1,
          participantCount: { $size: '$participants' },
          maxParticipants: 1,
          attendanceRate: {
            $multiply: [
              { $divide: [{ $size: '$participants' }, '$maxParticipants'] },
              100
            ]
          }
        }
      },
      { $sort: { scheduledDate: -1 } },
      { $limit: 50 }
    ]);

    res.json(drillPerformance);
  } catch (error) {
    console.error('Drill performance analytics error:', error);
    res.status(500).json({ message: 'Server error fetching drill performance' });
  }
});

module.exports = router;
