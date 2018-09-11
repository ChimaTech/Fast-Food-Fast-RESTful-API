import express from 'express'; // Imports the `Express` module
import usersDB from './db/users-db'; // Imports the Users dataBase (i.e `users-db.js`) module
import bodyParser from 'body-parser'; // Imports `Body-Parser` module
import ordersDB from './db/orders-db'; // Imports the dataBase (i.e `orders-db.js`) module


// Set up the express app
const app = express();


/*
NOTE: MiddleWares section ...begins
*/
// Tell the `app` to `use` the MiddleWares of `bodyParser` -i.e.- Parse incoming requests data
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );


/* MiddleWares section ...ends */


/*
NOTE: HTTP methods (i.e. the endpoints) section ...begins
*/
// GET: get all users <endpoint: 1>
app.get( '/api/v1/users', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Users retrieved successfully',
   users: usersDB
  });
}); // </endpoint: 1>

// GET: get a single user using the object's ID attribute (i.e LOGIN a User using the ID) <endpoint: 2>
app.get('/api/v1/users/:id', (req, res) => {
  const id = parseInt( req.params.id, 10 ); // Converts the the string of the `id` attribute's value to an `integer` of base `10`
  usersDB.map( (user) => {
    if( user.id === id ) {
      return res.status(200).send({
        success: 'true',
        message: 'User retrieved successfully',
        user: user
      });
    }
  });
  return res.status(404).send({
    success: 'false',
    message: `User with the ID ${id} does not exist`
  });
}); // </endpoint: 2>


// POST: post an entry to the dataBase (i.e. SIGN UP a user) <endpoint: 3>
app.post('/api/v1/users', (req, res) => {

  if ( !req.body.name && !req.body.email && !req.body.password ) { // Checks whether Name, email and password are supplied
    return res.status(400).send({
      success: 'false',
      message: 'Name, Email and Password are required',
    });
  }
  else if ( !req.body.name && !req.body.email && req.body.password ) { // Chechs whether Name and email are supplied
    return res.status(400).send({
      success: 'false',
      message: 'Name and Email are required',
    });
  }
  else if ( !req.body.name && req.body.email && req.body.password ) { // Chechs whether Name is supplied
    return res.status(400).send({
      success: 'false',
      message: 'Name is required',
    });
  }
  else if ( req.body.name && req.body.email && req.body.password ) { // What to do when Name, email and password are supplied
    // Declare & Define an `object` variable that will hold the `request` entry when it is successfully submitted
     const newUser = {
       id: usersDB.length + 1, // Sets the entry's ID (i.e the user's ID) in the dataBase
       name: req.body.name,
       email: req.body.email,
       password: req.body.password
     }

     // Push the entry now called ` newUser` into the dataBase
     usersDB.push(newUser);
     return res.status(201).send({ // Return success code: 201 && send the following responses:
       success: 'true',
       message: 'New user signed is successful',
       newUser
     });

  }

}); // </endpoint: 3>

// GET: get all All Orders <endpoint: 4>
app.get( '/api/v1/orders', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'All orders retrieved successfully',
   users: ordersDB
  });
}); // </endpoint: 4>


// GET: get a single order using the object's ID attribute (i.e the order's ID) <endpoint: 5>
app.get('/api/v1/orders/:id', (req, res) => {
  const id = parseInt( req.params.id, 10 ); // Converts the the string of the `id` attribute's value to an `integer` of base `10`

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
}); // </endpoint: 5>


/* HTTP methods section ...ends */


/*
NOTE: Serve Creation section ...begins
*/
const PORT = 5000; // Definse the Port value

// Create a server using port: 5000.
app.listen( PORT, () => {
  console.log(`server running on port ${PORT}`)
});
/* Server Creation section ...ends */
