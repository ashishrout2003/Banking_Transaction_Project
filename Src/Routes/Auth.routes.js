const express = require('express')
const authControllers = require('../Controllers/Auth.controller')
const router = express.Router()

router.post('/register', authControllers.userRegisterController)

router.post('/login', authControllers.userLoginController)

module.exports = router;