import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/auth.models';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecuretoken' ; // 🔐 Replace with process.env.JWT_SECRET in production

// 👤 REGISTER a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, password } = req.body;

    // 🔍 Check for missing fields
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 🧩 Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // 🔐 Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 💾 Create a new user document
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    // 📦 Save user to DB
    await newUser.save();

    // 🔏 Generate JWT Token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1d' });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone
      },
      token,
    });

  } catch (error) {
    console.error('❌ Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔐 LOGIN existing user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // ❗Check required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 🔍 Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 🔑 Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 🪙 Generate JWT Token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      token,
    });

  } catch (error) {
    console.error('❌ Error logging in:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
