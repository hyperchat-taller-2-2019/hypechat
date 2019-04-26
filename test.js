let chai = require('chai');
let chaiHttp = require('chai-http');

const expect = require('chai').expect;
chai.use(chaiHttp)
const url= 'http://localhost:5000';
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var should = require('should');
var assert = require('assert');

const User = require('./models/usuario');
const userControllers = require('./controllers/usuario')

var sinon = require('sinon');

describe("User validations", function(){
	
	describe('User creation', function(){
		
		it('should be an object', function(){
			let user = new User({
				email: 'user@gmail.com',
				name: 'userName',
				psw: 'psw'
			})
			assert(user!= undefined);
		});

		it('should have a property "email" with value user@gmail.com', function(){
			let user = new User({
				email: 'user@gmail.com',
				name: 'userName',
				psw: 'psw'
			})
			user.should.have.property("email").eql('user@gmail.com');
		});

		it('should have a property "psw" with value "userPsw"', function(){
			let user = new User({
				email: 'user@gmail.com',
				name: 'userName',
				psw: 'userPsw'
			})
			user.should.have.property("psw").eql('userPsw');
		});

	})
})

describe('User Controllers Validations', function (){
	describe('signUp user', function(){
		//HAY QUE USAR SINON
/*

		it('user signs up OK', function(){
			let res = {"status":0};
			let req = {"body": {
			"email": 'user@gmail.com',
			"name": 'userName',
			"psw": 'userPsw'
			}}
			userControllers.signUp(req, res)
			let user2 = User.findOne({email: 'user@gmail.com', psw: 'userPsw'}, (err, user) =>{
        		assert(user!= undefined);
        	})
        	//console.log(err)
		})

		afterEach(function () { //esto se ejecuta despues de cada it
        	User.findOne({email: 'user2@gmail.com', psw: 'userPsw'}, (err, user) =>{
        		assert(user!= undefined);
        		console.log('hola1')
        	})
    	});

		it('user signs up with an alredy existent name and password', function (){
			let res = {"status":0};
			let req = {"body": {
			"email": 'user2@gmail.com',
			"name": 'userName',
			"psw": 'userPsw'
			}}
			userControllers.signUp(req, res);
		})*/
	});
})


describe('SERVER Validations', function(){
	let server = require('./server');

	describe('POST /registro', function(){
		it('Correct sing up', function(done){
			chai.request(url)
			.post('./registro')
			.send({
				"email": 'user2@gmail.com',
				"name": 'userName',
				"psw": 'userPsw'
			})
			.end((err, res) => {
				console.log(err)
				console.log(res)
				assert(err != undefined);
				//res.status.should.be.eql(200);
				done();
			})
		})
	})

	describe('login', ()=> {
    let users;
    it('should return code 200 and user info', (done)=> {
	chai.request(url)
	    .post('/login')
	    .send({email:"user2@gmail.com", psw: "userPsw"})
	    .end( function(err, res){
		expect(res).to.have.status(200);
		console.log((res.body));
		expect(res.body).to.have.property('valido').to.be.equal(1);
		done();
	    });
    });
});
})

