function postPath(post = {}) {
  return '/p/' + post._id;
};

function postLink(post = {}) {
  return post.url || postPath(post);
};

function postEdit(post = {}) {
  return `${postPath(post)}/edit`;
}

exports.postPath = postPath;
exports.postEdit = postEdit;
exports.postLink = postLink;


