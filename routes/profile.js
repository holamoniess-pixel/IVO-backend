const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// AUTH MIDDLEWARE
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// GET MY PROFILE
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId, "-password");
    res.json(user);
  } catch {
    res.status(500).json({ message: "Failed to load profile" });
  }
});

// UPDATE PROFILE
router.patch("/", auth, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Profile update failed" });
  }
});

module.exports = router;
