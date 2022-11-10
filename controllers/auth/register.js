const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const uniqid = require("uniqid");
const { User } = require('../../models/user');
const { requestError, sendEmail } = require('../../helpers');


const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) { throw requestError(409, "Email in use"); };
    
// --- adding an avatar  and register new user ---
    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email); 
    const verificationToken = uniqid();
    
    // const avatarURL = gravatar.url(email, {s:'250', r:'x', d:'retro'}); 
    const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken});
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    })

// --- checking email ---
    const data = {
        // to: "ivanukmaxim@gmail.com",
        // to: "teachermaksym@gmail.com",
        to: email,
        // from: "maksymivaniuk@meta.ua",
        subject: "Служба реєстрації пошти Contact book",
        html:   `<h2>Дякуємо, що скористались нашим сервісом!</h2>
                <p>Для того, щоб підтвердити вашу електронну адресу, перейдіть </p>
                <a href="http://localhost:3000/api/users/verify/${verificationToken}">за цим посиланням.</a>`
    };

    const emailSuccess = await sendEmail(data);
    console.log(emailSuccess);

};

module.exports = register;
