const express = require('express');
const authMiddleware = require('../Middlewares/Auth.middleware')
const accountController = require('../Controllers/Account.controller')

const router = express.Router();

/**
 * - POST /api/accounts/
 * - Create a new account
 * - Protected Routes
 */
router.post('/', authMiddleware.authMiddleware, accountController.createAccountController)

module.exports = router;