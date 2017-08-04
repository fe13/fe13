const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('home/index');
});

router.get('/welcome', (req, res, next) => {
  res.render('home/welcome');
});

module.exports = router;
