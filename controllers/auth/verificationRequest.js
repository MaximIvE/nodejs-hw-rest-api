const { User } = require("../../models/user")
const {requestError} = require('../../helpers');

const verificationRequest = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({verificationToken})
    if (!user) throw requestError(404, 'Not found');
    const { _id } = user;
    await User.findByIdAndUpdate(_id, { verificationToken: null, verify: true }, { new: true });
    res.json({
        message: 'Verification successful'
    })
    
 }

module.exports = verificationRequest;