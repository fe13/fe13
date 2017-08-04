const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, '标题是必须的']
  },
  link: {
    type: String,
    trim: true
  },
  by: {
    type: String
  },
  type: {
    type: String,
    enum: ['news', 'comment', 'job', 'joke', 'show']
  },
  score: {
    type: Number,
    default: 0
  }
});



module.exports = mongoose.model('Post', schema);