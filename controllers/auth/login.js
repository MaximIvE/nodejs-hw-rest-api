const bcrypt = require("bcryptjs");
const { requestError } = require("../../helpers");
const { User } = require("../../models/user");

const login = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { throw requestError(401, "Email or password is wrong") };
    const isPasswordTrue = await bcrypt.compare(password, user.password);
    if (!isPasswordTrue) { throw requestError(401, "Email or password is wrong") };
    console.log("Ми залогінились!");
    const token = "23232323.sdfgsdfg23.4567";
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
};


module.exports = login;