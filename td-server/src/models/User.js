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
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
  team: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
