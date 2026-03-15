import postService from "../services/posts.service.js";

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    
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
    const post = await postService.getPostById(req.params.id);

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

    const postData = {
      title,
      content,
      author: req.user._id
    };

    const savedPost = await postService.createPost(postData);

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
    const postId = req.params.id;
    const userId = req.user._id.toString();
    
    // Check if user owns the post
    const isOwner = await postService.isPostOwner(postId, userId);
    
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        error: { message: "Not authorized to update this post" }
      });
    }

    const updateData = {
      title: req.body.title,
      content: req.body.content
    };

    const updatedPost = await postService.updatePost(postId, updateData);

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        error: { message: "Post not found" }
      });
    }

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
    const postId = req.params.id;
    const userId = req.user._id.toString();
    
    // Check if user owns the post
    const isOwner = await postService.isPostOwner(postId, userId);
    
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        error: { message: "Not authorized to delete this post" }
      });
    }

    const deletedPost = await postService.deletePost(postId);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        error: { message: "Post not found" }
      });
    }

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
