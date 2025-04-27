const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Middleware to verify if the user is an admin
const { requireAuth, requireRole } = require("../Middleware/authMiddleware");


router.get('/users', requireAuth, requireRole('admin'), async (req, res) => {
    try {
      
      const users = await User.find({ role: { $ne: 'admin' } });  
  
      res.json({
        users: users.map(user => ({
          id: user._id,
          name: user.name,
          email: user.email,
          credits: user.credits
        }))
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;