const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();
const catchErrors = require('../helpers/catchErrors');

router.post('/', catchErrors(async (req, res, next) => {
  await (new Post(req.body)).save();
  res.redirect('/');
}));

router.get('/new', (req, res, next) => {
  res.render('posts/new');
});

router.get('/:id', catchErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/show', { post });
}));

router.get('/:id/edit', catchErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/edit', { post });
}))

module.exports = router;