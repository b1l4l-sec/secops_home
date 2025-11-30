const mongoose = require('mongoose');

const ctfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  preview: {
    type: String
  },
  previewType: {
    type: String,
    enum: ['image', 'video', 'link'],
    default: 'image'
  },
  videoLink: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CTF', ctfSchema);
