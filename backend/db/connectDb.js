const mongoose = require("mongoose");
const { mongooseUrl } = require("../constants/constVar");

mongoose.connect(mongooseUrl);

mongoose.connection.on("connection",()=>{console.log("mongoose connected successfully")});

module.exports = {mongoose}