import express from 'express'; // Imports the `Express` module
import usersDB from './db/users-db'; // Imports the dataBase (i.e `db.js`) module
import bodyParser from 'body-parser'; // Imports `Body-Parser` module


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
