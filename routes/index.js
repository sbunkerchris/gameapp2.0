const express = require('express');
const router = express.Router();

router.use('/gameapp', require('./gameapp'));

module.exports = router;