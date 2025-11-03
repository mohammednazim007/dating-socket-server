// File: src/modules/reset-otp/email.controller.ts
import { generateOTP } from "@/utils/generateOTP";
import User from "../user/user.model";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Otp from "./email.model";
import { sendEmail } from "@/config/resendEmail";

export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ message: "User not found" });

    // Generate OTP code
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 5 minutes from now

    // Remove existing OTP for same user/purpose
    await Otp.deleteMany({ email, purpose: "reset_password" });

    // Store OTP in DB
    const otpEntry = new Otp({
      email,
      otp: otpCode,
      purpose: "reset_password",
      expiresAt,
    });
    await otpEntry.save();

    const result = await sendEmail(email, otpCode);
    console.log("result", result);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyOTPAndResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, otpCode } = req.body;

  try {
    // Find OTP record
    const otpRecord = await Otp.findOne({ email, purpose: "reset_password" });
    if (!otpRecord) res.status(400).json({ message: "OTP not found" });

    // Check expiration
    if (otpRecord.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpRecord._id });
      res.status(400).json({ message: "OTP has expired" });
      return;
    }

    // Compare OTP
    if (otpRecord.otp !== otpCode) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }

    otpCode.verified = true;
    await otpRecord.save();

    res
      .status(200)
      .json({ message: "OTP verified successfully", otp: otpRecord });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
