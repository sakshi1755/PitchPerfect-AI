const logger = require("../utils/logger")
const multer = require("multer") // Import multer to fix the undeclared variable error

const errorHandler = (err, req, res, next) => {
  logger.error("Error occurred:", {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  })

  // Multer errors (file upload)
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        error: "File too large",
        message: "File size must be less than 10MB",
      })
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        error: "Too many files",
        message: "Only one file can be uploaded at a time",
      })
    }
  }

  // File type errors
  if (err.message.includes("Invalid file type")) {
    return res.status(400).json({
      error: "Invalid file type",
      message: err.message,
    })
  }

  // Gemini API errors
  if (err.message.includes("API key") || err.message.includes("quota")) {
    return res.status(503).json({
      error: "Service temporarily unavailable",
      message: "AI analysis service is currently unavailable. Please try again later.",
    })
  }

  // Content extraction errors
  if (err.message.includes("extract") || err.message.includes("OCR")) {
    return res.status(400).json({
      error: "Content extraction failed",
      message: err.message,
      suggestion: "Try uploading a different file format or paste your content as text instead.",
    })
  }

  // Validation errors
  if (err.message.includes("Validation") || err.message.includes("validation")) {
    return res.status(400).json({
      error: "Validation error",
      message: err.message,
    })
  }

  // Default error response
  const statusCode = err.statusCode || 500
  const message = process.env.NODE_ENV === "production" ? "An unexpected error occurred" : err.message

  res.status(statusCode).json({
    error: "Internal server error",
    message: message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  })
}

module.exports = errorHandler
