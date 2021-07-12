/*
  Title: app.js
 Author: Soliman Abdelmalak
  Date 28 May 2021
  Description: RESTful APIs Application.
*/

// import require statements
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const { response } = require('express');

/**
 * composer examples
 */
 const composerAPI = require('./routes/Abdelmalak-composer-routers');

 /**
 * person examples
 */
  const personAPI = require('./routes/Abdelmalak-person-routers');
// application

 /**
 * user examples
 */
  const userAPI = require('./routes/Abdelmalak-session-routes');

  /**
 * customer examples
 */
   const customerAPI = require('./routes/Abdelmalak-node-shopper-routes');

var app = express();
// Sets up the view engine, view's directory path, and the server port.
app.set("port", process.env.PORT || 3000);
//Set the app to use express.json()
app.use(express.json());
//Set the app to use express.urlencoded({‘extended’: true});
app.use(express.urlencoded({'extended':true}));
//Define an object literal named options with the following properties/values


/**
 * MongoDB Atlas connection string
 */
 const conn = process.env.MONGODB_URL || 'mongodb+srv://Soliman:Abdelmalak_@cluster0.rpzcn.mongodb.net/web420DB?retryWrites=true&w=majority';
 mongoose.connect(conn, {
     promiseLibrary: require('bluebird'),
     useUnifiedTopology: true,
     useNewUrlParser: true
 }).then(() => {
     console.log(`Connection to web420DB on MongoDB Atlas successful`);
 }).catch(err => {
     console.log(`MongoDB Error: ${err.message}`);
 })

 //Define an object literal named options with the following properties/values
const options = {
  definition : {
      openapi: '3.0.0',
      info: {
          title: 'WEB 420 RESTFUL APIs',
          version: '1.0.0',
      },
  },
  apis: ['./routes/*.js'],// files containing annotation for the OpenAPI Specification
};
//•	Create a new variable name openapiSpecification and call the swaggerJsdoc library using the options object literal
const openapiSpecification = swaggerJsdoc(options);
// Wire the openapiSpecification variable to the app variable 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composerAPI);
app.use('/api', personAPI);
app.use('/api', userAPI);
app.use('/api', customerAPI);


/**
 * Example apis
 */

// create/start Node server
http.createServer(app).listen(app.get('port'), function() {
    console.log(`Application started and listening on port ${app.get('port')}`);
})
