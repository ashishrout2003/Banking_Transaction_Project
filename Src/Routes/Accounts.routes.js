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

/**
 * - GET /api/accounts/
 * - Get all accounts of the logged in user
 * - Protected routes
 */

router.get('/', authMiddleware.authMiddleware, accountController.getUserAccountsController)

/**
 * - GET /api/accounts/balance/:accountid
 */
router.get('/balance/:accountId', authMiddleware.authMiddleware, accountController.getAccountBalanceController)

module.exports = router;