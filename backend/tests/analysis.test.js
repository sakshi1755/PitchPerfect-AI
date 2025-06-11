const request = require("supertest")
const app = require("../server")

describe("Analysis API", () => {
  describe("POST /api/analysis/analyze", () => {
    it("should return 400 when no content is provided", async () => {
      const response = await request(app).post("/api/analysis/analyze").expect(400)

      expect(response.body.error).toBe("Missing content")
    })

    it("should analyze text content successfully", async () => {
      const response = await request(app)
        .post("/api/analysis/analyze")
        .send({
          text: "This is a sample pitch content for testing purposes. It contains enough text to trigger analysis.",
          industry: "Technology",
          stage: "Seed",
        })
        .expect(200)

      expect(response.body).toHaveProperty("analysisId")
      expect(response.body).toHaveProperty("analysis")
      expect(response.body.analysis).toHaveProperty("overallScore")
    })
  })

  describe("GET /api/analysis/sample", () => {
    it("should return sample analysis", async () => {
      const response = await request(app).get("/api/analysis/sample").expect(200)

      expect(response.body).toHaveProperty("analysisId")
      expect(response.body).toHaveProperty("analysis")
      expect(response.body.metadata.isSample).toBe(true)
    })
  })
})

describe("Health API", () => {
  describe("GET /api/health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/api/health").expect(200)

      expect(response.body.status).toBe("healthy")
      expect(response.body).toHaveProperty("uptime")
    })
  })
})
