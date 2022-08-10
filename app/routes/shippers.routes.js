module.exports = (app) => {
    const shipperss = require('../controllers/shippers.controller.js');

    // Create a new Shippers
    app.post('/shippers', shipperss.create);

    // Retrieve all Shipperss
    app.get('/shippers', shipperss.findAll);

    // Retrieve a single Shippers with shippersId
    app.get('/shippers/:shippersId', shipperss.findOne);

    // Update a Shippers with shippersId
    app.put('/shippers/:shippersId', shipperss.update);

    // Delete a Shippers with shippersId
    app.delete('/shippers/:shippersId', shipperss.delete);
}