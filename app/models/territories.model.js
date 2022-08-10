const mongoose = require('mongoose');

const TerritoriesSchema = mongoose.Schema({
    TerID: Number,
    TerritoryDescription: String,
    RegID: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Territories', TerritoriesSchema);