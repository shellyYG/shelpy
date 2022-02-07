const { getFileStream } = require('../../util/s3');
const helperModel = require('../models/helperModel');

const allowHelperPrivateRoute = async (req, res) => {
  const { userId } = res.locals;
  res.status(200).json({ isHelperAuthenticated: true, helperUserId: userId });
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
    if (response.data) {
      res.status(200).json({
        status: 'success'
      });
    } else {
      throw Error('OFFER_DELETE_SERVER_ERROR');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const getHelperAllMatchedRequests = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    const response = await helperModel.getHelperAllMatchedRequests({ helpeeUserId });
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

const getProfilePic = async (req, res) => {
  const { key } = req.params;
  try {
    const readStream = getFileStream(key);
    readStream.pipe(res); // will show directly on path which is 'images/xxx'
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelperAllOffers = async (req, res) => {
  try {
    const { helperUserId } = req.query;
    const response = await helperModel.getHelperAllOffers({ helperUserId });
    if (response.data) {
      res.status(200).json({
        allOffers: response.data.allOffers,
      });
    } else {
      throw Error('NO_OFFERS_FOUND');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  allowHelperPrivateRoute,
  postHelperOffer,
  deleteHelperOffer,
  getHelperAllMatchedRequests,
  getProfilePic,
  getHelperAllOffers,
};
