// lib/validations/auth.ts
import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required.")
    .max(50, "First name must be less than 50 characters.")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required.")
    .max(50, "Last name must be less than 50 characters.")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be less than 128 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Please enter a valid phone number."),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string().min(1, "Username or email is required.").trim(),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const forgotPasswordEmailSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address.").trim().toLowerCase(),
});

export type ForgotPasswordEmailData = z.infer<typeof forgotPasswordEmailSchema>;

export const forgotPasswordOtpSchema = z.object({
  code: z.string().min(1, "OTP is required.").length(6, "OTP must be exactly 6 characters.").trim(),
});

export type ForgotPasswordOtpData = z.infer<typeof forgotPasswordOtpSchema>;

export const forgotPasswordResetSchema = z.object({
  new_password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be less than 128 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
});

export type ForgotPasswordResetData = z.infer<typeof forgotPasswordResetSchema>;
