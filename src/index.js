import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mainRouter from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

/* ---------- PORT ---------- */
const PORT = process.env.PORT || 3000;

/* ---------- DATABASE CONNECTION ---------- */
connectDB();

/* ---------- MAIN ROUTER ---------- */
app.use("/api/v1", mainRouter);

/* ---------- ERROR HANDLING ---------- */
app.use(errorHandler);

/* ---------- SERVER ---------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
