const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema({
    CatID: Number,
    CategoryName: String,
    Description: String,
    Picture: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', CategoriesSchema);