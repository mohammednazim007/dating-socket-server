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

  socket.on("join_room", (room) => {
    console.log("✅ User joined room:", room);
  });
});

export default httpServer;
