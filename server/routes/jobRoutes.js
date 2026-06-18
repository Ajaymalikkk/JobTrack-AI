const express = require("express");

const {
  createJob,
  getJobs,
  getJobStats,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createJob);
router.get("/", protect, getJobs);
router.get("/stats", protect, getJobStats);
router.get("/:id", protect, getJobById);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

module.exports = router;