
let chai = require('chai');
let chaiHttp = require('chai-http');

const expect = require('chai').expect;
chai.use(chaiHttp);
const url= process.env.URL  || 'http://127.0.0.1:5000';
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


describe('login', ()=> {
    let users;
    it('should return code 200 and user info', (done)=> {
	chai.request(url)
	    .post('/login')
	    .send({email:"test@2.com", contraseña: "test2"})
	    .end( function(err, res){
		expect(res).to.have.status(200);
		console.log((res.body));
		expect(res.body).to.have.property('valido').to.be.equal(1);
		done();
	    });
    });
});

describe('login with unexistent user', ()=> {
    let users;
    it('should return code 200 and "valido: 0"', (done)=> {
	chai.request(url)
	    .post('/login')
	    .set("Content-Type", "application/json")
	    .send({email:"user@not_in_db.com", contraseña: "not present"})
	    .end(function(err,res){
		console.log(res.body);
		expect(res).to.have.status(200);
		expect(res.body).to.have.property('valido').to.be.equal(0);
		done();
	    });
    });
});

