const pdf = require("pdf-parse")
const mammoth = require("mammoth")
const Tesseract = require("tesseract.js")
const sharp = require("sharp")
const logger = require("../utils/logger")

class FileProcessor {
  /**
   * Extract content from uploaded file based on file type
   */
  async extractContent(file) {
    try {
      const { buffer, mimetype, originalname } = file

      logger.info(`Processing file: ${originalname} (${mimetype})`)

      switch (mimetype) {
        case "application/pdf":
          return await this.extractFromPDF(buffer)

        case "application/vnd.ms-powerpoint":
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          return await this.extractFromPowerPoint(buffer)

        case "image/jpeg":
        case "image/jpg":
        case "image/png":
          return await this.extractFromImage(buffer)

        default:
          throw new Error(`Unsupported file type: ${mimetype}`)
      }
    } catch (error) {
      logger.error("File processing error:", error)
      throw new Error(`Failed to process file: ${error.message}`)
    }
  }

  /**
   * Extract text from PDF files
   */
  async extractFromPDF(buffer) {
    try {
      logger.info("Extracting text from PDF...")
      const data = await pdf(buffer)

      if (!data.text || data.text.trim().length === 0) {
        throw new Error("No text content found in PDF")
      }

      logger.info(`Extracted ${data.text.length} characters from PDF`)
      return this.cleanExtractedText(data.text)
    } catch (error) {
      logger.error("PDF extraction error:", error)
      throw new Error("Failed to extract text from PDF. The file may be corrupted or image-based.")
    }
  }

  /**
   * Extract text from PowerPoint files
   */
  async extractFromPowerPoint(buffer) {
    try {
      logger.info("Extracting text from PowerPoint...")

      // For PPTX files, we can use mammoth (though it's primarily for Word docs)
      // In a production environment, you might want to use a specialized library
      // like 'officegen' or 'node-pptx' for better PowerPoint support

      const result = await mammoth.extractRawText({ buffer })

      if (!result.value || result.value.trim().length === 0) {
        throw new Error("No text content found in PowerPoint file")
      }

      logger.info(`Extracted ${result.value.length} characters from PowerPoint`)
      return this.cleanExtractedText(result.value)
    } catch (error) {
      logger.error("PowerPoint extraction error:", error)

      // Fallback: suggest manual text input
      throw new Error(
        "Unable to extract text from PowerPoint file. Please copy and paste your content into the text area instead.",
      )
    }
  }

  /**
   * Extract text from images using OCR
   */
  async extractFromImage(buffer) {
    try {
      logger.info("Processing image for OCR...")

      // Optimize image for OCR
      const optimizedBuffer = await sharp(buffer)
        .resize(2000, 2000, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .greyscale()
        .normalize()
        .sharpen()
        .png()
        .toBuffer()

      logger.info("Running OCR on image...")

      const {
        data: { text },
      } = await Tesseract.recognize(optimizedBuffer, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            logger.info(`OCR Progress: ${Math.round(m.progress * 100)}%`)
          }
        },
      })

      if (!text || text.trim().length < 10) {
        throw new Error("Insufficient text detected in image")
      }

      logger.info(`Extracted ${text.length} characters from image via OCR`)
      return this.cleanExtractedText(text)
    } catch (error) {
      logger.error("Image OCR error:", error)
      throw new Error(
        "Failed to extract text from image. Please ensure the image contains clear, readable text or use the text input instead.",
      )
    }
  }

  /**
   * Clean and normalize extracted text
   */
  cleanExtractedText(text) {
    if (!text) return ""

    return (
      text
        // Remove excessive whitespace
        .replace(/\s+/g, " ")
        // Remove special characters that might interfere with analysis
        .replace(/[^\w\s\-.,!?()[\]{}:;"']/g, " ")
        // Normalize line breaks
        .replace(/\n\s*\n/g, "\n\n")
        // Trim whitespace
        .trim()
    )
  }

  /**
   * Validate extracted content
   */
  validateContent(content) {
    if (!content || typeof content !== "string") {
      return false
    }

    const minLength = 50 // Minimum characters for meaningful analysis
    const wordCount = content.split(/\s+/).length
    const minWords = 10 // Minimum words for meaningful analysis

    return content.length >= minLength && wordCount >= minWords
  }
}

module.exports = new FileProcessor()
