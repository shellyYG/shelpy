require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const helpeeSignInModel = require('../models/signInModel');
const { generateAccessToken } = require('../../util/util');

const postHelpeeSignInData = async (req, res) => {
  const { data } = req.body;

  async function getUserEncryptedPass() {
    // Need to use the same ivString to encryt the password for comparison
    const LoginUserResult = await helpeeSignInModel.getUserDataByEmail(req.body.data);
    const sharedIvString = LoginUserResult[0].ivString;
    const { password } = data;
    const key = process.env.ACCESS_TOKEN_KEY;
    const sharedIvStringBuffer = Buffer.from(sharedIvString, 'base64');
    const cipher = crypto.createCipheriv('aes-256-cbc', key, sharedIvStringBuffer);
    let encryptedLoginPass = cipher.update(password, 'utf-8', 'hex'); // Input: utf-8, Output: hex.
    encryptedLoginPass += cipher.final('hex');

    return encryptedLoginPass;
  }

  async function comparepass() {
    try {
      const LoginUserResult = await helpeeSignInModel.getUserDataByEmail(
        req.body.data
      );
      if (LoginUserResult.length === 0) {
        throw Error('EMAIL_NOT_EXIST');
      } else {
        const DataBasePass = LoginUserResult[0].encryptedpass;
        const userInsertedEncryptedPass = await getUserEncryptedPass();
        if (userInsertedEncryptedPass === DataBasePass) {
          const userObject = {};
          const { id, provider, username, email } = LoginUserResult[0];
          const dataObject = {
            user: {
              id,
              provider,
              username,
              email,
            },
          };
          const payloadObject = {};
          payloadObject.data = userObject;

          const accessToken = generateAccessToken({
            data: {
              id,
              provider,
              username,
              email,
            },
          });

          dataObject.accessToken = accessToken;
          jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, payload) => {
              // eslint-disable-line no-shadow
              if (err) throw Error('TOKEN_EXPIRED_OR_NOT_MATCH');
              dataObject.accessExpired = payload.exp - payload.iat;
            }
          );
          res.send(dataObject);
        } else {
          throw Error('WRONG_PASSWORD');
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
  comparepass();
};

module.exports = {
  postHelpeeSignInData,
};
