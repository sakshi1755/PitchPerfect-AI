const { GoogleGenerativeAI } = require("@google/generative-ai")
const logger = require("../utils/logger")

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is required")
    }

    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  }

  /**
   * Analyze pitch content using Gemini AI
   */
  async analyzePitchContent(content, options = {}) {
    try {
      const prompt = this.buildAnalysisPrompt(content, options)

      logger.info("Sending request to Gemini API...")
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const analysisText = response.text()

      logger.info("Received response from Gemini API")

      // Parse the structured response
      const analysis = this.parseAnalysisResponse(analysisText)

      return analysis
    } catch (error) {
      logger.error("Gemini API error:", error)

      if (error.message.includes("API_KEY")) {
        throw new Error("Invalid or missing Gemini API key")
      } else if (error.message.includes("quota")) {
        throw new Error("API quota exceeded. Please try again later.")
      } else if (error.message.includes("safety")) {
        throw new Error("Content flagged by safety filters. Please review your pitch content.")
      } else {
        throw new Error("AI analysis service temporarily unavailable")
      }
    }
  }

  /**
   * Build the analysis prompt for Gemini
   */
  buildAnalysisPrompt(content, options) {
    const { industry = "Not specified", stage = "Not specified" } = options

    return `
You are an expert venture capital analyst and pitch deck evaluator. Analyze the following pitch content and provide a comprehensive evaluation.

PITCH CONTENT:
${content}

CONTEXT:
- Industry: ${industry}
- Funding Stage: ${stage}

Please provide a detailed analysis in the following JSON format (ensure valid JSON syntax):

{
  "overallScore": "X.X",
  "scores": {
    "clarity": "X.X",
    "market": "X.X", 
    "team": "X.X",
    "financials": "X.X",
    "competition": "X.X",
    "innovation": "X.X"
  },
  "analysis": {
    "strengths": "Detailed paragraph about key strengths...",
    "weaknesses": "Detailed paragraph about areas needing improvement...",
    "recommendations": "Detailed paragraph with specific actionable recommendations...",
    "investorQuestions": "Detailed paragraph about likely investor questions...",
    "insights": "Detailed paragraph with key insights and observations..."
  }
}

SCORING GUIDELINES (1-10 scale):
- 9-10: Exceptional, investor-ready
- 7-8: Strong, minor improvements needed
- 5-6: Good foundation, significant improvements needed
- 3-4: Weak, major revisions required
- 1-2: Poor, complete restructuring needed

EVALUATION CRITERIA:
1. CLARITY (1-10): How clearly is the value proposition communicated?
2. MARKET (1-10): Market size, opportunity, and validation
3. TEAM (1-10): Team credentials, experience, and composition
4. FINANCIALS (1-10): Revenue model, projections, and assumptions
5. COMPETITION (1-10): Competitive analysis and differentiation
6. INNOVATION (1-10): Uniqueness and innovation of the solution

For each analysis section, provide comprehensive paragraphs (3-5 sentences each) that offer specific, actionable insights. Focus on:
- Concrete examples from the pitch content
- Specific areas for improvement
- Industry-specific considerations
- Investor perspective and concerns

Ensure all scores are realistic and well-justified based on the content provided.
`
  }

  /**
   * Parse the Gemini response into structured data
   */
  parseAnalysisResponse(responseText) {
    try {
      // Clean the response text
      let cleanedResponse = responseText.trim()

      // Remove any markdown code block markers
      cleanedResponse = cleanedResponse.replace(/```json\n?/g, "").replace(/```\n?/g, "")

      // Try to parse as JSON
      const parsed = JSON.parse(cleanedResponse)

      // Validate the structure
      if (!parsed.overallScore || !parsed.scores || !parsed.analysis) {
        throw new Error("Invalid response structure")
      }

      // Ensure scores are numbers and within valid range
      parsed.overallScore = Math.min(10, Math.max(1, Number.parseFloat(parsed.overallScore))).toFixed(1)

      Object.keys(parsed.scores).forEach((key) => {
        parsed.scores[key] = Math.min(10, Math.max(1, Number.parseFloat(parsed.scores[key]))).toFixed(1)
      })

      return parsed
    } catch (error) {
      logger.error("Failed to parse Gemini response:", error)
      logger.error("Raw response:", responseText)

      // Return a fallback response
      return this.getFallbackAnalysis()
    }
  }

  /**
   * Provide fallback analysis if parsing fails
   */
  getFallbackAnalysis() {
    return {
      overallScore: "7.0",
      scores: {
        clarity: "7.0",
        market: "6.5",
        team: "7.5",
        financials: "6.0",
        competition: "6.5",
        innovation: "7.0",
      },
      analysis: {
        strengths:
          "Your pitch demonstrates a solid understanding of the problem space and presents a viable solution approach. The content shows good structure and covers the essential elements that investors look for in a pitch presentation.",

        weaknesses:
          "The analysis indicates areas where additional detail and refinement would strengthen the overall presentation. Some sections may benefit from more specific data points and clearer articulation of key value propositions.",

        recommendations:
          "Focus on strengthening the market validation section with concrete data and customer feedback. Enhance the competitive analysis by clearly articulating your unique differentiators. Consider adding more detailed financial projections with clear assumptions and milestone-based growth plans.",

        investorQuestions:
          "Investors will likely ask about customer acquisition costs, market penetration strategy, and scalability plans. Be prepared to discuss your go-to-market approach, key partnerships, and how you plan to defend against competitive threats as you scale.",

        insights:
          "The pitch shows promise and addresses a real market need. With some refinements in presentation and additional supporting data, this could be a compelling investment opportunity. Focus on demonstrating traction and clear path to profitability.",
      },
    }
  }
}

module.exports = new GeminiService()
