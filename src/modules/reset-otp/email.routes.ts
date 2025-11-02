import { Router } from "express";
import {
  sendOTP,
  verifyOTPAndResetPassword,
} from "@/modules/reset-otp/email.controller";

const router: Router = Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTPAndResetPassword);

export default router;
