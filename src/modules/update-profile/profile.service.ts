import User from "../user/user.model";
import bcrypt from "bcryptjs";
import { SecuritySchemaType } from "./profile.validation";
import { success } from "zod";

export const updateProfileSecurity = async (
  userId: string,
  data: SecuritySchemaType
) => {
  const { phone, currentPassword, confirmPassword, twoFactorEnabled } = data;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  // Build updates object with full type safety
  const updates: Partial<{
    phone: string;
    password: string;
    twoFactorEnabled: boolean;
  }> = {};

  // If user wants to change password
  if (currentPassword || confirmPassword) {
    if (!currentPassword || !confirmPassword) {
      throw new Error({
        message: "Password change requires both current and new passwords.",
        success: false,
      } as unknown as string);
    }

    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      throw new Error("Invalid current password.");
    }

    updates.password = await bcrypt.hash(confirmPassword, 10);
  }

  // Update phone
  updates.phone = phone;

  // Update 2FA
  if (typeof twoFactorEnabled === "boolean") {
    updates.twoFactorEnabled = twoFactorEnabled;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    throw new Error("Failed to update user security settings.");
  }

  return updatedUser;
};
