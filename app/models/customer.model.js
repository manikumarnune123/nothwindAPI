const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    CustomID: String,
    CompanyName: String,
    ContactName: String,
    ContactTitle: String,
    Address: String,
    City: String,
    Region: String,
    PostalCode: Number,
    Country: String,
    Phone: Number,
    Fax: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);