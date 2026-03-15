import Post from "../models/Post.js";

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username email');
    
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
};

// Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username email');

    if (!post) {
      return res.status(404).json({
        success: false,
        error: { message: "Post not found" }
      });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
};

// Create new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: { message: "Title and content are required" }
      });
    }

    const post = new Post({
      title,
      content,
      author: req.user._id
    });

    const savedPost = await post.save();
    await savedPost.populate('author', 'username email');

    res.status(201).json({
      success: true,
      data: savedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
};

// Update post — only owner can update
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: { message: "Post not found" }
      });
    }

    // ownership check (authorization)
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: { message: "Not authorized to update this post" }
      });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    const updatedPost = await post.save();
    await updatedPost.populate('author', 'username email');

    res.status(200).json({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
};

// Delete post — only owner can delete
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: { message: "Post not found" }
      });
    }

    // ownership check
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: { message: "Not authorized to delete this post" }
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post removed successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: { message: error.message }
    });
  }
};
