// src/app.ts
import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import userRoutes from "@/modules/user/user.routes";
import messageRoutes from "@/modules/message/message.routes";
import friendRoutes from "@/modules/friend/friend.routes";
import resetRoute from "@/modules/reset-password/email.routes";
import { errorHandler } from "@/middlewares/error.middleware";
import profileRoutes from "@/modules/update-profile/profile.routes";

const app: Application = express();

// CORS configuration support
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allow credentials (cookies, HTTP authentication)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"], // Allowed headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global health route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/auth", resetRoute);

app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/friend", friendRoutes);

// Global Health & Error Handler
app.use(errorHandler);

export default app;
