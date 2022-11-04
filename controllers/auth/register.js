const bcrypt = require("bcryptjs");
const gravatar  =  require ( 'gravatar' ) ;
const { User } = require('../../models/user');
const { requestError } = require('../../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) { throw requestError(409, "Email in use"); };
    const hashPassword = await bcrypt.hash(password, 10)
    const avatarURL = gravatar.url(email, {s:'200', r:'x', d:'retro'}); 
    const result = await User.create({ email, password: hashPassword, avatarURL });
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    })
};

module.exports = register;