const express = require("express");
const app = express();

app.use(express.json());

const postRoutes = require("./routes/posts.routes.js");

app.use("/api/v1/posts", postRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
