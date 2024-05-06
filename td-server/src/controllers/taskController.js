const Task = require('../models/Task');

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
exports.editTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: error.message });
  }
};