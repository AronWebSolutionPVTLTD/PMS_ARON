const express = require("express");
const app = express.Router();
const User = require("../model/user");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const project = require("../model/project");
const user = require("../model/user");



 const Register = async (req, res, next) => {
    try {
    const { username, email, password, avatar } = req.body;
    const usermail = await User.findOne({ email });
    if (usermail) {
      return next(new ErrorHandler("User already exists", 400));
    }
    // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "avatars",
    // });
    const user = {
      username,
      email,
      password
    };
// console.log(user)
    // if(myCloud){
    //   user.avatar= {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   }
    //   await user.save()
    // }

    const active = createActivationToken(user);
    const activationUrl = `${process.env.APP_URL}/activation/${active}`;

    try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          message: `
          <div>
          <h1>Aron Web Solutions</h1>
          <h5>Project Management System</h5>
          Hello ${user.username}, please click on the link to activate your account: ${activationUrl}
          </div>`,
        });
        res.status(201).json({
          success: true,
          message: `please check your email:- ${user.email} to activate your account!`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
  const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });
  };
const ActivateUser = async (req, res, next) => {
      try {
        const { activation_token } = req.body;
  // console.log(activation_token)
        const newUser = jwt.verify(
          activation_token,
          process.env.ACTIVATION_SECRET
        );
  // console.log(newUser,process.env.ACTIVATION_SECRET)
        if (!newUser) {
          return next(new ErrorHandler("Invalid token", 400));
        }
        const { username, email, password } = newUser;
  
        let user = await User.findOne({ email });
  
        if (user) {
          return next(new ErrorHandler("User already exists", 400));
        }
        user = await User.create({
          username,
          email,
          password,
          verified:true
        });
        sendToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }

const CreateUser = async (req, res, next) => {
  try {
  const { username, email, designation,department,phone } = req.body;
  const usermail = await User.findOne({ email });
  if (usermail) {
    return next(new ErrorHandler("User already exists", 400));
  }
 
  const user = await User.create({
    ...req.body
  })

res.status(201).send("User created successfully")

  }catch(err){
    console.log(err)
  }
}

  
  const Login = async (req, res, next) => {
    // console.log("first")
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return next(new ErrorHandler("Please provide the all fields!", 400));
        }
  
        const user = await User.findOne({ email }).select("+password");
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists!", 400));
        }
  
        const isPasswordValid = await user.comparePassword(password);
  
        if (!isPasswordValid) {
          return next(
            new ErrorHandler("Please provide the correct information", 400)
          );
        }

        sendToken(user, 201, res);
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  
  
  // load user
  const GetUser  = async (req, res, next) => {
      try {
        const user = await User.findById(req.user.id);
  
        if (!user) {
          return next(new ErrorHandler("User doesn't exists", 400));
        }
  
        res.status(200).json({
          success: true,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  
  
  // log out user
  const Logout =async (req, res, next) => {
      try {
        res.cookie("token", null, {
          expires: new Date(Date.now()),
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.status(201).json({
          success: true,
          message: "Log out successful!",
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  
  // update user info
  const UpdateUserInfo  =async (req, res, next) => {
      try {
        const { email, password, phoneNumber, name } = req.body;
  // console.log(req.body)
        const userP = await User.findOne({ email }).select("+password");
  
        if (!userP) {
          return next(new ErrorHandler("User not found", 400));
        }
  
         const user = await User.findByIdAndUpdate({_id:userP._id},{...req.body},{new:true})
  
        res.status(201).json({
          success: true,
          user,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    };
  
  // update user avatar
  const UpdateAvatar =async (req, res, next) => {
      try {
        let existsUser = await User.findById(req.user.id);
        if (req.body.avatar !== "") {
          const imageId = existsUser.avatar.public_id;
  
          await cloudinary.v2.uploader.destroy(imageId);
  
          const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
          });
  
          existsUser.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
  
        await existsUser.save();
  
        res.status(200).json({
          success: true,
          user: existsUser,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }

const UpdatePassword = async (req, res, next) => {
          try {
            const user = await User.findById(req.user.id).select("+password");
      
            const isPasswordMatched = await user.comparePassword(
              req.body.oldPassword
            );
      
            if (!isPasswordMatched) {
              return next(new ErrorHandler("Old password is incorrect!", 400));
            }
      
            if (req.body.newPassword !== req.body.confirmPassword) {
              return next(
                new ErrorHandler("Password doesn't matched with each other!", 400)
              );
            }
            user.password = req.body.newPassword;
      
            await user.save();
      
            res.status(200).json({
              success: true,
              message: "Password updated successfully!",
            });
          } catch (error) {
            return next(new ErrorHandler(error.message, 500));
          }
        }
      
      // find user infoormation with the userId
const SingleUser = async(req, res, next) => {
          try {
            // console.log(req.params)
            const user = await User.findById(req.params.id);;
            if(!user){
              return next(
                new ErrorHandler("No user found!", 404)
              );
            }
          const projects = await project.find({users:user._id}).select('rating');
          // console.log(projects)
          if(projects.length!==0){
            let totalRating = 0;
            for (const project of projects) {
              totalRating += project.rating;
            }
            const averageRating = projects.length > 0 ? totalRating / projects.length : 0;
        user.rating= averageRating;
          }      
            res.status(201).json({
              success: true,
              user,
            });
          } catch (error) {
            return next(new ErrorHandler(error.message, 500));
          }
        }
      
      // all users --- for admin
      const AllUsers = async (req, res, next) => {
        try {
          const users = await User.find({verified:false}).sort({
            createdAt: -1,
          });
      
          // Calculate the average rating for each user
          for (const user of users) {
            const projects = await project.find({ users: user._id }).select('rating');
            let totalRating = 0;
            for (const project of projects) {
              totalRating += project.rating;
            }
            const averageRating = projects.length > 0 ? totalRating / projects.length : 0;
            user.averageRating = averageRating.toFixed(1);
          }

          res.status(201).json({
            success: true,
            users,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      };

      const AllUsers_OfC = async (req, res, next) => {
        try {
          const users = await User.find({verified:true});
      
          res.status(200).json({
            success: true,
            users,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      };
      
      
      // delete users --- admin
   const DeleteUser = async (req, res, next) => {
          try {
            const user = await User.findByIdAndDelete(req.params.id);
      
            if (!user) {
              return next(
                new ErrorHandler("User is not available with this id", 400)
              );
            }
      
            // const imageId = user.avatar.public_id;
      
            // await cloudinary.v2.uploader.destroy(imageId);
      
            // await User.findByIdAndDelete(req.params.id);
      
            res.status(200).json({
              success: true,
              message: "User deleted successfully!",
            });
          } catch (error) {
            return next(new ErrorHandler(error.message, 500));
          }
        }

module.exports = {Register,ActivateUser,AllUsers,DeleteUser,GetUser,Login,Logout,SingleUser,UpdateAvatar,UpdatePassword,UpdateUserInfo,CreateUser,AllUsers_OfC};
