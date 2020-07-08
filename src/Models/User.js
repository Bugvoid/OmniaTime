const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: String,
  email: String,
  name: String
});

module.exports = mongoose.model("User", UserSchema);
