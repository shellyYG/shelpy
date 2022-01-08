require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // create json web token
const signUpModel = require('../models/signUpModel');
const { generateAccessToken } = require('../../util/util');

const createUserObject = async (data, encryptedpass, ivString) => {
    // insert to
    const userRawAttri = await signUpModel.getUserRawAttributeAfterInsert(
    data,
    encryptedpass,
    ivString,
  );
  const { id, provider, name, email } = userRawAttri[0];
  const dataObject = {
    user: {
      id,
      provider,
      name,
      email,
    },
  };
  const userObject = {
    data: dataObject,
  };
  const payloadObject = {
    data: dataObject.user,
  };
  const accessToken = generateAccessToken(payloadObject);

  dataObject.access_token = accessToken;

  // Verify token to get lifetime for token
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    // eslint-disable-line no-shadow
    if (err) throw Error('TOKEN_EXPIRED_OR_NOT_MATCH');
    dataObject.access_expired = payload.exp - payload.iat;
  });
  console.log('createUserObject returned value userObject: ', userObject);
  return userObject
};

const checkExist = async (data, encryptedpass, ivString) => {
  const existingEmails = await signUpModel.checkEmailExist(data);
  if (existingEmails.length > 0) {
    throw Error('EMAIL_EXIST');
  } else {
    const userObject = createUserObject(
      data,
      encryptedpass,
      ivString,
    );
    return userObject;
  }
};

const postSignUpData = async (req, res) => {
  const { data } = req.body;
  const iv = crypto.randomBytes(16); // different everytime
  const ivString = iv.toString('base64');
  const { password } = data;
  if (!password) { // User finished first sign-up step.
    try {
      const { userObject } = await checkExist(data, '', ivString);
      res.status(200).json(userObject);
      return;
    } catch (error) {
      res.status(400).send(error.message);
      return;
    }
  }
  const key = process.env.ACCESS_TOKEN_KEY;
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedpass = cipher.update(password, 'utf-8', 'hex');
  encryptedpass += cipher.final('hex');
  try {
    const { userObject } = checkExist(data, encryptedpass, ivString);
    if (userObject) {
        res.json(userObject);
    }
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
};

module.exports = {
  postSignUpData,
};
