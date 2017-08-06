const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, '标题是必须的']
  },

  by: {
    type: String
  },

  url: {
    type: String,
    trim: true
  },

  type: {
    type: String,
    enum: ['news', 'work', 'jobs', 'joke', 'asks']
  },

  text: {
    type: String
  },
  
  score: {
    type: Number,
    default: 1
  }
  
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  }
});

module.exports = mongoose.model('Post', schema);