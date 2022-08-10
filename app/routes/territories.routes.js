module.exports = (app) => {
    const territoriess = require('../controllers/territories.controller.js');

    // Create a new Territories
    app.post('/territories', territoriess.create);

    // Retrieve all Notes
    app.get('/territories', territoriess.findAll);

    // Retrieve a single Note with noteId
    app.get('/territories/:territoriesId', territoriess.findOne);

    // Update a Note with noteId
    app.put('/territories/:territoriesId', territoriess.update);

    // Delete a Note with noteId
    app.delete('/territories/:territoriesId', territoriess.delete);
}