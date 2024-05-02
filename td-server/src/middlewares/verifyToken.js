const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  console.log('verifyToken middleware invoked');
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  jwt.verify(token, 'q98KlO0ppzcE34G7', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;
    req.userName = decoded.name;
    req.userSurName = decoded.surname;
    req.userStartDate = decoded.startDate;
    req.email = decoded.email;
    req.number = decoded.number;
    req.profileImage = decoded.profileImage;

    next();
  });
};

module.exports = {
  verifyToken,
};
