import mongoose, { Schema, model } from "mongoose";
import { SecuritySchemaType } from "./profile.validation";

const profileSchema = new Schema<SecuritySchemaType>(
  {
    phone: { type: String },
    currentPassword: { type: String },
    confirmPassword: { type: String },
    twoFactorEnabled: { type: Boolean, default: false },
    lastPasswordChange: { type: Date },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile ||
  model<SecuritySchemaType>("Profile", profileSchema);

export default Profile;
