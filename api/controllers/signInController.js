require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const helpeeSignInModel = require('../models/signInModel');
const {
  generateHelpeeAccessToken,
  generateHelperAccessToken,
} = require('../../util/util');

const postUserSignInData = async (req, res) => {
  // Rate limiting request: 10 request per 10 second per IP is viewd as an attack
  const ip = (
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ).slice(0, 9);
  const requestCounts = await redis.incr(ip);
  if (requestCounts === 1) {
    await redis.expire(ip, 10); // expire every x seconds (e.g. 10 here)
  }
  if (requestCounts > 10) {
    console.log('too many request');
    res.status(429).send('too_many_requests');
    return;
  }

  const { data } = req.body;

  async function getUserEncryptedPass() {
    // Need to use the same ivString to encryt the password for comparison
    const LoginUserResult = await helpeeSignInModel.getUserDataByEmail(
      req.body.data
    );
    const sharedIvString = LoginUserResult[0].ivString;
    const { password } = data;
    const key = process.env.ACCESS_TOKEN_KEY;
    const sharedIvStringBuffer = Buffer.from(sharedIvString, 'base64');
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      key,
      sharedIvStringBuffer
    );
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
        throw Error('account_does_not_exist');
      } else {
        if (!LoginUserResult[0].confirmed) {
          throw Error('please_confirm_email_first');
        }
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
          jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, payload) => {
              // eslint-disable-line no-shadow
              if (err) throw Error('log_in_session_expired');
              dataObject.accessExpired = payload.exp - payload.iat;
            }
          );
          const resObject = {
            accessToken,
            status: LoginUserResult[0].status,
          };
          res.send(resObject);
        } else {
          throw Error('wrong_password');
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
  postUserSignInData,
};
