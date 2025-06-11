// controllers/mockPitchController.js
const geminiService = require("../services/geminiService")
const fileProcessor = require("../services/fileProcessor")
const logger = require("../utils/logger")

class MockPitchController {
  /**
   * Initialize mock pitch session
   */
  async initializeMockPitch(req, res) {
    try {
      const { industry = "Technology", stage = "Series A" } = req.body
      let content = ""

      // Process file if provided
      if (req.file) {
        logger.info(`Processing file: ${req.file.originalname} (${req.file.mimetype})`)
        // FIX: Use extractContent instead of processFile
        content = await fileProcessor.extractContent(req.file)
      }

      // Use text content if provided
      if (req.body.text) {
        content += (content ? "\n\n" : "") + req.body.text.trim()
      }

      if (!content) {
        return res.status(400).json({
          error: "No content provided",
          message: "Please provide either a file or text content for the mock pitch."
        })
      }

      // FIX: Validate the extracted content
      if (req.file && !fileProcessor.validateContent(content)) {
        return res.status(400).json({
          error: "Invalid file content",
          message: "The uploaded file doesn't contain enough readable text. Please try a different file or use the text input instead."
        })
      }

      logger.info("Initializing mock pitch session...")

      // Generate initial investor message
      const initialMessage = await this.generateInitialMessage(content, { industry, stage })

      return {
        success: true,
        initialMessage,
        sessionId: Date.now().toString(),
        message: "Mock pitch session initialized successfully"
      }

    } catch (error) {
      logger.error("Error initializing mock pitch:", error)
      
      // FIX: Provide more specific error handling
      if (error.message.includes("Unsupported file type")) {
        return res.status(400).json({
          error: "Unsupported file type",
          message: "Please upload a PDF, PowerPoint, or image file, or use the text input instead."
        })
      }
      
      if (error.message.includes("Failed to extract text")) {
        return res.status(400).json({
          error: "File processing failed",
          message: "Unable to extract text from the uploaded file. Please try a different file or copy and paste your content into the text area."
        })
      }
      
      throw error
    }
  }

  /**
   * Generate investor response during conversation
   */
  async generateInvestorResponse(req, res) {
    try {
      const { message, conversation = [], messageCount = 1 } = req.body

      if (!message) {
        return res.status(400).json({
          error: "No message provided",
          message: "Please provide a message for the investor to respond to."
        })
      }

      logger.info(`Generating investor response for message ${messageCount}`)

      const response = await this.generateInvestorReply(message, conversation, messageCount)

      return {
        success: true,
        response,
        messageCount
      }

    } catch (error) {
      logger.error("Error generating investor response:", error)
      throw error
    }
  }

  /**
   * Generate final feedback and investment decision
   */
  async generateFeedback(req, res) {
    try {
      const { conversation = [], sessionDuration = 0, messageCount = 0 } = req.body

      if (conversation.length === 0) {
        return res.status(400).json({
          error: "No conversation data",
          message: "Cannot generate feedback without conversation history."
        })
      }

      logger.info("Generating final pitch feedback...")

      const feedback = await this.generatePitchFeedback(conversation, sessionDuration, messageCount)

      return {
        success: true,
        ...feedback
      }

    } catch (error) {
      logger.error("Error generating pitch feedback:", error)
      throw error
    }
  }

  /**
   * Generate initial investor message based on pitch content
   */
  async generateInitialMessage(content, options) {
    const { industry, stage } = options

    const prompt = `
You are a seasoned venture capital investor reviewing a pitch for a ${industry} company seeking ${stage} funding. You have just reviewed their pitch materials.

PITCH CONTENT:
${content}

Act as a professional, experienced investor. Start the mock pitch session with an opening message that shows you've reviewed their materials and are ready to discuss their venture. Be engaging but professional, and set the tone for a realistic pitch meeting.

Your response should:
- Acknowledge that you've reviewed their materials
- Show initial interest while maintaining professional skepticism
- Ask an opening question or invite them to present
- Keep it conversational and realistic
- Be 2-3 sentences maximum

Respond as if you're in a real investor meeting.
`

    try {
      const result = await geminiService.model.generateContent(prompt)
      const response = await result.response
      return response.text().trim()
    } catch (error) {
      logger.error("Error generating initial message:", error)
      return "Hello! I've reviewed your pitch materials, and I'm intrigued by your business concept. I'm ready to dive deeper into your venture. Please go ahead and walk me through your business model and what makes your solution unique in the market."
    }
  }

  /**
   * Generate investor reply during conversation
   */
  async generateInvestorReply(userMessage, conversation, messageCount) {
    const conversationHistory = conversation.map(msg => 
      `${msg.role === 'user' ? 'ENTREPRENEUR' : 'INVESTOR'}: ${msg.content}`
    ).join('\n\n')

    const prompt = `
You are a venture capital investor in a live pitch meeting. You're having a conversation with an entrepreneur about their business.

CONVERSATION SO FAR:
${conversationHistory}

ENTREPRENEUR'S LATEST MESSAGE:
${userMessage}

MESSAGE COUNT: ${messageCount}

As an experienced investor, respond naturally to their message. Your response should:
- Be realistic and professional
- Ask follow-up questions based on what they've said
- Show interest while maintaining healthy skepticism
- Probe deeper into key areas like market size, competition, financials, team, etc.
- Keep responses conversational (2-4 sentences)
- Vary your questioning style based on the conversation flow

${messageCount > 8 ? 'You\'ve been talking for a while now. Consider asking more decisive questions about investment terms, timeline, or next steps.' : ''}

Respond as if you're in a real investor meeting.
`

    try {
      const result = await geminiService.model.generateContent(prompt)
      const response = await result.response
      return response.text().trim()
    } catch (error) {
      logger.error("Error generating investor reply:", error)
      return "That's interesting. Can you tell me more about how you plan to scale this business and what your key metrics look like?"
    }
  }

  /**
   * Generate final pitch feedback and investment decision
   */
  async generatePitchFeedback(conversation, sessionDuration, messageCount) {
    const conversationHistory = conversation.map(msg => 
      `${msg.role === 'user' ? 'ENTREPRENEUR' : 'INVESTOR'}: ${msg.content}`
    ).join('\n\n')

    const prompt = `
You are a venture capital investor who just finished a ${sessionDuration}-minute pitch meeting with an entrepreneur. You exchanged ${messageCount} messages during the conversation.

FULL CONVERSATION:
${conversationHistory}

As an investor, provide comprehensive feedback and make an investment decision. Respond in the following JSON format:

{
  "decision": "yes" or "no",
  "overallScore": X,
  "feedback": "Overall feedback paragraph...",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "nextSteps": ["next step 1", "next step 2", "next step 3"]
}

DECISION CRITERIA:
- "yes" if you would realistically invest based on this conversation
- "no" if you would pass on this opportunity

OVERALL SCORE: Rate 1-10 based on:
- Clarity of value proposition
- Market opportunity
- Team capability (based on conversation)
- Business model viability
- Competitive differentiation
- Financial potential

Provide honest, constructive feedback as a real investor would. Be specific about what impressed you and what concerns you have.
`

    try {
      const result = await geminiService.model.generateContent(prompt)
      const response = await result.response
      const feedbackText = response.text().trim()
      
      // Parse JSON response
      const cleanedResponse = feedbackText.replace(/```json\n?/g, "").replace(/```\n?/g, "")
      const feedback = JSON.parse(cleanedResponse)
      
      // Validate and sanitize
      feedback.decision = feedback.decision.toLowerCase() === 'yes' ? 'yes' : 'no'
      feedback.overallScore = Math.min(10, Math.max(1, parseInt(feedback.overallScore) || 7))
      
      return feedback
    } catch (error) {
      logger.error("Error generating pitch feedback:", error)
      return {
        decision: "no",
        overallScore: 6,
        feedback: "Thank you for the pitch presentation. While there are some interesting aspects to your business, I have concerns about the market opportunity and competitive positioning that would need to be addressed before I could consider an investment.",
        strengths: [
          "Clear communication during the pitch",
          "Shows passion for the problem space",
          "Willing to engage with investor questions"
        ],
        improvements: [
          "Provide more concrete market validation data",
          "Strengthen competitive analysis and differentiation",
          "Present clearer financial projections and unit economics"
        ],
        nextSteps: [
          "Gather more customer feedback and validation",
          "Refine your pitch deck with stronger data points",
          "Consider additional market research to support your assumptions"
        ]
      }
    }
  }
}

module.exports = new MockPitchController()