const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const user = req.user;

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        startDate: user.startDate,
        team: user.team,
        profileImage: user.profileImage,
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
      email: user.email,
      phone: user.phone,
      startDate: user.startDate,
      team: user.team,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
