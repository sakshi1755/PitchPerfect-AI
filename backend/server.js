// server.js
const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
const morgan = require("morgan")
const rateLimit = require("express-rate-limit")
require("dotenv").config({ path: ".env.local" })

const logger = require("./utils/logger")
const analysisRoutes = require("./routes/analysis")
const mockPitchRoutes = require("./routes/mockPitch")  // Add this line
const healthRoutes = require("./routes/health")
const errorHandler = require("./middleware/errorHandler")

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet())
app.use(compression())

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiter)

// Stricter rate limiting for analysis endpoint
const analysisLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 analysis requests per minute
  message: {
    error: "Too many analysis requests. Please wait before submitting another pitch.",
    retryAfter: "1 minute",
  },
})

// Rate limiting for mock pitch (more lenient for conversation)
const mockPitchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // allow more requests for conversation flow
  message: {
    error: "Too many mock pitch requests. Please wait before continuing the conversation.",
    retryAfter: "1 minute",
  },
})

// Logging
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }))

// Body parsing middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Routes
app.use("/api/health", healthRoutes)
app.use("/api/analysis", analysisLimiter, analysisRoutes)
app.use("/api/mockpitch", mockPitchLimiter, mockPitchRoutes)  // Add this line

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "PitchPerfect AI Backend API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/api/health",
      analysis: "/api/analysis",
      mockpitch: "/api/mockpitch",  // Add this line
    },
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: `The requested endpoint ${req.originalUrl} does not exist.`,
    availableEndpoints: ["/api/health", "/api/analysis", "/api/mockpitch"],  // Add mockpitch
  })
})

// Error handling middleware
app.use(errorHandler)

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...")
  process.exit(0)
})

process.on("SIGINT", () => {
  logger.info("SIGINT received. Shutting down gracefully...")
  process.exit(0)
})

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 PitchPerfect AI Backend running on port ${PORT}`)
  logger.info(`📊 Environment: ${process.env.NODE_ENV || "development"}`)
  logger.info(`🔗 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:3000"}`)
})

module.exports = app