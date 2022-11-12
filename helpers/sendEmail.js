const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, DEFAULT_EMAIL } = process.env;


sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data) => {
    const mail = { ...data, from:  DEFAULT_EMAIL}
    await sgMail.send(mail)
    return true;
}

module.exports = sendEmail;