import { Request, Response } from "express";
import { saveMessage, getMessagesByRoom } from "./message.service";
import { IMessage } from "./message.interface";

// Save new message
export const createMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, room, content } = req.body as IMessage;

    if (!senderId || !room || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const message = await saveMessage({ senderId, room, content });
    return res.status(201).json(message);
  } catch (error) {
    console.error("Error saving message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get messages by room
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required" });
    }

    const messages = await getMessagesByRoom(roomId);
    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
