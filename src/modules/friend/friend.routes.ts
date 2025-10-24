import express, { Router } from "express";
import { 
  getAllFriends, 
  sendFriendRequest, 
  getSentFriendRequests, 
  getAllNonFriendUsers, 
  cancelFriendRequest 
} from "./friend.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
const router: Router = express.Router();

router.get("/all-friends", authMiddleware, getAllFriends);
router.put("/send-request", authMiddleware, sendFriendRequest);
router.get("/sent-requests", authMiddleware, getSentFriendRequests);
router.get("/non-friends", authMiddleware, getAllNonFriendUsers);
router.delete("/cancel-request/:receiverId", authMiddleware, cancelFriendRequest);

export default router;
