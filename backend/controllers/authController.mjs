import bcrypt from "bcryptjs";
import User from "../models/User.mjs";
import { sendEmail } from "../services/emailService.mjs";
import { generateToken } from "../config/authConfig.mjs";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register a new user
export const register = async (req, res) => {
let { name, email, password } = req.body;
  email = email.toLowerCase();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already registered, please log in" });
    }

    const newUser = new User({ name, email, password: hashedPassword, role : "user" });
    await newUser.save();
    // Send welcome email

    const token = generateToken({ id: newUser._id });
    await sendEmail(
      email,
      "Welcome to ACLyze AI! 🚀",
      `Hello ${name}, 

    Welcome to ACLyze AI – your intelligent assistant for ACL injury analysis! 

    We're excited to have you on board. With ACLyze AI, you can leverage advanced AI technology for accurate MRI-based diagnostics. 

    Start exploring today and feel free to reach out if you need any assistance! 

    Best,  
    The ACLyze AI Team`,
          `<h1>Welcome to ACLyze AI, ${name}! 🚀</h1>
      <p>We're thrilled to have you join our platform. ACLyze AI is designed to assist you with cutting-edge AI-powered ACL injury diagnostics.</p>
      <p>Start exploring today, and if you have any questions, we're here to help!</p>
      <p>Best,<br>The ACLyze AI Team</p>`
    );


    res.status(201).json({ message: "User registered and Email sent successfully", token ,user:newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error:error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Update lastLogin and increment loginCount
    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    const token = generateToken({ id: user._id , role: user.role });
    
    res.status(200).json({ message: "User logged in successfully", token , user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error:error.message });
  }
};

// Login with Google
export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  try {
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) return res.status(400).json({ message: 'Invalid Google token' });
    const email = payload.email.toLowerCase();
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name: payload.name,
        email,
      });
      await user.save();
    }
    const token = generateToken({ id: user._id});
    res.status(200).json({ message: 'User logged in with Google', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Google login failed', error: error.message });
  }
};

