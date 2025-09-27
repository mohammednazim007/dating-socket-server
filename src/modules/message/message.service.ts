import Message, { IMessage } from "./message.model";

export const saveMessage = async (data: {
  roomId: string;
  sender: string;
  message: string;
}): Promise<IMessage> => {
  const msg = new Message(data);
  return await msg.save();
};

export const getMessages = async (roomId: string): Promise<IMessage[]> => {
  return await Message.find({ roomId }).sort({ createdAt: 1 });
};
