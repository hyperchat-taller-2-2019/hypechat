'use strict'

const express = require('express');
const api = express.Router()
const userControllers = require('../controllers/user')

api.get('/hello/:name',function(req, res){
	res.send({message: `Hello, ${req.params.name}!`});
});

api.post('/signUp', userControllers.signUp )
api.post('/login', userControllers.logIn )
api.get('/user/:userId', userControllers.getUserProfile)
api.put('/user/:userId', userControllers.updateUser )
api.post('/loginFacebook', (req,res) => {res.status(500).send({message: 'not implemented yet'})})

api.delete('/user/:userId', userControllers.deleteUser )
api.post('/user', userControllers.saveUser)
api.get('/user', userControllers.getUsers)
api.get('/profile/:email', userControllers.getUserProfile)
api.put('/profile', userControllers.updateUserProfile )



module.exports = api
