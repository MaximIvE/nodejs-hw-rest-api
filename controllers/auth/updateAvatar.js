const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp');
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
   // Стискаємо файл, переміщуємо в public/avatars
    await Jimp.read(tmpDir).then(image => {
        const avatar = image.resize(Jimp.AUTO, 250).cover(250, 250).quality(60).write(tmpDirUpdate);
        fs.unlink(tmpDir);
            return avatar;
        })
        .catch(err => {
            console.error(err);
    });
    // await fs.rename(tmpDir, tmpDirUpdate);
    // Додаємо в БД
    const avatarURL = path.join("avatars", filename);
    const user = await User.findByIdAndUpdate(_id, {avatarURL}, { new: true });
    if (!user) throw requestError(404, "Not found");
    // Відповідь на фронт
    res.status(201).json({
        avatarURL
    })
    // const baseUrl = "http://localhost:3000/"
}

module.exports = updateAvatar;