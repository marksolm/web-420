/*
 ; Title:  Abdelmalak-composer.js
 ; Author: Soliman Abdelmalak
 ; Date:   19 June 2021
 ; Description: File for the composer database model.
*/
//require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// composer Schema
let composerSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
  });
  // define the composer model
var Composer = mongoose.model("Composer", composerSchema);

//expose the composer to calling files
module.exports = Composer;