require('dotenv').config();
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const testEmailReceiver = 'shellyyangtw@gmail.com';


const sendHelpeeEmail = (user) => {
    console.log('sendHelpeeEmail, ', process.env.EMAIL_USER, process.env.EMAIL_PASS);
  const transporter = nodeMailer.createTransport({
      service: 'Gmail',
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
  });
  console.log('user for jwt: ', user);
  return jwt.sign(
    user,
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, emailToken) => {
      console.log('emailToken: ', emailToken);
      const url = `http://localhost:3000/helpee/email/confirmation?emailToken=${emailToken}`;
      transporter.sendMail(
        {
          to: testEmailReceiver, // TODO: change to customer email
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
    {
      user,
    },
    process.env.EMAIL_SECRET,
    {
      expiresIn: '7d',
    },
    (err, emailToken) => {
      const url = `httpL//localhost:3000/helper/email/confirmation?${emailToken}`;
      transporter.sendMail(
        {
          to: testEmailReceiver, // TODO: change to customer email
          subject: 'Confirm Shelpy Email',
          html: `Please click this link to confirm your email: <a href="${url}>${url}</a>"`,
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

module.exports = {
  sendHelpeeEmail,
  sendHelperEmail,
};
