// src/modules/message/message.interface.ts
export interface IMessage {
  senderId: string;
  room: string;
  content: string;
  createdAt?: Date;
}
