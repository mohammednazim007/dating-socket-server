import { z } from "zod";

// For generating or sending OTP
export const sendOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// For verifying OTP and resetting password
export const verifyOtpSchema = z.object({
  email: z.string().email("Invalid email address"),
  otpCode: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});
