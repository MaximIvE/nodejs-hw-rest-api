const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {ctrlWrapper} = require('../../helpers')
const { validateBody } = require('../../middlewares')
const schemas = require('../../schemas/contacts')


router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:Id', ctrlWrapper(ctrl.getById))

router.post('/', validateBody(schemas.schemaAdd), ctrlWrapper(ctrl.add))

router.delete('/:Id', ctrlWrapper(ctrl.removeById))

router.put('/:Id', validateBody(schemas.schemaUpdate), ctrlWrapper(ctrl.updateById))


module.exports = router