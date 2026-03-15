import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import mainRouter from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

/* ---------- PORT ---------- */
const PORT = process.env.PORT || 3000;

/* ---------- MONGOOSE CONNECTION (POOL SIZE FROM ENV) ---------- */
mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: process.env.DB_POOL_SIZE || 10
})
.then(() => console.log("MongoDB Connected with pool size:", process.env.DB_POOL_SIZE))
.catch(err => console.log(err));

/* ---------- MAIN ROUTER ---------- */
app.use("/api/v1", mainRouter);

/* ---------- ERROR HANDLING ---------- */
app.use(errorHandler);

/* ---------- SERVER ---------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
