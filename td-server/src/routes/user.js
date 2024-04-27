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

module.exports = router;
