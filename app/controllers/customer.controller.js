const Customer = require('../models/customer.model.js');

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.CustomID) {
        return res.status(400).send({
            message: "CustomID can not be empty"
        });
    }

    // Create a Note
    const customer = new Customer({
        CustomID: req.body.CustomID,
        CompanyName: req.body.CompanyName,
        ContactName: req.body.ContactName ,
        ContactTitle: req.body.ContactTitle,
        Address: req.body.Address,
        City: req.body.City,
        Region: req.body.Region,
        PostalCode: req.body.PostalCode,
        Country: req.body.Country,
        Phone: req.body.Phone,
        Fax: req.body.Fax
    });

    // Save Customer in the database
    customer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Customer."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customers."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });            
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.customerId
        });
    });
};

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.CustomID) {
        return res.status(400).send({
            message: "CustomerID can not be empty"
        });
    }

    // Find customer and update it with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        CompanyName: req.body.CompanyName,
        ContactName: req.body.ContactName,
        ContactTitle: req.body.ContactTitle,
        Address: req.body.Address,
        City: req.body.City,
        Region: req.body.Region,
        PostalCode: req.body.PostalCode,
        Country: req.body.Country,
        Phone: req.body.Phone,
        Fax: req.body.Fax
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.customerId
        });
    });
};