const mongoose = require('mongoose');

const EmployeeTerritoriesSchema = mongoose.Schema({
    EmpID: Number,
    TerID: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('EmployeeTerritories', EmployeeTerritoriesSchema);