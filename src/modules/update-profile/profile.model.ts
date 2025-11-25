import mongoose, { Schema, model } from "mongoose";
import { SecuritySchemaType } from "./profile.validation";

const profileSchema = new Schema<SecuritySchemaType>(
  {
    confirmPassword: { type: String, required: false },
    currentPassword: { type: String, required: false },
    newPassword: { type: String, required: false },
    phone: { type: String, required: false },
    twoFactorEnabled: { type: Boolean, required: false },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile ||
  model<SecuritySchemaType>("Profile", profileSchema);

export default Profile;
