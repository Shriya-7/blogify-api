const express = require("express");
const app = express();

// correct import
const postsRouter = require("./routes/posts.routes.js");


app.use(express.json());

app.get("/",(req,res)=>{
    return res.status(200).send("this is blogify backend")
})
app.use("/api/v1/posts", postsRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
