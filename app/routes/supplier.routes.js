module.exports = (app) => {
    const suppliers = require('../controllers/supplier.controller.js');

    // Create a new Supplier
    app.post('/suppliers', suppliers.create);

    // Retrieve all Suppliers
    app.get('/suppliers', suppliers.findAll);

    // Retrieve a single Supplier with supplierId
    app.get('/suppliers/:supplierId', suppliers.findOne);

    // Update a Supplier with supplierId
    app.put('/suppliers/:supplierId', suppliers.update);

    // Delete a Supplier with supplierId
    app.delete('/suppliers/:supplierId', suppliers.delete);
}