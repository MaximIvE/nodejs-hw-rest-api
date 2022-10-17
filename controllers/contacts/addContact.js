const { requestError } = require('../../helpers');
const Book = require('../../models/contact')


const add = async (req, res) => {
  const data = await Book.create(req.body)
  if(!data)throw requestError(500,"Server error")
  res.status(201).json(data)
}


module.exports = add;