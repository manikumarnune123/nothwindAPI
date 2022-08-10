const Orders = require('../models/orders.model.js');

// Create and Save a new Orders
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.EmpID) {
        return res.status(400).send({
            message: "EmpID can not be empty"
        });
    }

    // Create a Orders
    const orders = new Orders({
        OrdID: req.body.OrdID,
        CustomID: req.body.CustomID,
        EmpID: req.body.EmpID,
        OrderDate: req.body.OrderDate,
        RequiredDate: req.body.RequiredDate,
        ShippedDate: req.body.ShippedDate,
        ShipVia: req.body.ShipVia,
        Freight: req.body.Freight,
        ShipName: req.body.ShipName,
        ShipAddress: req.body.ShipAddress,
        ShipCity: req.body.ShipCity,
        ShipRegion: req.body.ShipRegion,
        ShipPostalCode: req.body.ShipPostalCode,
        ShipCountry: req.body.ShipCountry
    });

    // Save Orders in the database
    orders.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Orders."
        });
    });
};

// Retrieve and return all orderss from the database.
exports.findAll = (req, res) => {
    Orders.find()
    .then(orderss => {
        res.send(orderss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orderss."
        });
    });
};

// Find a single orders with a ordersId
exports.findOne = (req, res) => {
    Orders.findById(req.params.ordersId)
    .then(orders => {
        if(!orders) {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.ordersId
            });            
        }
        res.send(orders);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.ordersId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving orders with id " + req.params.ordersId
        });
    });
};

// Update a orders identified by the ordersId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.EmpID) {
        return res.status(400).send({
            message: "EmpID can not be empty"
        });
    }

    // Find orders and update it with the request body
    Orders.findByIdAndUpdate(req.params.ordersId, {
        OrdID: req.body.OrdID,
        CustomID: req.body.CustomID,
        EmpID: req.body.EmpID,
        OrderDate: req.body.OrderDate,
        RequiredDate: req.body.RequiredDate,
        ShippedDate: req.body.ShippedDate,
        ShipVia: req.body.ShipVia,
        Freight: req.body.Freight,
        ShipName: req.body.ShipName,
        ShipAddress: req.body.ShipAddress,
        ShipCity: req.body.ShipCity,
        ShipRegion: req.body.ShipRegion,
        ShipPostalCode: req.body.ShipPostalCode,
        ShipCountry: req.body.ShipCountry
    }, {new: true})
    .then(orders => {
        if(!orders) {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.ordersId
            });
        }
        res.send(orders);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.ordersId
            });                
        }
        return res.status(500).send({
            message: "Error updating orders with id " + req.params.ordersId
        });
    });
};

// Delete a orders with the specified ordersId in the request
exports.delete = (req, res) => {
    Orders.findByIdAndRemove(req.params.ordersId)
    .then(orders => {
        if(!orders) {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.ordersId
            });
        }
        res.send({message: "Orders deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Orders not found with id " + req.params.ordersId
            });                
        }
        return res.status(500).send({
            message: "Could not delete orders with id " + req.params.ordersId
        });
    });
};