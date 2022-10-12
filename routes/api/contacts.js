const express = require('express')
const router = express.Router()
const Joi = require('joi')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts');
const {requestError} = require('../../helpers');


const schemaAdd = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const schemaUpdate = Joi.object({
  name: Joi.string(),
  email:Joi.string(),
  phone: Joi.string(),
}).min(1)

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data)
  } catch (error) {
    next(error);
  }
})

router.get('/:Id', async (req, res, next) => {
  try {
    const data = await getContactById(req.params.Id)
    if(!data) throw requestError(404, "Not found");
    res.json(data);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = schemaAdd.validate(req.body);
    if(error) throw requestError(400, error.message.replaceAll( '"', "'"))
    const data = await addContact(req.body)
    if(!data)throw requestError(500,"Server error")
    res.status(201).json(data)
  } catch (error) {
    next(error)
  }

})

router.delete('/:Id', async (req, res, next) => {
  try {
    const data = await removeContact(req.params.Id)
    if(!data) throw requestError(404, "Not found")
    res.json({message: "contact delited"})
  } catch (error) {
    next(error);
  }
})

router.put('/:Id', async (req, res, next) => {
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
})

module.exports = router
