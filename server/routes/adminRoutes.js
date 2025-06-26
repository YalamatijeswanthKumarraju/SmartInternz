const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser, deleteCourse } = require("../controllers/adminController");

router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);
router.delete("/course/:id", deleteCourse);

module.exports = router;

