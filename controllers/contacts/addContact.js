const {addContact} = require('../../models/contacts');
const {requestError} = require('../../helpers');
const {schemaAdd} = require('../../schemas/contacts');


const add = async (req, res, next) => {
    try {
      const {error} = schemaAdd.validate(req.body);
      if(error) throw requestError(400, error.message.replaceAll( '"', "'"))
      const data = await addContact(req.body)
      if(!data)throw requestError(500,"Server error")
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
}

module.exports = add;