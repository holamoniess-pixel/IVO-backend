
const mongoose = require("mongoose");
module.exports = mongoose.model("User", new mongoose.Schema({
  name:String,email:String,password:String,phone:String,
  headline:String,location:String,contact:String,about:String,
  avatar:String,linkedin:String,github:String,twitter:String,
  skills:[String]
}));
