import { Request, Response } from "express";
import { sendOtp } from "../services/mailer";

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

  try {
    await sendOtp(email, otp);
    console.log(`Sent OTP ${otp} to ${email}`);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send OTP:", err);
    res.status(500).json({ error: "Failed to send email" });
    return;
  }
};
