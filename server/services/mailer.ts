import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtp = async (email: string, otp: string) => {
  await transporter.sendMail({
    from: `"Job Tracker" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "OTP login code",
    text: `${otp} is your verification code. For your security, do not share this code.`,
  });
};
