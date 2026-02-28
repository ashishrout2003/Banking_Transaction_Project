const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required for creating user"],
        trim: true,
        lowercase: true,
        unique: [true, "Email is already exists"], 
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address"]
    },
    name:{
        type: String,
        required: [true, "Name is required for creating an account"]
    },
    password:{
        type: String,
        required: [true, "password is required for creating an account"],
        minlength: [6, "Password must be atleast 6 charectors long"],
        select: false 
    }
},{
    timestamps: true
})

userSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return 
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return
})

userSchema.methods.comparePassword = async function (password){
    
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel;

