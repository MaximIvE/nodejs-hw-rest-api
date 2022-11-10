const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const defaultEmail = "maksymivaniuk@meta.ua";

// const data = {
//     to: "teachermaksym@gmail.com",
//     from: "maksymivaniuk@meta.ua",
//     subject: "Test list",
//     html: "<p>Натисніть цю кнопочку щоб підтвердити вашу пошту</p>"
//     }

const sendEmail = async(data) => {
    const mail = { ...data, from:  defaultEmail}
    await sgMail.send(mail)
    return true;
}

module.exports = sendEmail;