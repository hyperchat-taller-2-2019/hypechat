'use strict'

const express = require('express');
const api = express.Router()
const userControllers = require('../controllers/user')

api.get('/hello/:name',function(req, res){
	res.send({message: `Hello, ${req.params.name}!`});
});
api.get('/usuario', userControllers.getUsers)
api.get('/usuario/:userId', userControllers.getUser)
api.post('/usuario', userControllers.saveUser)
api.put('/usuario/:userId', userControllers.updateUser )
api.delete('/usuario/:userId', userControllers.deleteUser )

api.post('/signUp', userControllers.signUp )
api.post('/login', userControllers.logIn )
api.get('/profile/:email', userControllers.getUserPerfil)
api.put('/profile', userControllers.updateUserPerfil )



module.exports = api