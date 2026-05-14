import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

// This file connects auth URLs to their controller functions.
const router = Router();

// When frontend calls POST /api/auth/register, run the register function.
router.post("/register", register);

// When frontend calls POST /api/auth/login, run the login function.
router.post("/login", login);

// When frontend calls GET /api/auth/me, verify JWT and return current user.
router.get("/me", authenticateToken, me);

// server.ts uses this router under /api/auth.
export default router;
