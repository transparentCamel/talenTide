const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    dateDue: { type: Date, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed','late'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    category: { type: String },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
