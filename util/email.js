require('dotenv').config();
const sendgridMail = require('@sendgrid/mail');
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const testEmailReceiver = process.env.TEST_RECEIPIENT_EMAIL;

sendgridMail.setApiKey(process.env.SENDGRID_EMAIL_API_KEY);

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
      
      switch(user.data.currentLanguage) {
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
      sendgridMail
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
      sendgridMail
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
        sendgridMail
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
        sendgridMail
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

module.exports = {
  sendHelpeeEmail,
  sendHelperEmail,
  sendHelpeeResetPasswordEmail,
  sendHelperResetPasswordEmail,
};
