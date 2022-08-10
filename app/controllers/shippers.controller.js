const Shippers = require('../models/shippers.model.js');

// Create and Save a new Shippers
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.ShipID) {
        return res.status(400).send({
            message: "ShipID can not be empty"
        });
    }

    // Create a Shippers
    const shippers = new Shippers({
        ShipID: req.body.ShipID,
        CompanyName: req.body.CompanyName,
        Phone: req.body.Phone
    });

    // Save Shippers in the database
    shippers.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Shippers."
        });
    });
};

// Retrieve and return all shipperss from the database.
exports.findAll = (req, res) => {
    Shippers.find()
    .then(shipperss => {
        res.send(shipperss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shipperss."
        });
    });
};

// Find a single shippers with a shippersId
exports.findOne = (req, res) => {
    Shippers.findById(req.params.shippersId)
    .then(shippers => {
        if(!shippers) {
            return res.status(404).send({
                message: "Shippers not found with id " + req.params.shippersId
            });            
        }
        res.send(shippers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shippers not found with id " + req.params.shippersId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving shippers with id " + req.params.shippersId
        });
    });
};

// Update a shippers identified by the shippersId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.ShipID) {
        return res.status(400).send({
            message: "ShipID can not be empty"
        });
    }

    // Find shippers and update it with the request body
    Shippers.findByIdAndUpdate(req.params.shippersId, {
        ShipID: req.body.ShipID,
        CompanyName: req.body.CompanyName,
        Phone: req.body.Phone
    }, {new: true})
    .then(shippers => {
        if(!shippers) {
            return res.status(404).send({
                message: "Shippers not found with id " + req.params.shippersId
            });
        }
        res.send(shippers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shippers not found with id " + req.params.shippersId
            });                
        }
        return res.status(500).send({
            message: "Error updating shippers with id " + req.params.shippersId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Shippers.findByIdAndRemove(req.params.shippersId)
    .then(shippers => {
        if(!shippers) {
            return res.status(404).send({
                message: "Shippers not found with id " + req.params.shippersId
            });
        }
        res.send({message: "Shippers deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Shippers not found with id " + req.params.shippersId
            });                
        }
        return res.status(500).send({
            message: "Could not delete shippers with id " + req.params.shippersId
        });
    });
};