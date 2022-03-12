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
  console.log('updateBookingStatus data: ', data);
  let createdBookingId;
  const { bookingStatus } = data;
  try {
    if (!data.bookingId) { // booking is not created yet
      // create a booking
      console.log('no booking yet, create a booking');
      createdBookingId = await bookingModel.insertBooking(data);
    } else {
      // update a booking
      console.log('update a booking');
      await bookingModel.updateBookingStatus(data);
    }
    let emailReceiverRole = '';
    let initiatorName = '';
    let offerOrRequestId = '';
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
      offerOrRequestId,
    });
    const name = await generalModel.getBookingStatusChangeInitiatorName({
      role: emailReceiverRole,
      offerOrRequestId: data.offerId,
    });
    
    
    if (!initiatorName || initiatorName.length === 0) {
      initiatorName = name.username;
    }
    await sendBookingStatusReminderEmail({
      currentLanguage: data.currentLanguage,
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

module.exports = {
  updateBookingStatus,
  getBookingStatus,
  unsubscibeEmail,
};