const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  surname: String,
  startDate: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
