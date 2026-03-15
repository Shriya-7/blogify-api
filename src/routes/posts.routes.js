const express = require('express');
const router = express.Router();

// GET /api/v1/posts (base path + '/')
router.get('/', (req, res) => {
  res.send('Fetching all blog posts...');
});

module.exports = router;
