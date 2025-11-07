import { Request, Response, NextFunction } from "express";
import { getReceiverSocketId, io } from "@/socket/socket-io";
import cloudinary from "@/cloudinary/cloudinary";
import { createMessage, getMessages } from "@/modules/message/message.service";
import mongoose from "mongoose";

// ✅ Send message
export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.body;
    const userId = req.user?.id as string;
    const { friend_id } = req.params; // comes from URL

    // Type guard
    if (!userId || !friend_id) {
      return res
        .status(400)
        .json({ message: "sender_id and receiver_id are required" });
    }

    let mediaPath: string | undefined;

    // ✅ Handle image upload if present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      mediaPath = result.secure_url;
    }

    // ✅ Create message in MongoDB
    const newMessage = await createMessage({
      text,
      media: mediaPath,
      user_id: new mongoose.Types.ObjectId(userId),
      friend_id: new mongoose.Types.ObjectId(friend_id),
    });

    // ✅ Emit message to receiver if online
    const receiverSocketId = getReceiverSocketId(friend_id);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new_message", newMessage);
    }

    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// get chat history between two users

export const getChatHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id as string;
    const { friend_id } = req.params;

    const messages = await getMessages(userId, friend_id);

    res
      .status(200)
      .json({ messages: "Chat history fetched successfully", data: messages });
  } catch (error) {
    next(error);
  }
};
