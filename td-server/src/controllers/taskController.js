const Task = require('../models/Task');
const cron = require('node-cron');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  req.body.status = req.body.status || 'pending';
  req.body.dateAssigned = req.body.dateAssigned || new Date().toISOString();

  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dateAssigned: req.body.dateAssigned,
    dateDue: req.body.dateDue,
    assignedTo: req.body.assignedTo,
    status: req.body.status,
    priority: req.body.priority,
    category: req.body.category,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.userEdit = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.status === 'pending') {
      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
      });
      res.json(updatedTask);
    } else if (task.status === 'in_progress') {
      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
      });
      res.json(updatedTask);
    } else if (task.status === 'completed') {
      return res.status(400).json({ message: 'Task already completed' });
    }
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.editTask = async (req, res) => {
  const taskId = req.params.id;
  const taskData = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, {
      new: true,
    });

    if (updatedTask.status !== 'pending') {
      updatedTask.status = 'pending';
      await updatedTask.save();
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
