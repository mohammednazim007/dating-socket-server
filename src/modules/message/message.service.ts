// src/modules/message/message.service.ts
import Message from "./message.model";
import { IMessage } from "./message.interface";

export const saveMessage = async (msg: IMessage) => {
  const message = new Message(msg);
  return await message.save();
};

export const getMessagesByRoom = async (room: string) => {
  return await Message.find({ room }).sort({ createdAt: 1 });
};
