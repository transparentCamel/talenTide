const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/tasks');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use(express.static('public'));
app.use('/api/tasks', taskRoutes);

mongoose
  .connect('mongodb://127.0.0.1:27017/talentide', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });

app.listen(3001, () => {
  console.log('Server is running');
});
