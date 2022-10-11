const express = require('express')
const router = express.Router()
const { listContacts, getContactById } = require('../../models/contacts');



router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.get('/:Id', async (req, res, next) => {
  try {
    const data = await getContactById(req.params.Id)
    if(!data){
      return res.status(404).json({
        message: "Not found"
      })
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:Id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:Id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router


