function postPath(post = {}) {
  return '/p/' + post._id;
};

function postLink(post = {}) {
  return post.url || postPath(post);
};

exports.postPath = postPath;
exports.postLink = postLink;

