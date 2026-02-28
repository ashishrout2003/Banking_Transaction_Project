require('dotenv').config()
const app = require('./Src/App')
const connectDB = require('./Src/Config/db')

connectDB()
app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})