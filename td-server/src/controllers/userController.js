const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        name: user.name,
        startDate: user.startDate,
      },
      'q98KlO0ppzcE34G7',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token: token,
      id: user._id,
      role: user.role,
      name: user.name,
      surname: user.surname,
      startDate: user.startDate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  login,
};
