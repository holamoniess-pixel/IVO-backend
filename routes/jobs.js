const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// CREATE JOB
router.post("/", async (req, res) => {
  try {
    const { title, company, description } = req.body;

    const job = await Job.create({
      title,
      company,
      description
    });

    res.json(job);
  } catch (err) {
    console.error("Post job error:", err);
    res.status(500).json({ message: "Job creation failed" });
  }
});

// GET JOBS
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Failed to load jobs" });
  }
});

module.exports = router;
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);

