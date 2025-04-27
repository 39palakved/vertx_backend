const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

exports.requireRole = (role) => (req, res, next) => {
    console.log("User Role:", req.user.role); 
  if (req.user.role !== role) {
    return res.status(403).json({ msg: "Forbidden: Access denied" });
  }
  next();
};
 