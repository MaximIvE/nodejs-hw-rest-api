const { requestError } = require('../../helpers');
const {Contact} = require('../../models/contact')


const add = async (req, res) => {
  const owner = req.user._id;
  const data = await Contact.create({...req.body, owner})
  if(!data)throw requestError(500,"Server error")
  res.status(201).json(data)
}

module.exports = add;