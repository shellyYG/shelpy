require('dotenv').config();
const generalModel = require('../models/generalModel');
const jwt = require('jsonwebtoken');

const confirmCanAccessChatroom = async (req, res) => {
  const { data } = req.body;
  try {
    const user = jwt.verify(data.accessChatRoomToken, process.env.EMAIL_SECRET);
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
const confirmCanAccessDashboard = async (req, res) => {
  const { data } = req.body;
  try {
    const user = jwt.verify(data.accessDashboardToken, process.env.EMAIL_SECRET);
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

const updatePayPalAccount = async (req, res) => {
  try {
    const { data } = req.body;
    const id = await generalModel.updatePayPalAccount(data);
    res.status(200).json({ userId: id, status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  confirmCanAccessChatroom,
  confirmCanAccessDashboard,
  updatePayPalAccount,
};
