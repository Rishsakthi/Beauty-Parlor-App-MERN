const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashpassword,
      role: "user"
    });

    await newUser.save();

    res.status(201).json({
      message: `User registered with username ${username}`
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      role: user.role
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

module.exports = { register, login };