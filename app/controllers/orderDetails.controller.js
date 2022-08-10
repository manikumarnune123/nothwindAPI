const OrderDetails = require('../models/orderdetails.model.js');

// Create and Save a new OrderDetails
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.OrdID) {
        return res.status(400).send({
            message: "OrdID can not be empty"
        });
    }

    // Create a OrderDetails
    const orderdetails = new OrderDetails({
        OrdID: req.body.OrdID,
        ProdID: req.body.ProdID,
        UnitPrice: req.body.UnitPrice,
        Quantity: req.body.Quantity,
        Discount: req.body.Discount
    });

    // Save OrderDetails in the database
    orderdetails.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the OrderDetails."
        });
    });
};

// Retrieve and return all orderdetailss from the database.
exports.findAll = (req, res) => {
    OrderDetails.find()
    .then(orderdetailss => {
        res.send(orderdetailss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orderdetailss."
        });
    });
};

// Find a single orderdetails with a orderdetailsId
exports.findOne = (req, res) => {
    OrderDetails.findById(req.params.orderdetailsId)
    .then(orderdetails => {
        if(!orderdetails) {
            return res.status(404).send({
                message: "OrderDetails not found with id " + req.params.orderdetailsId
            });            
        }
        res.send(orderdetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "OrderDetails not found with id " + req.params.orderdetailsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving orderdetails with id " + req.params.orderdetailsId
        });
    });
};

// Update a orderdetails identified by the orderdetailsId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.OrdID) {
        return res.status(400).send({
            message: "OrdID can not be empty"
        });
    }

    // Find orderdetails and update it with the request body
    OrderDetails.findByIdAndUpdate(req.params.orderdetailsId, {
        OrdID: req.body.OrdID,
        ProdID: req.body.ProdID,
        UnitPrice: req.body.UnitPrice,
        Quantity: req.body.Quantity,
        Discount: req.body.Discount
    }, {new: true})
    .then(orderdetails => {
        if(!orderdetails) {
            return res.status(404).send({
                message: "OrderDetails not found with id " + req.params.orderdetailsId
            });
        }
        res.send(orderdetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "OrderDetails not found with id " + req.params.orderdetailsId
            });                
        }
        return res.status(500).send({
            message: "Error updating orderdetails with id " + req.params.orderdetailsId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    OrderDetails.findByIdAndRemove(req.params.orderdetailsId)
    .then(orderdetails => {
        if(!orderdetails) {
            return res.status(404).send({
                message: "OrderDetails not found with id " + req.params.orderdetailsId
            });
        }
        res.send({message: "OrderDetails deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "OrderDetails not found with id " + req.params.orderdetailsId
            });                
        }
        return res.status(500).send({
            message: "Could not delete orderdetails with id " + req.params.orderdetailsId
        });
    });
};