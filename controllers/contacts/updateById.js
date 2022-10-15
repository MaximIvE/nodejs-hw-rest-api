const {updateContact} = require('../../models/contacts');
const {requestError} = require('../../helpers');


const updateById = async (req, res) => {
  const data = await updateContact(req.params.Id, req.body)
  if(!data) throw requestError(404, "Not found")
  res.json(data)
}


module.exports = updateById;