'use strict'

const express = require('express');
const api = express.Router()
const userControllers = require('../controllers/usuario')

api.get('/hola/:name',function(req, res){
	res.send({message: `Hola, ${req.params.name}!`});
});
api.get('/usuario', userControllers.getUsers)
api.get('/usuario/:userId', userControllers.getUser)
api.get('/consultarPerfil/:email', userControllers.getUserPerfil)
api.post('/usuario', userControllers.saveUser)
api.put('/usuario/:userId', userControllers.updateUser )
api.delete('/usuario/:userId', userControllers.deleteUser )
api.post('/signup', userControllers.signUp )
api.post('/login', userControllers.logIn )


module.exports = api