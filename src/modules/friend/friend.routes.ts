import express, { Router } from "express";
import { getAllFriends } from "./friend.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
const router: Router = express.Router();

router.get("/all-friends", authMiddleware, getAllFriends);

export default router;
