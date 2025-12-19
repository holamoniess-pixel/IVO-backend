const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// routes
app.use("/api/professionals", require("./routes/professionals"));
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));

// health check (IMPORTANT)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// port (Fly uses 8080 internally)
const PORT = process.env.PORT || 8080;

// mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });
