const express = require("express");

const router = express.Router();

// GET /api/v1/posts
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Here are all blog posts!",
    posts: [] // your data here
  });
});

module.exports = router;
