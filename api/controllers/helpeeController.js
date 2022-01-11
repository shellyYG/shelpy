const helpeeModel = require('../models/helpeeModel');

const getHelpeeInfo = async (req, res) => {
  const serviceType = await helpeeModel.getHelpeeInfo();
  return serviceType;
};

const postHelpeeSignInData = async (req, res) => {
  const response = await helpeeModel.postHelpeeSignInData(req.body.data);
  return response;
};

const postHelpeeServiceRequestForm = async (req, res) => {
  const response = await helpeeModel.postHelpeeServiceRequestForm(
    req.body.data
  );
  return response;
};

const testAPIConnection = async (req, res) => {
  // res.send('Successfully connected to /test API!');
  const serviceType = await helpeeModel.getHelpeeInfo();
  return serviceType;
};

module.exports = {
  getHelpeeInfo,
  postHelpeeSignInData,
  postHelpeeServiceRequestForm,
  testAPIConnection,
};
