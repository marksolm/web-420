/*
  Title: app.js
 Author: Soliman Abdelmalak
  Date 28 May 2021
  Description: RESTful APIs Application.
*/

// import require statements
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// application
var app = express();
// Sets up the view engine, view's directory path, and the server port.
app.set("port", process.env.PORT || 3000);
//Set the app to use express.json()
app.use(express.json());
//Set the app to use express.urlencoded({‘extended’: true});
app.use(express.urlencoded({'extended':true}));
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
const openapiSpecification = swaggerJSDoc(options);
// Wire the openapiSpecification variable to the app variable 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// create/start Node server
http.createServer(app).listen(app.get("port"), function () {
    console.log("Application started on port 3000 ");
  });