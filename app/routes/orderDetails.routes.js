module.exports = (app) => {
    const orderdetailss = require('../controllers/orderdetails.controller.js');

    // Create a new OrderDetails
    app.post('/orderdetails', orderdetailss.create);

    // Retrieve all OrderDetailss
    app.get('/orderdetails', orderdetailss.findAll);

    // Retrieve a single OrderDetails with orderdetailsId
    app.get('/orderdetails/:orderdetailsId', orderdetailss.findOne);

    // Update a OrderDetails with orderdetailsId
    app.put('/orderdetails/:orderdetailsId', orderdetailss.update);

    // Delete a OrderDetails with orderdetailsId
    app.delete('/orderdetails/:orderdetailsId', orderdetailss.delete);
}