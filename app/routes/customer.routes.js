module.exports = (app) => {
    const customers = require('../controllers/customer.controller.js');

    // Create a new Customer
    app.post('/customers', customers.create);

    // Retrieve all Notes
    app.get('/customers', customers.findAll);

    // Retrieve a single Note with noteId
    app.get('/customers/:customerId', customers.findOne);

    // Update a Note with noteId
    app.put('/customers/:customerId', customers.update);

    // Delete a Note with noteId
    app.delete('/customers/:customerId', customers.delete);
}