import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";
import { sendEmail } from "../services/emailService.mjs";

// Register a new user
export const register = async (req, res) => {
  let { name, email, role, password } = req.body;
  email = email.toLowerCase();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already registered, please log in" });
    }

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    // Send welcome email

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
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


    res.status(201).json({ message: "User registered and Email sent successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
