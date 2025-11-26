import { authMiddleware } from "@/middlewares/auth.middleware";
import express, { Router } from "express";
import { updateSecurityController } from "./profile.controller";

const router: Router = express.Router();

router.put("/security", authMiddleware, updateSecurityController);

export default router;
