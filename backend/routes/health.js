const express = require("express")
const { GoogleGenerativeAI } = require("@google/generative-ai")
const logger = require("../utils/logger")

const router = express.Router()

/**
 * GET /api/health
 * Basic health check
 */
router.get("/", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || "1.0.0",
  })
})

/**
 * GET /api/health/detailed
 * Detailed health check including external services
 */
router.get("/detailed", async (req, res) => {
  const healthCheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || "1.0.0",
    services: {},
  }

  // Check Gemini API connectivity
  try {
    if (process.env.GEMINI_API_KEY) {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

      // Simple test prompt
      const result = await model.generateContent("Test connection")

      healthCheck.services.gemini = {
        status: "connected",
        responseTime: Date.now(),
      }
    } else {
      healthCheck.services.gemini = {
        status: "not_configured",
        message: "GEMINI_API_KEY not found",
      }
    }
  } catch (error) {
    logger.error("Gemini API health check failed:", error)
    healthCheck.services.gemini = {
      status: "error",
      message: error.message,
    }
    healthCheck.status = "degraded"
  }

  // Check environment variables
  const requiredEnvVars = ["GEMINI_API_KEY"]
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  healthCheck.configuration = {
    status: missingEnvVars.length === 0 ? "complete" : "incomplete",
    missingVariables: missingEnvVars,
  }

  if (missingEnvVars.length > 0) {
    healthCheck.status = "degraded"
  }

  res.json(healthCheck)
})

module.exports = router
