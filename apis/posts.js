const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const express = require('express');
const router = express.Router();
const lodash = require('lodash');
const catchErrors = require('../helpers/catchErrors');

router.get('/', async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.pageSize) || 20;
  const type = req.query.type;
  const [count, posts] = await Promise.all([
    Post.count(type ? { type } : null),
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

router.post('/', catchErrors(async (req, res, next) => {
  const post = await (new Post(req.body)).save();
  res.json(post);
}));

router.delete('/:id', catchErrors(async (req, res, next) => {
  await Post.findByIdAndRemove(req.params.id);
  res.json({ done: true });
}));

router.put('/:id', catchErrors(async (req, res, next) => {
  let data = lodash.pick(req.body, ['title', 'url', 'type', 'text']);
  await Post.findByIdAndUpdate(
    req.params.id,
    { $set: data },
    { upsert: true, runValidators: true 
  });
  res.json({ done: true });
}));

router.put('/:id/upvote', catchErrors(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { score: 1 } });
  res.json({ score: post.score + 1 });
}));


module.exports = router;