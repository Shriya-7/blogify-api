import Post from "../models/Post.js";

/**
 * Service layer for Post operations
 * Handles all database interactions for posts
 */
const postService = {
  /**
   * Get all posts with populated author information
   * @returns {Promise<Array>} Array of posts with author details
   */
  async getAllPosts() {
    return await Post.find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
  },

  /**
   * Get a single post by ID with populated author information
   * @param {string} postId - The ID of the post to find
   * @returns {Promise<Object|null>} Post with author details or null if not found
   */
  async getPostById(postId) {
    return await Post.findById(postId)
      .populate('author', 'username email');
  },

  /**
   * Create a new post
   * @param {Object} postData - Post data including title, content, and author
   * @returns {Promise<Object>} The created post
   */
  async createPost(postData) {
    const post = new Post(postData);
    return await post.save();
  },

  /**
   * Update a post by ID
   * @param {string} postId - The ID of the post to update
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object|null>} Updated post or null if not found
   */
  async updatePost(postId, updateData) {
    return await Post.findByIdAndUpdate(
      postId,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'username email');
  },

  /**
   * Delete a post by ID
   * @param {string} postId - The ID of the post to delete
   * @returns {Promise<Object|null>} Deleted post or null if not found
   */
  async deletePost(postId) {
    return await Post.findByIdAndDelete(postId);
  },

  /**
   * Check if a post exists and belongs to a specific user
   * @param {string} postId - The ID of the post
   * @param {string} userId - The ID of the user
   * @returns {Promise<boolean>} True if post exists and belongs to user
   */
  async isPostOwner(postId, userId) {
    const post = await Post.findById(postId);
    return post && post.author.toString() === userId;
  }
};

export default postService;