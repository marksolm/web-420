/*
 ; Title:  Abdelmalak-person-routers.js
 ; Author: Soliman Abdelmalak
 ; Date:   25 June 2021
 ; Description: File for the person database model.
*/
//require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// role Schema
let roleSchema = new Schema({
    text: {type: String}
  });

  // dependent Schema
let dependentSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String}
  });

    // person Schema
let personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependentSchema],
  birthDate: { type: String }
})

// define the composer model
var Person = mongoose.model("Person", personSchema);

//expose the composer to calling files
module.exports = Person;