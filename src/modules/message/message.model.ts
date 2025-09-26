// src/modules/message/message.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  senderId: string;
  room: string;
  content: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: { type: String, required: true },
    room: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model<IMessage>("Message", messageSchema);
export default MessageModel;
