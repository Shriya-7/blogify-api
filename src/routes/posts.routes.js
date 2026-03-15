const express = require('express');
const router = express.Router();

const { getAllPosts } = require('../controllers/posts.controller');

router.get('/', getAllPosts);

module.exports = router;