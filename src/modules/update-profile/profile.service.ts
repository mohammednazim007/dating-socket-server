import User from "../user/user.model";
import bcrypt from "bcryptjs";
import { SecuritySchemaType } from "./profile.validation";

export const updateProfileSecurity = async (
  userId: string,
  data: SecuritySchemaType
) => {
  const { phone, currentPassword, confirmPassword, twoFactorEnabled } = data;

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found.");

  const updates: Partial<{
    phone: string;
    password: string;
    twoFactorEnabled: boolean;
    lastPasswordChange: Date;
  }> = {};

  // --- Password change logic ---
  if (currentPassword && confirmPassword) {
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) throw new Error("Invalid current password.");

    updates.password = await bcrypt.hash(confirmPassword, 10);
    updates.lastPasswordChange = new Date();
  }

  // --- Update phone ALWAYS ---
  if (phone) updates.phone = phone;

  // --- Update 2FA ONLY if provided ---
  if (typeof twoFactorEnabled === "boolean") {
    updates.twoFactorEnabled = Boolean(twoFactorEnabled);
  }
  console.log("updates", updates);
  console.log("2", twoFactorEnabled);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true }
  ).select("-password");

  if (!updatedUser) throw new Error("Failed to update user security settings.");

  return updatedUser;
};
