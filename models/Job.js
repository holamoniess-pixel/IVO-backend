
const mongoose = require("mongoose");
module.exports = mongoose.model("Job", new mongoose.Schema({
  title:String,company:String,description:String,
  createdAt:{type:Date,default:Date.now}
}));
