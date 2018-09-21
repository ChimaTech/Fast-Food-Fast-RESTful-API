process.env.NODE_ENV = 'test';

import usersDB from '../db/users-db'; // Imports Users dataBase module
import ordersDB from '../db/orders-db'; // Imports orders dataBase module
import sessionsDB from '../db/sessions-db'; // Imports sessions dataBase module
import encodeStr from '../appControllers/encodeStr'; // Imports `encodeStr` function

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let expect = require('chai').expect

chai.use(chaiHttp);

/* Users Main test Suit... START */
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        // Book.remove({}, (err) => {
           done();
        // });
    });


  // Test the /GET route ...<minor test suit>
  describe('/GET "/api/v1/users" request', () => {
      it('should GET all the existing users', (done) => {
        chai.request(server)
            .get('/api/v1/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('true');
                  res.body.should.have.property('message').eql('Users retrieved successfully');
                  res.body.should.have.property('users');
                  res.body.users.should.be.a('array');
                  expect(res.body.users).to.have.lengthOf(1);
                  res.body.users[0].id.should.equal(usersDB[0].id);
                  res.body.users[0].name.should.equal(usersDB[0].name);
                  res.body.users[0].email.should.equal(usersDB[0].email);
                  res.body.users[0].password.should.equal(usersDB[0].password);
              done();
            });
      });
  }); // </minor test suit>


  // Test /POST routes ...<minor test suit>
  describe('/POST "/api/v1/users" request', () => {

      // When nothing is not supplied
      it('should not SIGN UP a new user without a Name, email & password', (done) => {

          let user = {};

        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('false');
                  res.body.should.have.property('message').eql('Name, Email and Password are required');
              done();
            });
      });

      // When only password is supplied
      it('should not SIGN UP a new user without a Name & email', (done) => {
          let user = {
              password: "getAnewPassKey"
          }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('false');
                  res.body.should.have.property('message').eql('Name and Email are required');
              done();
            });
      });

      // When only email and password are supplied
      it('should not SIGN UP a new user without a Name', (done) => {
          let user = {
              email: "chibbyarena@gmail.com",
              password: "getAnewPassKey"
          }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('false');
                  res.body.should.have.property('message').eql('Name is required');
              done();
            });
      });

      // When only name is supplied
      it('should not SIGN UP a new user without an Email & Password', (done) => {
          let user = {
              name: "Ugochukwu Nnemmu"
          }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('false');
                  res.body.should.have.property('message').eql('Email and Password are required');
              done();
            });
      });

      // When only name and email are supplied
      it('should not SIGN UP a new user without a password', (done) => {
          let user = {
              name: "Ugochukwu Nnemmu",
              email: "chibbyarena@gmail.com"
          }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('false');
                  res.body.should.have.property('message').eql('Password is required');
              done();
            });
      });

      // When only name and password are supplied
      it('should not SIGN UP a new user without an email', (done) => {
          let user = {
              name: "Ugochukwu Nnemmu",
              password: "getAnewPassKey"
          }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('false');
                  res.body.should.have.property('message').eql('Email is required');
              done();
            });
      });

      // When only email is supplied
      it('should not SIGN UP a new user without a name & password', (done) => {
          let user = {
              email: "chibbyarena@gmail.com"
          }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('false');
                  res.body.should.have.property('message').eql('Name and Password are required');
              done();
            });
      });

      // When name, email and password are supplied
      it('should SIGN UP and login a new user with a name, email & password', (done) => {
          let user = {
              name: "Ugochukwu Nnemmu",
              email: "chibbyarena@gmail.com",
              password: "getAnewPassKey"
          }
        chai.request(server)
            .post('/api/v1/users')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('true');
                  res.body.should.have.property('message').eql('New user signup is successful');

                  res.body.should.have.property('newUser');
                  res.body.newUser.should.be.a('object');
                  res.body.newUser.id.should.equal( `${encodeStr(user.email.toUpperCase())}${encodeStr(user.password)}` );
                  res.body.newUser.name.should.equal(user.name);
                  res.body.newUser.email.should.equal(user.email);
                  res.body.newUser.password.should.equal(user.password);

                  res.body.should.have.property('newSession');
                  res.body.newSession.should.be.a('object');
                  res.body.newSession.token.should.equal( `${encodeStr(user.email.toUpperCase())}${encodeStr(user.password)}` );
                  res.body.newSession.email.should.equal(user.email);
              done();
            });
      });

}); // </minor test suit>


// Test POST route to sessions ...<minor test suit>
describe('/POST "/api/v1/sessions" request', () => {

  // When nothing is supplied
  it('should not SIGN IN a user without an email & password', (done) => {
      let user = { };

    chai.request(server)
        .post('/api/v1/sessions')
        .send(user)
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('false');
              res.body.should.have.property('message').eql('Email and Password are required');
          done();
        });
  });

  // When only password is supplied
  it('should not SIGN IN a user without an email', (done) => {
      let user = {
          password: "getAnewPassKey"
      }
    chai.request(server)
        .post('/api/v1/sessions')
        .send(user)
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('false');
              res.body.should.have.property('message').eql('Email is required');
          done();
        });
  });


  // When only email is supplied
  it('should not SIGN IN a user without a password', (done) => {
      let user = {
          email: "chibbyarena@gmail.com"
      }
    chai.request(server)
        .post('/api/v1/sessions')
        .send(user)
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('false');
              res.body.should.have.property('message').eql('Password is required');
          done();
        });
  });

  // When email and password are supplied butu user doesn't exist in usersDB
  it('should not SIGN IN a user that does not exist in usersDB', (done) => {
      let userNot = {
          "email": "ken@gmail.com",
          "password": "getAnewPassKey"
      }
    chai.request(server)
        .post('/api/v1/sessions')
        .send(userNot)
        .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('false');
              res.body.should.have.property('message').eql('Incorrect email or password');
          done();
        });
  });

  // When email and password are supplied and user exist in usersDB
  it('should SIGN IN a user that exists with an email & password', (done) => {
      let user = {
          email: "kelejackson_new@yahoo.com",
          password: "kelechi"
      };
    chai.request(server)
        .post('/api/v1/sessions')
        .send(user)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('true');
              res.body.should.have.property('message').eql('New user sign-in is successful');

              res.body.should.have.property('newSession');
              res.body.newSession.should.be.a('object');
              res.body.newSession.token.should.equal( `${encodeStr(user.email.toUpperCase())}${encodeStr(user.password)}` );
              res.body.newSession.email.should.equal(user.email);
          done();
        });
  });

}); // </minor test suit>

}); /* Users Main test Suit... END */

/* orders Main test Suit... START */
describe('Orders', () => {
    beforeEach((done) => { //Before each test we empty the database
        // Book.remove({}, (err) => {
           done();
        // });
    });


  // Test the /GET route ...<minor test suit>
  describe('/GET "/api/v1/orders" request', () => {
      it('should GET all the existing orders', (done) => {
        chai.request(server)
            .get('/api/v1/orders')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('true');
                  res.body.should.have.property('message').eql('All orders retrieved successfully');

                  res.body.should.have.property('orders');
                  res.body.orders.should.be.a('array');
                  expect(res.body.orders).to.have.lengthOf(1);
                  res.body.orders[0].id.should.equal(ordersDB[0].id);

                  res.body.orders[0].foods.should.be.a('array');
                  res.body.orders[0].foods[0].should.be.a('string');

                  res.body.orders[0].total.should.be.a('number');
                  res.body.orders[0].total.should.equal(70);

                  res.body.orders[0].should.have.property('status');
                  res.body.orders[0].status.should.be.a('string');
              done();
            });
      });
  }); // </minor test suit>


  // Test the /GET route ...<minor test suit>
  describe('/GET "/api/v1/orders/:ID" request', () => {

      // When the orderID exists in the ordersDB
      it('should GET the order that is specified by an ID', (done) => {

        let orderID = '2a211v1x181t231t252d1j1c';

        chai.request(server)
            .get('/api/v1/orders/' + orderID)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('true');
                  res.body.should.have.property('message').eql('Order retrieved successfully');

                  res.body.should.have.property('order');
                  res.body.order.should.be.a('object');
                  res.body.order.should.have.property('id');
                  res.body.order.id.should.equal(orderID);

                  res.body.order.should.have.property('foods');
                  res.body.order.foods.should.be.a('array');

                  res.body.order.should.have.property('total');

                  res.body.order.should.have.property('status');
              done();
            });
      });


      // When the orderID does not exist in the ordersDB
      it('cannot GET an order that does not exist in the ordersDB', (done) => {

        let orderID = '2a211v1x181t231t252d1j1cDD';


        chai.request(server)
            .get('/api/v1/orders/' + orderID)
            .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql('false');
                  res.body.should.have.property('message').eql(`An order with the ID ${orderID} does not exist`);
              done();
            });
      });

  }); // </minor test suit>




  // Test /POST routes ...<minor test suit>
  describe('/POST "/api/v1/orders" request', () => {

    // When nothing is supplied
    it('cannot PLACE an order without a foods List and total cost', (done) => {

      let order = {};

      chai.request(server)
          .post('/api/v1/orders/')
          .send(order)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql('false');
                res.body.should.have.property('message').eql(`List of foods; and Total cost are required`);
            done();
          });
    });

    // When only total cost is supplied
    it('cannot PLACE an order without a foods List', (done) => {

      let order = {
        total: 100
      };

      chai.request(server)
          .post('/api/v1/orders/')
          .send(order)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql('false');
                res.body.should.have.property('message').eql(`List of foods are required`);
            done();
          });
    });


    // When only foods List is supplied
    it('cannot PLACE an order without a total cost', (done) => {

      let order = {
        foodsList: "Akamu,Rice"
      };

      chai.request(server)
          .post('/api/v1/orders/')
          .send(order)
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql('false');
                res.body.should.have.property('message').eql(`Total cost of foods is required`);
            done();
          });
    });


    // When foods List & total cost are supplied
    it('should PLACE an order with a foods List & total cost', (done) => {

      let order = {
        foodsList: "Akamu,Rice",
        total: 100
      };

      let orderID = `${encodeStr(order.foodsList.toUpperCase())}${encodeStr(order.total.toString())}`;

      chai.request(server)
          .post('/api/v1/orders/')
          .send(order)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('success').eql('true');
                res.body.should.have.property('message').eql(`New order placement is successful`);
                res.body.should.have.property('newOrder');
                res.body.newOrder.should.have.property('id').eql(orderID);
                res.body.newOrder.should.have.property('total').eql(order.total);
                res.body.newOrder.should.have.property('status').eql('incoming');
            done();
          });
    });


}); // </minor test suit>


// Test POST route to sessions ...<minor test suit>
describe('/PUT "/api/v1/orders/:ID" request', () => {

  // When there's no match for a queried ID in the ordersDB
  it('cannot UPDATE an order that does not exist in the ordersDB', (done) => {

    let orderID = '2a211v1x181t231t252d1j1cDD';

    chai.request(server)
        .put('/api/v1/orders/' + orderID)
        .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('false');
              res.body.should.have.property('message').eql(`Order not found`);
          done();
        });
  });


  // When there's a match for the ID but status is not supplied
  it('cannot UPDATE an order without a status', (done) => {

    let orderID = '2a211v1x181t231t252d1j1c';
    let status = "";

    chai.request(server)
        .put('/api/v1/orders/' + orderID)
        .send(status)
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('false');
              res.body.should.have.property('message').eql(`Status is required`);
          done();
        });
  });


  // When there's a match for the ID status is Invalid
  it('cannot UPDATE an order with an Invalid status', (done) => {

    let orderID = '2a211v1x181t231t252d1j1c';
    let status = {status: "Acceplined"};

    chai.request(server)
        .put('/api/v1/orders/' + orderID)
        .send(status)
        .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('false');
              res.body.should.have.property('message').eql(`Invalid status entered, check the spelling`);
          done();
        });
  });


  // When there's a match for the ID & the status is "accepted"
  it('should UPDATE an order with an "accepted" status', (done) => {

    let orderID = '2a211v1x181t231t252d1j1c';
    let status = {status: "accepted"};

    chai.request(server)
        .put('/api/v1/orders/' + orderID)
        .send(status)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('true');
              res.body.should.have.property('message').eql('Order has been accepted successfully');
              res.body.should.have.property('orderFound');
              res.body.orderFound.should.have.property('id').eql(orderID);
              res.body.orderFound.should.have.property('status').eql(status.status);
              // res.body.newOrder.should.have.property('id').eql(orderID);
              // res.body.newOrder.should.have.property('total').eql(order.total);
              // res.body.newOrder.should.have.property('status').eql('incoming');
          done();
        });
  });


  // When there's a match for the ID & the status is "completed"
  it('should UPDATE an order with a "completed" status', (done) => {

    let orderID = '2a211v1x181t231t252d1j1c';
    let status = {status: "completed"};

    chai.request(server)
        .put('/api/v1/orders/' + orderID)
        .send(status)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('true');
              res.body.should.have.property('message').eql('Order has been completed successfully');
              res.body.should.have.property('orderFound');
              res.body.orderFound.should.have.property('id').eql(orderID);
              res.body.orderFound.should.have.property('status').eql(status.status);
          done();
        });
  });


  // When there's a match for the ID & the status is "declined"
  it('should UPDATE an order with a "declined" status', (done) => {

    let orderID = '2a211v1x181t231t252d1j1c';
    let status = {status: "declined"};

    chai.request(server)
        .put('/api/v1/orders/' + orderID)
        .send(status)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('success').eql('true');
              res.body.should.have.property('message').eql('Order has been declined successfully');
              res.body.should.have.property('orderFound');
              res.body.orderFound.should.have.property('id').eql(orderID);
              res.body.orderFound.should.have.property('status').eql(status.status);
          done();
        });
  });







}); // </minor test suit>



}); /* Orders Main test Suit... END */
