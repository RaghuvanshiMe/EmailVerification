import { Verification_Email_Template } from "../libs/EmailTemplate.js";
import { transporter } from "./Email.config.js";

export const SendVerificationCode = async (email, verificationCode) => {
  try {
    const htmlContent = Verification_Email_Template.replace(
      "{verificationCode}",
      verificationCode
    );

    const response = await transporter.sendMail({
      from: '"Raghuvanshi" <mihirsingh8383@gmail.com>',
      to: email,
      subject: "Verify your Email",
      text: `Your verification code is: ${verificationCode}`,
      html: htmlContent,
    });

    console.log("📧 Email sent successfully:", response.messageId);
    return { success: true, response };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error };
  }
};

