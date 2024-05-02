const express = require('express');
const router = express.Router();

const multer = require('multer');
const { login } = require('../controllers/userController');
const { checkLoginCredentials } = require('../middlewares/loginAuth');
const { verifyToken } = require('../middlewares/verifyToken');
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationDir = 'public/images';

    cb(null, destinationDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.post('/login', checkLoginCredentials, login);

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'This is a secured route', userId: req.userId });
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post(
  '/:id/upload-image',
  upload.single('profileImage'),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const fileName = req.file.filename;

      user.profileImage = fileName;
      await user.save();

      res.status(200).json({
        message: 'Image uploaded successfully',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.get('/:id/getImage', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ profileImage: user.profileImage });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
