const express = require('express');
const router = express.Router();
const home = require('../controllers/home');

/* GET home page. */
router.get('/', home.index);

module.exports = router;
