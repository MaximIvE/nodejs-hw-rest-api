const express = require('express');
const router = express.Router();

const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

const { register } = require('../../controllers/auth');


router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(register))

module.exports = router;