module.exports = (app) => {
    const employeeterritoriess = require('../controllers/employeeTerritories.controller.js');

    // Create a new EmployeeTerritories
    app.post('/employeeterritories', employeeterritoriess.create);

    // Retrieve all EmployeeTerritoriess
    app.get('/employeeterritories', employeeterritoriess.findAll);

    // Retrieve a single EmployeeTerritories with employeeterritoriesId
    app.get('/employeeterritories/:employeeterritoriesId', employeeterritoriess.findOne);

    // Update a EmployeeTerritories with employeeterritoriesId
    app.put('/employeeterritories/:employeeterritoriesId', employeeterritoriess.update);

    // Delete a EmployeeTerritories with employeeterritoriesId
    app.delete('/employeeterritories/:employeeterritoriesId', employeeterritoriess.delete);
}