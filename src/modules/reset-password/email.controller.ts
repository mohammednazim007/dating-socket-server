import { Request, Response, NextFunction } from "express";
import {
  handleSendOtp,
  handleVerifyOtp,
  handleResetPassword,
} from "./email.service";

/// ============================================================
// ✅ ROUTE: POST /auth/send-otp
// PURPOSE:
//    - Generate and send a one-time password (OTP) to user's email
//      for password reset verification.
// ============================================================
export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const result = await handleSendOtp(email);

    res.status(200).json({ message: "OTP sent successfully", result });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// ✅ ROUTE: POST /auth/verify-otp
// PURPOSE:
//    - Verify the OTP sent to user's email before allowing password reset.
// ============================================================
export const verifyOTPAndResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otpCode } = req.body;
    const result = await handleVerifyOtp(email, otpCode);

    res.status(200).json({ message: "OTP verified successfully", result });
  } catch (error) {
    next(error);
  }
};

// ============================================================
// ✅ ROUTE: POST /auth/reset-password
// PURPOSE:
//    - Reset user's password after OTP verification is successful.
// ============================================================
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, newPassword } = req.body;
    const result = await handleResetPassword(email, newPassword);

    res.status(200).json({ message: "Password reset successfully", result });
  } catch (error) {
    next(error);
  }
};
