const { GoogleGenerativeAI } = require("@google/generative-ai")
const fileProcessor = require("../services/fileProcessor")
const geminiService = require("../services/geminiService")
const logger = require("../utils/logger")
const { v4: uuidv4 } = require("uuid")

class AnalysisController {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  }

  /**
   * Analyze pitch content using Gemini AI
   */
  async analyzePitch(req, res) {
    try {
      let content = ""
      const analysisId = uuidv4()

      // Process file if provided
      if (req.file) {
        logger.info(`Processing file: ${req.file.originalname} (${req.file.mimetype})`)
        content = await fileProcessor.extractContent(req.file)

        if (!content || content.trim().length < 10) {
          throw new Error("Could not extract meaningful content from the uploaded file")
        }
      }

      // Use text content if provided
      if (req.body.text) {
        content += (content ? "\n\n" : "") + req.body.text
      }

      if (!content || content.trim().length < 10) {
        throw new Error("Insufficient content for analysis")
      }

      logger.info(`Analyzing content (${content.length} characters)`)

      // Get analysis from Gemini
      const analysis = await geminiService.analyzePitchContent(content, {
        industry: req.body.industry,
        stage: req.body.stage,
      })

      // Structure the response
      const result = {
        analysisId,
        timestamp: new Date().toISOString(),
        contentLength: content.length,
        hasFile: !!req.file,
        fileName: req.file?.originalname,
        analysis: analysis,
        metadata: {
          industry: req.body.industry || "Not specified",
          stage: req.body.stage || "Not specified",
          processingTime: Date.now(),
        },
      }

      logger.info(`Analysis completed for ID: ${analysisId}`)
      return result
    } catch (error) {
      logger.error("Analysis error:", error)
      throw new Error(`Analysis failed: ${error.message}`)
    }
  }

  /**
   * Get sample analysis for demo purposes
   */
  async getSampleAnalysis() {
    try {
      const sampleContent = `
        Problem: Customer service teams are overwhelmed with repetitive inquiries, leading to poor customer experience and high operational costs.

        Solution: Our AI platform automates 80% of customer inquiries using natural language processing, reducing response time from hours to seconds.

        Market: $24B customer service software market growing at 15% annually.

        Team: Former Google AI engineers with 10+ years experience in machine learning and enterprise software.

        Traction: 3 pilot customers, $50K ARR, 95% customer satisfaction rate.

        Business Model: SaaS subscription starting at $5K/month per 1000 tickets processed.

        Funding: Seeking $2M Series A to scale engineering team and expand sales.
      `

      const analysis = await geminiService.analyzePitchContent(sampleContent, {
        industry: "Technology",
        stage: "Series A",
      })

      return {
        analysisId: "sample-" + uuidv4(),
        timestamp: new Date().toISOString(),
        contentLength: sampleContent.length,
        hasFile: false,
        fileName: null,
        analysis: analysis,
        metadata: {
          industry: "Technology",
          stage: "Series A",
          isSample: true,
        },
      }
    } catch (error) {
      logger.error("Sample analysis error:", error)
      throw new Error(`Sample analysis failed: ${error.message}`)
    }
  }

  /**
   * Submit feedback on analysis results
   */
  async submitFeedback(feedbackData) {
    try {
      const { analysisId, rating, feedback } = feedbackData

      // In a real application, you would save this to a database
      logger.info(`Feedback received for analysis ${analysisId}: Rating ${rating}/5`)

      if (feedback) {
        logger.info(`Feedback text: ${feedback}`)
      }

      return {
        success: true,
        message: "Feedback submitted successfully",
        analysisId,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      logger.error("Feedback submission error:", error)
      throw new Error(`Feedback submission failed: ${error.message}`)
    }
  }
}

module.exports = new AnalysisController()