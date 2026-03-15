// Controller function for posts

const getAllPosts = (req, res) => {
  res.json({
    message: "Fetching all posts"
  });
};

module.exports = {
  getAllPosts
};