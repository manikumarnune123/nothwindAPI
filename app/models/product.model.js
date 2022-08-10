const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    ProdID: Number,
    ProductName: Number,
    SuppID: Number,
    CatID: Number,
    QuantityPerUnit: String,
    UnitPrice: Number,
    UnitsInStock: Number,
    UnitsOnOrder: Number,
    ReorderLevel: Number,
    Discontinued: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);