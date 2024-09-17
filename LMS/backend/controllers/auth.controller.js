const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie.js");
const { sendVerificationEmail } = require("../utils/sendVerificationEmail.js");

const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are required" });
    }

    const userAlreadyExsists = await User.findOne({ email });

    if (userAlreadyExsists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verficationToken: verificationToken,
      verficationTokenExpAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    // generateTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationToken);

    return res.status(200).json({
      success: true,
      message: "User created",
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email);

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Please enter email and password" });
    }
    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Login success",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const signOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: false, message: "Logged out successfully" });
};

const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verficationToken: code,
      verficationTokenExpAt: { $gt: Date.now() },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "No users found" });
    }

    user.isVerified = true;
    user.verficationToken = undefined;
    user.verficationTokenExpAt = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email Verification success",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error verifying email" });
  }
};

module.exports = {
  signUp,
  signIn,
  signOut,
  verifyEmail,
};
