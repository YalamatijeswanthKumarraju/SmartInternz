const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Route files
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const adminRoutes = require("./routes/adminRoutes");

const { protect } = require("./middleware/authMiddleware");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/users", userRoutes); // Login, register, etc.
app.use("/api/courses", courseRoutes); // Create, enroll, fetch
app.use("/api/admin", protect, adminRoutes); // Only accessible by admins

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 SmartIntern API is up and running!");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server started on http://localhost:${PORT}`)
);
