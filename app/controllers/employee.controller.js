const Employee = require('../models/employee.model.js');

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request    
    if(!req.body.EmpID) {
        return res.status(400).send({
            message: "EmpID can not be empty"
        });
    }

    // Create a Employee
    const employee = new Employee({
        EmpID: req.body.EmpID,
        LastName: req.body.LastName,
        FirstName: req.body.FirstName,
        Title: req.body.Title,
        TitleOfCourtesy: req.body.TitleOfCourtesy,
        BirthDate: req.body.BirthDate,
        HireDate: req.body.HireDate,
        Address: req.body.Address,
        City: req.body.City,
        Region: req.body.Region,
        PostalCode: req.body.PostalCode,
        Country: req.body.Country,
        HomePhone: req.body.HomePhone,
        Extension: req.body.Extension,
        Photo: req.body.Photo,
        Notes: req.body.Notes,
        ReportsTo: req.body.ReportsTo,
        PhotoPath: req.body.PhotoPath
    });

    // Save Employee in the database
    employee.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Employee."
        });
    });
};

// Retrieve and return all employees from the database.
exports.findAll = (req, res) => {
    Employee.find()
    .then(employees => {
        res.send(employees);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving employees."
        });
    });
};

// Find a single employee with a employeeId
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });            
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving employee with id " + req.params.employeeId
        });
    });
};

// Update a employee identified by the employeeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.EmpID) {
        return res.status(400).send({
            message: "EmpID can not be empty"
        });
    }

    // Find employee and update it with the request body
    Employee.findByIdAndUpdate(req.params.employeeId, {
        EmpID: req.body.EmpID,
        LastName: req.body.LastName,
        FirstName: req.body.FirstName,
        Title: req.body.Title,
        TitleOfCourtesy: req.body.TitleOfCourtesy,
        BirthDate: req.body.BirthDate,
        HireDate: req.body.HireDate,
        Address: req.body.Address,
        City: req.body.City,
        Region: req.body.Region,
        PostalCode: req.body.PostalCode,
        Country: req.body.Country,
        HomePhone: req.body.HomePhone,
        Extension: req.body.Extension,
        Photo: req.body.Photo,
        Notes: req.body.Notes,
        ReportsTo: req.body.ReportsTo,
        PhotoPath: req.body.PhotoPath
    }, {new: true})
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send(employee);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Error updating employee with id " + req.params.employeeId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
    .then(employee => {
        if(!employee) {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });
        }
        res.send({message: "Employee deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Employee not found with id " + req.params.employeeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete employee with id " + req.params.employeeId
        });
    });
};