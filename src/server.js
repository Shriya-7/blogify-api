const express = require("express");
const postsRoutes = require("./routes/posts.routes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Blogify API is running");
});

// Posts route
app.use("/api/v1/posts", postsRoutes);

// Port
const PORT = 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});