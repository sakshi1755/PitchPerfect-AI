// routes/mockPitch.js
const express = require("express")
const multer = require("multer")
const { body, validationResult } = require("express-validator")
const mockPitchController = require("../controllers/mockPitchController")
const logger = require("../utils/logger")

const router = express.Router()

// Configure multer for file uploads (same as analysis)
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
const validateMockPitchRequest = [
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

const validateResponseRequest = [
  body("message")
    .notEmpty()
    .isLength({ min: 1, max: 5000 })
    .withMessage("Message must be between 1 and 5000 characters"),
  body("conversation")
    .optional()
    .isArray()
    .withMessage("Conversation must be an array"),
  body("messageCount")
    .optional()
    .isNumeric()
    .withMessage("Message count must be a number"),
]

const validateFeedbackRequest = [
  body("conversation")
    .notEmpty()
    .isArray()
    .withMessage("Conversation history is required"),
  body("sessionDuration")
    .optional()
    .isNumeric()
    .withMessage("Session duration must be a number"),
  body("messageCount")
    .optional()
    .isNumeric()
    .withMessage("Message count must be a number"),
]

/**
 * POST /api/mockpitch/initialize
 * Initialize a new mock pitch session
 */
router.post("/initialize", upload.single("file"), validateMockPitchRequest, async (req, res, next) => {
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
        message: "Please provide either a file or text content for the mock pitch.",
      })
    }

    logger.info(`Mock pitch initialization - File: ${!!req.file}, Text: ${!!req.body.text}`)

    const result = await mockPitchController.initializeMockPitch(req, res)

    logger.info("Mock pitch initialized successfully")
    res.json(result)
  } catch (error) {
    logger.error("Mock pitch initialization error:", error)
    next(error)
  }
})

/**
 * POST /api/mockpitch/respond
 * Get investor response during conversation
 */
router.post("/respond", validateResponseRequest, async (req, res, next) => {
  try {
    // Validation check
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      })
    }

    logger.info(`Generating investor response for message: "${req.body.message.substring(0, 50)}..."`)

    const result = await mockPitchController.generateInvestorResponse(req, res)

    logger.info("Investor response generated successfully")
    res.json(result)
  } catch (error) {
    logger.error("Investor response error:", error)
    next(error)
  }
})

/**
 * POST /api/mockpitch/feedback
 * Get final feedback and investment decision
 */
router.post("/feedback", validateFeedbackRequest, async (req, res, next) => {
  try {
    // Validation check
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      })
    }

    logger.info(`Generating feedback for ${req.body.conversation.length} message conversation`)

    const result = await mockPitchController.generateFeedback(req, res)

    logger.info("Pitch feedback generated successfully")
    res.json(result)
  } catch (error) {
    logger.error("Pitch feedback error:", error)
    next(error)
  }
})

module.exports = router