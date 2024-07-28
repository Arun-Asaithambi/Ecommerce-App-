const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require ('jsonwebtoken');   
const User = require("../models/userSchema");


exports.isAuthenticatedUser =  catchAsyncErrors(async (req, res, next) =>{
    const { token } = req.cookies;
    if(!token){
        return next(new ErrorHandler("first login to handle this resourse", 401))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET );
    req.user = await User.findById(decode.id);  
    next(); 
})  

exports.AuthorizationRole = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed`, 403))
        }
        next()
    }
}