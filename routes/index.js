const router = require('express').Router(); // eslint-disable-line
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
