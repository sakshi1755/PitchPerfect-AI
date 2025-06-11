const express = require("express")
const multer = require("multer")
const { body, validationResult } = require("express-validator")
const analysisController = require("../controllers/analysisController")
const logger = require("../utils/logger")

const router = express.Router()

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ]

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type. Only PDF, PPT, PPTX, JPG, and PNG files are allowed."), false)
    }
  },
})

// Validation middleware
const validateAnalysisRequest = [
  body("text")
    .optional()
    .isLength({ min: 10, max: 50000 })
    .withMessage("Text content must be between 10 and 50,000 characters"),
  body("industry")
    .optional()
    .isIn(["Technology", "Healthcare", "Finance", "E-commerce", "Other"])
    .withMessage("Invalid industry selection"),
  body("stage")
    .optional()
    .isIn(["Pre-seed", "Seed", "Series A", "Series B+"])
    .withMessage("Invalid funding stage selection"),
]

// Routes

/**
 * POST /api/analysis/analyze
 * Analyze pitch content (file or text)
 */
router.post("/analyze", upload.single("file"), validateAnalysisRequest, async (req, res, next) => {
  try {
    // Validation check
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      })
    }

    // Check if either file or text is provided
    if (!req.file && !req.body.text) {
      return res.status(400).json({
        error: "Missing content",
        message: "Please provide either a file or text content for analysis.",
      })
    }

    logger.info(`Analysis request received - File: ${!!req.file}, Text: ${!!req.body.text}`)

    const result = await analysisController.analyzePitch(req, res)

    logger.info("Analysis completed successfully")
    res.json(result)
  } catch (error) {
    logger.error("Analysis route error:", error)
    next(error)
  }
})

/**
 * GET /api/analysis/sample
 * Get sample analysis for demo purposes
 */
router.get("/sample", async (req, res, next) => {
  try {
    const sampleResult = await analysisController.getSampleAnalysis()
    res.json(sampleResult)
  } catch (error) {
    logger.error("Sample analysis error:", error)
    next(error)
  }
})

/**
 * POST /api/analysis/feedback
 * Submit feedback on analysis results
 */
router.post(
  "/feedback",
  [
    body("analysisId").notEmpty().withMessage("Analysis ID is required"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("feedback").optional().isLength({ max: 1000 }).withMessage("Feedback must be less than 1000 characters"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: "Validation failed",
          details: errors.array(),
        })
      }

      const result = await analysisController.submitFeedback(req.body)
      res.json(result)
    } catch (error) {
      logger.error("Feedback submission error:", error)
      next(error)
    }
  },
)

module.exports = router
