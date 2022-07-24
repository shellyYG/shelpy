require('dotenv').config();
const jwt = require('jsonwebtoken');
const redis = require('../../util/redis');

const { getFileStream } = require('../../util/s3');
const helperModel = require('../models/helperModel');
const generalModel = require('../models/generalModel');

const {
  sendHelperResetPasswordEmail,
  sendMatchEmailReminder,
} = require('../../util/email');


const allowHelperPrivateRoute = async (req, res) => {
  const { userId, username, status } = res.locals;
  res
    .status(200)
    .json({
      isHelperAuthenticated: true,
      helperUserId: userId,
      username,
      helperStatus: status,
    });
};

const postHelperOffer = async (req, res) => {
  try {
    if (req && req.body && req.body.data && req.body.data.isEdited) {
      await helperModel.updateHelperOffer(req.body.data);
      res.status(200).json({ offerId: req.body.data.itemId, status: 'success' });
      return;
    }
    // get old matches
    let oldMatches = [];
    let newMatches = [];
    let emailsLanguages = [];

    let emailsToSend = [];
    let notificationLanguages = [];
    const oldMatchRes = await helperModel.getPotentialCustomers({
      helperUserId: req.body.data.userId,
    });
    if (oldMatchRes && oldMatchRes.data) {
      oldMatches = oldMatchRes.data.allPotentialCustomers.map(
        (el) => el.helpeeEmail
      );
    }
    // insert new offer
    const id = await helperModel.insertHelperOffer(req.body.data);

    // get new matches
    const newMatchRes = await helperModel.getPotentialCustomers({
      helperUserId: req.body.data.userId,
    });
    if (newMatchRes && newMatchRes.data) {
      newMatches = newMatchRes.data.allPotentialCustomers.map(
        (el) => el.helpeeEmail
      );
      emailsLanguages = newMatchRes.data.allPotentialCustomers.map(
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
          targetEmailRole: 'helpee',
          notificationLanguage: notificationLanguages[i],
        });
        await generalModel.logEmailToDB({
          receiverRole: 'helpee',
          receiverEmail: emailsToSend[i],
          emailType: `have_new_matched_helper`,
          emailSendTimestamp: Date.now(),
        });
      }
    }
    res.status(200).json({ offerId: id, status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteHelperOffer = async (req, res) => {
  try {
    const { offerId } = req.body;
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

const getHelperSingleOffer = async (req, res) => {
  try {
    const { offerId } = req.query;
    const response = await helperModel.getHelperSingleOffer({ offerId });
    if (response && response.data) {
      res.status(200).json({
        singleOffer: response.data.singleOffer,
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const getAllMarketingOffers = async (req, res) => {
  try {
    const { page, filterCountry, filterMainType, filterSecondType } = req.query;
    const response = await helperModel.getAllMarketingOffers({
      page,
      filterCountry,
      filterMainType,
      filterSecondType,
    });
    if (response && response.data) {
      res.status(200).json({
        allOffersCount: response.data.allOffersCount,
        allMKTOffers: response.data.allMKTOffers,
        allMKTHelperRatings: response.data.allMKTHelperRatings,
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

const getHelperData = async (req, res) => {
  try {
    const { helperUserId } = req.query;
    let response;
    if (helperUserId) {
      response = await helperModel.getHelperData({
        helperUserId,
      });
    }
    if (response && response.data) {
      res.status(200).json({
        helperData: response.data.helperData,
      });
    } else {
      throw Error('no_user_data_found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelperRatings = async (req, res) => {
  try {
    const { helperUserId } = req.query;
    let response;
    if (helperUserId) {
      response = await helperModel.getHelperRatings({
        helperUserId,
      });
    }
    if (response && response.data) {
      res.status(200).json({
        helperRatingData: response.data.helperRatingData,
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
  allowHelperPrivateRoute,
  postHelperOffer,
  getPotentialCustomers,
  deleteHelperOffer,
  getProfilePic,
  getHelperAllOffers,
  getHelperSingleOffer,
  confirmHelperEmail,
  confirmHelperCanChangePassword,
  sendHelperPasswordResetLink,
  getHelperAllBookings,
  getAllMarketingOffers,
  getAllChattedCustomers,
  getHelperData,
  getHelperRatings,
};
