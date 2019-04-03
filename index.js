const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const http = require('http')
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
//const url = "mongodb://127.0.0.1:27017/";
const url = process.env.URL 
var express = require('express');

var server = (db_name)=>{
    var hypechat = express();
    hypechat.use(bodyParser.json());
    var jsonParser = bodyParser.json()

    hypechat.listen(8081);
    
    var fetchUsers = function(db){
	let db_hypechat = db.db(db_name);
	let users = db_hypechat.collection("users");
	return users; 
    };

    var registerUser = function(new_user,res){
	MongoClient.connect(url,(err,db)=>{
	    if (err) throw err
	    var users = fetchUsers(db);
	    users.findOne({"email": new_user.email},(err,index)=>{
		if(err) throw err;
		if(index){
		    sendResponse(res,200,"{resultado: 0}");
		}
		else{
		    users.insertOne(new_user, function(err,item ){
			if(err){

			    sendResponse(res,400, "{message:Ha ocurrido un error}");
			}
			else{
			    sendResponse(res,200, "{resultado: 1}");
			}
		    })
		}
	    });
	});
    };


    var getUser = function(new_user,users){
	users.findOne({"email": new_user.email},(err,index)=>{
	    if(err) throw err;
	    return index;
	})
    }
    
    hypechat.post('/login', function(req, res){
	let new_user = req.body;

	MongoClient.connect(url,(err,db)=>{
	    if (err) throw err
	    
	    var users = fetchUsers(db);
	    users.findOne({"email": new_user.email, "contraseña": new_user.contraseña},(err,index)=>{
		if(err) throw err;

		if(index){
		    responseMsg = "{  valido: 1, token: 0000000,  nombre:"+ index.nombre + ",  apodo:" + index.apodo +",  email:"+ index.email +"}";
		    sendResponse(res,200,responseMsg);

		}
		else{
		    responseMsg = "{  valido: 0, token:,  nombre:,  apodo:,  email:}";
		    sendResponse(res,200,responseMsg);
		}

	    });
	});

    });
    

    var sendResponse = function(res,code,message){
	res.writeHead(code);
	res.write(message);
	res.end();
    }

    hypechat.post('/registro', function (req, res) {
	let new_user = req.body;
	registerUser(new_user,res);
    });

    hypechat.get('/users', function(req, res){
	MongoClient.connect(url, function(err, db){
	    let users = fetchUsers(db);
	    users.find({}).toArray(function(err,result) {
		usersString = "";
		for (var i of result){

		    usersString +=
			"{" + i.nombre +
			"," + i.apodo + ","
		    "," + i.email
			+ ","
		    "};";
		}

		sendResponse(res,200,usersString);
	    });
	    
	});

    });
};
server("hypechat");
