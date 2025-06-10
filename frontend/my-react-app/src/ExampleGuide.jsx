"use client"

import { useState } from "react"
import {
  ArrowLeft,
  FileText,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  Lightbulb,
  Download,
  BookOpen,
  Sparkles,
  Zap,
} from "lucide-react"

export default function ExampleGuide({ onBack, onLoadSample }) {
  const [activeExample, setActiveExample] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const examples = [
    {
      title: "Tech Startup - AI Platform",
      industry: "Technology",
      stage: "Series A",
      score: "8.7/10",
      description: "AI-powered customer service automation platform targeting enterprise clients",
      strengths: "Strong technical team, clear market need, proven traction with pilot customers",
      improvements: "Need more detailed competitive analysis and customer acquisition cost breakdown",
      sampleContent: `Problem: Customer service teams are overwhelmed with repetitive inquiries, leading to poor customer experience and high operational costs.

Solution: Our AI platform automates 80% of customer inquiries using natural language processing, reducing response time from hours to seconds.

Market: $24B customer service software market growing at 15% annually.

Team: Former Google AI engineers with 10+ years experience in machine learning and enterprise software.

Traction: 3 pilot customers, $50K ARR, 95% customer satisfaction rate.

Business Model: SaaS subscription starting at $5K/month per 1000 tickets processed.

Funding: Seeking $2M Series A to scale engineering team and expand sales.`,
    },
    {
      title: "HealthTech - Remote Monitoring",
      industry: "Healthcare",
      stage: "Seed",
      score: "7.4/10",
      description: "Wearable device for continuous health monitoring of chronic disease patients",
      strengths: "FDA approval pathway clear, strong clinical validation, experienced healthcare team",
      improvements: "Revenue model needs refinement, go-to-market strategy requires more detail",
      sampleContent: `Problem: 133M Americans have chronic diseases requiring constant monitoring, but current solutions are invasive and expensive.

Solution: Non-invasive wearable device that continuously monitors vital signs and alerts healthcare providers to anomalies.

Market: $2.4B remote patient monitoring market, expected to reach $5.6B by 2025.

Team: Former Mayo Clinic physicians and biomedical engineers with 15+ years in medical device development.

Clinical Validation: 6-month study with 200 patients showed 40% reduction in hospital readmissions.

Regulatory: FDA 510(k) pathway identified, pre-submission meeting scheduled.

Business Model: B2B2C model selling to healthcare systems at $200/device + $50/month monitoring fee.

Funding: Seeking $1.5M seed funding for FDA submission and pilot program expansion.`,
    },
    {
      title: "FinTech - SMB Lending",
      industry: "Financial Services",
      stage: "Pre-seed",
      score: "6.9/10",
      description: "Alternative lending platform for small businesses using AI credit assessment",
      strengths: "Innovative credit scoring model, large addressable market, experienced fintech team",
      improvements: "Regulatory compliance strategy unclear, need stronger risk management framework",
      sampleContent: `Problem: 70% of small business loan applications are rejected by traditional banks, leaving a $150B funding gap.

Solution: AI-powered lending platform that analyzes alternative data sources to provide faster, more accurate credit decisions.

Market: $663B small business lending market with 27M potential customers in the US.

Team: Former executives from Goldman Sachs and Kabbage with deep lending and risk management experience.

Technology: Proprietary ML model analyzes 500+ data points including social media, transaction history, and industry trends.

Early Results: 15% default rate vs 25% industry average, 24-hour approval process vs 30-day traditional timeline.

Business Model: Origination fees (2-5%) plus interest spread, targeting $10M loan volume in year one.

Funding: Seeking $500K pre-seed for regulatory compliance and initial loan fund.`,
    },
  ]

  const steps = [
    {
      title: "Upload Your Pitch",
      description: "Upload your pitch deck (PDF, PPT) or paste your content directly into the text area.",
      icon: FileText,
      tips: [
        "Include all key sections: problem, solution, market, team, traction",
        "Keep slides concise and visually appealing",
        "Ensure financial projections are realistic and well-supported",
      ],
    },
    {
      title: "AI Analysis",
      description:
        "Our AI analyzes your pitch across 50+ criteria including clarity, market opportunity, and team strength.",
      icon: Sparkles,
      tips: [
        "Analysis takes 30-60 seconds using Google Gemini AI",
        "We evaluate structure, content, and presentation",
        "Scoring is based on successful pitch patterns",
      ],
    },
    {
      title: "Review Results",
      description: "Get detailed feedback with scores out of 10, strengths, improvements, and investor questions.",
      icon: TrendingUp,
      tips: [
        "Focus on areas with lowest scores first",
        "Use recommendations to strengthen weak points",
        "Prepare for potential investor questions",
      ],
    },
    {
      title: "Download & Iterate",
      description: "Download your analysis report and use insights to improve your pitch for better investor outcomes.",
      icon: Download,
      tips: [
        "Save report for future reference",
        "Share with team members for feedback",
        "Re-analyze after making improvements",
      ],
    },
  ]

  const startDemo = async () => {
    setIsPlaying(true)
    // Simulate demo progression
    setTimeout(() => {
      setIsPlaying(false)
      // Trigger the sample analysis
      if (onLoadSample) {
        onLoadSample()
        onBack() // Go back to main page to show results
      }
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Analyzer</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2 rounded-xl">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Examples & Guide</h1>
                <p className="text-sm text-slate-600">Learn how to create winning pitches</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Master the Art of
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Perfect Pitching
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Learn from successful examples and follow our step-by-step guide to create pitches that win over investors.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">How It Works</h3>
            <p className="text-slate-600">Follow these simple steps to analyze and improve your pitch</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-violet-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="bg-violet-600 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">{step.title}</h4>
                <p className="text-slate-600 text-sm mb-4">{step.description}</p>
                <div className="space-y-2">
                  {step.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-xs text-slate-500">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Interactive Demo</h3>
                  <p className="text-blue-100">See how the AI analysis works with a real sample pitch</p>
                </div>
                <button
                  onClick={startDemo}
                  disabled={isPlaying}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {isPlaying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Try Live Demo
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-6">
              {isPlaying ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Running AI Analysis...</h4>
                  <p className="text-slate-600 text-sm">Processing sample pitch with Google Gemini AI</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Try the Live Demo</h4>
                  <p className="text-slate-600 text-sm">
                    Click "Try Live Demo" to see how our AI analyzes a real pitch and get actual results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Example Pitches */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Example Pitches</h3>
            <p className="text-slate-600">Learn from real examples across different industries and stages</p>
          </div>

          {/* Example Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setActiveExample(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeExample === index
                    ? "bg-violet-600 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                {example.title}
              </button>
            ))}
          </div>

          {/* Active Example */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{examples[activeExample].title}</h4>
                  <div className="flex items-center gap-4 text-emerald-100">
                    <span className="text-sm">{examples[activeExample].industry}</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{examples[activeExample].stage}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{examples[activeExample].score}</div>
                  <div className="text-emerald-100 text-sm">Overall Score</div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h5 className="font-semibold text-slate-800 mb-2">Description</h5>
                <p className="text-slate-600 text-sm">{examples[activeExample].description}</p>
              </div>

              {/* Sample Content */}
              <div>
                <h5 className="font-semibold text-slate-800 mb-3">Sample Pitch Content</h5>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {examples[activeExample].sampleContent}
                  </pre>
                </div>
              </div>

              {/* Analysis */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h6 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Key Strengths
                  </h6>
                  <p className="text-green-700 text-sm">{examples[activeExample].strengths}</p>
                </div>

                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h6 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Areas for Improvement
                  </h6>
                  <p className="text-amber-700 text-sm">{examples[activeExample].improvements}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Best Practices</h3>
            <p className="text-slate-600">Key principles for creating compelling investor pitches</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Clear Problem Statement",
                description:
                  "Start with a compelling problem that your target market genuinely faces. Use data and real examples.",
                icon: Target,
                color: "red",
              },
              {
                title: "Unique Value Proposition",
                description: "Clearly articulate what makes your solution different and why customers will choose you.",
                icon: Sparkles,
                color: "purple",
              },
              {
                title: "Market Opportunity",
                description: "Size your market realistically and show clear path to capturing meaningful share.",
                icon: TrendingUp,
                color: "blue",
              },
              {
                title: "Strong Team",
                description:
                  "Highlight relevant experience and complementary skills that inspire confidence in execution.",
                icon: Users,
                color: "green",
              },
              {
                title: "Proven Traction",
                description: "Show evidence of customer demand through sales, partnerships, or user growth metrics.",
                icon: CheckCircle,
                color: "emerald",
              },
              {
                title: "Realistic Financials",
                description: "Present achievable projections with clear assumptions and path to profitability.",
                icon: FileText,
                color: "orange",
              },
            ].map((practice, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`bg-${practice.color}-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <practice.icon className={`w-6 h-6 text-${practice.color}-600`} />
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">{practice.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{practice.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Analyze Your Pitch?</h3>
            <p className="text-violet-100 mb-6 max-w-2xl mx-auto">
              Use these examples and best practices as inspiration to create your own winning pitch. Get instant
              feedback and actionable insights powered by Google Gemini AI to improve your chances of securing
              investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBack}
                className="bg-white text-violet-600 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-200 hover:scale-105"
              >
                Start Analyzing Your Pitch
              </button>
              <button
                onClick={startDemo}
                disabled={isPlaying}
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPlaying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Running Demo...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Try Live Demo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">© 2025 PitchPerfect AI. Helping entrepreneurs create winning pitches.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
