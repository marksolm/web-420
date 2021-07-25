/*
 ; Title:  Abdelmalak-team.js
 ; Author: Soliman Abdelmalak
 ; Date:   22 July 2021
 ; Description: File for the team database model.
*/
//require statements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

  // player Schema
let playerSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    salary: {type: Number},
  });

  // team Schema
let teamSchema = new Schema({
  name: {type: String},
  mascot: {type: String},
  players: [playerSchema],
})

// define the composer model
var Team = mongoose.model("Team", teamSchema);

//expose the composer to calling files
module.exports = Team;