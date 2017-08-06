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

router.get('/:id', catchErrors(async (req, res, next) => {
  res.json(await Post.findById(req.params.id, { __v: 0 }));
}));

router.post('/', catchErrors(async (req, res, next) => {
  const post = await (new Post(req.body)).save();
  res.json(post);
}));

router.delete('/:id', catchErrors(async (req, res, next) => {
  await Post.findByIdAndRemove(req.params.id);
  res.json({ removed: true });
}));

router.put('/:id', catchErrors(async (req, res, next) => {
  let data = lodash.pick(req.body, ['title', 'url', 'type', 'text']);
  let post = await Post.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true, upsert: true, runValidators: true }
  );
  res.json({ post });
}));

router.put('/:id/upvote', catchErrors(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id, 
    { $inc: { score: 1 } },
    { new: true }
  );
  res.json({ score: post.score });
}));


module.exports = router;