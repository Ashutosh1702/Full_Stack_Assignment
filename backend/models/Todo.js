const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  dueDate: {
    type: Date
  },
  category: {
    type: String,
    enum: ['Urgent', 'Non-Urgent'],
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true // Add index for user
  }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema); 