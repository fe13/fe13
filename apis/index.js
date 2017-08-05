const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({
    posts: '/api/posts',
    news: '/api/posts?type=news',
    work: '/api/posts?type=work',
    jobs: '/api/posts?type=jobs',
    joke: '/api/posts?type=joke'
  });
})

router.use('/posts', require('./posts'));

module.exports = router;