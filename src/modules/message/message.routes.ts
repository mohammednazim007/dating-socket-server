import { Router } from "express";
import { getMessages } from "./message.service";

const router: Router = Router();

// REST endpoint to fetch chat history
router.get("/:roomId", async (req, res) => {
  try {
    const messages = await getMessages(req.params.roomId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
