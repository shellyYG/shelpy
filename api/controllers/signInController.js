require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const signInModel = require('../models/signInModel');
const {
  generateHelpeeAccessToken,
  generateHelperAccessToken,
} = require('../../util/util');

const postUserSignInData = async (req, res) => {
  const { data } = req.body;

  async function getUserEncryptedPass() {
    // Need to use the same ivString to encryt the password for comparison
    const LoginUserResult = await signInModel.getUserDataByEmail(req.body.data);
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
      const LoginUserResult = await signInModel.getUserDataByEmail(
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
          const { id, provider, username, email, status } = LoginUserResult[0];
          const dataObject = {
            user: {
              id,
              provider,
              username,
              email,
              status,
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
                  status,
                },
              })
            : generateHelperAccessToken({
                data: {
                  id,
                  provider,
                  username,
                  email,
                  status,
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
