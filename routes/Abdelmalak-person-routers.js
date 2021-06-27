/*
============================================
; Title:  Abdelmalak-person-routers.js
; Author: Professor Krasso
; Date:   25 June 2021
; Description: Person API
;===========================================
*/

const express = require('express');
const router = express.Router();
const person = require('../models/Abdelmalak-person');
/**
 * findAllPerson
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - persons
 *     description: API for returning a list of person documents from MongoODB
 *     summary: return list of person document
 *     responses:
 *       '200':
 *         description: Array of persons documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/persons', async(req, res) => {
    try {
        Person.find({}, function(err, persons) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(persons);
                res.json(persons);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})


/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - persons
 *     name: createPerson
 *     summary: Creates a new person document
 *     requestBody:
 *       description: Person's Information
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               roles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                        type: string
 *               birthDate:
 *                 type: string
 *     responses:
 *       '200':
 *         description: person added to persons document
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/persons', async(req, res) => {
    try {
        const newPerson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            roles: req.body.roles,
            dependents: req.body.dependents,
            birthDate: req.body.birthDate
        };

        await Person.create(newPerson, function(err, person) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(person);
                res.json(person);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router;