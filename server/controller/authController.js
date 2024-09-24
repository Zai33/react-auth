import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    // Check if the password matches
    const correctPassword = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!correctPassword) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Error in login Controller!", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

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

    if (newUser) {
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ error: "Invalid user data!" });
    }
  } catch (error) {
    console.error("Error in Register Controller", error.message);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
