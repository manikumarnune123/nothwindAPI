const EmployeeTerritories = require('../models/employeeTerritories.model.js');

// Create and Save a new EmployeeTerritories
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.EmpID) {
        return res.status(400).send({
            message: "EmpID can not be empty"
        });
    }

    // Create a Note
    const employeeterritories = new EmployeeTerritories({
        EmpID: req.body.EmpID,
        TerID: req.body.TerID
    });

    // Save EmployeeTerritories in the database
    employeeterritories.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the EmployeeTerritories."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    EmployeeTerritories.find()
    .then(employeeterritoriess => {
        res.send(employeeterritoriess);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employeeterritoriess."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    EmployeeTerritories.findById(req.params.employeeterritoriesId)
    .then(employeeterritories => {
        if(!employeeterritories) {
            return res.status(404).send({
                message: "EmployeeTerritories not found with id " + req.params.employeeterritoriesId
            });            
        }
        res.send(employeeterritories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "EmployeeTerritories not found with id " + req.params.employeeterritoriesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving employeeterritories with id " + req.params.employeeterritoriesId
        });
    });
};

// Update a employeeterritories identified by the employeeterritoriesId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.EmpID) {
        return res.status(400).send({
            message: "EmpID can not be empty"
        });
    }

    // Find employeeterritories and update it with the request body
    EmployeeTerritories.findByIdAndUpdate(req.params.employeeterritoriesId, {
        EmpID: req.body.EmpID,
        TerID: req.body.TerID
    }, {new: true})
    .then(employeeterritories => {
        if(!employeeterritories) {
            return res.status(404).send({
                message: "EmpID not found with id " + req.params.employeeterritoriesId
            });
        }
        res.send(employeeterritories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "EmpID not found with id " + req.params.employeeterritoriesId
            });                
        }
        return res.status(500).send({
            message: "Error updating EmpID with id " + req.params.employeeterritoriesId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    EmployeeTerritories.findByIdAndRemove(req.params.employeeterritoriesId)
    .then(employeeterritories => {
        if(!employeeterritories) {
            return res.status(404).send({
                message: "EmployeeTerritories not found with id " + req.params.employeeterritoriesId
            });
        }
        res.send({message: "EmployeeTerritories deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "EmployeeTerritories not found with id " + req.params.employeeterritoriesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete employeeterritories with id " + req.params.employeeterritoriesId
        });
    });
};