const { Contact } = require('../../models/contact') ;

const getAll = async (req, res) => {
  const owner = req.user._id;
  const { page = 1, limit = 20, ...filter } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner, ...filter }, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email subscription");
  res.json(data)
}

module.exports = getAll;