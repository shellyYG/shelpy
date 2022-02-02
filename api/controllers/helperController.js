const { getFileStream } = require('../../util/s3');
const helperModel = require('../models/helperModel');

const allowHelperPrivateRoute = async (req, res) => {
  const { userId } = res.locals;
  res.status(200).json({ isAuthenticated: true, userId });
};

const postHelperRequest = async (req, res) => {
  try {
    const id = await helperModel.insertHelperRequest(req.body.data);
    res.status(200).json({ requestId: id, status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const getHelperAllMatchedRequests = async (req, res) => {
  try {
    const { userId } = req.query;
    const response = await helperModel.getHelperAllMatchedRequests({ userId });
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

module.exports = {
  allowHelperPrivateRoute,
  postHelperRequest,
  getHelperAllMatchedRequests,
  getProfilePic,
};
