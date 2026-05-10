import { z } from "zod";

// These are the backend rules for creating a new account.
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// These are the backend rules for logging in.
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// These types are useful if we need the same shape in other backend files.
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
