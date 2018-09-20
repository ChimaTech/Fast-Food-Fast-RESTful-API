import usersDB from '../db/users-db'; // Imports Users dataBase module
import ordersDB from '../db/orders-db'; // Imports orders dataBase module
import sessionsDB from '../db/sessions-db'; // Imports sessions dataBase module
import encodeStr from './encodeStr'; // Imports `encodeStr` function


/*
NOTE: A Main Class of the App Controls ... BEGINS
*/
class AppController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  // HTTP methods (i.e. the endpoints) section ...begins


  // GET: get all users <endpoint: 1>
  getAllUsers(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Users retrieved successfully',
      users: usersDB,
    });
  } // </endpoint: 1>

  // POST: SIGN IN a User using the email and password <endpoint: 2>
  signInUser(req, res) {
    if (!req.body.email && !req.body.password) { // Checks whether email & password are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Email and Password are required',
      });
    }
    if (!req.body.email && req.body.password) { // Chechs whether an email is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Email is required',
      });
    }
    if (req.body.email && !req.body.password) { // Chechs whether password is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Password is required',
      });
    }
    if (req.body.email && req.body.password) { // What to do when email and password are supplied
      const userID = `${encodeStr(req.body.email.toUpperCase())}${encodeStr(req.body.password)}`;

      usersDB.map((user) => {
        if (user.id === userID) {
          // Declare && Define an `object` variable to hold the session's entry in the sessionsDB
          const newSession = {
            token: `${encodeStr(req.body.email.toUpperCase())}${encodeStr(req.body.password)}`, // Set a token for the new User
            email: req.body.email,
          };

          sessionsDB.push(newSession); // Push the new session entry now called ` newSession` into the dataBase

          return res.status(201).send({ // Return success code: 201 && send the following responses:
            success: 'true',
            message: 'New user sign-in is successful',
            newSession,
          });
        }
      });

      return res.status(401).send({
        success: 'false',
        message: 'Incorrect email or password',
      });
    }
  } // </endpoint: 2>


  // POST: post an entry to the dataBase (i.e. SIGN UP a user) <endpoint: 3>
  signUpUser(req, res) {
    if (!req.body.name && !req.body.email && !req.body.password) { // Checks whether Name, email and password are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Name, Email and Password are required',
      });
    }
    if (!req.body.name && !req.body.email && req.body.password) { // Chechs whether Name and email are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Name and Email are required',
      });
    }
    if (!req.body.name && req.body.email && req.body.password) { // Chechs whether Name is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Name is required',
      });
    }
    if (req.body.name && !req.body.email && !req.body.password) { // Chechs whether Email and Password are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Email and Password are required',
      });
    }
    if (req.body.name && req.body.email && !req.body.password) { // Chechs whether Password is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Password is required',
      });
    }
    if (req.body.name && !req.body.email && req.body.password) { // Chechs whether Email is supplied
      return res.status(400).send({
        success: 'false',
        message: 'Email is required',
      });
    }
    if (!req.body.name && req.body.email && !req.body.password) { // Chechs whether Name and Password are supplied
      return res.status(400).send({
        success: 'false',
        message: 'Name and Password are required',
      });
    }
    if (req.body.name && req.body.email && req.body.password) { // What to do when Name, email and password are supplied
      // Declare & Define an `object` variable that will hold the `request` entry when it is successfully submitted
      const newUser = {
        id: `${encodeStr(req.body.email.toUpperCase())}${encodeStr(req.body.password)}`, // Sets the entry's ID (i.e the user's ID) in the dataBase
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      // Declare && Define an `object` variable to hold the session's entry in the sessionsDB
      const newSession = {
        token: `${encodeStr(req.body.email.toUpperCase())}${encodeStr(req.body.password)}`, // Set a token for the new User
        email: req.body.email,
      };


      usersDB.push(newUser); // Push the new user entry now called ` newUser` into the dataBase
      sessionsDB.push(newSession); // Push the new session entry now called ` newSession` into the dataBase

      return res.status(201).send({ // Return success code: 201 && send the following responses:
        success: 'true',
        message: 'New user signup is successful',
        newUser,
        newSession,
      });
    }
  } // </endpoint: 3>

  // GET: get all All Orders <endpoint: 4>
  getAllOrders(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'All orders retrieved successfully',
      users: ordersDB,
    });
  } // </endpoint: 4>


  // GET: get a single order using the object's ID attribute (i.e the order's ID) <endpoint: 5>
  getOrder(req, res) {
    // Search for the order using the supplied ID
    ordersDB.map((order) => {
      if (order.id === req.params.id) {
        return res.status(200).send({
          success: 'true',
          message: 'Order retrieved successfully',
          order,
        });
      }
    });
    return res.status(404).send({
      success: 'false',
      message: `An order with the ID ${req.params.id} does not exist`,
    });
  } // </endpoint: 5>


  // POST: post an entry to the orders dataBase (i.e. place a new order) <endpoint: 6>
  placeOrder(req, res) {
    if (!req.body.foodsArray && !req.body.total) { // Checks whether List of foods; and Total cost are supplied
      return res.status(400).send({
        success: 'false',
        message: 'List of foods; and Total cost are required',
      });
    }
    if (!req.body.foodsArray && req.body.total) { // Chechs whether List of foods are supplied
      return res.status(400).send({
        success: 'false',
        message: 'List of foods are required',
      });
    }
    if (req.body.foodsArray && !req.body.total) { // Chechs whether total cost supplied
      return res.status(400).send({
        success: 'false',
        message: 'Total cost of foods is required',
      });
    }
    if (req.body.foodsArray && req.body.total) { // List of foods; and Total cost are supplied
      const foodsList = req.body.foodsArray;

      const foodsArray = foodsList.split(',');

      // Declare & Define an order `object` variable that will hold the `request` entry when it is successfully submitted
      const newOrder = {
        id: `${encodeStr(foodsList.toUpperCase())}${encodeStr(req.body.total.toString())}`, // Sets the entry's ID (i.e the order's ID) in the dataBase
        foods: foodsArray,
        total: Number(req.body.total),
        status: 'incoming',
      };

      // Push the entry now called ` newOrder` into the dataBase
      ordersDB.push(newOrder);
      return res.status(201).send({ // Return success code: 201 && send the following responses:
        success: 'true',
        message: 'New order placement is successful',
        newOrder,
      });
    }
  } // </endpoint: 6>


  // PUT: Update an entry in the dataBase (i.e Update the status of an order) <endpoint: 7>
  updateOrderStatus(req, res) {
    let orderFound;

    // Iterate through the array of `objects` to find the one with matched ID attribute
    ordersDB.map((order) => {
      if (order.id === req.params.id) { // When a match is found for the order ID
        orderFound = order;

        if (!req.body.status) { // What to do if the request body does not have a status attribute
          return res.status(400).send({
            success: 'false',
            message: 'Status is required',
          });
        }
        if (req.body.status) { // What to do when the request body has a status attribute
          const status = req.body.status;
          const statusValue = status.toLowerCase();

          // Ensure that the valid status is entered in the request
          if (statusValue === 'accepted' || statusValue === 'completed' || statusValue === 'declined') {
            orderFound.status = statusValue;

            return res.status(201).send({ // HTTP status code ~201~ is used instead of ~204~ because the updated order is to be dispalyed to the user
              success: 'true',
              message: 'Order Status Updated successfully',
              orderFound,
            });
          }

          return res.status(400).send({
            success: 'false',
            message: 'Invalid status entered, check the spelling',
          });
        }
      }
    });

    if (!orderFound) { // What to do if order's entry is not found
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
