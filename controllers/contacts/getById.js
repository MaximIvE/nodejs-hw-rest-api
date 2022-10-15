const {getContactById} = require('../../models/contacts');
const {requestError} = require('../../helpers');

const getById = async (req, res, next) => {
    try {
      const data = await getContactById(req.params.Id)
      if(!data) throw requestError(404, "Not found");
      res.json(data);
    } catch (error) {
      next(error);
    }
}

module.exports = getById;