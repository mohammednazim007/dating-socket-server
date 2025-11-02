import { generateOTP } from "@/utils/generateOTP";
import User from "../user/user.model";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Otp from "./email.model";
import { sendOtpEmail } from "./email.service";

export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ message: "User not found" });

    // Generate OTP & hash password
    const otpCode = generateOTP();
    const hashedOtp = await bcrypt.hash(otpCode, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Remove existing OTP for same user/purpose
    await Otp.deleteMany({ email, purpose: "reset_password" });

    // Store OTP in DB
    const otpEntry = new Otp({
      email,
      otp: hashedOtp,
      purpose: "reset_password",
      expiresAt,
    });
    await otpEntry.save();

    await sendOtpEmail(email, otpCode);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyOTPAndResetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, otpCode, newPassword } = req.body;

  try {
    // Find OTP record
    const otpRecord = await Otp.findOne({ email, purpose: "reset_password" });
    if (!otpRecord) res.status(400).json({ message: "OTP not found" });

    // Check expiration
    if (otpRecord && otpRecord.expiresAt < new Date())
      res.status(400).json({ message: "OTP has expired" });

    // Compare OTP
    const isMatch = await bcrypt.compare(otpCode, otpRecord.otp);
    if (!isMatch) res.status(400).json({ message: "Invalid OTP" });

    //Update user password
    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    otpRecord.verified = true;
    await otpRecord.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {}
};
