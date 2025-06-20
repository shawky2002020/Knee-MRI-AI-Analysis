import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (to) => {
  try {
    const templateParams = {
      to_email: to,
    };

    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    });

    console.log("✅ Email sent successfully", response.status, response.data);
  } catch (error) {
    console.error("❌ Email sending failed", error?.response?.data || error.message);
  }
};
