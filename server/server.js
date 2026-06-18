const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(
    cors({
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "JobTrack AI API Running",
  });
});
app.post("/test", (req, res) => {
    res.json({
      success: true,
      message: "POST working",
    });
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });