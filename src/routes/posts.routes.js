const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  updatePost,
  deletePost
} = require("../controllers/posts.controller");

const router = express.Router();

// Update post (authenticated + owner only)
router.put("/:id", protect, updatePost);

// Delete post (authenticated + owner only)
router.delete("/:id", protect, deletePost);

module.exports = router;
