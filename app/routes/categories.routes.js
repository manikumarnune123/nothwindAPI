module.exports = (app) => {
    const categoriess = require('../controllers/categories.controller.js');

    // Create a new Categories
    app.post('/categories', categoriess.create);

    // Retrieve all Categoriess
    app.get('/categories', categoriess.findAll);

    // Retrieve a single Categories with categoriesId
    app.get('/categories/:categoriesId', categoriess.findOne);

    // Update a Categories with categoriesId
    app.put('/categories/:categoriesId', categoriess.update);

    // Delete a Categories with categoriesId
    app.delete('/categories/:categoriesId', categoriess.delete);
}