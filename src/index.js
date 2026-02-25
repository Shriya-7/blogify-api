import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

/* ---------- PORT ---------- */
const PORT = process.env.PORT || 3000;

/* ---------- MONGOOSE CONNECTION (POOL SIZE FROM ENV) ---------- */
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: process.env.DB_POOL_SIZE || 10
})
.then(() => console.log("MongoDB Connected with pool size:", process.env.DB_POOL_SIZE))
.catch(err => console.log(err));

/* ---------- TEST ROUTE ---------- */
app.get("/api/users", async (req, res) => {
  res.json({
    success: true,
    message: "Users fetched successfully"
  });
});

/* ---------- SERVER ---------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
