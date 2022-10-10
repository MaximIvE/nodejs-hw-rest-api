const express = require('express')
const router = express.Router()
const { listContacts } = require('../../models/contacts');



router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.json(data)
  
})

router.get('/:Id', async (req, res, next) => {
  res.json({ message: 'template message123' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message***' })
})

router.delete('/:Id', async (req, res, next) => {
  res.json({ message: 'template message+++' })
})

router.put('/:Id', async (req, res, next) => {
  res.json({ message: 'template message---' })
})

module.exports = router


