import express from 'express'; // Imports the `Express` module
import usersDB from './db/users-db'; // Imports the Users dataBase (i.e `users-db.js`) module
import bodyParser from 'body-parser'; // Imports `Body-Parser` module
import ordersDB from './db/orders-db'; // Imports the orders dataBase (i.e `orders-db.js`) module
import sessionsDB from './db/sessions-db'; // Imports the sessions dataBase (i.e `sessions-db.js`) module
import router from './routes/index.js'; // Imports the routes (i.e index.js) inside the routes folder


// Set up the express app
const app = express();


/*
NOTE: MiddleWares section ...begins
*/
// Tell the `app` to `use` the MiddleWares of `bodyParser` -i.e.- Parse incoming requests data
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

// Tell the `app` to `use` the MiddleWares of `router`
app.use(router);

// Set a new method of the String object's prototype, that will encode a sting -- this is mainly to generate tokens and IDs
String.prototype.encodeStr = function(){
    let encoded;
    let i;

    let result = "";

    for (i = 0; i < this.length; i++) {
        encoded = this.charCodeAt(i).toString(36);

        result += encoded;

    }

    return result;
}


/* MiddleWares section ...ends */


/*
NOTE: Serve Creation section ...begins
*/
const PORT = 5000; // Definse the Port value

// Create a server using port: 5000.
app.listen( PORT, () => {
  console.log(`server running on port ${PORT}`)
});
/* Server Creation section ...ends */
