const {Schema,model} = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    username:{
        type: String,
        required: [true, "Please enter your usename!"],
      },
      email:{
        type: String,
        required: [true, "Please enter your email!"],
      },
      password:{
        type: String,
        required: [true, "Please enter your password"],
        select: false,
      },
      phone:{
        type: String,
      },
      role:{
        type: String,
        default: "Member",
      },  
      avatar:{
        public_id: {
          type: String
        },
        url: {
          type: String
        },
     },
     createdAt:{
      type: Date,
      default: Date.now(),
     },
     resetPasswordToken: String,
     resetPasswordTime: Date,
})

userSchema.pre('save',async function (next){
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
  
  // compare password
  userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  module.exports = model("User", userSchema);