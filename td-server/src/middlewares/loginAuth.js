const User = require('../models/User');
const mongoose = require('mongoose');

const checkLoginCredentials = async (req, res, next) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res
      .status(400)
      .json({ message: 'Both ID and password are required' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  checkLoginCredentials,
};
