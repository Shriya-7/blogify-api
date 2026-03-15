import express from "express";
import postRouter from "./posts.routes.js";
import authRouter from "./auth.routes.js";

const router = express.Router();

// Mount resource-specific routers
router.use("/posts", postRouter);
router.use("/auth", authRouter);

export default router;