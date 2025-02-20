import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Configure transporter (Gmail SMTP example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your app password (Not Gmail password)
  },
});

/**
 * Send an email
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Email text (plain text)
 * @param {string} html - Email content (HTML format)
 */
export const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `"ACLyze AI " <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Email sending failed", error);
  }
};
