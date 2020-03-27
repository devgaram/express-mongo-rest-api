const Post = {};

Post.generateInput = (req, res, next) => {
  const {
    content, message, path, sha,
  } = { ...req.body };

  req.body.postInput = {
    content, message, path, sha,
  };
  next();
};

export default Post;
