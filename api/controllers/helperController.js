require('dotenv').config();
const jwt = require('jsonwebtoken');
const redis = require('../../util/redis');

const { getFileStream } = require('../../util/s3');
const helperModel = require('../models/helperModel');
const { sendHelperResetPasswordEmail } = require('../../util/email');


const allowHelperPrivateRoute = async (req, res) => {
  const { userId, username } = res.locals;
  res
    .status(200)
    .json({ isHelperAuthenticated: true, helperUserId: userId, username });
};

const postHelperOffer = async (req, res) => {
  try {
    const id = await helperModel.insertHelperOffer(req.body.data);
    res.status(200).json({ requestId: id, status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteHelperOffer = async (req, res) => {
  try {
    const { offerId } = req.query;
    const response = await helperModel.deleteHelperOffer({
      offerId,
    });
    if (response && response.data) {
      res.status(200).json({
        status: 'success',
      });
    } else {
      throw Error('delete_offer_error');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getPotentialCustomers = async (req, res) => {
  try {
    const { helperUserId } = req.query;

    if (helperUserId) {
      const response = await helperModel.getPotentialCustomers({
        helperUserId,
      });
      if (response && response.data) {
        res.status(200).json({
          allPotentialCustomers: response.data.allPotentialCustomers,
        });
      } else {
        throw Error('no_potential_customer_error');
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getProfilePic = async (req, res) => {
  const { key } = req.params;
  res.setHeader('Cache-Control', 'max-age=10800'); // 10800 sec
  try {
    const readStream = getFileStream(key);
    if (readStream) {
      readStream
        .createReadStream()
        .on('error', (error) => {
          console.error('getProfilePic error: ', error);
        })
        .pipe(res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelperAllOffers = async (req, res) => {
  try {
    const { helperUserId } = req.query;
    const response = await helperModel.getHelperAllOffers({ helperUserId });
    if (response && response.data) {
      res.status(200).json({
        allOffers: response.data.allOffers,
      });
    } else {
      throw Error('no_offer_error');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getAllMarketingOffers = async (req, res) => {
  try {
    const response = await helperModel.getAllMarketingOffers();
    if (response && response.data) {
      res.status(200).json({
        allMKTOffers: response.data.allMKTOffers,
      });
    } else {
      throw Error('no_marketing_offer_error');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelperAllBookings = async (req, res) => {
  try {
    const { helperUserId } = req.query;
    const response = await helperModel.getHelperAllBookings({ helperUserId });
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

const confirmHelperEmail = async (req, res) => {
  const { data } = req.body;
  try {
    const user = jwt.verify(data.emailToken, process.env.EMAIL_SECRET);
    if (user) {
      const { id } = user.data;
      await helperModel.confirmHelperEmail({ id });
    }
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const confirmHelperCanChangePassword = async (req, res) => {
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

const sendHelperPasswordResetLink = async (req, res) => {
  const { data } = req.body;
  try {
    sendHelperResetPasswordEmail({
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

const getAllChattedCustomers = async (req, res) => {
  try {
    const { helperUserId } = req.query;
    let response;
    if (helperUserId) {
      response = await helperModel.getAllChattedCustomers({
        helperUserId,
      });
    }
    if (response && response.data) {
      res.status(200).json({
        allChattedCustomers: response.data.allChattedCustomers,
      });
    } else {
      throw Error('no_potential_chatted_customer_response');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  allowHelperPrivateRoute,
  postHelperOffer,
  getPotentialCustomers,
  deleteHelperOffer,
  getProfilePic,
  getHelperAllOffers,
  confirmHelperEmail,
  confirmHelperCanChangePassword,
  sendHelperPasswordResetLink,
  getHelperAllBookings,
  getAllMarketingOffers,
  getAllChattedCustomers,
};
