// src/socket.ts
import { Server } from "socket.io";
import http from "http";
import app from "../app";
import Message from "../modules/message/message.model";
import { saveMessage } from "../modules/message/message.service";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// socket logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on("send_message", async (data) => {
    try {
      // Save to DB
      const newMsg = await saveMessage({
        senderId: data.senderId, // should be userId
        room: data.room,
        content: data.content,
      });

      // Broadcast to room
      io.to(data.room).emit("receive_message", newMsg);
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export default server;
