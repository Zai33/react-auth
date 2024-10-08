import { generateTokenAndCookies } from "../lib/utils/generateToken.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Email and password are required!",
        result: null,
      });
    }

    if (!user) {
      return res
        .status(400)
        .json({ con: false, error: "Invalid Credentials!", result: null });
    }

    // Check if the password matches
    const correctPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!correctPassword) {
      return res
        .status(400)
        .json({ con: false, error: "Invalid Credentials!", result: null });
    }

    const token = generateTokenAndCookies(user._id, res);

    res.status(200).json({
      con: true,
      message: "Login successful!",
      result: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLogin: new Date().toISOString(),
        token: token,
      },
    });
  } catch (error) {
    console.error("Error in login Controller!", error.message);
    res
      .status(500)
      .json({ con: false, error: "Internal Server Error!", result: null });
  }
};

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid Email format!" });
    }

    const exitEmail = await User.findOne({ email });
    if (exitEmail) {
      return res.status(400).json({ error: "Email is already taken!" });
    }

    const exitName = await User.findOne({ name });
    if (exitName) {
      return res.status(400).json({ error: "Name is already token!" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is Required!" });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = User({
      name,
      email,
      password: hashPassword,
    });

    const token = generateTokenAndCookies(newUser._id, res);
    if (newUser) {
      await newUser.save();
      res.status(201).json({
        con: true,
        message: "User Register Successfully.",
        result: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
          token: token,
        },
      });
    } else {
      res.status(400).json({ error: "Invalid user data!" });
    }
  } catch (error) {
    console.error("Error in Register Controller", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfully." });
  } catch (error) {
    console.error("Error in logout Controller", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in GetMe Controller", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
