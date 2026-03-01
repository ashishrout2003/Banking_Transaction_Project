const express = require('express')
const CookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(CookieParser())

/**
 * - Routes Required
 */

const authRouter = require('./Routes/Auth.routes')
const accountRouter = require('./Routes/Accounts.routes')
const transactionRouter = require('./Routes/Transaction.routes')

/**
 * - Use routes
 */
app.use('/api/auth', authRouter)
app.use('/api/accounts', accountRouter)
app.use('/api/transaction', transactionRouter)


module.exports = app;