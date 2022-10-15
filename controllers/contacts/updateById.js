const {updateContact} = require('../../models/contacts');
const {requestError} = require('../../helpers');
const {schemaUpdate} = require('../../schemas/contacts');

const updateById = async (req, res, next) => {
    try {
      const {body} = req;
      const {error} = schemaUpdate.validate(body);
      
      if(error) throw requestError(400, error.message.replaceAll( '"', "'"))
      const data = await updateContact(req.params.Id, body)
      if(!data) throw requestError(404, "Not found")
      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  module.exports = updateById;