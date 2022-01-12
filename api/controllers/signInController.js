require('dotenv').config();
const crypto = require('crypto');
const helpeeSignInModel = require('../models/signInModel');
const { generateAccessToken } = require('../../util/util');

const postHelpeeSignInData = async (req, res) => {
  console.log('posthelpeeSignIn..., req.body: ', req.body);
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
          userObject.id = id;
          userObject.provider = provider;
          userObject.name = username;
          userObject.email = email;

          const finalObject = {};
          const dataObject = {};

          dataObject.user = userObject;
          finalObject.data = dataObject;

          const payloadObject = {};
          payloadObject.data = userObject;

          // ------Create token
          const payload = payloadObject;
          const accessToken = generateAccessToken(payload);

          dataObject.access_token = accessToken;
          dataObject.access_expired = 30;
          res.send(finalObject);
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
