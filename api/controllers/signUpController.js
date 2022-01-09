require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); // create json web token
const signUpModel = require('../models/signUpModel');
const { generateAccessToken } = require('../../util/util');

const createUserObject = async (data, encryptedpass, ivString) => {
  const { provider, username, email } = data;
  // insert to DB
  if (data.status === 'only_email_signed_up') {
    const userId = await signUpModel.insertUserAndGetUserId(
      data,
      encryptedpass,
      ivString
    );
    return { user: { id: userId, provider, username, email } };
  }
  try {
    const { userId } = await signUpModel.getUserIdByEmail(data);
    const { isHelpee } = data;
    await signUpModel.updateUserPassword(isHelpee, userId, encryptedpass, ivString);
    const id = userId;
    const dataObject = {
      user: {
        id,
        provider,
        username,
        email,
      },
    };
    const accessToken = generateAccessToken({
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
      if (err) throw Error('TOKEN_EXPIRED_OR_NOT_MATCH');
      dataObject.accessExpired = payload.exp - payload.iat;
    });
    return dataObject;
  } catch (error) {
    console.error(error);
    throw Error(error.message);
  } 
};

const emailExisted = async (data) => {
  const existingEmails = await signUpModel.checkEmailExist(data);
  if (existingEmails.length > 0) {
    return true;
  } return false;
};

const postSignUpData = async (req, res) => {
  const { data } = req.body;
  const { status, password } = data;
  const iv = crypto.randomBytes(16); // different everytime
  const ivString = iv.toString('base64');
  // Insert Email only.
  if (status === 'only_email_signed_up') {
    try {
      const isEmailExisted = await emailExisted(data);
      if (isEmailExisted) {
        throw Error('EMAIL_EXIST');
      }
      const userObject = await createUserObject(data); // insert DB
      res.status(200).json(userObject);
      return;
    } catch (error) {
      res.status(400).send(error.message);
      return;
    }
  }
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
  postSignUpData,
};
