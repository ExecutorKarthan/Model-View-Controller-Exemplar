//Import needed dependencies
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

//Assign paths for each needed dependency 
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//Export the newly adjusted router
module.exports = router;