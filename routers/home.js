const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();

router.use('/', function(req, res, next) {
  req.query.page = parseInt(req.query.page) || 1;
  req.query.pageSize = 20;
  next();
});

router.get('/', async (req, res, next) => {
  const posts = await Post.find(
    {}, 
    { __v: 0 },
    { sort: { updated: -1 }}
  ).skip((req.query.page - 1) * req.query.pageSize)
   .limit(req.query.pageSize);
  res.render('home/index', { posts });
});

router.get('/welcome', (req, res, next) => {
  res.render('home/welcome');
});

router.get('/:type', async (req, res, next) => {
  const posts = await Post.find(
    { type: req.params.type }, 
    { __v: 0 },
    { sort: { updated: -1 }}
  ).skip((req.query.page - 1) * req.query.pageSize)
   .limit(req.query.pageSize);
  res.render('home/index', { posts });
});

module.exports = router;
