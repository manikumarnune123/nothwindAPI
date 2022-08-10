const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    dateofRecord: Date,
    isAvailable: Boolean,
    recordCount: Number,
    Description: String,
    Authors: Object
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);