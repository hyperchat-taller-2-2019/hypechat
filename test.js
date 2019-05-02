//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('./models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server');
let should = chai.should();

const url= 'http://localhost:5000';


chai.use(chaiHttp);
//Our parent block
describe('SERVER', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  	describe('GET /user', () => {
		it('it should GET all users', (done) => {
			chai.request(url)
			    .get('/user')
			    .end((err, res) => {
			          res.should.have.status(200);
			          res.body.should.be.eql({user: []})
			      done();
			    });
		});
	})

    describe('POST /signUp', () =>{
    	beforeEach((done) => { //Before each test we empty the database
	        let user = new User({
			        "email": 'uniqueUser@gmail.com',
			        "nickname": 'userNickname',
			        "psw": 'userPsw'
			      })
	        user.save()
	        done()
	    });
    	it('sign up user OK', (done)=>{
    		let user = {
			        "email": 'user@gmail.com',
			        "nickname": 'userNickname',
			        "psw": 'userPsw'
			      }
    		chai.request(url)
    			.post('/signUp')
    			.send(user)
    			.end((err, res) => {
    				res.should.have.status(200);
    				res.body.should.be.a('object');
    				res.body.should.have.property('email')
			      	res.body.email.should.be.eql('user@gmail.com')
			      	res.body.should.have.property('psw')
			      	res.body.psw.should.be.eql('userPsw')
			      	res.body.should.have.property('nickname')
			      	res.body.nickname.should.be.eql('userNickname')
    				done();
    			})
    	})

    	it('sign up user OK, without nickname', (done)=>{
    		let user = {
			        "email": 'user2@gmail.com',
			        "psw": 'userPsw'
			      }
    		chai.request(url)
    			.post('/signUp')
    			.send(user)
    			.end((err, res) => {
    				res.should.have.status(200);
    				res.body.should.be.a('object');
			      	res.body.should.have.property('email')
			      	res.body.email.should.be.eql('user2@gmail.com')
			      	res.body.should.have.property('psw')
			      	res.body.psw.should.be.eql('userPsw')
			      	res.body.should.have.property('nickname')
			      	res.body.nickname.should.be.eql("")
    				done();
    			})
    	})

    	it('sign up user with an existent email', (done)=>{
    		let user = {
			        "email": 'uniqueUser@gmail.com',
			        "psw": 'otherUserPsw'
			      }
    		chai.request(url)
    			.post('/signUp')
    			.send(user)
    			.end((err, res) => {
    				res.should.have.status(500);
    				res.body.should.have.property('message')
    				done();
    			})
    	})
    })

    describe('POST /login', () =>{})
    
    describe('GET /profile/:email', () =>{})
    
    describe('PUT /profile', () =>{})
    
    describe('PUT /psw', () =>{})


  });


