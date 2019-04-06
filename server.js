'use strict'

const mongoose = require('mongoose');
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, function(err, res) {
	if(err) {
		return console.log(`Error al conectar a la base de datos: ${err}`)
	}
	console.log('Se conecto a la base de datos');

	app.listen(config.port, () =>{
		console.log(`Servidor Express escuchando en el puerto: ${config.port}`)
	})
});

