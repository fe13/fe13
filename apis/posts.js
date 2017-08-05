const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.pageSize) || 20;
  const type = req.query.type;
  const [count, posts] = await Promise.all([
    Post.count(),
    Post.find(
      type ? { type } : {},
      { __v: 0 }, 
      { sort: { updated: -1, score: 1 }}
    ).skip(page * size - size).limit(size)
  ]);

  res.json({ 
    data: posts,
    pagination: {
      pageSize: size,
      currPage: page,
      nextPage: page * size < count ? page + 1 : null,
      totalItems: count,
      totalPages: Math.ceil(count / size)
    }
  });
});

router.put('/:id/upvote', async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { score: 1 } });
  res.json({ score: post.score + 1 });
});

module.exports = router;