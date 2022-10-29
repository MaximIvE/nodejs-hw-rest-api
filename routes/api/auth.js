const express = require('express');
const router = express.Router();

const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

const { register, login } = require('../../controllers/auth');

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(register))

router.get("/login", validateBody(schemas.loginSchema), ctrlWrapper(login))

module.exports = router;