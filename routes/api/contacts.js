const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {ctrlWrapper} = require('../../helpers')
const { validateBody, isValidId, authenticate } = require('../../middlewares')
const {schemas} = require('../../models/contact')


router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:Id', isValidId, ctrlWrapper(ctrl.getById))

router.post('/', authenticate, validateBody(schemas.schemaAdd), ctrlWrapper(ctrl.add))

router.delete('/:Id', authenticate, isValidId,  ctrlWrapper(ctrl.removeById))

router.put('/:Id', authenticate, isValidId, validateBody(schemas.schemaUpdate), ctrlWrapper(ctrl.updateById))

router.patch('/:Id/favorite', authenticate, isValidId, validateBody(schemas.schemaUpdateFavorite), ctrlWrapper(ctrl.updateStatusContact))

module.exports = router;