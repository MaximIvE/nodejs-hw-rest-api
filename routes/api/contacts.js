const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')
const {ctrlWrapper} = require('../../helpers')
const { validateBody, isValidId } = require('../../middlewares')
const {schemas} = require('../../models/contact')


router.get('/', ctrlWrapper(ctrl.getAll))

router.get('/:Id', isValidId, ctrlWrapper(ctrl.getById))

router.post('/', validateBody(schemas.schemaAdd), ctrlWrapper(ctrl.add))

// router.delete('/:Id', isValidId,  ctrlWrapper(ctrl.removeById))

router.put('/:Id', isValidId, validateBody(schemas.schemaUpdate), ctrlWrapper(ctrl.updateById))

router.patch('/:Id/favorite', isValidId, validateBody(schemas.schemaUpdateFavorite), ctrlWrapper(ctrl.updateFavorite))

module.exports = router;