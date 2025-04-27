const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ msg: "Registered Successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", error: err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

    if (user.lastLoginDate !== today) {
      user.credits += 5;
      user.lastLoginDate = today;
      await user.save(); // ✅ Wait for it to completely save
    }

    // Ab fresh data se payload banao
    const payload = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      credits: user.credits,
      savedPosts: user.savedPosts,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email,
      credits: user.credits,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
