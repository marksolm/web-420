/*
 ; Title:  Abdelmalak-customer.js
 ; Author: Soliman Abdelmalak
 ; Date:   10 July 2021
 ; Description: File for the customer NodeShopper API model.
*/

//Require statements for mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

  // lineItemSchema Schema
let lineItemSchema = new Schema ({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
})

 // invoice Schema
let invoiceSchema = new Schema ({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema],
})

 // customerSchema  Schema
let customerSchema = new Schema ({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [invoiceSchema],
})

// define the Customer model
var Customer = mongoose.model("Customer", customerSchema);

//expose the Customer to calling files
module.exports = Customer;