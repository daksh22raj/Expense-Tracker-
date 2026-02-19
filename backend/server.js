const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ==============================
// Middleware
// ==============================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional request logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ==============================
// API Routes
// ==============================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/income", require("./routes/income"));
app.use("/api/expense", require("./routes/expense"));

// Health check (important for deployment)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
  });
});

// ==============================
// Serve Frontend (CRA Build)
// ==============================

// Go from backend → root folder
const rootDir = path.resolve(__dirname, "..");

// Serve static files from CRA build folder
app.use(express.static(path.join(rootDir, "frontend", "build")));

// Catch-all route for React Router
app.get("*", (req, res) => {
  res.sendFile(
    path.join(rootDir, "frontend", "build", "index.html")
  );
});

// ==============================
// MongoDB Connection
// ==============================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

connectDB();

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// ==============================
// Handle Unhandled Rejections
// ==============================
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1);
});
