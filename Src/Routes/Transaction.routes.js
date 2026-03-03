const {Router} = require('express');
const authmiddleware = require('../Middlewares/Auth.middleware')
const transactionRoutes = Router();
const transactionController = require('../Controllers/Transaction.controller')
/**
 * - POST /api/transaction
 * - Create a new transaction
 */

transactionRoutes.post('/', authmiddleware.authMiddleware, transactionController.createTransaction)

/**
 * - POST /api/transaction/system/initial-funds
 * - Create intial fund transaction from system user
 */

transactionRoutes.post('/system/initial-funds', authmiddleware.authSystemMiddleware, transactionController.createInitialFundTransaction)



module.exports = transactionRoutes;