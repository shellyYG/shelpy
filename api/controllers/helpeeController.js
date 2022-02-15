require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
const jwt = require('jsonwebtoken');
const helpeeModel = require('../models/helpeeModel');
const bookingModel = require('../models/bookingModel');

const {
  sendHelpeeResetPasswordEmail,
} = require('../../util/email');

const allowHelpeePrivateRoute = async (req, res) => {
  const { userId, username } = res.locals;
  res
    .status(200)
    .json({ isHelpeeAuthenticated: true, helpeeUserId: userId, username });
};

const postHelpeeServiceRequestForm = async (req, res) => {
  // old.
  try {
    const id = await helpeeModel.insertHelpeeRequestFormAndGetId(req.body.data);
    res.status(200).json({ requestId: id, status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const postHelpeeRequest = async (req, res) => {
  console.log('postHelpeeRequest->req.body.data: ', req.body.data);
  // new.
  try {
    const id = await helpeeModel.insertHelpeeRequest(req.body.data);
    res.status(200).json({ requestId: id, status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelpeeAllOrders = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    const response = await helpeeModel.getHelpeeAllOrders({ helpeeUserId });
    if (response && response.data) {
      res.status(200).json({
        allOrders: response.data.allOrders,
      });
    } else {
      throw Error('No order response from server.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelpeeAllBookings = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    const response = await helpeeModel.getHelpeeAllBookings({ helpeeUserId });
    if (response && response.data) {
      res.status(200).json({
        allBookings: response.data.allBookings,
      });
    } else {
      throw Error('No bookings response from server.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPotentialHelpers = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    let response;
    if (helpeeUserId) {
      response = await helpeeModel.getPotentialHelpers({
        helpeeUserId,
      });
    }
    if (response && response.data) {
      res.status(200).json({
        allPotentialHelpers: response.data.allPotentialHelpers,
      });
    } else {
      throw Error('No potential helpers response from server.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelpeeOrderHelperList = async (req, res) => {
  try {
    const { requestId } = req.query;
    const response = await helpeeModel.getHelpeeOrderHelperList({ requestId });
    if (response && response.data) {
      res.status(200).json({
        helpers: response.data.helpers,
      });
    } else {
      throw Error('No helper list response from server.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteHelpeeRequest = async (req, res) => {
  try {
    const { requestId } = req.query;
    const response = await helpeeModel.deleteHelpeeRequest({
      requestId,
    });
    if (response && response.data) {
      res.status(200).json({
        status: 'success',
      });
    } else {
      throw Error('Server encounter error when deleting requests.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const confirmHelpeeEmail = async (req, res) => {
  const { data } = req.body;
  try {
    const user = jwt.verify(data.emailToken, process.env.EMAIL_SECRET);
    if (user) {
      const { id } = user.data;
      await helpeeModel.confirmHelpeeEmail({ id });
    }
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const confirmHelpeeCanChangePassword = async (req, res) => {
  const { data } = req.body;
  try {
    const user = jwt.verify(
      data.passwordResetToken,
      process.env.FORGET_PASSWORD_SECRET
    );
    if (user) {
      res.status(200).json({
        status: 'success',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const sendHelpeePasswordResetLink = async (req, res) => {
  const { data } = req.body;
  try {
    sendHelpeeResetPasswordEmail({
      data: {
        email: data.email,
      }
    });
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const payHelper = async (req, res) => {
  console.log('satrt payHelper@helpeeController...');
  const { data } = req.body;
  console.log('payHelper->data: ', data);
  const { product, token } = data;
  console.log(
    '........start strip session, product: ',
    product,
    'price: ',
    product.price
  );
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      console.log('stripe created customer: ', customer)
      stripe.charges.create(
        {
          amount: product.price * 100, // everything comes in cents in stripe
          currency: 'eur', // usd
          customer: customer.id,
          receipt_email: token.email,
          description: `${product.mainType}-${product.secondType}-${product.offerId}`,
        },
      );
    })
    .then(async (result) => {
      await bookingModel.updateBookingStatus(data);
      res.status(200).json(result)
    })
    .catch((err) => console.error(err));
};


const getAllChattedHelpers = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    let response;
    if (helpeeUserId) {
      response = await helpeeModel.getAllChattedHelpers({
        helpeeUserId,
      });
    }
    if (response && response.data) {
      res.status(200).json({
        allChattedHelpers: response.data.allChattedHelpers,
      });
    } else {
      throw Error('No potential chatted helpers response from server.');
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
  getPotentialHelpers,
  deleteHelpeeRequest,
  confirmHelpeeEmail,
  confirmHelpeeCanChangePassword,
  sendHelpeePasswordResetLink,
  getHelpeeAllBookings,
  payHelper,
  getAllChattedHelpers,
};
