const {getContactById} = require('../../models/contacts');
const {requestError} = require('../../helpers');

const getById = async (req, res) => {
  const data = await getContactById(req.params.Id)
  if(!data) throw requestError(404, "Not found");
  res.json(data);
}

module.exports = getById;