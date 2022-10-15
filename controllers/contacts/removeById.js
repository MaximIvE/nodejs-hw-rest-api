const {removeContact} = require('../../models/contacts');
const {requestError} = require('../../helpers');

const removeById = async (req, res, next) => {
    try {
      const data = await removeContact(req.params.Id)
      if(!data) throw requestError(404, "Not found")
      res.json({message: "contact delited"})
    } catch (error) {
      next(error);
    }
  }

module.exports = removeById;