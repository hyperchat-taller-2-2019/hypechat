
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://127.0.0.1:8081';

describe('login', ()=> {
    let users;

    it('should return code 200 and user info', (done)=> {
	chai.request(url)
	    .post('/login')
	    .send({email:"test@1.com", contraseña: "test1"})
	    .end( function(err, res){
		console.log(res.body);
		expect(res).to.have.status(200);
		done();
	    });
    });
})
