const mongoose = require('mongoose');

const SupplierSchema = mongoose.Schema({
    SuppID: Number,
    CompanyName: String,
    ContactName: String,
    ContactTitle: String,
    Address: String,
    City: String,
    Region: String,
    PostalCode: Number,
    Country: String,
    Phone: Number,
    Fax: Number,
    HomePage: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Supplier', SupplierSchema);