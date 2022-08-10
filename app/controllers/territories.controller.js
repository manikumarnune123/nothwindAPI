const Territories = require('../models/territories.model.js');

// Create and Save a new Territories
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.TerID) {
        return res.status(400).send({
            message: "TerID can not be empty"
        });
    }

    // Create a Note
    const territories = new Territories({
        TerID: req.body.TerID,
        TerritoryDescription: req.body.TerritoryDescription,
        RegID: req.body.RegID
    });

    // Save Territories in the database
    territories.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Territories."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Territories.find()
    .then(territoriess => {
        res.send(territoriess);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving territories."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Territories.findById(req.params.territoriesId)
    .then(territories => {
        if(!territories) {
            return res.status(404).send({
                message: "Territories not found with id " + req.params.territoriesId
            });            
        }
        res.send(territories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Territories not found with id " + req.params.territoriesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving territories with id " + req.params.territoriesId
        });
    });
};

// Update a territories identified by the territoriesId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.TerID) {
        return res.status(400).send({
            message: "TerritoriesID can not be empty"
        });
    }

    // Find territories and update it with the request body
    Territories.findByIdAndUpdate(req.params.territoriesId, {
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
    .then(territories => {
        if(!territories) {
            return res.status(404).send({
                message: "Territories not found with id " + req.params.territoriesId
            });
        }
        res.send(territories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Territories not found with id " + req.params.territoriesId
            });                
        }
        return res.status(500).send({
            message: "Error updating territories with id " + req.params.territoriesId
        });
    });
};

// Delete a note with the specified territoriesId in the request
exports.delete = (req, res) => {
    Territories.findByIdAndRemove(req.params.territoriesId)
    .then(territories => {
        if(!territories) {
            return res.status(404).send({
                message: "Territories not found with id " + req.params.territoriesId
            });
        }
        res.send({message: "Territories deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Territories not found with id " + req.params.territoriesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete territories with id " + req.params.territoriesId
        });
    });
};