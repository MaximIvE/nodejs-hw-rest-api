const { User } = require('../../models/user');
const { requestError } = require('../../helpers');

const register = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) { throw requestError(409, "Email in use"); };
    const result = await User.create({ email, password });
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    })
};

module.exports = register;