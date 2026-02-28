const userModel = require('../Models/User.model')
const jwt = require('jsonwebtoken')
const emailService = require('../Services/Email.service')

async function userRegisterController(req, res){
    const {email, name, password} = req.body;

    const userExist = await userModel.findOne({
        email: email
    })
    if(userExist){
        
        return res.status(422).json({
            message: "User is already exist in this email",
            status: "fail"
        })
    }
    const user = await userModel.create({
        email, name, password
    })
     const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '3d'})
     res.cookie('token', token)
     res.status(201).json({
        message: "User is registered successfully",
        user:{
            _Id: user._id,
            name:user.name,
            email: user.email
        },
        token
     })
     await emailService.sendRegistrationEmail(user.email, user.name)
}

/**
 * - User Login Controller
 * - POST /api/auth/login
 */
async function userLoginController(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({
            message: "Invalid email or password",
        })
    }
    const isValidPassword = await user.comparePassword(password)
    if(!isValidPassword){
        
        
        return res.status(401).json({
            message: "Invalid email or PASSWORD",
        })
    }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '3d'})
    res.cookie('token', token)
    res.status(200).json({
        message: "User logged in successfully",
        user:{
            _Id: user._id,
            name:user.name,
            email: user.email
        },
        token
     })
}

module.exports = {
    userRegisterController,
    userLoginController
}