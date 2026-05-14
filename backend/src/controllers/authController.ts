import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerSchema, loginSchema } from "../validation/authValidation.js";
import { z } from "zod";

// Simple helper to get required environment variables safely.
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
};

// This function handles new user registration.
export const register = async (req: Request, res: Response) => {
  // First we check if name, email, and password are valid.
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: z.treeifyError(result.error) });
    return;
  }

  // After validation, we can safely use these values.
  const { name, email, password } = result.data;

  // Do not allow two accounts with the same email.
  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  // Hash the password so the real password is not stored in MongoDB.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the new user in the database.
  const user = await User.create({ name, email, password: hashedPassword });

  // Create a token so the frontend knows the user is logged in.
  const token = jwt.sign({ id: user._id }, getEnv("JWT_SECRET"), {
    expiresIn: "7d",
  });

  // Send back user details without sending the password.
  res.status(201).json({ token, user: { id: user._id, name, email } });
};

// This function handles login for an existing user.
export const login = async (req: Request, res: Response) => {
  // First we check if email and password are valid.
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ errors: z.treeifyError(result.error) });
    return;
  }

  const { email, password } = result.data;

  // Find the account that uses this email.
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  // Compare the typed password with the hashed password in the database.
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  // If password is correct, create a new login token.
  const token = jwt.sign({ id: user._id }, getEnv("JWT_SECRET"), {
    expiresIn: "7d",
  });

  // Send back the token and basic user details.
  res.json({ token, user: { id: user._id, name: user.name, email } });
};

// This function returns the current user from a valid JWT token.
export const me = async (req: Request, res: Response) => {
  try {
    // The user ID is attached to the request by the authenticateToken middleware.
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    // Find the user in the database.
    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    // Return user details without the password.
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
