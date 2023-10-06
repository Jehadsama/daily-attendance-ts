const nodemailer = require('nodemailer');

const { smtp: API } = require('../config').remote;

const emailer = nodemailer.createTransport({
  host: API.host,
  port: API.port,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: API.user,
    pass: API.password,
  },
});

module.exports = emailer;
