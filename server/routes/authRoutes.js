const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.post("/register", registerUser);
module.exports = router;