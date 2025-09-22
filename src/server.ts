// src/server.ts
import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
