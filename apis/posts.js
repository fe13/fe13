const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const type = req.query.type;
  const posts = await Post.find(
    type ? { type } : {},
    { __v: 0 }, 
    { sort: { created: -1, score: 1 }}
  );
  res.json(posts);
});

module.exports = router;