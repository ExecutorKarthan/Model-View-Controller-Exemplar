//Import needed dependencies
const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogPostRoutes = require('./blog-post-routes');

//Assign paths for each needed dependency 
router.use('/users', userRoutes);
router.use('/bpr', blogPostRoutes);

//Export the newly adjusted router
module.exports = router;