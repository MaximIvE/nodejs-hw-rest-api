const { listContacts } = require('../../models/contacts') ;

const getAll =  async (req, res) => {
  const data = await listContacts();
  res.json(data)
}

module.exports = getAll;