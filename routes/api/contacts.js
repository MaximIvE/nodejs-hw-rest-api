const express = require('express')
const router = express.Router()
const { listContacts, getContactById, removeContact, addContact } = require('../../models/contacts');
const {requestError} = require('../../helpers');


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
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) throw requestError(400,"missing required name field")
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
  res.json({ message: 'template message' })
})

module.exports = router
