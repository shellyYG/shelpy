const helpeeModel = require('../models/helpeeModel');

const allowPrivateRoute = async (req, res) => {
  const { userId } = res.locals;
  res.status(200).json({ isAuthenticated: true, userId });
}

const getHelpeeInfo = async (req, res) => {
  const serviceType = await helpeeModel.getHelpeeInfo();
  return serviceType;
};

const postHelpeeServiceRequestForm = async (req, res) => {
  try {
    const id = await helpeeModel.insertHelpeeRequestFormAndGetId(
      req.body.data
    );
    res.status(200).json({ requestId: id, status: 'success' })
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message)
  }
};

const testAPIConnection = async (req, res) => {
  // res.send('Successfully connected to /test API!');
  const serviceType = await helpeeModel.getHelpeeInfo();
  return serviceType;
};

module.exports = {
  allowPrivateRoute,
  getHelpeeInfo,
  postHelpeeServiceRequestForm,
  testAPIConnection,
};
