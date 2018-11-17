const router = require('express').Router(); // eslint-disable-line new-cap
const noteRoutes = require('./notes');
router.use('/notes', noteRoutes);

module.exports = router;
