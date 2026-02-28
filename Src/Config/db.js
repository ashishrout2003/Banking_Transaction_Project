const mongoose = require('mongoose')


function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Server is connected to dataBase');
        
    })
    .catch(err => {
        console.log('Error during the database connection:', err);
        process.exit(1)
        
    })
    
}
module.exports = connectDB;