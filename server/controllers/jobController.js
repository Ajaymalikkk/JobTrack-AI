const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const { company, position, status, location } =
      req.body;

    const job = await Job.create({
      user: req.user._id,
      company,
      position,
      status,
      location,
    });

    res.status(201).json({
      success: true,
      job,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getJobs = async (req, res) => {
    try {
      const jobs = await Job.find({
        user: req.user._id,
      }).sort({
        createdAt: -1,
      });
  
      res.status(200).json({
        success: true,
        count: jobs.length,
        jobs,
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  const getJobStats = async (req, res) => {
    try {
      const jobs = await Job.find({
        user: req.user._id,
      });
  
      const stats = {
        Applied: 0,
        Interview: 0,
        Rejected: 0,
        Offer: 0,
      };
  
      jobs.forEach((job) => {
        stats[job.status]++;
      });
  
      res.status(200).json({
        success: true,
        stats,
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  const getJobById = async (req, res) => {
    try {
      const job = await Job.findOne({
        _id: req.params.id,
        user: req.user._id,
      });
  
      if (!job) {
        return res.status(404).json({
          message: "Job not found",
        });
      }
  
      res.status(200).json({
        success: true,
        job,
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  const mongoose = require("mongoose");

const updateJob = async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid Job ID",
      });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      job: updatedJob,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteJob = async (req, res) => {
    try {
      console.log("DELETE ID:", req.params.id);
      console.log("USER ID:", req.user?._id);
  
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Invalid Job ID",
        });
      }
  
      const job = await Job.findOne({
        _id: req.params.id,
        user: req.user._id,
      });
  
      console.log("FOUND JOB:", job);
  
      if (!job) {
        return res.status(404).json({
          message: "Job not found",
        });
      }
  
      await Job.findByIdAndDelete(req.params.id);

      console.log("JOB DELETED SUCCESSFULLY");
      
      res.status(200).json({
        success: true,
        message: "Job deleted successfully",
      });
    } catch (error) {
      console.log("DELETE ERROR:", error);
  
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  createJob,
  getJobs,
  getJobStats,
  getJobById,
  updateJob,
  deleteJob,
};