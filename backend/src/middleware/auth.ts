import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Simple helper to get required environment variables safely.
const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
};

// This adds the user's ID to the request when a valid JWT is provided.
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get the token from the Authorization header.
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ error: "Access token required" });
    return;
  }

  // Verify the token with our secret key.
  jwt.verify(token, getEnv("JWT_SECRET"), (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    // Add the user's ID to the request for use in protected routes.
    req.user = { id: (decoded as any).id };
    next();
  });
};

// Extend the Request type to include user information.
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}
