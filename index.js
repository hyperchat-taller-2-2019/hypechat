const path = require('path')
const async = require('async')
const await = require('await')
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
   
    console.log("Example hypechat listening at http://%s:%s", host, port)

})

var fetchUsers = function(err,db){
    let db_hypechat = db.db("hypechat");
    let users = db_hypechat.collection("users");
    return users;
};
var userExists = function(new_user,users){

    users.findOne({"email": new_user.email}, function(err,index){
	if(err) throw err;
	if(index != null){
	    return true;
	}
	return false;
    })

};
var writeUser = function(new_user,res){
    MongoClient.connect(url,(err,db)=>{
	const users = fetchUsers(err,db);
	const alreadySingedUp = userExists(new_user,users);
	console.log(alreadySingedUp);
	if(alreadySingedUp == true){
	    sendResponse(res,400,"{message:usuario ya registrado}");
	}
	else{
	    users.insert(new_user, function(err,item ) {
		if(err){
		    sendResponse(res,400, "{message:Ha ocurrido un error}");
		}
		else{
		    sendResponse(res,200, "todo piola");
		}
		
	    });
	
	}
	db.close();
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
	let users = fetchUsers(err,db);
	users.find({}).toArray(function(err,result) {
	    usersString = "";
	    for (var i of result){
		console.log(i.nombre);
		usersString +=
		    "{" + i.nombre   + "}";
	    }

	    sendResponse(res,200,usersString);
	});
	
    });

});
