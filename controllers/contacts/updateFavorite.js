const {Contact} = require('../../models/contact');
const {requestError} = require('../../helpers');


const updateFavorite = async (req, res) => {
  const data = await Contact.findByIdAndUpdate(req.params.Id, req.body, {new: true})
  if(!data) throw requestError(404, "Not found")
  res.json(data)
}


module.exports = updateFavorite;