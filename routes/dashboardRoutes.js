const express = require("express");
const { requireRole, requireAuth } = require("../Middleware/authMiddleware");
const router = express.Router();

// User Dashboard Route
router.get("/user", requireAuth, requireRole("user"), (req, res) => {
    
  res.json({
    name: req.user.name,
    email: req.user.email,
    credits: req.user.credits,
    role: req.user.role,
  });
});

// Admin Dashboard Route
router.get("/admin", requireAuth, requireRole("admin"), (req, res) => {
    console.log( 'name ----' +  req.user.name)
  res.json({
    name: req.user.name,
    
    email: req.user.email,
    role: req.user.role,
    usersCount: 100,  // Just as an example, this can be dynamic.
  });
});

module.exports = router;
