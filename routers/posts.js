const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  res.json(req.body);
});

router.get('/new', (req, res, next) => {
  res.render('posts/new');
});

module.exports = router;