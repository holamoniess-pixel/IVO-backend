const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET ALL PROFESSIONALS
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); 
    res.json(users);
  } catch (err) {
    console.error("Professionals error:", err);
    res.status(500).json({ message: "Failed to load professionals" });
  }
}); 

module.exports = router;
