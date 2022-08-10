const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
    OrdID: Number,
    CustomID: String,
    EmpID: Number,
    OrderDate: Date,
    RequiredDate: Date,
    ShippedDate: Date,
    ShipVia: Number,
    Freight: Number,
    ShipName: String,
    ShipAddress: String,
    ShipCity: String,
    ShipRegion: String,
    ShipPostalCode: Number,
    ShipCountry: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Orders', OrdersSchema);