const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();
const catchErrors = require('../helpers/catchErrors');

router.use('/', function(req, res, next) {
  req.query.page = parseInt(req.query.page) || 1;
  req.query.pageSize = 20;
  next();
});

router.get('/', catchErrors(home));

router.get('/welcome', (req, res, next) => {
  res.render('home/welcome');
});

router.get('/:type', catchErrors(home));

async function home(req, res, next) {
  const type = req.params.type;
  const page = req.query.page;
  const size = req.query.pageSize;
  const skip = (page - 1) * size;

  const [count, posts] = await Promise.all([
    Post.count(),
    Post.find(
      type ? { type } : {},
      { __v: 0 },
      { sort: { updated: -1 }}
    ).skip(skip)
     .limit(size),
  ]);

  const more = page * size < count ? page + 1 : null;
  res.render('home/index', { posts, skip, more });
};

module.exports = router;
