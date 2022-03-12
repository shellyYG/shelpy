require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { default: axios } = require('axios');

const testEmailReceiver = process.env.TEST_RECEIPIENT_EMAIL;
const findUsersToNotifyAboutChatPath = '/api/in/users/to-notify-about-chat';

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
      console.log('confirm Helpee email url: ', url);
      let subject, html;
      switch (user.data.currentLanguage) {
        case 'en':
          subject = 'Verify your Shelpy Email';
          html = `Please click this link to confirm your email: <a href='${url}'>${url}</a>`;
          break;
        case 'zh-TW':
          subject = '完成Shelpy註冊';
          html = `請按此連結完成註冊: <a href='${url}'>${url}</a>`;
          break;
        case 'zh-CN':
          subject = '完成Shelpy註册';
          html = `请按此连结完成註册: <a href='${url}'>${url}</a>`;
          break;
        default:
          subject = 'Verify your Shelpy Email';
          html = `Please click this link to confirm your email: <a href='${url}'>${url}</a>`;
      }
      const message = {
        to: user.data.email,
        from: {
          name: 'Shelpy',
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
      let subject, html;

      switch (user.data.currentLanguage) {
        case 'en':
          subject = 'Verify your Shelpy Email';
          html = `Please click this link to confirm your email: <a href='${url}'>${url}</a>`;
          break;
        case 'zh-TW':
          subject = '完成Shelpy註冊';
          html = `請按此連結完成註冊: <a href='${url}'>${url}</a>`;
          break;
        case 'zh-CN':
          subject = '完成Shelpy註册';
          html = `请按此连结完成註册: <a href='${url}'>${url}</a>`;
          break;
        default:
          subject = 'Verify your Shelpy Email';
          html = `Please click this link to confirm your email: <a href='${url}'>${url}</a>`;
      }
      const message = {
        to: user.data.email,
        from: {
          name: 'Shelpy',
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
        let subject, html;
        switch (user.data.currentLanguage) {
          case 'en':
            subject = 'Reset Shelpy Password';
            html = `Please click this link to reset your password: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-TW':
            subject = '重設 Shelpy 密碼';
            html = `請按此連結重設密碼: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-CN':
            subject = '完成Shelpy註册';
            html = `请按此连结重设密码: <a href='${url}'>${url}</a>`;
            break;
          default:
            subject = 'Reset Shelpy Password';
            html = `Please click this link to reset your password: <a href='${url}'>${url}</a>`;
        }
        const message = {
          to: user.data.email,
          from: {
            name: 'Shelpy',
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
        let subject, html;
        switch (user.data.currentLanguage) {
          case 'en':
            subject = 'Reset Shelpy Password';
            html = `Please click this link to reset your password: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-TW':
            subject = '重設 Shelpy 密碼';
            html = `請按此連結重設密碼: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-CN':
            subject = '完成Shelpy註册';
            html = `请按此连结重设密码: <a href='${url}'>${url}</a>`;
            break;
          default:
            subject = 'Reset Shelpy Password';
            html = `Please click this link to reset your password: <a href='${url}'>${url}</a>`;
        }
        const message = {
          to: user.data.email,
          from: {
            name: 'Shelpy',
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
    id,
    urlForPartner,
    currentLanguage,
    receiverEmailAddress,
    helpeeUsername,
    helperUsername,
  } = user; // cant user const {message}...cuz message is defined later
  let messageSender;
  if (role === 'helpee') {
    messageSender = helpeeUsername;
  } else {
    messageSender = helperUsername;
  }

  return jwt.sign(
    user,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, accessChatRoomToken) => {
      if (receiverEmailAddress) {
        const email = receiverEmailAddress.replace(/\+/g, '%2B');
        const url = `http://localhost:3000/${currentLanguage}/${role}/access-chatroom?accessChatRoomToken=${accessChatRoomToken}&urlForPartner=${urlForPartner}`;

        let subject, html;
        switch (currentLanguage) {
          case 'en':
            subject = `${messageSender} sent you a new message!`;
            html = `Message is: ${user.message} <br/> Reply here: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-TW':
            subject = `${messageSender} 傳給你一則新訊息!`;
            html = `新訊息為: ${user.message} <br/>請按此回覆訊息: <a href='${url}'>${url}</a>`;
            break;
          case 'zh-CN':
            subject = `${messageSender} 传给你一则新讯息!`;
            html = `新讯息为: ${user.message} <br/> 请按此回复讯息: <a href='${url}'>${url}</a>`;
            break;
          default:
            subject = `You receive a message in chatroom!`;
            html = `Message is. Reply here: <a href='${url}'>${url}</a>`;
        }
        const message = {
          to: receiverEmailAddress,
          from: {
            name: 'Shelpy',
            email: 'shelpyofficial@gmail.com',
          },
          subject,
          html,
        };
        sgMail
          .send(message)
          .then((response) => {
            console.log(
              'Check message reminder email sent successfully to this email: ',
              receiverEmailAddress
            );
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
};
