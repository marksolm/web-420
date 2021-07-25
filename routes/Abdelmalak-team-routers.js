/*
============================================
; Title:  Abdelmalak-composer-routers.js
; Author: Professor Krasso
; Date:   22 July 2021
; Description: team API
;===========================================
*/

const express = require('express');
const router = express.Router();
const Team = require('../models/Abdelmalak-team');

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - teams
 *     description: API for returning a list of team documents from MongoODB
 *     summary: return list of teams document
 *     responses:
 *       '200':
 *         description: Array of team documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/teams', async(req, res) => {
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(teams);
                res.json(teams);
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
 * createTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - teams
 *     name: createTeam
 *     summary: Creates a new team
 *     requestBody:
 *       description: team information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - name
 *               - mascot
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Team added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.post('/teams', async(req, res) => {
    try {
        const newTeam = {
            name: req.body.name,
            mascot: req.body.mascot,
        };

        await Team.create(newTeam, function(err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - teams
 *     name: assignPlayerToTeam
 *     summary: Adds a player to a team
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Team id
 *         schema:
 *           type: string
 *     requestBody:
 *       description: player information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               salary:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Player document 
 *       '401':
 *         description: Invalid teamId 
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/teams/:id/players', async(req, res) => {
    try {
        console.log(req.params.id);
        Team.findOne({'_id': req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(401).send({
                    'message': `Invalid teamId`
                })
            } else {
                console.log(team);

                const newPlayer = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    salary: req.body.salary, 
                };

                team.players.push(newPlayer);

                team.save(function(err, savedTeam) {
                    if (err) {
                        console.log(err);
                        res.status(501).send({
                            'message': `MongoDB Exception: ${err}`
                        })
                    } else {
                        console.log(savedTeam);
                        res.json(savedTeam);
                            
                    }
                })
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
 * findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - teams
 *     description:  API for returning a list of players by a team
 *     summary: returns a list of players by Their team id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Array of player documents
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/teams/:id/players', async(req, res) => {
    try {
        Team.findOne({'_id': req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(401).send({
                    'message': `Invalid teamId`
                })

            } else {
                console.log(team);

                if (team) {
                    console.log(team.players);
                    res.json(team.players);
                } else {
                    res.status(501).send({
                        'message': `MongoDB Exception`
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


/**
 * deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - teams
 *     name: deleteTeamById
 *     description: API for deleting a document from MongoDB.
 *     summary: Removes a team document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team document
 *       '401':
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

 router.delete('/teams/:id', async (req, res) => {
    try {

        Team.findByIdAndDelete({'_id': req.params.id}, function(err, team) {
            if (err) {
                console.log(err);
                res.status(401).send({
                    'message': `Invalid teamId`
                })
            } else {
                console.log(team);
                if (team) {
                    console.log(team);
                    res.json(team);
                } else {
                    res.status(501).send({
                        'message': `MongoDB Exception`
                    })
                }
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