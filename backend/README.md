# 🎤 PitchPerfect AI Backend

A robust **Node.js backend API** for the PitchPerfect AI pitch analysis platform, powered by **Google Gemini AI**.

---

## 🚀 Features

- 🤖 **AI-Powered Analysis** – Uses Google Gemini AI for comprehensive pitch evaluation  
- 📄 **Multi-Format Support** – Handles PDF, PowerPoint, and image files  
- 🔍 **OCR Capabilities** – Extracts text from images using Tesseract.js  
- 🛡️ **Security** – Rate limiting, CORS, Helmet, and input validation  
- 📊 **Comprehensive Logging** – Winston-based logging with rotation  
- ✅ **Production Ready** – Error handling, health checks, and monitoring  

---

## ⚡ Quick Start

### 📦 Prerequisites

- Node.js **18+**
- Google Gemini API key

### 🛠️ Installation

```bash
git clone <repository-url>
cd pitchperfect-backend
```

```bash
npm install
```

```bash
cp .env.example .env
# Edit .env with your configuration
```

```bash
mkdir logs
```

```bash
npm run dev
```

The server will start at: [http://localhost:3001](http://localhost:3001)

---

## 📡 API Endpoints

### 🧪 Health Check

| Method | Endpoint                  | Description                    |
|--------|---------------------------|--------------------------------|
| GET    | `/api/health`             | Basic health check             |
| GET    | `/api/health/detailed`    | Detailed health check status   |

### 📈 Analysis

| Method | Endpoint                     | Description                      |
|--------|------------------------------|----------------------------------|
| POST   | `/api/analysis/analyze`      | Analyze pitch content            |
| GET    | `/api/analysis/sample`       | Get sample analysis for demo     |
| POST   | `/api/analysis/feedback`     | Submit feedback on analysis      |

---

## 🔐 Environment Variables

| Variable          | Description                            | Required |
|------------------|----------------------------------------|----------|
| `GEMINI_API_KEY` | Google Gemini AI API key                | ✅ Yes   |
| `PORT`           | Server port (default: 3001)             | ❌ No    |
| `NODE_ENV`       | Environment (development/production)    | ❌ No    |
| `FRONTEND_URL`   | Frontend URL for CORS                   | ❌ No    |
| `LOG_LEVEL`      | Logging level (info/debug/error)        | ❌ No    |

---

## 📁 File Upload Support

- 📄 **PDF** – Text extraction via `pdf-parse`  
- 🖼️ **Images** – OCR via `Tesseract.js`  
- 📊 **PowerPoint** – Extracts content via `mammoth`  
- ⛔ **Size Limit** – Max **20MB** per file  
- 🚦 **Rate Limiting** – Max **5 requests/minute/IP**  

---

## 🧪 API Usage Examples

### 📤 Analyze with File Upload

```bash
curl -X POST http://localhost:3001/api/analysis/analyze \
  -F "file=@pitch-deck.pdf" \
  -F "industry=Technology" \
  -F "stage=Series A"
```

### 📝 Analyze with Text Content

```bash
curl -X POST http://localhost:3001/api/analysis/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Problem: Customer service teams are overwhelmed...",
    "industry": "Technology",
    "stage": "Series A"
  }'
```

### 🩺 Health Check

```bash
curl http://localhost:3001/api/health/detailed
```

---

## 📦 Sample Response Format

```json
{
  "analysisId": "uuid-here",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "contentLength": 1500,
  "hasFile": true,
  "fileName": "pitch-deck.pdf",
  "analysis": {
    "overallScore": "8.2",
    "scores": {
      "clarity": "8.5",
      "market": "7.8",
      "team": "8.9",
      "financials": "7.5",
      "competition": "8.0",
      "innovation": "8.3"
    },
    "analysis": {
      "strengths": "Detailed paragraph about strengths...",
      "weaknesses": "Detailed paragraph about weaknesses...",
      "recommendations": "Detailed paragraph with recommendations...",
      "investorQuestions": "Detailed paragraph about likely questions...",
      "insights": "Detailed paragraph with key insights..."
    }
  },
  "metadata": {
    "industry": "Technology",
    "stage": "Series A"
  }
}
```

---

## ⚠️ Error Handling

| Code | Description                             |
|------|-----------------------------------------|
| 400  | Bad Request (validation, file issues)   |
| 429  | Too Many Requests (rate limiting)       |
| 500  | Internal Server Error                   |
| 503  | Service Unavailable (AI service issues) |

---

## 🔐 Security Features

- 🚦 **Rate Limiting** – Protects against abuse  
- 🌐 **CORS** – Configured for secure frontend access  
- 🪖 **Helmet** – Adds secure HTTP headers  
- ✅ **Validation** – Input validation with `express-validator`  
- 🧪 **File Type Checks** – Only allows supported file types  
- 🚫 **Size Limits** – Prevents oversized uploads  

---

## 📈 Monitoring & Logging

- 📋 **Winston** – Structured logs with daily rotation  
- ❤️ **Health Checks** – Tracks backend & dependency status  
- 🐛 **Error Tracking** – Detailed logs of runtime errors  
- 📉 **Performance Metrics** – Includes request timing, memory, etc.  

---

## 🧑‍💻 Development

### Available Scripts

| Script         | Description                      |
|----------------|----------------------------------|
| `npm start`    | Start production server          |
| `npm run dev`  | Start development server (nodemon) |
| `npm test`     | Run tests                        |

### 📁 Project Structure

```bash
├── controllers/       # Request handlers
├── routes/            # API routes
├── services/          # Business logic
├── middleware/        # Custom middleware
├── utils/             # Utility functions
├── logs/              # Log files
├── server.js          # Entry point
└── package.json       # Project metadata & dependencies
```

---

## 🚀 Deployment

### ✅ Production Checklist

1. Set `NODE_ENV=production`  
2. Set valid `GEMINI_API_KEY`  
3. Enable log rotation  
4. Use reverse proxy (e.g., nginx)  
5. Set up process manager (e.g., PM2)  
6. Enable monitoring/alerts  
7. Add SSL/TLS certificates  

---

## 🐳 Docker Support

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new feature branch  
3. Make your changes with clear commits  
4. Write tests where necessary  
5. Submit a pull request  

---

## 📄 License

MIT License – see `LICENSE` file for full details.