import { z } from "zod";

// These are the rules for the register form.
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 characters long"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// These are the rules for the login form.
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// These types are used by the forms so the fields match the validation rules.
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
