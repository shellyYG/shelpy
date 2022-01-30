const helpeeModel = require('../models/helpeeModel');

const allowPrivateRoute = async (req, res) => {
  const { userId } = res.locals;
  res.status(200).json({ isAuthenticated: true, userId });
}

const postHelpeeServiceRequestForm = async (req, res) => { // old.
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

const postHelpeeRequest = async (req, res) => { // new.
  try {
    const id = await helpeeModel.insertHelpeeRequest(req.body.data);
    res.status(200).json({ requestId: id, status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const getAllOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const response = await helpeeModel.getAllOrders({ userId });
    if (response.data) {
      res.status(200).json({
        allOrders: response.data.allOrders,
      });
    } else {
      throw Error('NO_ORDER_RESPONSE');
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const getAllJobOrders = async (req, res) => {
  try {
    const { userId } = req.query;
    const response = await helpeeModel.getAllJobOrders({ userId });
    if (response.data) {
      res.status(200).json({
        allOrders: response.data.allOrders,
      });
    } else {
      throw Error('NO_ORDER_RESPONSE');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelperList = async (req, res) => {
  try {
    const { orderId } = req.query;
    const response = await helpeeModel.getHelperList({ orderId });
    if (response.data) {
      res.status(200).json({
        helpers: response.data.helpers,
      });
    } else {
      throw Error('NO_HELPER_LIST_RESPONSE');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  allowPrivateRoute,
  postHelpeeServiceRequestForm,
  postHelpeeRequest,
  getAllOrders,
  getAllJobOrders,
  getHelperList,
};
