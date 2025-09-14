import express, { Router } from "express";
import { register, login, logout, getCurrent } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { loginSchema, registerSchema } from "./user.validation";
import { upload } from "../../middlewares/multer.middleware";

const router: Router = express.Router();

//**  Public routes
router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.get("/logout", logout);

//**  Protected routes (require authentication)
router.get("/current-user/:userId", authMiddleware, getCurrent);
router.get("/profile", authMiddleware, upload.single("image"));

export default router;
