const Supplier = require('../models/supplier.model.js');

// Create and Save a new Supplier
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.SuppID) {
        return res.status(400).send({
            message: "SuppID can not be empty"
        });
    }

    // Create a Supplier
    const supplier = new Supplier({
        SuppID: req.body.SuppID,
        CompanyName: req.body.CompanyName,
        ContactName: req.body.ContactName,
        ContactTitle: req.body.ContactTitle,
        Address: req.body.Address,
        City: req.body.City,
        Region: req.body.Region,
        PostalCode: req.body.PostalCode,
        Country: req.body.Country,
        Phone: req.body.Phone,
        Fax: req.body.Fax,
        HomePage: req.body.HomePage
    });

    // Save Supplier in the database
    supplier.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Supplier."
        });
    });
};

// Retrieve and return all suppliers from the database.
exports.findAll = (req, res) => {
    Supplier.find()
    .then(suppliers => {
        res.send(suppliers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving suppliers."
        });
    });
};

// Find a single supplier with a supplierId
exports.findOne = (req, res) => {
    Supplier.findById(req.params.supplierId)
    .then(supplier => {
        if(!supplier) {
            return res.status(404).send({
                message: "Supplier not found with id " + req.params.supplierId
            });            
        }
        res.send(supplier);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Supplier not found with id " + req.params.supplierId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving supplier with id " + req.params.supplierId
        });
    });
};

// Update a supplier identified by the supplierId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.SuppID) {
        return res.status(400).send({
            message: "SuppID can not be empty"
        });
    }

    // Find supplier and update it with the request body
    Supplier.findByIdAndUpdate(req.params.supplierId, {
        SuppID: req.body.SuppID,
        CompanyName: req.body.CompanyName,
        ContactName: req.body.ContactName,
        ContactTitle: req.body.ContactTitle,
        Address: req.body.Address,
        City: req.body.City,
        Region: req.body.Region,
        PostalCode: req.body.PostalCode,
        Country: req.body.Country,
        Phone: req.body.Phone,
        Fax: req.body.Fax,
        HomePage: req.body.HomePage
    }, {new: true})
    .then(supplier => {
        if(!supplier) {
            return res.status(404).send({
                message: "Supplier not found with id " + req.params.supplierId
            });
        }
        res.send(supplier);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Supplier not found with id " + req.params.supplierId
            });                
        }
        return res.status(500).send({
            message: "Error updating supplier with id " + req.params.supplierId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Supplier.findByIdAndRemove(req.params.supplierId)
    .then(supplier => {
        if(!supplier) {
            return res.status(404).send({
                message: "Supplier not found with id " + req.params.supplierId
            });
        }
        res.send({message: "Supplier deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Supplier not found with id " + req.params.supplierId
            });                
        }
        return res.status(500).send({
            message: "Could not delete supplier with id " + req.params.supplierId
        });
    });
};