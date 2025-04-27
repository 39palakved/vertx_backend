const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  credits: { type: Number, default: 0 },
  lastLoginDate: {
    type: String,
    default: "", 
  },
  savedPosts: [
    {
      postId: String,
      title: String,
      url: String,
      author: String,
      subreddit: String,
      imageUrl: String,
    }
  ]
});

module.exports = mongoose.model("User", userSchema);