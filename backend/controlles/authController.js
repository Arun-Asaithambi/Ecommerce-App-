const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userSchema");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require("crypto");

exports.registerUser = catchAsyncErrors(async (req, res, next) =>{
    const {username, email,  password,avatar} = req.body;
    const user = await User.create({username, email,  password,avatar});

    sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("please enter the password or email", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler("Invalid email or password", 401))
    }
 
    sendToken(user, 201, res);
}); 


exports.logout = (req, res, next) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        message: "loggedout"
    })
};

exports.forgotPassword = catchAsyncErrors(async (req, res, next) =>{

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave: false}); 


    const resetUrl = `${req.protocal}://${req.get("host")}/products/password/reset/${resetToken}`
    const message = `Your password reset url is as follows \n\n
    ${resetUrl}\n\n if your have not requested  this email , then ignore it`;

    try{
        sendEmail({
            email: user.email,
            subject: "password recovery",
            message
        });

        res.status(200).json({message: `Email sent to  ${user.email}`}) 

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message, 500))
    }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) =>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    })

    if(!user){
        return next(new ErrorHandler("password reset tokrn id invalied or expired"));
    }

    if( req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password dose not match"))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false});
    sendToken(user, 201, res);
     
});