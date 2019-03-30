const path = require('path')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser')
const http = require('http')
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
const url = "mongodb://127.0.0.1:27017/";
var express = require('express');

var hypechat = express();
hypechat.use(bodyParser.json());
var jsonParser = bodyParser.json()

var server = hypechat.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
    console.log("hypechat listening at http://%s:%s", host, port)

});

var fetchUsers = function(db){
    let db_hypechat = db.db("hypechat");
    let users = db_hypechat.collection("users");
    return users; 
};

var writeUser = function(new_user,res){
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
			console.log(err);
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


var sendResponse = function(res,code,message){
    res.writeHead(code);
    res.write(message);
    res.end();
}
hypechat.post('/registro', function (req, res) {
    let new_user = req.body;
    writeUser(new_user,res);
});

hypechat.get('/users', function(req, res){
    MongoClient.connect(url, function(err, db){
	let users = fetchUsers(db);
	users.find({}).toArray(function(err,result) {
	    usersString = "";
	    for (var i of result){
		console.log(i.nombre);
		usersString +=
		    "{" + i.nombre   + "};";
	    }

	    sendResponse(res,200,usersString);
	});
	
    });

});
