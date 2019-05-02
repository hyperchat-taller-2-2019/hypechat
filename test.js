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
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => { 
           done();           
        });        
    });
/*
  * Test the /GET route
  */
  describe('/GET user', () => {
      it('it should GET all the books', (done) => {
        chai.request(url)
            .get('/user')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.eql({user: []})
              done();
            });
      });
  });

});