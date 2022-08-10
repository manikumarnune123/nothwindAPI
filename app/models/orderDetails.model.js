const mongoose = require('mongoose');

const OrderDetailsSchema = mongoose.Schema({
    OrdID: Number,
    ProdID: Number,
    UnitPrice: Number,
    Quantity: Number,
    Discount: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderDetails', OrderDetailsSchema);