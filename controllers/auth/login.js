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
    
    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"})
    // console.log(token);
    // const decodeToken = jwt.decode(token);
    // console.log(decodeToken);

// try {
//   const result = jwt.verify(token, SECRET_KEY);
  
//   console.log(result);
//   const result2 = jwt.verify(wrongtoken, SECRET_KEY);
//   console.log(result2);
// } catch (error) {
//   console.log(error.message)
// }

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    })
};


module.exports = login;