require('dotenv').config();
const jwt = require('jsonwebtoken');

const wrapAsync = (func) => function (req, res, next) {
  func(req, res, next).catch(next);
};

const generateHelpeeAccessToken = function (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '100000s',
  });
};
const generateHelperAccessToken = function (user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '100000s',
  });
};

const verifyHelpeeToken = function (req, res, next) {
  const bearerHeader = req.headers.authorization;
  try {
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      const decodedData = jwt.verify(
        bearerToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      if (decodedData && decodedData.data) {
        res.locals.userId = decodedData.data.id;
        res.locals.username = decodedData.data.username;
        res.locals.status = decodedData.data.status;
      }
      next();
    } else {
      res.status(403).send('INVALID_TOKEN');
    }
  } catch (error) {
    res.status(403).send('INVALID_TOKEN');
  }
};

const verifyHelperToken = function (req, res, next) {
  const bearerHeader = req.headers.authorization;
  try {
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      const decodedData = jwt.verify(
        bearerToken,
        process.env.ACCESS_TOKEN_SECRET
      );
      
      if (decodedData && decodedData.data) {
        res.locals.userId = decodedData.data.id;
        res.locals.username = decodedData.data.username;
        res.locals.status = decodedData.data.status;
      }
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
  generateHelpeeAccessToken,
  generateHelperAccessToken,
  verifyHelpeeToken,
  verifyHelperToken,
};
