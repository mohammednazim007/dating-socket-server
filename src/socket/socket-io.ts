import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import http from "http";
import { saveMessage } from "../modules/message/message.service";

export function initSocket(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("join_room", (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on(
      "send_message",
      async (data: { roomId: string; sender: string; message: string }) => {
        const saved = await saveMessage(data);

        // Broadcast to everyone in the room
        io.to(data.roomId).emit("receive_message", saved);
      }
    );

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  return io;
}
