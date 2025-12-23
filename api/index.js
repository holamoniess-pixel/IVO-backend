require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ ADD THIS

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   SERVE FRONTEND
======================= */
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

/* =======================
   DATABASE CONNECTION
======================= */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("✅ MongoDB connected");
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

/* =======================
   HEALTH CHECK
======================= */
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =======================
   ROUTES
======================= */
app.use("/api/auth", require("../routes/auth"));
app.use("/api/jobs", require("../routes/jobs"));
app.use("/api/profile", require("../routes/profile"));
app.use("/api/professionals", require("../routes/professionals"));

module.exports = app;