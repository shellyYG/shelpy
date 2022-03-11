require('dotenv').config();
const axios = require('axios');
const { sendChatMessageToReadReminder } = require('../../util/email');
const generalModel = require('../models/generalModel');

const sendChatMessageReminder = async (req, res) => {
  sendChatMessageToReadReminder();
  try {
    const users = await generalModel.getUsersToNotifyAboutChat();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  sendChatMessageReminder,
};
