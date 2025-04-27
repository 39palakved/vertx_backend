const express = require('express');
const router = express.Router();
const { requireAuth } = require("../Middleware/authMiddleware");
const User = require('../models/user');

router.post('/savepost', requireAuth, async (req, res) => {
  try {
    const { postId, title, url, author, subreddit, imageUrl } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    user.savedPosts.push({ postId, title, url, author, subreddit, imageUrl });
    user.credits += 10;

    await user.save();

    res.status(200).json({ message: 'Post saved and credits updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});
router.get('/getsavedposts', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({ savedPosts: user.savedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

module.exports = router;