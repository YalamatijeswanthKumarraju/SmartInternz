const express = require("express");
const router = express.Router();
const { createCourse, getAllCourses, enrollInCourse } = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllCourses);  // public access
router.post("/create", protect, createCourse);  // protected
router.post("/enroll", protect, enrollInCourse);  // protected

module.exports = router;
