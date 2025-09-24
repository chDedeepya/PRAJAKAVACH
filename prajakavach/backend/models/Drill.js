const mongoose = require('mongoose');

const drillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Drill title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Drill description is required'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  type: {
    type: String,
    required: [true, 'Drill type is required'],
    enum: ['earthquake', 'flood', 'fire', 'cyclone', 'landslide', 'tsunami', 'general']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Duration is required'],
    min: [15, 'Duration must be at least 15 minutes'],
    max: [480, 'Duration cannot exceed 8 hours']
  },
  maxParticipants: {
    type: Number,
    default: 50,
    min: [1, 'At least 1 participant required'],
    max: [1000, 'Cannot exceed 1000 participants']
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Instructor is required']
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    attendedAt: Date,
    status: {
      type: String,
      enum: ['registered', 'attended', 'completed', 'absent'],
      default: 'registered'
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comments: String
    }
  }],
  prerequisites: [{
    type: String,
    trim: true
  }],
  materials: [{
    name: String,
    quantity: Number,
    description: String
  }],
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  objectives: [{
    type: String,
    trim: true
  }],
  safetyGuidelines: [{
    type: String,
    trim: true
  }],
  images: [{
    url: String,
    caption: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
drillSchema.index({ scheduledDate: 1 });
drillSchema.index({ type: 1 });
drillSchema.index({ status: 1 });
drillSchema.index({ instructor: 1 });

// Virtual for available spots
drillSchema.virtual('availableSpots').get(function() {
  return this.maxParticipants - this.participants.length;
});

// Virtual for isFull
drillSchema.virtual('isFull').get(function() {
  return this.participants.length >= this.maxParticipants;
});

// Pre-save middleware to validate scheduled date
drillSchema.pre('save', function(next) {
  if (this.scheduledDate < new Date()) {
    return next(new Error('Scheduled date cannot be in the past'));
  }
  next();
});

// Static method to find upcoming drills
drillSchema.statics.findUpcoming = function(limit = 10) {
  return this.find({
    scheduledDate: { $gte: new Date() },
    status: 'scheduled',
    isActive: true
  })
  .populate('instructor', 'name email')
  .sort({ scheduledDate: 1 })
  .limit(limit);
};

// Static method to find drills by type
drillSchema.statics.findByType = function(type, limit = 20) {
  return this.find({
    type,
    scheduledDate: { $gte: new Date() },
    status: 'scheduled',
    isActive: true
  })
  .populate('instructor', 'name email')
  .sort({ scheduledDate: 1 })
  .limit(limit);
};

module.exports = mongoose.model('Drill', drillSchema);
