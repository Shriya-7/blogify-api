import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/auth.controller.js";

const router = express.Router();

// POST /api/v1/auth/register - register new user
router.post("/register", registerUser);

// POST /api/v1/auth/login - login user
router.post("/login", loginUser);

// POST /api/v1/auth/logout - logout user
router.post("/logout", logoutUser);

export default router;
