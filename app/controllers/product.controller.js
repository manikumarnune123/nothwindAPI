const Product = require('../models/product.model.js');

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.ProdID) {
        return res.status(400).send({
            message: "ProdID can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        ProdID: req.body.ProdID,
        ProductName: req.body.ProductName,
        SuppID: req.body.SuppID,
        CatID: req.body.CatID,
        QuantityPerUnit: req.body.QuantityPerUnit,
        UnitPrice: req.body.UnitPrice,
        UnitsInStock: req.body.UnitsInStock,
        UnitsOnOrder: req.body.UnitsOnOrder,
        ReorderLevel: req.body.ReorderLevel,
        Discontinued: req.body.Discontinued
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId
        });
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.ProdID) {
        return res.status(400).send({
            message: "ProdID can not be empty"
        });
    }

    // Find product and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        ProdID: req.body.ProdID,
        ProductName: req.body.ProductName,
        SuppID: req.body.SuppID,
        CatID: req.body.CatID,
        QuantityPerUnit: req.body.QuantityPerUnit,
        UnitPrice: req.body.UnitPrice,
        UnitsInStock: req.body.UnitsInStock,
        UnitsOnOrder: req.body.UnitsOnOrder,
        ReorderLevel: req.body.ReorderLevel,
        Discontinued: req.body.Discontinued
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};