import { Server } from "socket.io";
import http from "http";
import app from "../app";

const httpServer = http.createServer(app); // ✅ correct

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  // console.log("✅ User connected:", socket.id);

  // Join a private room (roomId can be senderId_receiverId)
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`✅ User ${socket.id} joined room ${roomId}`);
  });

  // Send a message to a specific room
  socket.on("send_message", ({ senderId, receiverId, content }) => {
    // Generate a deterministic room ID (so both sender and receiver join same room)
    const roomId =
      senderId < receiverId
        ? `${senderId}_${receiverId}`
        : `${receiverId}_${senderId}`;

    io.to(roomId).emit("receive_message", { senderId, content });
    console.log(`✅ Message sent in room ${roomId}:`, content);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

export default httpServer;
