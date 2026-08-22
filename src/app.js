require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const reviewRoutes = require("./routes/reviewRoutes");
const connectMongo = require("./config/mongo");

const app = express();

// CRITICAL: Trust Vercel's proxy so rate-limiting sees the real user IP
app.set("trust proxy", 1);

app.use(helmet());
// ... rest of the file stays the same ...
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  })
);
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

connectMongo().catch((err) => console.error("Mongo connection failed:", err.message));

app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => res.json({ status: "Review Service running" }));

app.get("/api/health", async (req, res) => {
  const mongoose = require("mongoose");
  const healthy = mongoose.connection.readyState === 1;
  res.status(healthy ? 200 : 503).json({ status: healthy ? "ok" : "degraded", mongo: healthy ? "ok" : "error" });
});

module.exports = app;