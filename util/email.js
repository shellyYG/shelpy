require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const { default: axios } = require('axios');
const testEmailReceiver = process.env.TEST_RECEIPIENT_EMAIL;
const { timeZoneUniversalOptions }= require('./timeZoneOptions');

sgMail.setApiKey(process.env.SENDGRID_EMAIL_API_KEY);

const sendHelpeeEmail = (user) => {
  return jwt.sign(
    user,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, emailToken) => {
      const url = `https://shelpy.co/${user.data.currentLanguage}/helpee/email/confirmation?emailToken=${emailToken}&refId=${user.refId}`;
      let companyName, subject, html;
      switch (user.data.currentLanguage) {
        case 'en':
          companyName = 'Shelpy';
          subject = 'Verify your Shelpy Email';
          html = `Please click this link to confirm your email: <a href='${url}'>${url}</a>`;
          break;
        case 'zh-TW':
          companyName = '過來人App';
          subject = '完成過來人App註冊';
          html = `請按此連結完成註冊: <a href='${url}'>${url}</a>`;
          break;
        case 'zh-CN':
          companyName = '过来人App';
          subject = '完成过来人App註册';
          html = `请按此连结完成註册: <a href='${url}'>${url}</a>`;
          break;
        default:
          companyName = 'Shelpy';
          subject = 'Verify your Shelpy Email';
          html = `Please click this link to confirm your email: <a href='${url}'>${url}</a>`;
      }
      const message = {
        to: user.data.email,
        from: {
          name: companyName,
          email: 'shelpyofficial@gmail.com',
        },
        subject,
        html,
      };
      sgMail
        .send(message)
        .then((response) =>
          console.log(
            'Helpee confirm email sent successfully to this email: ',
            user.data.email
          )
        )
        .catch((error) => console.error(error.message));
    }
  );
};
const sendHelperEmail = (user) => {
  return jwt.sign(
    user,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, emailToken) => {
      const url = `https://shelpy.co/${user.data.currentLanguage}/helper/email/confirmation?emailToken=${emailToken}&refId=${user.refId}`;
      let companyName, subject, html;

      switch (user.data.currentLanguage) {
        case 'en':
          companyName = 'Shelpy';
          subject = 'Verify your Shelpy Email';
          html = `Please click this link to confirm your email: <a href='${url}'>${url}</a>`;
          break;
        case 'zh-TW':
          companyName = '過來人App';
          subject = '完成過來人App註冊';
          html = `請按此連結完成註冊: <a href='${url}'>${url}</a>`;
          break;
        case 'zh-CN':
          companyName = '过来人App';
          subject = '完成过来人App註册';
          html = `请按此连结完成註册: <a href='${url}'>${url}</a>`;
          break;
        default:
          companyName = 'Shelpy';
          subject = 'Verify your Shelpy Email';
          html = `Please click this link to confirm your email: <a href='${url}'>${url}</a>`;
      }
      const message = {
        to: user.data.email,
        from: {
          name: companyName,
          email: 'shelpyofficial@gmail.com',
        },
        subject,
        html,
      };
      sgMail
        .send(message)
        .then((response) =>
          console.log(
            'Helper confirm email sent successfully to this email: ',
            user.data.email
          )
        )
        .catch((error) => console.error(error.message));
    }
  );
};

const sendHelpeeResetPasswordEmail = (user) => {
  return jwt.sign(
    user,
    process.env.FORGET_PASSWORD_SECRET,
    {
      expiresIn: '7d',
    },
    (err, passwordResetToken) => {
      if (user && user.data && user.data.email) {
        const email = user.data.email.replace(/\+/g, '%2B');
        const url = `https://shelpy.co/${user.data.currentLanguage}/helpee/password/pre/reset?email=${email}&passwordResetToken=${passwordResetToken}`;
        let companyName, subject, html;
        switch (user.data.currentLanguage) {
          case 'en':
            companyName = 'Shelpy';
            subject = 'Reset Shelpy Password';
            html = `Please click this link to reset your password: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-TW':
            companyName = '過來人App';
            subject = '重設過來人App密碼';
            html = `請按此連結重設密碼: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-CN':
            companyName = '过来人App';
            subject = '重设过来人App密码';
            html = `请按此连结重设密码: <a href='${url}'>${url}</a>`;
            break;
          default:
            companyName = 'Shelpy';
            subject = 'Reset Shelpy Password';
            html = `Please click this link to reset your password: <a href='${url}'>${url}</a>`;
        }
        const message = {
          to: user.data.email,
          from: {
            name: companyName,
            email: 'shelpyofficial@gmail.com',
          },
          subject,
          html,
        };
        sgMail
          .send(message)
          .then((response) =>
            console.log(
              'Reset Helpee password email sent successfully to this email: ',
              user.data.email
            )
          )
          .catch((error) => console.error(error.message));
      }
    }
  );
};

const sendHelperResetPasswordEmail = (user) => {
  return jwt.sign(
    user,
    process.env.FORGET_PASSWORD_SECRET,
    {
      expiresIn: '7d',
    },
    (err, passwordResetToken) => {
      if (user && user.data && user.data.email) {
        const email = user.data.email.replace(/\+/g, '%2B');
        const url = `https://shelpy.co/${user.data.currentLanguage}/helper/password/pre/reset?email=${email}&passwordResetToken=${passwordResetToken}`;
        let companyName, subject, html;
        switch (user.data.currentLanguage) {
          case 'en':
            companyName = 'Shelpy';
            subject = 'Reset Shelpy Password';
            html = `Please click this link to reset your password: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-TW':
            companyName = '過來人App';
            subject = '重設過來人App密碼';
            html = `請按此連結重設密碼: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-CN':
            companyName = '过来人App';
            subject = '重设过来人App密码';
            html = `请按此连结重设密码: <a href='${url}'>${url}</a>`;
            break;
          default:
            companyName = 'Shelpy';
            subject = 'Reset Shelpy Password';
            html = `Please click this link to reset your password: <a href='${url}'>${url}</a>`;
        }
        const message = {
          to: user.data.email,
          from: {
            name: companyName,
            email: 'shelpyofficial@gmail.com',
          },
          subject,
          html,
        };
        sgMail
          .send(message)
          .then((response) =>
            console.log(
              'Reset Helper password email sent successfully to this email: ',
              user.data.email
            )
          )
          .catch((error) => console.error(error.message));
      }
    }
  );
};

const sendChatMessageReminderEmail = async (user) => {
  const {
    role,
    urlForPartner,
    notificationLanguage,
    receiverEmailAddress,
    helpeeUsername,
    helperUsername,
  } = user; // cant user const {message}...cuz message is defined later
  let messageSender;
  if (role === 'helpee') {
    messageSender = helperUsername;
  } else {
    messageSender = helpeeUsername;
  }

  return jwt.sign(
    user,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, accessChatRoomToken) => {
      if (receiverEmailAddress) {
        let companyName, subject, html, notificationLanguageValue;

        if (notificationLanguage === 'English') {
          notificationLanguageValue='en';
        } else if (notificationLanguage === '繁體中文') {
          notificationLanguageValue = 'zh-TW';
        } else if (notificationLanguage === '简体中文') {
          notificationLanguageValue = 'zh-CN';
        }
        const url = `https://shelpy.co/${notificationLanguageValue}/${role}/access-chatroom?accessChatRoomToken=${accessChatRoomToken}&urlForPartner=${urlForPartner}`;
        switch (notificationLanguageValue) {
          case 'en':
            companyName = 'Shelpy';
            subject = `${messageSender} sent you a new message!`;
            html = `Message is: ${user.message} <br/> Reply here: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-TW':
            companyName = '過來人App';
            subject = `${messageSender} 傳給你一則新訊息!`;
            html = `新訊息為: ${user.message} <br/>請按此回覆訊息: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-CN':
            companyName = '过来人App';
            subject = `${messageSender} 传给你一则新讯息!`;
            html = `新讯息为: ${user.message} <br/> 请按此回复讯息: <a href='${url}'>${url}</a>`;
            break;
          default:
            companyName = 'Shelpy';
            subject = `You receive a message in chatroom!`;
            html = `Message is. Reply here: <a href='${url}'>${url}</a>`;
        }
        const message = {
          to: receiverEmailAddress,
          from: {
            name: companyName,
            email: 'shelpyofficial@gmail.com',
          },
          subject,
          html,
        };
        sgMail
          .send(message)
          .then((response) => {
            console.log(
              'Chat message reminder email sent successfully to this email: ',
              receiverEmailAddress
            );
          })
          .catch((error) => console.error(error.message));
      }
    }
  );
};

const sendBookingStatusReminderEmail = async (user) => {
  const {
    notificationLanguage,
    emailReceiverRole,
    initiatorName,
    receiverEmailAddress,
    bookingStatus,
    appointmentDate,
    appointmentTime,
  } = user;
  
  return jwt.sign(
    user,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, accessDashboardToken) => {
      if (receiverEmailAddress) {

        let companyName, subject, html, notificationLanguageValue;

        if (notificationLanguage === 'English') {
          notificationLanguageValue = 'en';
        } else if (notificationLanguage === '繁體中文') {
          notificationLanguageValue = 'zh-TW';
        } else if (notificationLanguage === '简体中文') {
          notificationLanguageValue = 'zh-CN';
        }
        const url = `https://shelpy.co/${notificationLanguageValue}/${emailReceiverRole}/access-dashboard?accessDashboardToken=${accessDashboardToken}`;
       switch (bookingStatus) {
         case 'created':
           if (notificationLanguageValue === 'zh-TW') {
             companyName = '過來人App';
             subject = `${initiatorName} 剛剛發出一個諮詢請求!`;
             html = `請按此連結接受預約或更改時間: <a href='${url}'>${url}</a>`;
           } else if (notificationLanguageValue === 'zh-CN') {
             companyName = '过来人App';
             subject = `${initiatorName} 刚刚发出一个谘询请求!`;
             html = `请按此连结接受预约或更改时间: <a href='${url}'>${url}</a>`;
           } else {
             companyName = 'Shelpy';
             subject = `${initiatorName} just sent you a booking request!`;
             html = `Please click here to confirm booking or change booking: <a href='${url}'>${url}</a>`;
           }
           break;
         case 'helperConfirmed':
           if (notificationLanguageValue === 'zh-TW') {
             companyName = '過來人App';
             subject = `[等待付款]${initiatorName} 剛剛答應了你的諮詢預約時間!`;
             html = `但是正式預約只有在您付款後才成立。<br/> 請按此連結付款: <a href='${url}'>${url}</a>`;
           } else if (notificationLanguageValue === 'zh-CN') {
             companyName = '过来人App';
             subject = `[等待付款]${initiatorName} 刚刚答应了你的谘询预约时间!`;
             html = `但是正式预约只有在您付款后才成立。<br/> 请按此连结付款: <a href='${url}'>${url}</a>`;
           } else {
             companyName = 'Shelpy';
             subject = `[Payment needed]${initiatorName} just accept your booking request time!`;
             html = `However, booking is only officially confirmed after payment. Please click here to pay: <a href='${url}'>${url}</a>`;
           }
           break;
         case 'paid':
           if (notificationLanguageValue === 'zh-TW') {
             companyName = '過來人App';
             subject = `[請準時出席會議]${initiatorName} 剛剛付款了!`;
             html = `預約已成立。<br/>您將會在下一封信收到會議連結，請務必準時出席會議。<br/>會議時間為： ${appointmentDate} ${appointmentTime}<br/> 請按此連結查看會議時間與細節: <a href='${url}'>${url}</a>`;
           } else if (notificationLanguageValue === 'zh-CN') {
             companyName = '过来人App';
             subject = `[请准时出席会议]${initiatorName} 刚刚付款了!`;
             html = `预约已成立。<br/>您将会在下一封信收到会议连结，请务必准时出席会议。<br/>会议时间为： ${appointmentDate} ${appointmentTime}<br/> 请按此连结查看会议时间与细节: <a href='${url}'>${url}</a>`;
           } else {
             companyName = 'Shelpy';
             subject = `[Please attend meeting on time]${initiatorName} just paid you!`;
             html = `The appointment is officially established. You will receive meeting link in next email. Please attend the meeting on time. <br/>  Appointment time is： ${appointmentDate} ${appointmentTime} <br/> Click here to view meeting time & details: <a href='${url}'>${url}</a>`;
           }
           break;
         default:
           companyName = 'Shelpy';
           subject = `[Please attend meeting on time]${initiatorName} just paid you!`;
           html = `The appointment is officially established. You will receive meeting link in next email. Please attend the meeting on time. Click here to view meeting time & details: <a href='${url}'>${url}</a>`;
       }
       
        const message = {
          to: receiverEmailAddress,
          from: {
            name: companyName,
            email: 'shelpyofficial@gmail.com',
          },
          subject,
          html,
        };
        sgMail
          .send(message)
          .then((response) => {
            console.log(
              'Booking Status change reminder email sent successfully to this email: ',
              receiverEmailAddress
            );
          })
          .catch((error) => console.error(error.message));
      }
    }
  );
};

const sendMeetingEmailToHelpee = async (data) => {
  if (!data.meetingDetails) return;
  const {
    subject,
    timeZone,
    joinUrl,
    appointmentDate,
    appointmentTime,
    helpeeEmail,
    helpeeNotificationLanguage,
  } = data.meetingDetails;

  return jwt.sign(
    data,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, accessDashboardToken) => {
      if (helpeeEmail && helpeeNotificationLanguage) {
        let companyName, html, notificationLanguageValue, universalTimeZone;
        const timeZoneObj = timeZoneUniversalOptions.filter(
          (o) => o.value === timeZone
        );
        if (timeZoneObj && timeZoneObj[0]) {
          universalTimeZone = timeZoneObj[0].label;
        }

        if (helpeeNotificationLanguage === 'English') {
          notificationLanguageValue = 'en';
        } else if (helpeeNotificationLanguage === '繁體中文') {
          notificationLanguageValue = 'zh-TW';
        } else if (helpeeNotificationLanguage === '简体中文') {
          notificationLanguageValue = 'zh-CN';
        }
        const url = `https://shelpy.co/${notificationLanguageValue}/helpee/access-dashboard?accessDashboardToken=${accessDashboardToken}`;
        switch (notificationLanguageValue) {
          case 'en':
            companyName = 'Shelpy';
            html = `<h1>Your meeting link for meeting on ${appointmentDate} ${appointmentTime} (timezone: ${universalTimeZone}) is:</h1> <br/> <p style="color:red;font-size: '18px'"> ${joinUrl} </p> <br/> <h1>Please attend the meeting on time!</h1><br/>  Click here to view other meetings: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-TW':
            companyName = '過來人App';
            html = `<h1>你在 ${appointmentDate} ${appointmentTime} (會議時區: ${universalTimeZone}) 的會議連結為:</h1> <br/> <p style="color:red;"> ${joinUrl} </p> <br/> <h1>請準時出席會議!</h1><br/>  點此查看其他預約狀況: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-CN':
            companyName = '过来人App';
            html = `你在 ${appointmentDate} ${appointmentTime} (会议时区: ${universalTimeZone}) 的会议连结为:<h1> <br/> <p style="color:red;font-size: '18px'"> ${joinUrl} </p> <br/> 请准时出席会议!<br/>  点此查看其他预约状况: <a href='${url}'>${url}</a>`;
            break;
          default:
            html = `<h1>Your Meeting link for meeting on ${appointmentDate} ${appointmentTime} (timezone: ${universalTimeZone}) is:<h1> <br/> <p style="color:red;font-size: '18px'"> ${joinUrl} </p> <br/> Please attend the meeting on time!<br/>  Click here to view other meetings: <a href='${url}'>${url}</a>`;
        }

        const message = {
          to: helpeeEmail,
          from: {
            name: companyName,
            email: 'shelpyofficial@gmail.com',
          },
          subject,
          html,
        };

        sgMail
          .send(message)
          .then((response) => {
            console.log('Successfully sent meeting link to helpee: ', helpeeEmail);
          })
          .catch((error) => console.error(error.message));
      }
    }
  );
};

const sendMeetingEmailToHelper = async (data) => {
  if (!data.meetingDetails) return;
  const {
    subject,
    timeZone,
    joinUrl,
    appointmentDate,
    appointmentTime,
    helperEmail,
    helperNotificationLanguage,
  } = data.meetingDetails;

  return jwt.sign(
    data,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, accessDashboardToken) => {
      if (helperEmail && helperNotificationLanguage) {
        let companyName, html, notificationLanguageValue, universalTimeZone;
        const timeZoneObj = timeZoneUniversalOptions.filter(
          (o) => o.value === timeZone
        );
        if (timeZoneObj && timeZoneObj[0]) {
          universalTimeZone = timeZoneObj[0].label;
        }

        if (helperNotificationLanguage === 'English') {
          notificationLanguageValue = 'en';
        } else if (helperNotificationLanguage === '繁體中文') {
          notificationLanguageValue = 'zh-TW';
        } else if (helperNotificationLanguage === '简体中文') {
          notificationLanguageValue = 'zh-CN';
        }
        const url = `https://shelpy.co/${notificationLanguageValue}/helper/access-dashboard?accessDashboardToken=${accessDashboardToken}`;
        switch (notificationLanguageValue) {
          case 'en':
            companyName = 'Shelpy';
            html = `<h1>Your meeting link for meeting on ${appointmentDate} ${appointmentTime} (timezone: ${universalTimeZone}) is:</h1> <br/> <p style="color:red;font-size: '18px'"> ${joinUrl} </p> <br/> <h1>Please attend the meeting on time!</h1><br/>  Click here to view other meetings: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-TW':
            companyName = '過來人App';
            html = `<h1>你在 ${appointmentDate} ${appointmentTime} (會議時區: ${universalTimeZone}) 的會議連結為:</h1> <br/> <p style="color:red;"> ${joinUrl} </p> <br/> <h1>請準時出席會議!</h1><br/>  點此查看其他預約狀況: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-CN':
            companyName = '过来人App';
            html = `你在 ${appointmentDate} ${appointmentTime} (会议时区: ${universalTimeZone}) 的会议连结为:<h1> <br/> <p style="color:red;font-size: '18px'"> ${joinUrl} </p> <br/> 请准时出席会议!<br/>  点此查看其他预约状况: <a href='${url}'>${url}</a>`;
            break;
          default:
            html = `<h1>Your Meeting link for meeting on ${appointmentDate} ${appointmentTime} (timezone: ${universalTimeZone}) is:<h1> <br/> <p style="color:red;font-size: '18px'"> ${joinUrl} </p> <br/> Please attend the meeting on time!<br/>  Click here to view other meetings: <a href='${url}'>${url}</a>`;
        }

        const message = {
          to: helperEmail,
          from: {
            name: companyName,
            email: 'shelpyofficial@gmail.com',
          },
          subject,
          html,
        };

        sgMail
          .send(message)
          .then((response) => {
            console.log('Successfully sent meeting link to helper: ', helperEmail);
          })
          .catch((error) => console.error(error.message));
      }
    }
  );
};

module.exports = {
  sendHelpeeEmail,
  sendHelperEmail,
  sendHelpeeResetPasswordEmail,
  sendHelperResetPasswordEmail,
  sendChatMessageReminderEmail,
  sendBookingStatusReminderEmail,
  sendMeetingEmailToHelpee,
  sendMeetingEmailToHelper,
};
