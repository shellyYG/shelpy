const helpeeModel = require('../models/helpeeModel');

const allowPrivateRoute = async (req, res) => {
  const { userId } = res.locals;
  res.status(200).json({ isAuthenticated: true, userId });
}

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

const getAllOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const response = await helpeeModel.getAllOrders({ userId });
    if (response.data) {
      res.status(200).json({
        activeOrders: response.data.activeOrders,
        completeOrders: response.data.completeOrders,
      });
    } else {
      throw Error('NO_ORDER_RESPONSE');
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  allowPrivateRoute,
  postHelpeeServiceRequestForm,
  getAllOrders,
};
