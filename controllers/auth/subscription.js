const { User } = require('../../models/user');
const requestError = require('../../helpers');

const subscription = async (req, res) => {
    const { _id } = req.user;
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (!user) throw requestError(404, "Not found");
    res.json({
        token: user.token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
}

module.exports = subscription;