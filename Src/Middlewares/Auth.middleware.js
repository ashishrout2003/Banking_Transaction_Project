const userModel = require('../Models/User.model')
const jwt = require('jsonwebtoken')

async function authMiddleware(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        console.log(req.cookies.token);
        
        return res.status(401).json({
            message: "Unauthorized access - token is missing"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await userModel.findById(decoded.userId)
        req.user = user
        return next()

    }catch(err){
        console.log(err);
        
        return res.status(401).json({
            message: "Unauthorized access - invalid token"
        })
    }
}

module.exports = {
    authMiddleware
}