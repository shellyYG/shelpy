const bookingModel = require('../models/bookingModel');

const checkBookingExisted = async (data) => {
  const existingBookings = await bookingModel.checkBookingExisted(data);
  if (existingBookings.length > 0) {
    return existingBookings[0];
  }
  return false;
};

const updateBookingStatus = async (req, res) => {
  console.log('updateBookingStatus: ', updateBookingStatus);
  const { data } = req.body;
  console.log('updateBookingStatus->data: ', data);
  try {
    const booking = await checkBookingExisted(data)
    if (booking) {
      console.log('booking exists!');
      console.log('bookingId: ', booking.id)
      await bookingModel.updateBookingStatus(data);
      res.status(200).json({ status: 'success' });
    } else {
      const bookingId = await bookingModel.insertBooking(data);
      res.status(200).json({ bookingId, status: 'success' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getBookingStatus = async (req, res) => {
  const { requestId, offerId, isHelpee } = req.query;
  const data = {
    requestId, offerId, isHelpee
  }
  console.log('api getBookingStatus->data: ', data);
  try {
    const booking = await checkBookingExisted(data);
    console.log('booking: ', booking);
    if (booking) {
        res.status(200).json({ booking });
    }
  
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  updateBookingStatus,
  getBookingStatus,
};