const otpStore: Record<string, string> = {};

export function saveOtp(email: string, otp: string) {
  otpStore[email] = otp;
}

export function getOtp(email: string) {
  return otpStore[email];
}
export function deleteOtp(email: string) {
  delete otpStore[email];
}
