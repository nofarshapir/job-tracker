import { Router } from "express";
import { requestOtp } from "../controllers/authController";

const router = Router();

router.post("/request-otp", requestOtp);

export default router;
