const mongoose = require('mongoose');

const ShippersSchema = mongoose.Schema({
    ShipID: Number,
    CompanyName: String,
    Phone: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Shippers', ShippersSchema);