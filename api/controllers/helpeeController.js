const helpeeModel = require('../models/helpeeModel');

const allowHelpeePrivateRoute = async (req, res) => {
  const { userId } = res.locals;
  res.status(200).json({ isHelpeeAuthenticated: true, helpeeUserId: userId });
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

const getHelpeeAllOrders = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    const response = await helpeeModel.getHelpeeAllOrders({ helpeeUserId });
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

const getHelpeeOrderHelperList = async (req, res) => {
  try {
    const { orderId } = req.query;
    const response = await helpeeModel.getHelpeeOrderHelperList({ orderId });
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
};

module.exports = {
  allowHelpeePrivateRoute,
  postHelpeeServiceRequestForm,
  postHelpeeRequest,
  getHelpeeAllOrders,
  getHelpeeOrderHelperList,
};
