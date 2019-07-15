const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  // Parse JWT from Bearer token in header
  const bearerToken = req.header('authorization');
  const tokenArray = bearerToken.split(' ');
  const token = tokenArray[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {

    if (err) {
      console.log(err);
      res.status(401).json({ message: 'Authentication failed' });

    } else {
      req.authUserId = decodedToken.userId;
      next();
    }
  });
};
