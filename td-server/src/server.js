const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);

mongoose
  .connect('mongodb://localhost:27017/talenttideDB', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });

app.listen(3001, () => {
  console.log('server is running');
});
