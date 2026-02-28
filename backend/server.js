const path = require("path");
const fs = require("fs");
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

// ==============================
// API Routes
// ==============================
app.use("/api/auth", require("./routes/auth"));
app.use("/api/income", require("./routes/income"));
app.use("/api/expense", require("./routes/expense"));

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// ==============================
// Serve React Frontend (PRODUCTION)
// ==============================
const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
const isProduction = process.env.NODE_ENV === "production";
const buildExists = fs.existsSync(path.join(frontendBuildPath, "index.html"));

if (isProduction && buildExists) {
  console.log("Serving frontend from:", frontendBuildPath);
  app.use(express.static(frontendBuildPath));
  // Catch non-API routes and return React app
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
} else if (isProduction && !buildExists) {
  console.warn("Production mode but frontend build not found at", frontendBuildPath);
  app.get("/", (req, res) => {
    res.status(503).json({
      error: "Frontend not built",
      message: "Run 'npm run build' in the repo root so the frontend is built before deploy.",
    });
  });
}

// ==============================
// MongoDB Connection
// ==============================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ==============================
// Start Server
// ==============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});