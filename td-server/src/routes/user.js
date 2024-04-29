const express = require('express');
const router = express.Router();
const { login } = require('../controllers/userController');
const { checkLoginCredentials } = require('../middlewares/loginAuth');
const { verifyToken } = require('../middlewares/verifyToken');
const User = require('../models/User');

router.post('/login', checkLoginCredentials, login);

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'This is a secured route', userId: req.userId });
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
