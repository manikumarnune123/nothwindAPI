const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    RegID: Number,
    RegionDescription: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Region', CustomerSchema);