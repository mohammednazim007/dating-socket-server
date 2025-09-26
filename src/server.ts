// src/server.ts
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import server from "./socket/socket";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
