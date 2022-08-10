const Categories = require('../models/categories.model.js');

// Create and Save a new Categories
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.CatID) {
        return res.status(400).send({
            message: "CatID can not be empty"
        });
    }

    // Create a Categories
    const categories = new Categories({
        CatID: req.body.CatID,
        CategoryName: req.body.CategoryName,
        Description: req.body.Description,
        Picture: req.body.Picture
    });

    // Save Categories in the database
    categories.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Categories."
        });
    });
};

// Retrieve and return all categoriess from the database.
exports.findAll = (req, res) => {
    Categories.find()
    .then(categoriess => {
        res.send(categoriess);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving categoriess."
        });
    });
};

// Find a single categories with a categoriesId
exports.findOne = (req, res) => {
    Categories.findById(req.params.categoriesId)
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "Categories not found with id " + req.params.categoriesId
            });            
        }
        res.send(categories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Categories not found with id " + req.params.categoriesId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving categories with id " + req.params.categoriesId
        });
    });
};

// Update a categories identified by the categoriesId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.CatID) {
        return res.status(400).send({
            message: "CatID can not be empty"
        });
    }

    // Find categories and update it with the request body
    Categories.findByIdAndUpdate(req.params.categoriesId, {
        CatID: req.body.CatID,
        CategoryName: req.body.CategoryName,
        Description: req.body.Description,
        Picture: req.body.Picture
    }, {new: true})
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "Categories not found with id " + req.params.categoriesId
            });
        }
        res.send(categories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Categories not found with id " + req.params.categoriesId
            });                
        }
        return res.status(500).send({
            message: "Error updating categories with id " + req.params.categoriesId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Categories.findByIdAndRemove(req.params.categoriesId)
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "Categories not found with id " + req.params.categoriesId
            });
        }
        res.send({message: "Categories deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Categories not found with id " + req.params.categoriesId
            });                
        }
        return res.status(500).send({
            message: "Could not delete categories with id " + req.params.categoriesId
        });
    });
};