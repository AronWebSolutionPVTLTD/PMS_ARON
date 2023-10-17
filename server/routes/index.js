const express = require('express');
const app = express.Router();
const User = require("./user")
const Project = require("./projects")
const Client = require("./client")
//User Routes:-
app.use("/user",User)
app.use("/projects",Project)
app.use("/clients",Client)

module.exports = app;