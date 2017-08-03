const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/index', { message: 'Welcome' });
});

module.exports = router;
