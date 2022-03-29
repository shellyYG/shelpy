const bookingModel = require('../models/bookingModel');
const signInModel = require('../models/signInModel');
const generalModel = require('../models/generalModel');
const { sendBookingStatusReminderEmail } = require('../../util/email');

const checkBookingExisted = async (data) => {
  const existingBookings = await bookingModel.checkBookingExisted(data);
  if (existingBookings.length > 0) {
    return existingBookings[0];
  }
  return false;
};

const updateBookingStatus = async (req, res) => {
  const { data } = req.body;
  let createdBookingId;
  const { bookingStatus } = data;
  try {
    if (!data.bookingId || data.bookingId === 'null' || data.bookingId === undefined) { // booking is not created yet
      // create a booking
      if (data.bookingId) {
        const { bookingId, ...newData} = data;
        createdBookingId = await bookingModel.insertBooking(newData);
      } else {
        const { bookingId, ...newData } = data;
        createdBookingId = await bookingModel.insertBooking(newData);
      }
        
    } else {
      // update a booking
      await bookingModel.updateBookingStatus(data);
    }
    let emailReceiverRole = '';
    let initiatorName = '';
    let offerOrRequestId = '';
    if (bookingStatus === 'paid' && !data.paidDetails) {
      return;
    }
    if (bookingStatus === 'created' || bookingStatus === 'paid') {
      emailReceiverRole = 'helper';
      offerOrRequestId = data.offerId;
      if (data.helpeeUsername) initiatorName = data.helpeeUsername;
    } else if (bookingStatus === 'helperConfirmed') {
      emailReceiverRole = 'helpee';
      offerOrRequestId = data.requestId;
      if (data.helperUsername) initiatorName = data.helperUsername;
    }
    
    const emailRes = await generalModel.getBookingReceiverEmail({
      role: emailReceiverRole,
      bookingId: data.bookingId || 0,
      offerOrRequestId,
    });
    const name = await generalModel.getBookingStatusChangeInitiatorName({
      role: emailReceiverRole,
      offerOrRequestId: data.offerId,
      helpeeId: data.helpeeId,
      helperId: data.helperId,
    });
    

    if (!initiatorName || initiatorName.length === 0) {
      initiatorName = name.username;
    }
    await sendBookingStatusReminderEmail({
      notificationLanguage: emailRes.notificationLanguage,
      emailReceiverRole,
      initiatorName: initiatorName,
      receiverEmailAddress: emailRes.email,
      bookingStatus: data.bookingStatus, // created, helperConfirmed, paid, fulfilled
      appointmentDate: data.appointmentDate,
      appointmentTime: data.appointmentTime,
    });
    await generalModel.logEmailToDB({
      receiverRole: emailReceiverRole,
      receiverEmail: emailRes.email,
      emailType: `booking_become_${bookingStatus}_reminder`,
      emailSendTimestamp: Date.now(),
    });
    if (createdBookingId) {
      // booking created
      res.status(200).json({ bookingId: createdBookingId, status: 'success' });
    } else {
      // booking updated
      res.status(200).json({ status: 'success' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getBookingStatus = async (req, res) => {
  const { requestId, offerId, isHelpee } = req.query;
  const data = {
    requestId,
    offerId,
    isHelpee,
  };
  try {
    const booking = await checkBookingExisted(data);
    if (booking) {
      res.status(200).json({ booking });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const unsubscibeEmail = async (req, res) => {
  const { data } = req.body;
  try {
    const LoginUserResult = await signInModel.getUserDataByEmail(req.body.data);
    if (LoginUserResult.length === 0) {
      throw Error('account_does_not_exist');
    } else {
      await bookingModel.unsubscribeEmail(data);
      res.status(200).json({ status: 'success' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const ratePartner = async (req, res) => {
  const { data } = req.body;
  try {
    
    createdRatingId = await bookingModel.ratePartner(data);
    if (createdRatingId) {
      res
        .status(200)
        .json({ createdRatingId: createdRatingId, status: 'success' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  updateBookingStatus,
  getBookingStatus,
  unsubscibeEmail,
  ratePartner,
};