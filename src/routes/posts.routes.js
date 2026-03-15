import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { updatePost, deletePost } from "../controllers/posts.controller.js";

const router = express.Router();

// GET /api/v1/posts - fetch all posts
router.get("/", (req, res) => {
  res.send("Fetching all blog posts...");
});

// Update post (authenticated + owner only)
router.put("/:id", protect, updatePost);

// Delete post (authenticated + owner only)
router.delete("/:id", protect, deletePost);

export default router;
