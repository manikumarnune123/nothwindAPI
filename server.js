const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Simple Web Api. /notes and /customers are existing api endpoints"});
});

require('./app/routes/customer.routes.js')(app);
require('./app/routes/note.routes.js')(app);
require('./app/routes/region.routes.js')(app);
require('./app/routes/territories.routes.js')(app);
require('./app/routes/employee.routes.js')(app);
require('./app/routes/employeeTerritories.routes.js')(app);
require('./app/routes/orders.routes.js')(app);
require('./app/routes/shippers.routes.js')(app);
require('./app/routes/categories.routes.js')(app);
require('./app/routes/orderDetails.routes.js')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/supplier.routes.js')(app);


// listen for requests
app.listen(80, () => {
    console.log("Server is listening on portw 80");
});