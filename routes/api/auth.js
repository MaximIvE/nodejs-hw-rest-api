const express = require('express');
const router = express.Router();

const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

const { register, login, getCurrent, logout } = require('../../controllers/auth');

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(register))

router.get("/login", validateBody(schemas.loginSchema), ctrlWrapper(login))

router.get("/current", authenticate, ctrlWrapper(getCurrent))

router.get("/logout", authenticate, ctrlWrapper(logout) )

module.exports = router;