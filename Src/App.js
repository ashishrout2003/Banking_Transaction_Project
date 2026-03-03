const express = require('express')
const CookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(CookieParser())

/**
 * - Routes Required
 */

const authRoutes = require('./Routes/Auth.routes')
const accountRoutes = require('./Routes/Accounts.routes')
const transactionRoutes = require('./Routes/Transaction.routes')

/**
 * - Use routes
 */
app.use('/api/auth', authRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/transactions', transactionRoutes)


module.exports = app;