const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http')
var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

var handleLogin = function(req,res){
    res.write('login\n');
};


http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    switch(req.url) {
    case '/login':
	handleLogin(req,res);
	break;
    case '/':
	res.write('home');
	break;
    default:
	res.write('default');
    } 

    res.end();

}).listen(PORT)

