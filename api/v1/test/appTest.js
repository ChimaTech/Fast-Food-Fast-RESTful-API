import usersDB from '../db/users-db'; // Imports Users dataBase module
import ordersDB from '../db/orders-db'; // Imports orders dataBase module
import sessionsDB from '../db/sessions-db'; // Imports sessions dataBase module
// import encodeStr from './encodeStr'; // Imports `encodeStr` function

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        // Book.remove({}, (err) => {
           done();
        // });
    });


/*
  * Test the /GET route
  */
  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/v1/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });


});
