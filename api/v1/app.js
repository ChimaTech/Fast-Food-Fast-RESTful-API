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

// GET: get a single user using the object's ID attribute <endpoint: 2>
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
    message: `todo with the title ${title} does not exist`
  });
}); // </endpoint: 2>

// POST: post an entry to the dataBase (i.e. the `todos`) <endpoint: 3>
app.post('/api/v1/users', (req, res) => {
  if(!req.body.title) { // Checks if the `request` entry has a `title`
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if(!req.body.description) { // Checks if the `request` extry has a `description`
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }

// Declare & Define an `object` variable that will hold the `request` entry when it is successfully submitted
 const todo = {
   id: usersDB.length + 1, // Sets the entry's ID in the dataBase
   title: req.body.title, // Sets the entry's TITLE in the dataBase
   description: req.body.description // Sets the entry's DESCRIPTION in the dataBase
 }

 // Push the entry now called `todo` into the dataBase
 usersDB.push(todo);
 return res.status(201).send({ // Return success code: 201 && send the following responses:
   success: 'true',
   message: 'todo added successfully',
   todo
 });
}); // </endpoint: 3>


// DELETE: Delete an entry from todo dataBase <endpoint: 4>
app.delete('/api/v1/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // Converts the the string of the `id` attribute's value to an `integer` of base `10`

  usersDB.map( (todo, index) => {
    if (todo.id === id) {
       usersDB.splice(index, 1); // Delete the matched entry from the dataBase
       return res.status(200).send({ // Send a success message to the browser
         success: 'true',
         message: 'Todo deleted successfuly',
       });
    }
  });

    return res.status(404).send({ // Send Failed message to the browser
      success: 'false',
      message: 'todo not found',
    });

}); // </endpoint: 4>

//PUT: Update an entry in the dataBase <endpoint: 5>
app.put('/api/v1/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let todoFound;
  let itemIndex;

  // Iterate through the array of `objects` to find the one with matched ID attribute
  usersDB.map((todo, index) => {
    if (todo.id === id) {
      todoFound = todo;
      itemIndex = index;
    }
  });

  if (!todoFound) { // What to do if todo entry is not found
    return res.status(404).send({ // Sends fail message
      success: 'false',
      message: 'todo not found',
    });
  }

  if (!req.body.title) { // What to the if the request body does not have a `title` attribute
    return res.status(400).send({
      success: 'false',
      message: 'title is required',
    });
  } else if (!req.body.description) { // What to do, if the request body does not have a `description` attribute
    return res.status(400).send({
      success: 'false',
      message: 'description is required',
    });
  }

  // Declare && define a variable to contain the updated entry
  const updatedTodo = {
    id: todoFound.id,
    title: req.body.title || todoFound.title,
    description: req.body.description || todoFound.description,
  };

  usersDB.splice( itemIndex, 1, updatedTodo );

  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    updatedTodo,
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
