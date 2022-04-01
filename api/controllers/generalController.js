require('dotenv').config();
const generalModel = require('../models/generalModel');
const jwt = require('jsonwebtoken');
const { createMeeting } = require('../../util/teamsMeeting');
const {
  sendMeetingEmailToHelpee,
  sendMeetingEmailToHelper,
} = require('../../util/email');

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

const generateMeetingLink = async (req, res) => {
  const { data } = req.body;
  const {
    currentLanguage,
    appointmentDate,
    appointmentTime,
    appointmentTimestamp,
    helperName,
    helpeeName,
    timeZone,
    duration,
    helpeeId,
    helperId,
    helperEmail,
    helpeeEmail,
    helpeeNotificationLanguage,
    helperNotificationLanguage,
    bookingId,
  } = data;
  let subject;
  switch (currentLanguage) {
    case 'en':
      `Shelpy meeting: ${helperName} and ${helpeeName}`;
      break;
    case 'zh-TW':
      subject = `過來人會議 - ${helperName} 與 ${helpeeName}`;
      break;
    case 'zh-CN':
      subject = `过来人会议 - ${helperName} 与 ${helpeeName}`;
      break;
    default:
      subject = `Shelpy meeting: ${helperName} and ${helpeeName}`;
  }
  const endTimestamp = appointmentTimestamp + parseInt(duration) * 60 * 1000; // millisecond
  const onlineMeeting = {
    startDateTime: new Date(appointmentTimestamp).toISOString(), //  '2022-04-01T14:30:34.2444915-07:00'
    endDateTime: new Date(endTimestamp).toISOString(),
    subject,
    recordAutomatically: false,
  };

  try {
    // generate meeting link
    const { meetingDetails } = await createMeeting(onlineMeeting);
    meetingDetails.timeZone = timeZone;
    meetingDetails.duration = duration;
    meetingDetails.appointmentDate = appointmentDate;
    meetingDetails.appointmentTime = appointmentTime;
    meetingDetails.currentLanguage = currentLanguage;
    meetingDetails.helperEmail = helperEmail;
    meetingDetails.helpeeEmail = helpeeEmail;
    meetingDetails.helpeeNotificationLanguage = helpeeNotificationLanguage;
    meetingDetails.helperNotificationLanguage = helperNotificationLanguage;
    meetingDetails.helpeeId = helpeeId;
    meetingDetails.helperId = helperId;
    meetingDetails.bookingId = bookingId;
    // send email
    await sendMeetingEmailToHelpee({
      meetingDetails,
    });
    await sendMeetingEmailToHelper({
      meetingDetails,
    });
    // save to DB
    await generalModel.logMeetingToEmail({
      meetingDetails,
    });
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

module.exports = {
  confirmCanAccessChatroom,
  confirmCanAccessDashboard,
  updatePayPalAccount,
  generateMeetingLink,
};
