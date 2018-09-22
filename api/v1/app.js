import express from 'express'; // Imports the `Express` module
import bodyParser from 'body-parser'; // Imports `Body-Parser` module
import router from './routes/index'; // Imports the routes (i.e index.js) inside the routes folder


// Set up the express app
const app = express();


/*
NOTE: MiddleWares section ...begins
*/
// Tell the `app` to `use` the MiddleWares of `bodyParser` -i.e.- Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Tell the `app` to `use` the MiddleWares of `router`
app.use(router);


/* MiddleWares section ...ends */


/*
NOTE: Serve Creation section ...begins
*/
const PORT = 5000; // Definse the Port value

// Create a server using port: 5000.
module.exports = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
/* Server Creation section ...ends */

// export default app.listen(PORT); // Exports the `app` ( i.e equal to express() )

// module.exports = app.listen(5000);
