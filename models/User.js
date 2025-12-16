const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  headline: String,
  location: String,
  contact: String,
  about: String,
  avatar: String,
  linkedin: String,
  github: String,
  twitter: String,
  skills: [String],
});

// ✅ Prevent OverwriteModelError
module.exports =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);
