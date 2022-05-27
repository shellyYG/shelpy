require('dotenv').config();
const axios = require('axios');
// const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
const jwt = require('jsonwebtoken');
const helpeeModel = require('../models/helpeeModel');
const bookingModel = require('../models/bookingModel');
const generalModel = require('../models/generalModel');

const {
  sendHelpeeResetPasswordEmail,
  sendMatchEmailReminder,
} = require('../../util/email');
const { generateReceipt } = require('../../util/receipt');

const isDeveloping = process.env.IS_DEVELOPING === '1';

const tapPayAPIURL = isDeveloping
  ? 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime'
  : 'https://prod.tappaysdk.com/tpc/payment/pay-by-prime';

const allowHelpeePrivateRoute = async (req, res) => {
  const { userId, username, status } = res.locals;
  res
    .status(200)
    .json({
      isHelpeeAuthenticated: true,
      helpeeUserId: userId,
      username,
      helpeeStatus: status,
    });
};

const postHelpeeRequest = async (req, res) => {
  try {
    if (req && req.body && req.body.data && req.body.data.isEdited) {
      await helpeeModel.updateHelpeeRequest(req.body.data);
      res
        .status(200)
        .json({ requestId: req.body.data.itemId, status: 'success' });
      return;
    }
    // get old matches
    let oldMatches = [];
    let newMatches = [];
    let emailsLanguages = [];

    let emailsToSend = [];
    let notificationLanguages = [];
    const oldMatchRes = await helpeeModel.getPotentialHelpers({
      helpeeUserId: req.body.data.userId,
    });
    if (oldMatchRes && oldMatchRes.data) {
      oldMatches = oldMatchRes.data.allPotentialHelpers.map(
        (el) => el.helperEmail
      );
    }

    // insert new request
    const id = await helpeeModel.insertHelpeeRequest(req.body.data);

    // get new matches
    const newMatchRes = await helpeeModel.getPotentialHelpers({
      helpeeUserId: req.body.data.userId,
    });
    if (newMatchRes && newMatchRes.data) {
      newMatches = newMatchRes.data.allPotentialHelpers.map(
        (el) => el.helperEmail
      );
      emailsLanguages = newMatchRes.data.allPotentialHelpers.map(
        (el) => el.notificationLanguage
      );
    }
    for (let i = 0; i < newMatches.length; i++) {
      if (!oldMatches.includes(newMatches[i])) {
        emailsToSend.push(newMatches[i]);
        notificationLanguages.push(emailsLanguages[i]);
      }
    }
    if (emailsToSend.length > 0) {
      for (let i = 0; i < emailsToSend.length; i++) {
        await sendMatchEmailReminder({
          email: emailsToSend[i],
          targetEmailRole: 'helper',
          notificationLanguage: notificationLanguages[i],
        });
        await generalModel.logEmailToDB({
          receiverRole: 'helper',
          receiverEmail: emailsToSend[i],
          emailType: `have_new_matched_helpee`,
          emailSendTimestamp: Date.now(),
        });
      }
    }
    res.status(200).json({ requestId: id, status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelpeeAllRequests = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    const response = await helpeeModel.getHelpeeAllRequests({ helpeeUserId });
    if (response && response.data) {
      res.status(200).json({
        allOrders: response.data.allOrders,
      });
    } else {
      throw Error('no_request_error');
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
      throw Error('no_booking_found_error');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelpeeSingleRequest = async (req, res) => {
  try {
    const { requestId } = req.query;
    const response = await helpeeModel.getHelpeeSingleRequest({ requestId });
    if (response && response.data) {
      res.status(200).json({
        singleRequest: response.data.singleRequest,
      });
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
        allPotentialHelpersRatings: response.data.allPotentialHelpersRatings,
      });
    } else {
      throw Error('no_potential_helper_error');
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
      throw Error('no_potential_helper_error');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteHelpeeRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const response = await helpeeModel.deleteHelpeeRequest({
      requestId,
    });
    if (response && response.data) {
      res.status(200).json({
        status: 'success',
      });
    } else {
      throw Error('delete_request_error');
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
        currentLanguage: data.currentLanguage,
      },
    });
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
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
      throw Error('no_potential_chatted_helper_response');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// const payHelper = async (req, res) => {
//   const { data } = req.body;
//   const { product, token } = data;
//   return stripe.customers
//     .create({
//       email: token.email,
//       source: token.id,
//     })
//     .then((customer) => {
//       stripe.charges.create({
//         amount: product.price * 100, // everything comes in cents in stripe
//         currency: 'eur', // usd
//         customer: customer.id,
//         receipt_email: token.email,
//         description: `${product.mainType}-${product.secondType}-${product.offerId}`,
//       });
//     })
//     .then(async (result) => {
//       await bookingModel.updateBookingStatus(data);
//       res.status(200).json(result);
//     })
//     .catch((err) => console.error(err));
// };

const payTapPay = async (req, res) => {
  const { data } = req.body;
  const { bookingId, helpeeId, helpeeName, helpeeEmail, amount } = data;
  try {
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': data.partner_key,
    };
    const response = await axios.post(
      tapPayAPIURL,
      data,
      { headers }
    );
    if (response && response.data && response.data.status === 0) {
      res.status(200).json(response.data);
    } else {
      res.status(500).json(response.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getTapPayNotification = async (req, res) => {
  const { data } = req.body;
  console.log('Hit getTapPayNotification data: ', data);
  // log to DB
  const today = new Date();
  if (data) {
    const {
      rec_trade_id,
      auth_code,
      bank_transaction_id,
      bank_order_number,
      amount,
      status,
      msg,
      pay_info,
      bank_result_code,
      bank_result_msg,
    } = data;
    await generalModel.logPaymentResponseToDB({
      rec_trade_id,
      auth_code,
      bank_transaction_id,
      bank_order_number,
      status, // 0 means successful
      msg,
      pay_info,
      bank_result_code,
      bank_result_msg,
      salesAmount: amount,
      logTimeStamp: Date.now(),
      logDate: today.toISOString().slice(0, 10),
    });
  }
}

const generateReceiptAndLogToDB = async (req, res) => {
  const { data } = req.body;
  const { bookingId, helpeeId, helpeeName, helpeeEmail, amount } = data;
  try {
    // return if already have receipt
    const existingReceipt = await generalModel.checkReceiptExist(data);
    if (existingReceipt && existingReceipt.length > 0) {
      res.status(200).json({
        status: 'success',
      });
      return;
    }
    const receiptRes = await generateReceipt({
      buyerId: helpeeId,
      buyerName: helpeeName,
      buyerEmail: helpeeEmail,
      bookingId,
      payAmount: amount,
    });

    // log receipt to DB
    const today = new Date();
    if (receiptRes) {
      if (receiptRes.status === 200) {
        const response = await generalModel.logReceiptToDB({
          bookingId,
          buyerId: helpeeId,
          processId: receiptRes.data.process_id,
          invoiceNumber:
            receiptRes.data.auto_assign_invoice_track_result[0]
              .invoice_number || '',
          salesAmount: amount,
          logTimeStamp: Date.now(),
          logDate: today.toISOString().slice(0, 10),
        });
        res.status(200).json(response.data);
      } else {
        res.status(500).json(response.data);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.query;
    let response;
    if (bookingId) {
      response = await helpeeModel.getBookingDetails({
        bookingId,
      });
    }
    if (response && response.data) {
      res.status(200).json({
        booking: response.data.booking,
      });
    } else {
      throw Error('no_booking_details_found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelpeeData = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    let response;
    if (helpeeUserId) {
      response = await helpeeModel.getHelpeeData({
        helpeeUserId,
      });
    }
    if (response && response.data) {
      res.status(200).json({
        helpeeData: response.data.helpeeData,
      });
    } else {
      throw Error('no_user_data_found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelpeeRatings = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    let response;
    if (helpeeUserId) {
      response = await helpeeModel.getHelpeeRatings({
        helpeeUserId,
      });
    }
    if (response && response.data) {
      res.status(200).json({
        helpeeRatingData: response.data.helpeeRatingData,
      });
    } else {
      throw Error('no_user_data_found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  allowHelpeePrivateRoute,
  postHelpeeRequest,
  getHelpeeAllRequests,
  getHelpeeOrderHelperList,
  getPotentialHelpers,
  deleteHelpeeRequest,
  confirmHelpeeEmail,
  confirmHelpeeCanChangePassword,
  sendHelpeePasswordResetLink,
  getHelpeeAllBookings,
  // payHelper,
  payTapPay,
  getTapPayNotification,
  generateReceiptAndLogToDB,
  getAllChattedHelpers,
  getBookingDetails,
  getHelpeeData,
  getHelpeeRatings,
  getHelpeeSingleRequest,
};
