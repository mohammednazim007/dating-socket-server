import mongoose, { Document, Schema } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otp: string;
  purpose: "reset_password" | "verify_email";
  expiresAt: Date;
  verified: boolean;
}

const OtpSchema: Schema<IOtp> = new Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    purpose: {
      type: String,
      enum: ["reset_password", "verify_email"],
      required: true,
    },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Otp = mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);

export default Otp;
