const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/p', require('./posts'));

module.exports = router;