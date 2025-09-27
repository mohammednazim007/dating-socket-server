import mongoose, { Schema, model, Document } from "mongoose";
export interface IMessage extends Document {
  roomId: string;
  sender: string;
  message: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    roomId: { type: String, required: true },
    sender: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Message || model<IMessage>("Message", messageSchema);
export default Message;
