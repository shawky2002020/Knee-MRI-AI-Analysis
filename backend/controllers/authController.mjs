import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';

// Register a new user
export const register = async (req, res) => {
  let { name, email, role, password } = req.body;
  email = email.toLowerCase()
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already registered, please log in" });
    }

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.status(201).json({ message: "User registered successfully", token });
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
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.status(200).json({message:"User logged in successfully" ,token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};