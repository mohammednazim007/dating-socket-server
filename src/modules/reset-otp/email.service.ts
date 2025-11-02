import { resend } from "@/config/resend";

export const sendOtpEmail = async (
  to: string,
  otpCode: string
): Promise<void> => {
  try {
    await resend.emails.send({
      from: "YourApp <no-reply@yourdomain.com>",
      to: [to],
      subject: "Your OTP Code",
      html: `
        <div style="font-family:sans-serif;text-align:center;border:1px solid #eee;border-radius:8px;padding:20px;max-width:400px;margin:auto;">
          <h2>Verification Code</h2>
          <p>Use this code to verify your request:</p>
          <h1 style="letter-spacing:5px;color:#007bff;">${otpCode}</h1>
          <p>This code expires in <b>5 minutes</b>.</p>
        </div>
      `,
    });

    console.log(`✅ OTP email sent to: ${to}`);
  } catch (error) {
    console.error("❌ Failed to send OTP:", error);
    throw new Error("Unable to send OTP email");
  }
};
