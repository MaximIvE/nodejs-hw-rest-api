const { requestError, sendEmail } = require("../../helpers");
const { User } = require("../../models/user");

const {BASE_URL} = process.env


const resend = async (req, res) => {

    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw requestError(401, "User not found");
    const { verificationToken, verify } = user;
    
    if (verify) throw requestError(400, "Verification has already been passed");
    
    // --- checking email ---
    const data = {
        to: email,
        subject: "Contact book",
        html:   `<h2>Дякуємо, що скористались нашим сервісом!</h2>
                <p>Для того, щоб підтвердити вашу електронну адресу, перейдіть </p>
                <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">за цим посиланням.</a>`
    };

    try {
        await sendEmail(data);
        res.json({ message: "Verification email sent" })
    } catch (error) {
        console.error(error.message);
    }
    
    
};


module.exports = resend;