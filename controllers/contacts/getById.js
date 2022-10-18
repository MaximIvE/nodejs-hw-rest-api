const {Contact} = require('../../models/contact');
const {requestError} = require('../../helpers');

const getById = async (req, res) => {
  const { Id } = req.params;
  const data = await Contact.findById(Id, "-createdAt -updatedAt")
  if(!data) throw requestError(404, "Not found");
  res.json(data);
}

module.exports = getById;