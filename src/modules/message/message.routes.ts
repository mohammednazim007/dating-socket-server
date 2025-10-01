import express, { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import {
  getMessagesController,
  sendMessageController,
} from "./message.controller";

const router: Router = express.Router();

router.get("/:receiver_id", authMiddleware, getMessagesController);
router.post("/send/:sender_id", authMiddleware, sendMessageController);

export default router;
