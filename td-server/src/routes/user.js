const express = require('express');
const router = express.Router();
const { login } = require('../controllers/userController');
const { checkLoginCredentials } = require('../middlewares/loginAuth');
const { verifyToken } = require('../middlewares/verifyToken');
router.post('/login', checkLoginCredentials, login);

router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'This is a secured route', userId: req.userId });
});

module.exports = router;
