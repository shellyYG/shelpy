require('dotenv').config();
const jwt = require('jsonwebtoken');

const wrapAsync = (func) => function (req, res, next) {
  func(req, res, next).catch(next);
};

const generateAccessToken = function (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10800s',
  });
};

const verifyToken = function (req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403); // forbidden
  }
};

module.exports = {
  wrapAsync,
  verifyToken,
  generateAccessToken,
};
