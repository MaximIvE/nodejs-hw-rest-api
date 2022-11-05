const path = require('path')
const fs = require('fs/promises')
const { User } = require('../../models/user');
const requestError = require('../../helpers');



const updateAvatar = async (req, res) => {
    // console.log("req.body", req.body);
    // console.log ("req,file", req.file);
    const { path: tmpDir, originalname } = req.file;
    const { _id } = req.user;

    const extension = originalname.split(".").pop();
    const filename = _id + "." + extension;

    const tmpDirUpdate = path.join(__dirname, "../../", "public", "avatars", filename) 
    
    await fs.rename(tmpDir, tmpDirUpdate);
    
    const avatarURL = path.join("avatars", filename);
    
    const user = await User.findByIdAndUpdate(_id, {avatarURL}, { new: true });
    
    if (!user) throw requestError(404, "Not found");

    res.status(201).json({
        avatarURL
    })
    // const baseUrl = "http://localhost:3000/"
}

module.exports = updateAvatar;