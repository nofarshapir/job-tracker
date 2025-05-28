import { Request, Response } from "express";
import { sendOtp } from "../services/mailer";
import { getOtp, deleteOtp, saveOtp } from "../utils/otpStore";

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

  try {
    await sendOtp(email, otp);
    saveOtp(email, otp);
    console.log(`Sent OTP ${otp} to ${email}`);
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to send OTP:", err);
    res.status(500).json({ error: "Failed to send email" });
    return;
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Invalid email" });
    return;
  }
  if (!otp || typeof otp !== "string") {
    res.status(400).json({ error: "Invalid otp" });
    return;
  }

  const storedOtp = getOtp(email);

  if (!storedOtp) {
    return res.status(400).json({ error: "OTP expired or not found" });
  }
  if (storedOtp !== otp) {
    return res.status(401).json({ error: "Invalid OTP" });
  }
  deleteOtp(email);
  return res.json({ success: true, message: "OTP verified successfully" });
};
