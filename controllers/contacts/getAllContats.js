const { Contact } = require('../../models/contact') ;

const getAll =  async (req, res) => {
  const data = await Contact.find({}, "-createdAt -updatedAt");
  res.json(data)
}

module.exports = getAll;