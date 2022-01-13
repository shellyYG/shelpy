require('dotenv').config();
const jwt = require('jsonwebtoken');

const wrapAsync = (func) => function (req, res, next) {
  func(req, res, next).catch(next);
};

const generateAccessToken = function (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1s',
  });
};

const verifyToken = function (req, res, next) {
  const bearerHeader = req.headers.authorization;
  try {
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET);
      next();
    } else {
      res.status(403).send('INVALID_TOKEN');
    }
  } catch (error) {
    res.status(403).send('INVALID_TOKEN');
  }
};

module.exports = {
  wrapAsync,
  verifyToken,
  generateAccessToken,
};
