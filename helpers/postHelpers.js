exports.postEdit= function(post = {}) {
  return `${postPath(post)}/edit`;
}

exports.postLink = function(post = {}) {
  return post.url || postPath(post);
};

exports.postPath = postPath;

function postPath(post = {}) {
  return '/p/' + post._id;
};


