const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require('dotenv').config();
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoute = require("./routes/userroute")
dotenv.config();
const adminRoute = require("./routes/adminroute")
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authroute");
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes)
const savepostRoutes = require("./routes/savepost");
app.use("/api", savepostRoutes);
app.use("/api", userRoute);
app.use("/api", adminRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error(err));
  