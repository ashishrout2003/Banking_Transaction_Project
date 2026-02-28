const {Router} = require('express');
const authmiddleware = require('../Middlewares/Auth.middleware')
const transactionRouter = Router();

/**
 * - POST /api/transaction
 * - Create a new transaction
 */

transactionRouter.post('/', authmiddleware.authMiddleware)

module.exports = transactionRouter;