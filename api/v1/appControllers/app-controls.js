import express from 'express'; // Imports the `Express` module
import usersDB from '../db/users-db'; // Imports the Users dataBase (i.e `users-db.js`) module
import ordersDB from '../db/orders-db'; // Imports the orders dataBase (i.e `orders-db.js`) module
import sessionsDB from '../db/sessions-db'; // Imports the sessions dataBase (i.e `sessions-db.js`) module

/*
NOTE: A Main Class of the App Controls ... BEGINS
*/
class AppController {

  // HTTP methods (i.e. the endpoints) section ...begins

  // GET: get all users <endpoint: 1>
  getAllUsers(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'Users retrieved successfully',
     users: usersDB
    });
  } // </endpoint: 1>

  // POST: post a single user to the sessionsDB (i.e SIGN IN a User using the email and password) <endpoint: 2>
  signInUser(req, res) {

    if ( !req.body.email && !req.body.password ) { // Checks whether email and password are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Email and Password are required'
      });
    }
    else if ( !req.body.email && req.body.password ) { // Chechs whether an email is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Email is required'
      });
    }
    else if ( req.body.email && !req.body.password ) { // Chechs whether password is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Password is required'
      });
    }
    else if ( req.body.email && req.body.password ) { // What to do when email and password are supplied

      let userID = `${req.body.email.toUpperCase().encodeStr()}${req.body.password.encodeStr()}`;

      usersDB.map( (user) => {

        if ( user.id === userID ) {
          // Declare && Define an `object` variable to hold the session's entry in the sessionsDB
          let newSession = {
              token: `${req.body.email.toUpperCase().encodeStr()}${req.body.password.encodeStr()}`, // Set a token for the new User
              email: req.body.email
            };

            sessionsDB.push(newSession); // Push the new session entry now called ` newSession` into the dataBase

            return res.status(201).send({ // Return success code: 201 && send the following responses:
              success: 'true',
              message: 'New user sign-in is successful',
              newSession
            });

        }
      });

      return res.status(401).send({
        success: 'false',
        message: 'Incorrect email or password'
      });

    }

  } // </endpoint: 2>


  // POST: post an entry to the dataBase (i.e. SIGN UP a user) <endpoint: 3>
  signUpUser(req, res) {

    if ( !req.body.name && !req.body.email && !req.body.password ) { // Checks whether Name, email and password are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Name, Email and Password are required'
      });
    }
    else if ( !req.body.name && !req.body.email && req.body.password ) { // Chechs whether Name and email are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Name and Email are required'
      });
    }
    else if ( !req.body.name && req.body.email && req.body.password ) { // Chechs whether Name is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Name is required'
      });
    }
    else if ( req.body.name && !req.body.email && !req.body.password ) { // Chechs whether Email and Password are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Email and Password are required'
      });
    }
    else if ( req.body.name && req.body.email && !req.body.password ) { // Chechs whether Password is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Password is required'
      });
    }
    else if ( req.body.name && !req.body.email && req.body.password ) { // Chechs whether Email is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Email is required'
      });
    }
    else if ( !req.body.name && req.body.email && !req.body.password ) { // Chechs whether Name and Password are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Name and Password are required'
      });
    }
    else if ( req.body.name && req.body.email && req.body.password ) { // What to do when Name, email and password are supplied
      // Declare & Define an `object` variable that will hold the `request` entry when it is successfully submitted
       const newUser = {
         id: `${req.body.email.toUpperCase().encodeStr()}${req.body.password.encodeStr()}`, // Sets the entry's ID (i.e the user's ID) in the dataBase
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
       };

       // Declare && Define an `object` variable to hold the session's entry in the sessionsDB
       let newSession = {
           token: `${req.body.email.toUpperCase().encodeStr()}${req.body.password.encodeStr()}`, // Set a token for the new User
           email: req.body.email
         };


       usersDB.push(newUser); // Push the new user entry now called ` newUser` into the dataBase
       sessionsDB.push(newSession); // Push the new session entry now called ` newSession` into the dataBase

       return res.status(201).send({ // Return success code: 201 && send the following responses:
         success: 'true',
         message: 'New user signup is successful',
         newUser,
         newSession
       });

    }

  } // </endpoint: 3>

  // GET: get all All Orders <endpoint: 4>
  getAllOrders(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'All orders retrieved successfully',
     users: ordersDB
    });
  } // </endpoint: 4>


  // GET: get a single order using the object's ID attribute (i.e the order's ID) <endpoint: 5>
  getOrder(req, res) {
    // let id = parseInt(req.params.id, 10); // Converts the the string of the `id` attribute's value to an `integer` of base `10`
    let id = req.params.id;

    //Search for the order using the supplied ID
    ordersDB.map( (order) => {
      if( order.id === id ) {
        return res.status(200).send({
          success: 'true',
          message: 'Order retrieved successfully',
          order: order
        });
      }
    });
    return res.status(404).send({
      success: 'false',
      message: `An order with the ID ${id} does not exist`
    });
  } // </endpoint: 5>


  // POST: post an entry to the orders dataBase (i.e. place a new order) <endpoint: 6>
  placeOrder(req, res) {

    if ( !req.body.foodsArray && !req.body.total ) { // Checks whether List of foods; and Total cost are supplied
      return res.status(400).send({
        success: 'false',
        message: 'List of foods; and Total cost are required'
      });
    }
    else if ( !req.body.foodsArray && req.body.total ) { // Chechs whether List of foods are supplied
      return res.status(400).send({
        success: 'false',
        message: 'List of foods are required'
      });
    }
    else if ( req.body.foodsArray && !req.body.total ) { // Chechs whether total cost supplied
      return res.status(400).send({
        success: 'false',
        message: 'Total cost of foods is required'
      });
    }
    else if ( req.body.foodsArray && req.body.total ) { // List of foods; and Total cost are supplied

      const foodsList = req.body.foodsArray;

      const foodsArray = foodsList.split(',');

      // Declare & Define an order `object` variable that will hold the `request` entry when it is successfully submitted
       const newOrder = {
         id: `${foodsList.toUpperCase().encodeStr()}${req.body.total.toString().encodeStr()}`, // Sets the entry's ID (i.e the order's ID) in the dataBase
         foods: foodsArray,
         total: Number(req.body.total),
         status: "incoming"
       }

       // Push the entry now called ` newOrder` into the dataBase
       ordersDB.push(newOrder);
       return res.status(201).send({ // Return success code: 201 && send the following responses:
         success: 'true',
         message: 'New order placement is successful',
         newOrder
       });

    }

  } // </endpoint: 6>


  //PUT: Update an entry in the dataBase (i.e Update the status of an order) <endpoint: 7>
  updateOrderStatus(req, res) {
    // let id = parseInt(req.params.id, 10);
    let id = req.params.id;
    let orderFound;
    let orderFoundIndex;

    // Iterate through the array of `objects` to find the one with matched ID attribute
    ordersDB.map( (order, index) => {
      if (order.id === id) { // When a match is found for the order ID
        orderFound = order;
        orderFoundIndex = index;

        if ( !req.body.status ) { // What to do if the request body does not have a status attribute
          return res.status(400).send({
            success: 'false',
            message: 'Status is required',
          });
        }
        else if ( req.body.status ) { // What to do when the request body has a status attribute

          const status = req.body.status;
          const statusValue = status.toLowerCase();

          // Ensure that the valid status is entered in the request
           if ( statusValue === "accepted" || statusValue === "completed" || statusValue === "declined" ) {
            orderFound.status = statusValue;

            return res.status(201).send({ // HTTP status code ~201~ is used instead of ~204~ because the updated order is to be dispalyed to the user
              success: 'true',
              message: 'Order Status Updated successfully',
              orderFound
            });
          }
          else {
            return res.status(400).send({
              success: 'false',
              message: 'Invalid status entered, check the spelling',
            });
          }

        }

      }

    });

    if (!orderFound) { // What to do if todo entry is not found
      return res.status(404).send({ // Sends fail message
        success: 'false',
        message: 'Order not found',
      });
    }

  } // </endpoint: 7>

  // HTTP methods section ...ends

}
/* A Main Class of the App Controls ... ENDS */


// Create an Instance of the AppController class and export that new Instance
const appController = new AppController();
export default appController;
