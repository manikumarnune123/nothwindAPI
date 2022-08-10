module.exports = (app) => {
    const orderss = require('../controllers/orders.controller.js');

    // Create a new Orders
    app.post('/orders', orderss.create);

    // Retrieve all Orders
    app.get('/orders', orderss.findAll);

    // Retrieve a single Orders with ordersId
    app.get('/orders/:ordersId', orderss.findOne);

    // Update a Orders with ordersId
    app.put('/orders/:ordersId', orderss.update);

    // Delete a Orders with ordersId
    app.delete('/orders/:ordersId', orderss.delete);
}