const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const validator = require ('validator');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const crypto = require ("crypto") 

const userSchema = Schema({
    username: {
        type: String,
        required: [true, "please enter your name"]
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
        unique: true,
        valiate: [validator.isEmail, "please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minlength: [6, "password must be at least 6 characters"],
        maxlength: [32, "password must be at most 32 characters"],
        select: false
    },
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22"
    },
    role: {
        type: String,
        default: "user"
    },
    createAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken : String,
    resetPasswordTokenExpire : Date
})


userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
    
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRES_TIME})
};

userSchema.methods.isValidPassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.getResetToken = function (){
    //create token
    const token = crypto.randomBytes(20).toString("hex");
    //generate hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    //set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000

    return token;
}


module.exports = mongoose.model("User", userSchema);