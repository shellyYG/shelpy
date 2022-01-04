require('dotenv').config();
const helpeeSignInModel = require('../models/signInModel');
const { generateAccessToken } = require('../../util/util');

const postHelpeeSignInData = async (req, res) => {
  console.log('posthelpeeSignIn..., req.body: ', req.body);
  const { data } = req.body;

  async function getLogInUserPass() {
    const LoginUserResult = await helpeeSignInModel.postHelpeeSignInData(req.body.data);
    const LoginUserResultivString = LoginUserResult[0].ivString;
    const password = data.helpeePassword;
    const key = process.env.ACCESS_TOKEN_KEY;
    const ivBack = Buffer.from(LoginUserResultivString, 'base64');
    const cipher = crypto.createCipheriv('aes-256-cbc', key, ivBack);
    let encryptedLoginPass = cipher.update(password, 'utf-8', 'hex'); // Input: utf-8, Output: hex.
    encryptedLoginPass += cipher.final('hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivBack);
    let decryptedLoginpass = decipher.update(
      encryptedLoginPass,
      'hex',
      'utf-8'
    );

    decryptedLoginpass += decipher.final('utf-8');
    return encryptedLoginPass;
  }

  async function comparepass() {
    const LoginUserResult = await helpeeSignInModel.postHelpeeSignInData(req.body.data);
    console.log('LoginUserResult: ', LoginUserResult);
    if (LoginUserResult.length === 0) {
      res.send('Email not existed.');
    } else {
      const DataBasePass = LoginUserResult[0].encryptpass;
      const userPass = await getLogInUserPass();

      if (userPass === DataBasePass) {
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
        res.send('Wrong password!');
      }
    }
  }
  comparepass();
};

module.exports = {
  postHelpeeSignInData,
};
