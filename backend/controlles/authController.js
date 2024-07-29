const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userSchema");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require("crypto");


// Register
exports.registerUser = catchAsyncErrors(async (req, res, next) =>{
    const {username, email,  password,avatar} = req.body;
    const user = await User.create({username, email,  password,avatar});

    sendToken(user, 201, res);
});

// Login

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

// Lougout
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


// Forgot password
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


// Reset password
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
/////////////////////////////////////////////////////////

// Get user profile

exports.getUserProfile = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.user.id);
    res.status(200).json({user});
});

// change password
exports.changePassword = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.user.id).select("+password");

    //check old password
    if(!await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandler("Old password is incorrect", 400))
    }

    //assign new password
    user.password = req.body.password;
    await user.save();
    res.status(200).json({user});
});

// update profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) =>{
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, updatedUserData, {new: true, runValidators: true});
    res.status(200).json({user});
});


//Admin: get all users
exports.getAllUsers = catchAsyncErrors(async (req, res, next)  =>{
    const users = await User.find();
    res.status(200).json({count: users.length,users});
});

//Admin: get single user
exports.getUser = catchAsyncErrors(async (req, res, next)  =>{
    const user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with this is id: ${req.body.params}`, 404));
    }
    res.status(200).json({user});
});

//Admin: update user
exports.updateUser = catchAsyncErrors(async (req, res, next)  =>{
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, updatedUserData, {new: true, runValidators: true});
    res.status(200).json({user});
});

//Admin: delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next)  =>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User not found with this is id: ${req.body.params}`,400))
    }
    res.status(200).json({user});
})