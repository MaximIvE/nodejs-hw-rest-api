const {addContact} = require('../../models/contacts');
const {requestError} = require('../../helpers');


const add = async (req, res) => {
  const data = await addContact(req.body)
  if(!data)throw requestError(500,"Server error")
  res.status(201).json(data)
}


module.exports = add;