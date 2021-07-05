/*
============================================
; Title:  Abdelmalak-session-routes.js
; Author: Professor Krasso
; Date:   01 July 2021
; Description: Routes for registering and resetting passwords
;===========================================
*/

const express = require('express');
const router = express.Router();
const User = require('../models/Abdelmalak-user');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/signup:
 *   post:
 *     tags:
 *       - users
 *     name: signup
 *     summary: sign up user
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             required:
 *               - userName
 *               - password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               emailAddress:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Registered user
 *       '401':
 *         description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/signup', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (!user) {
                const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
                const newRegisteredUser = {
                    password: hashedPassword,
                    userName: req.body.userName,
                    emailAddress: req.body.emailAddress,
                };
                User.create(newRegisteredUser, function(err, user) {

                    if (err) {
                        console.log(err);
                        return res.status(501).send({
                            'message': `MongoDB Exception: ${err}`
                        })
                    } else {
                        console.log(user);
                        return res.json(user);
                    }
                })
            }
            if (user) return res.status(401).send('Username is already in use.');
    
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Excpetion: ${e.message}`
        })
    }
})


/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - users
 *     name: login
 *     summary: login with a a password
 *     requestBody:
 *       description: User information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/login', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, function(err, user) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(user);

                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

                    if (passwordIsValid) {
                        console.log('User logged in');
                        res.status(200).send({
                            'message': 'User logged in'
                        })
                    } else {
                      console.log('Password is incorrect');
                      res.status(401).send({
                         'message': `Invalid passId or password`
                    }) 
                    }
                } 
                if (!user){
                    res.status(401).send({
                        'message': `Invalid username and/or password`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})

module.exports = router;