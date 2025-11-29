const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts.controller');

// GET all posts
router.get('/', postController.getAllPosts);

// GET single post (DYNAMIC ROUTE)
router.get('/:postId', postController.getPostById);

module.exports = router;
