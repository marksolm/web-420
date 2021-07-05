/*
 ; Title:  Abdelmalak-user.js
 ; Author: Soliman Abdelmalak
 ; Date:   01 July 2021
 ; Description: File for the users database Password model.
*/
//require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


  // userSchema  Schema
let userSchema = new Schema({
    userName: {type: String},
    password: {type: String},
    emailAddress: {type: Array},
  });

// define the user model
var User = mongoose.model("User", userSchema);

//expose the user to calling files
module.exports = User;