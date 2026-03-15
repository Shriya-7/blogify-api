// Controller function for posts

const getAllPosts = (req, res) => {
  res.json({
    message: "Fetching all posts"
  });
};

const getPostById = async (req, res) => {
  const postId = req.params.postId;
  res.json({
    message: "Fetching data for post with ID: " + postId
  });
};

module.exports = {
  getAllPosts,
  getPostById
};