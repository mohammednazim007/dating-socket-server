import { Router } from "express";
import {
  sendOTP,
  verifyOTPAndResetPassword,
  resetPassword,
} from "@/modules/reset-password/email.controller";

const router: Router = Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTPAndResetPassword);
router.put("/reset-password", resetPassword);

export default router;
