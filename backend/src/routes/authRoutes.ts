import { Router } from "express";
import { register, login } from "../controllers/authController.js";

// This file connects auth URLs to their controller functions.
const router = Router();

// When frontend calls POST /api/auth/register, run the register function.
router.post("/register", register);

// When frontend calls POST /api/auth/login, run the login function.
router.post("/login", login);

// server.ts uses this router under /api/auth.
export default router;
