const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/p', require('./posts'));
router.use('/posts', require('./posts'));

module.exports = router;