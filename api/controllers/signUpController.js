require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const signUpModel = require('../models/signUpModel');
const {
  generateHelpeeAccessToken,
  generateHelperAccessToken,
} = require('../../util/util');

const userEmailExisted = async (data) => {
  const existingEmails = await signUpModel.checkUserEmailExist(data);
  if (existingEmails.length > 0) {
    return true;
  }
  return false;
};

const createUserObject = async (data, encryptedpass, ivString) => {
  const { provider, username, email, status } = data;
  // insert to DB
  try {
    const { isHelpee } = data;
    const isUserEmailExisted = await userEmailExisted(data);
    if (isUserEmailExisted) {
      throw Error('Email existed! Please use another email.');
    }
    const id = await signUpModel.insertUserAndGetUserId({
      email,
      status,
      isHelpee,
      password: encryptedpass,
      ivString,
    });
    const dataObject = {
      user: {
        id,
        provider,
        username,
        email,
      },
    };
    const accessToken = data.isHelpee
      ? generateHelpeeAccessToken({
          data: {
            id,
            provider,
            username,
            email,
          },
        })
      : generateHelperAccessToken({
          data: {
            id,
            provider,
            username,
            email,
          },
        }); 
    dataObject.accessToken = accessToken;
    // Verify token to get lifetime for token
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      // eslint-disable-line no-shadow
      if (err) throw Error('Log in session expired.');
      dataObject.accessExpired = payload.exp - payload.iat;
    });
    return dataObject;
  } catch (error) {
    console.error(error);
    throw Error(error.message);
  } 
};

const postUserSignUpData = async (req, res) => {
  const { data } = req.body;
  const { status, password } = data;
  const iv = crypto.randomBytes(16); // different everytime
  const ivString = iv.toString('base64');
  // Update password.
  const key = process.env.ACCESS_TOKEN_KEY;
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedpass = cipher.update(password, 'utf-8', 'hex');
  encryptedpass += cipher.final('hex');
  try {
    const userObject = await createUserObject(data, encryptedpass, ivString);
    if (userObject) {
      res.status(200).json(userObject);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  postUserSignUpData,
};
