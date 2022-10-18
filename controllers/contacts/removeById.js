const {Contact} = require('../../models/contact');
const {requestError} = require('../../helpers');

const removeById = async (req, res) => {
  const data = await Contact.findByIdAndRemove(req.params.Id)
  if(!data) throw requestError(404, "Not found")
  res.json({message: "contact delited"})
}

module.exports = removeById;