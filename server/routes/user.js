const express = require("express");
const app = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const { Register,ActivateUser,AllUsers,DeleteUser,GetUser,Login,Logout,SingleUser,UpdateAvatar,UpdatePassword,UpdateUserInfo,CreateUser, AllUsers_OfC } = require("../controllers/user");

//Testing:-
app.get("/", (req, res, next) => {
  res.json({ message: "User Route is working" });
});

// Authentication :-
app.post("/register", catchAsyncErrors(Register));
app.post("/activate", catchAsyncErrors(ActivateUser));
app.post("/create",catchAsyncErrors(CreateUser))
app.post("/login", catchAsyncErrors(Login));
app.post("/logout", catchAsyncErrors(Logout));
app.post("/getuser", catchAsyncErrors(GetUser));
app.post("/update-avatar", catchAsyncErrors(UpdateAvatar));
app.post("/update-user-password", catchAsyncErrors(UpdatePassword));
app.post("/update-user-info", catchAsyncErrors(UpdateUserInfo));
app.get("/user-info/:id", catchAsyncErrors(SingleUser));
app.get("/all", catchAsyncErrors(AllUsers));
app.get("/collabs", catchAsyncErrors(AllUsers_OfC));
app.delete("/delete-user/:id", catchAsyncErrors(DeleteUser));

module.exports = app;
