const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    EmpID: Number,
    LastName: String,
    FirstName: String,
    Title: String,
    TitleOfCourtesy: String,
    BirthDate: Date,
    HireDate: Date,
    Address: String,
    City: String,
    Region: String,
    PostalCode: Number,
    Country: String,
    HomePhone: Number,
    Extension: Number,
    Photo: String,
    Notes: String,
    ReportsTo: Number,
    PhotoPath: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', EmployeeSchema);