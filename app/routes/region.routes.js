module.exports = (app) => {
    const regions = require('../controllers/region.controller.js');

    // Create a new Region
    app.post('/regions', regions.create);

    // Retrieve all Regions
    app.get('/regions', regions.findAll);

    // Retrieve a single Region with regionId
    app.get('/regions/:regionId', regions.findOne);

    // Update a Region with regionId
    app.put('/regions/:regionId', regions.update);

    // Delete a Region with regionId
    app.delete('/regions/:regionId', regions.delete);
}