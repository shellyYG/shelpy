require('dotenv').config();
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const testEmailReceiver = process.env.TEST_RECEIPIENT_EMAIL;


const sendHelpeeEmail = (user) => {
  const transporter = nodeMailer.createTransport({
    host: 'www.shelpy.co',
    name: 'www.shelpy.co',
    port: 9000,
    secure: true,
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return jwt.sign(
    user,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, emailToken) => {
      const url = `https://shelpy.co/helpee/email/confirmation?emailToken=${emailToken}`;
      transporter.sendMail(
        { from: process.env.EMAIL_USER,
          to: user.data.email,
          subject: 'Confirm Shelpy Email',
          html: `Please click this link to confirm your email: <a href='${url}'>Confirm My Email</a>`,
        },
        (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`email successfully sent to ${info.response}`);
          }
        }
      );
    }
  );
};
const sendHelperEmail = (user) => {
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return jwt.sign(
    user,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, emailToken) => {
      const url = `https://shelpy.co/helper/email/confirmation?emailToken=${emailToken}`;
      transporter.sendMail(
        {
          to: user.data.email, // TODO: change to customer email aka user.data.email
          subject: 'Confirm Shelpy Email',
          html: `Please click this link to confirm your email: <a href='${url}'>Confirm My Email</a>`,
        },
        (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(`email successfully sent to ${info.response}`);
          }
        }
      );
    }
  );
};

const sendHelpeeResetPasswordEmail = (user) => {
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return jwt.sign(
    user,
    process.env.FORGET_PASSWORD_SECRET,
    {
      expiresIn: '7d',
    },
    (err, passwordResetToken) => {
      if (user && user.data && user.data.email) {
        const email = user.data.email.replace(/\+/g, '%2B');
        const url = `https://shelpy.co/helpee/password/pre/reset?email=${email}&passwordResetToken=${passwordResetToken}`;
        transporter.sendMail(
          {
            to: user.data.email, // TODO: change to customer email : aka user.data.email
            subject: 'Reset Shelpy Password',
            html: `Please click this link to reset your password: <a href='${url}'>Reset Password</a>`,
          },
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log(
                `reset password email successfully sent to ${info.response}`
              );
            }
          }
        );
      }
    }
  );
};

const sendHelperResetPasswordEmail = (user) => {
  const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return jwt.sign(
    user,
    process.env.FORGET_PASSWORD_SECRET,
    {
      expiresIn: '7d',
    },
    (err, passwordResetToken) => {
      if (user && user.data && user.data.email) {
        const email = user.data.email.replace(/\+/g, '%2B');
        const url = `https://shelpy.co/helper/password/pre/reset?email=${email}&passwordResetToken=${passwordResetToken}`;
        transporter.sendMail(
          {
            to: user.data.email, // TODO: change to customer email : aka user.data.email
            subject: 'Reset Shelpy Password',
            html: `Please click this link to reset your password: <a href='${url}'>Reset Password</a>`,
          },
          (error, info) => {
            if (error) {
              console.log(error);
            } else {
              console.log(
                `reset password email successfully sent to ${info.response}`
              );
            }
          }
        );
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
