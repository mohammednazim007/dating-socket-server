import mongoose, { Schema } from "mongoose";
import { IMessage } from "./message.interface";

const messageSchema = new Schema<IMessage>(
  {
    text: { type: String, trim: true },
    media: { type: String },
    sender_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Message =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
