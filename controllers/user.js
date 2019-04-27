'use strict'

const mongoose = require('mongoose');
const service = require('../services')
const User = require('../models/user');

function getUser (req, res){
	let userId = req.params.userId

	User.findById(userId, (err, usuario)=>{
		if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
		if (!usuario) return res.status(404).send({message: 'El usuario no existe'})
		res.status(200).send({usuario: usuario})
	})
}

function getUsers (req,res){
	User.find({},(err, usuarios) =>{
		if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
		if(!usuarios) return res.status(404).send({message:'No existen usuario'})
	res.status(200).send({usuario: usuarios})
	})
}

function saveUser (req, res){
	console.log('POST /api/usuario')
	console.log(req.body)
	
	let usuario = new User()
	usuario.name = req.body.name
	usuario.psw = req.body.psw
	usuario.email = req.body.email
	usuario.photo = req.body.photo

	usuario.save((err,usuarioStored) =>{
		if(err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err}`});
		res.status(200).send({usuario: usuarioStored});
	})
}

function updateUser (req, res){
	let usuarioId = req.params.userId
	let update = req.body

	User.findByIdAndUpdate(usuarioId, update, (err,usuarioUpdated)=>{
		if(err) res.status(500).send({message:`Error al actualizar el usuario: ${err}`})

		res.status(200).send({usuario: usuarioUpdated})
	})
}

function deleteUser (req, res){
	let usuarioId = req.params.userId

	User.findById(usuarioId, (err, usuario)=>{
		if(err) return res.status(500).send({message:`Error al borrar el usuario: ${err}`})

		usuario.remove(err =>{
			if(err) return res.status(500).send({message:`Error al borrar el usuario: ${err}`})
			res.status(200).send({message:'El usuario ha sido eliminado'})
		})
	})
}


function signUp(req,res){
    const user = new User({
		email: req.body.email,
		name: req.body.name,
		psw: req.body.psw,
		photo : req.body.photo
	})

    user.save((err)=>{
	if(err) return res.status(500).send({message: `Error al crear el usuario: ${err}`})
	//res.status(200).send({token: service.createToken(user)})
	res.status(200).send(
	    { name: user.name,
	      nickname: user.nickname,
	      email: user.email,
	      photo: user.photo
	    })
    })
}

function logIn (req, res) {
	User.findOne({ email: req.body.email, psw: req.body.psw }, (err, user) => {
		if (err) return res.status(500).send({ message: `Error al ingresar mail: ${err}` })
		if (!user) return res.status(404).send(
			{ message: `El mail o la contraseña son invalidos`})
		
		let usuarioId = user._id
		let newToken = service.createToken(user)
		let update = {token: newToken}

		User.findByIdAndUpdate(usuarioId, update, (err,usuarioUpdated)=>{
			if(err) res.status(500).send({message:`Error al guardar el token del usuario: ${err}`})
		})
		return res.status(200).send({ 
			token: newToken,
			name: user.name,
			nickname: user.nickname,
			email: user.email })
	});
}

function getUserProfile(req, res) {
	User.findOne({email: req.params.email}, (err, user) =>{
		if(err) return res.status(500).send({message: `Error al buscar informacion del usuario: ${err}`})
		if(!user) return res.status(400).send({message: 'El usuario solicitado no existe'})

		return res.status(200).send({ name: user.name,
			nickname: user.nickname,
			email: user.email,
			photo: user.photo
		})
	})
}

function updateUserProfile(req, res){
	let userToken = req.body.token
	let update = req.body
	User.update({token: userToken}, update, (err,userUpdated)=>{
		if(err) res.status(500).send({message:`Error al actualizar el perfil del usuario: ${err}`})

		res.status(200).send({message: 'El perfil se modificó correctamente'})
	})
}

module.exports={
	getUser,
	getUsers,
	saveUser,
	updateUser,
	deleteUser,
	signUp,
	logIn,
	getUserProfile,
	updateUserProfile
}
