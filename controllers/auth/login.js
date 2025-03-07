const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { requestError } = require("../../helpers");
const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { throw requestError(401, "Email or password is wrong") };
    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) { throw requestError(401, "Email or password is wrong") };
    if(!user.verify) { throw requestError(401, "Email not verified") };
    
    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, {token})

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
};


module.exports = login;