const {Router} = require('express');
const authmiddleware = require('../Middlewares/Auth.middleware')
const transactionRouter = Router();
const transactionController = require('../Controllers/Transaction.controller')
/**
 * - POST /api/transaction
 * - Create a new transaction
 */

transactionRouter.post('/', authmiddleware.authMiddleware, transactionController.createTransaction)

module.exports = transactionRouter;