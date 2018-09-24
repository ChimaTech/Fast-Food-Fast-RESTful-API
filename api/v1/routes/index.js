import express from 'express'; // Imports the `Express` module
import appController from '../appControllers/app-controls'; // Imports the `App Controls` module


// Create a `route` Handler with express.Router(). This will act like the:
// `app = express()` we have inside `app.js`, but now from the `route`
const router = express.Router();


/*
NOTE: HTTP methods (i.e. the endpoints) section ...begins
*/
// GET: get all users <endpoint: 1>
router.get('/api/v1/users', appController.getAllUsers); // </endpoint: 1>

// POST: post a user to sessionsDB (i.e SIGN IN a User using the email and password) <endpoint: 2>
router.post('/api/v1/sessions', appController.signInUser); // </endpoint: 2>

// POST: post an entry to the dataBase (i.e. SIGN UP a user) <endpoint: 3>
router.post('/api/v1/users', appController.signUpUser); // </endpoint: 3>

// GET: get all All Orders <endpoint: 4>
router.get('/api/v1/orders', appController.getAllOrders); // </endpoint: 4>

// GET: get a single order using the object's ID attribute (i.e the order's ID) <endpoint: 5>
router.get('/api/v1/orders/:id', appController.getOrder); // </endpoint: 5>

// POST: post an entry to the orders dataBase (i.e. place a new order) <endpoint: 6>
router.post('/api/v1/orders', appController.placeOrder); // </endpoint: 6>

// PUT: Update an entry in the dataBase (i.e Update the status of an order) <endpoint: 7>
router.put('/api/v1/orders/:id', appController.updateOrderStatus); // </endpoint: 7>

/* HTTP methods section ...ends */

export default router;
