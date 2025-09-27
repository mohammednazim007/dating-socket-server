// // src/server.ts
// import dotenv from "dotenv";
// dotenv.config();
// import connectDB from "./config/db";
// import app from "./app";

// const PORT = process.env.PORT || 8000;

// const startServer = async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Error starting server:", err);
//   }
// };

// startServer();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import app from "./app";
import http from "http";
import { initSocket } from "./socket/socket-io";

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    // Initialize Socket.IO
    initSocket(server);

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
