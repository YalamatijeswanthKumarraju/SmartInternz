const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  category: String,
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  content: [String],
});

module.exports = mongoose.model("Course", courseSchema);