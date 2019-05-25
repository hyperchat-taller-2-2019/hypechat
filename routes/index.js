'use strict'

const express = require('express');
const api = express.Router()
const userControllers = require('../controllers/user')

api.get('/hello/:name',function(req, res){
	res.send({message: `Hello, ${req.params.name}!`});
});
api.get('/user', userControllers.getUsers)
api.get('/user/:userId', userControllers.getUser)
api.post('/user', userControllers.saveUser)
api.put('/user/:userId', userControllers.updateUser2 )
api.delete('/user/:userId', userControllers.deleteUser )

api.post('/signUp', userControllers.signUp )
api.post('/login', userControllers.logIn )
api.get('/profile/:email', userControllers.getUserProfile)
api.put('/profile', userControllers.updateUser )
api.put('/psw', userControllers.updateUser )
api.post('/loginFacebook', (req,res) => {res.status(500).send({message: 'not implemented yet'})})

api.get('/organizations/:userEmail',userControllers.getUserOrganizations)
api.get('/privateMsj',userControllers.getPrivateMsj)
api.get('/idOrganizationValid/:organizationID',userControllers.isOrganizationIDValid)
api.post('/organization',userControllers.createOrganization)
api.post('/userOrganization',userControllers.addUserToOrganization)
api.get('/organization/:token/:organizationID',userControllers.getInfoOrganization)
api.put('/nameOrganization',userControllers.updateNameOrganization)
api.put('/pswOrganization',userControllers.updatePasswordOrganization)



module.exports = api