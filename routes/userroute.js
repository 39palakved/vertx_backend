const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Make sure the User model is correctly imported

// Middleware to verify token (Authentication)
const { requireAuth } = require("../Middleware/authMiddleware");
const { sharePostLink } = require('../controllers/usercontroller');

router.get('/user', requireAuth, async (req, res) => {
  try {
    // Assuming `req.user` is set by your authentication middleware
    const user = await User.findById(req.user.id).populate('savedPosts');  // Populate saved posts if needed

    // If user is found, send back the user data including savedPosts
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
        credits: user.credits,
        savedPosts: user.savedPosts,  // This should be an array of saved posts
      }
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Server error" });
  }
});
router.post('/share-post', requireAuth, sharePostLink);
module.exports = router;