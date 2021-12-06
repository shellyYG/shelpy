const helpeeModel = require('../models/helpeeModel');

const getHelpeeInfo = async (req, res) => {
    const serviceType = await helpeeModel.getHelpeeInfo();
    return serviceType;
}


const postHelpeeSignUpEmail = async (req, res) => {
  const response = await helpeeModel.postHelpeeSignUpEmail(
    req.body.data
  );
  return response;
};

const postHelpeeSignUpPassword = async (req, res) => {
  const response = await helpeeModel.postHelpeeSignUpPassword(req.body.data);
  return response;
};

const testAPIConnection = async (req, res) => {
  // res.send('Successfully connected to /test API!');
  const serviceType = await helpeeModel.getHelpeeInfo();
  return serviceType;
};

module.exports = {
  getHelpeeInfo,
  postHelpeeSignUpEmail,
  postHelpeeSignUpPassword,
  testAPIConnection,
};