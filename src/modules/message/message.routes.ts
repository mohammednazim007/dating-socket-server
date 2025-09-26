import express, { Router } from "express";
import { createMessage, getMessages } from "./message.controller";

const router: Router = express.Router();

router.post("/", createMessage);
router.get("/:roomId", getMessages);

export default router;
