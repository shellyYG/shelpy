const { getFileStream } = require('../../util/s3');
const helperModel = require('../models/helperModel');

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
        status: 'success'
      });
    } else {
      throw Error('Server encounters error when deleting offers.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

const getPotentialCustomers = async (req, res) => {
  console.log('@controller getPotentialCustomers: ', req.query.helperUserId);
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
        throw Error('No potential customer response from server.');
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelperAllMatchedRequests = async (req, res) => {
  try {
    const { helpeeUserId } = req.query;
    const response = await helperModel.getHelperAllMatchedRequests({ helpeeUserId });
    if (response && response.data) {
      res.status(200).json({
        allOrders: response.data.allOrders,
      });
    } else {
      throw Error('No offer response from server');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getProfilePic = async (req, res) => {
  console.log('getProfilePic...');
  const { key } = req.params;
  try {
    const readStream = getFileStream(key);
    if (readStream) {
      readStream
        .createReadStream()
        .on('error', (error) => {
          console.error(error);
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
      throw Error('No offers found from server.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  allowHelperPrivateRoute,
  postHelperOffer,
  getPotentialCustomers,
  deleteHelperOffer,
  getHelperAllMatchedRequests,
  getProfilePic,
  getHelperAllOffers,
};
