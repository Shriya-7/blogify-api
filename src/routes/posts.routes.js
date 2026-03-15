import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost 
} from "../controllers/posts.controller.js";

const router = express.Router();

// GET /api/v1/posts - fetch all posts
router.get("/", getAllPosts);

// GET /api/v1/posts/:id - fetch single post by ID
router.get("/:id", getPostById);

// POST /api/v1/posts - create new post (authenticated)
router.post("/", protect, createPost);

// PUT /api/v1/posts/:id - update post (authenticated + owner only)
router.put("/:id", protect, updatePost);

// DELETE /api/v1/posts/:id - delete post (authenticated + owner only)
router.delete("/:id", protect, deletePost);

export default router;
