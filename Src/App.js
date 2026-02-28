const express = require('express')
const authRouter = require('./Routes/Auth.routes')
const CookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(CookieParser())

app.use('/api/auth', authRouter)


module.exports = app;