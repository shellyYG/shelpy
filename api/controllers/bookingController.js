const bookingModel = require('../models/bookingModel');
const signInModel = require('../models/signInModel');


const checkBookingExisted = async (data) => {
  // Rate limiting request: 10 request per 10 second per IP is viewd as an attack
  const ip = (
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ).slice(0, 9);
  const requestCounts = await redis.incr(ip);
  if (requestCounts === 1) {
    await redis.expire(ip, 10); // expire every x seconds (e.g. 10 here)
  }
  if (requestCounts > 10) {
    console.log('too many request');
    res.status(429).send('too_many_requests');
    return;
  }
  const existingBookings = await bookingModel.checkBookingExisted(data);
  if (existingBookings.length > 0) {
    return existingBookings[0];
  }
  return false;
};

const updateBookingStatus = async (req, res) => {
  // Rate limiting request: 10 request per 10 second per IP is viewd as an attack
  const ip = (
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ).slice(0, 9);
  const requestCounts = await redis.incr(ip);
  if (requestCounts === 1) {
    await redis.expire(ip, 10); // expire every x seconds (e.g. 10 here)
  }
  if (requestCounts > 10) {
    console.log('too many request');
    res.status(429).send('too_many_requests');
    return;
  }
  const { data } = req.body;
  try {
    if (data.requestId && data.requestId !== 'NaN') {
      const booking = await checkBookingExisted(data);
      if (booking) {
        await bookingModel.updateBookingStatus(data);
        res.status(200).json({ status: 'success' });
      } else {
        const bookingId = await bookingModel.insertBooking(data);
        res.status(200).json({ bookingId, status: 'success' });
      }
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
  // Rate limiting request: 10 request per 10 second per IP is viewd as an attack
  const ip = (
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ).slice(0, 9);
  const requestCounts = await redis.incr(ip);
  if (requestCounts === 1) {
    await redis.expire(ip, 10); // expire every x seconds (e.g. 10 here)
  }
  if (requestCounts > 10) {
    console.log('too many request');
    res.status(429).send('too_many_requests');
    return;
  }
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
}

const unsubscibeEmail = async (req, res) => {
  // Rate limiting request: 10 request per 10 second per IP is viewd as an attack
  const ip = (
    req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ).slice(0, 9);
  const requestCounts = await redis.incr(ip);
  if (requestCounts === 1) {
    await redis.expire(ip, 10); // expire every x seconds (e.g. 10 here)
  }
  if (requestCounts > 10) {
    console.log('too many request');
    res.status(429).send('too_many_requests');
    return;
  }
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