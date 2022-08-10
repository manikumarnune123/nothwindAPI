const Region = require('../models/region.model.js');

// Create and Save a new Region
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.RegID) {
        return res.status(400).send({
            message: "CustomID can not be empty"
        });
    }

    // Create a Region
    const region = new Region({
        RegID: req.body.RegID,
        RegionDescription: req.body.RegionDescription
    });

    // Save Region in the database
    region.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Region."
        });
    });
};

// Retrieve and return all regions from the database.
exports.findAll = (req, res) => {
    Region.find()
    .then(regions => {
        res.send(regions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving regions."
        });
    });
};

// Find a single region with a regionId
exports.findOne = (req, res) => {
    Region.findById(req.params.regionId)
    .then(region => {
        if(!region) {
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });            
        }
        res.send(region);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving region with id " + req.params.regionId
        });
    });
};

// Update a region identified by the regionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.RegID) {
        return res.status(400).send({
            message: "RegID can not be empty"
        });
    }

    // Find region and update it with the request body
    Region.findByIdAndUpdate(req.params.regionId, {
        RegID: req.body.RegID,
        RegionDescription: req.body.RegionDescription
    }, {new: true})
    .then(region => {
        if(!region) {
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });
        }
        res.send(region);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });                
        }
        return res.status(500).send({
            message: "Error updating region with id " + req.params.regionId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Region.findByIdAndRemove(req.params.regionId)
    .then(region => {
        if(!region) {
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });
        }
        res.send({message: "Region deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete region with id " + req.params.regionId
        });
    });
};