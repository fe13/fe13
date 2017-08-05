const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const posts = await Post.find();
  res.render('home/index', { posts });
});

router.get('/welcome', (req, res, next) => {
  res.render('home/welcome');
});

router.get('/:type', async (req, res, next) => {
  const posts = await Post.find({ type: req.params.type });
  res.render('home/index', { posts });
});

module.exports = router;
