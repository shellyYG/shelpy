const helpeeModel = require('../models/helpeeModel');

const getHelpeeInfo = async (req, res) => {
    const serviceType = await helpeeModel.getHelpeeInfo();
    return serviceType;
}


const postHelpeeInfo = async (req, res) => {
  console.log('start controller postHelpeeInfo...');
    const serviceType = req.body.serviceType;
    const response = await helpeeModel.postHelpeeInfo(serviceType);
    return response;
};

const testAPIConnection = async (req, res) => {
  // res.send('Successfully connected to /test API!');
  const serviceType = await helpeeModel.getHelpeeInfo();
  return serviceType;
};

module.exports = {
  getHelpeeInfo,
  postHelpeeInfo,
  testAPIConnection,
};