import { MessageCircle, CheckCircle, XCircle, Clock, User, Bot, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react'

// Alternative lending platform conversation
const exampleConversation = [
  {
    sender: 'ai',
    message: "Welcome! I've reviewed your pitch deck for CreditFlow AI. The alternative lending space is certainly crowded with players like Kabbage and OnDeck. Tell me, what makes your AI credit assessment fundamentally different from existing solutions?",
    timestamp: "2:15 PM"
  },
  {
    sender: 'user',
    message: "Our proprietary ML model analyzes over 500 data points including social media activity, transaction patterns, and real-time industry trends - not just traditional credit scores. We're seeing 15% default rates versus the industry average of 25%, with 24-hour approvals instead of 30-day timelines.",
    timestamp: "2:16 PM"
  },
  {
    sender: 'ai',
    message: "Those default rates are impressive if validated. Can you walk me through your risk management framework? How do you handle the regulatory compliance aspect, especially with alternative data sources like social media?",
    timestamp: "2:17 PM"
  },
  {
    sender: 'user',
    message: "We've built compliance into our core architecture. Our team includes former Goldman Sachs risk executives and ex-Kabbage leaders. We only use publicly available data and follow strict GDPR and CCPA guidelines. We're already working with regulatory consultants for our lending license.",
    timestamp: "2:18 PM"
  },
  {
    sender: 'ai',
    message: "Strong team background. What's your current loan volume and unit economics? With 70% of small business applications being rejected by banks, there's clearly demand, but how do you plan to scale your initial $500K raise to meaningful loan volumes?",
    timestamp: "2:19 PM"
  },
  {
    sender: 'user',
    message: "We're targeting $10M in loan volume for year one with 2-5% origination fees plus interest spread. Each loan generates $2,000-8,000 in revenue with our current model. The $500K covers regulatory compliance and initial loan fund - we'll use early revenue to bootstrap growth before Series A.",
    timestamp: "2:20 PM"
  }
]

const lendingResults = {
  decision: "CAUTIOUSLY INTERESTED",
  score: "7/10",
  questionsAnswered: 5,
  sessionDuration: "6min",
  feedback: "Solid pitch with compelling metrics and strong team credentials. Your approach to alternative data is innovative and the default rate improvement is significant. However, the regulatory landscape for alternative lending is complex, and scaling will require substantial capital. Your unit economics look promising but need more validation at scale.",  
  strengths: [
    "Impressive default rate reduction (15% vs 25% industry average)",
    "Strong team with relevant Goldman Sachs and Kabbage experience", 
    "Clear value proposition addressing real market pain point",
    "Comprehensive approach to regulatory compliance from day one",
    "Well-defined unit economics and revenue model"
  ],
  improvements: [
    "Provide more details on your proprietary ML model and competitive moats",
    "Address capital requirements for scaling loan volume beyond initial fund",
    "Share specific case studies or pilot program results",
    "Discuss your customer acquisition strategy and cost structure",
    "Elaborate on your competitive differentiation vs established players"
  ],
  nextSteps: [
    "Prepare detailed financial model showing path to profitability", 
    "Compile comprehensive risk assessment and compliance documentation",
    "Develop pilot program results and customer testimonials",
    "Create competitive analysis comparing your platform to existing solutions",
    "Schedule follow-up to discuss regulatory timeline and capital strategy"
  ]
}

function LendingPlatformExample() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Chat Interface Example */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold">AI Investor Session</h4>
                <p className="text-blue-100 text-sm">CreditFlow AI - Alternative Lending Platform</p>
              </div>
            </div>
            <div className="text-right text-white">
              <div className="text-sm">Live Session</div>
              <div className="flex items-center gap-1 text-xs text-blue-100">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                Recording
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4 bg-gray-50 max-h-96 overflow-y-auto">
          {exampleConversation.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-md px-4 py-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 shadow-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.message}</p>
                <p className={`text-xs mt-2 ${message.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {message.timestamp}
                </p>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <ArrowRight className="w-4 h-4" />
            <span className="text-sm font-medium">Session completed - Generating AI analysis...</span>
          </div>
        </div>
      </div>

      {/* Results Example */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-4">
          <h4 className="text-white font-semibold text-lg">AI Mock Pitch Results</h4>
          <p className="text-amber-100 text-sm">Comprehensive feedback and investment decision</p>
        </div>

        <div className="p-6">
          {/* Investment Decision */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-800">Investment Decision: {lendingResults.decision}</span>
            </div>
            <p className="text-amber-700 text-sm mt-2">
              "Promising opportunity but need to see more validation. Let's discuss next steps and due diligence requirements."
            </p>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-600">{lendingResults.score}</div>
              <div className="text-sm text-slate-600">Overall Score</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-800">{lendingResults.questionsAnswered}</div>
              <div className="text-sm text-slate-600">Questions Answered</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-800">{lendingResults.sessionDuration}</div>
              <div className="text-sm text-slate-600">Session Duration</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">85%</div>
              <div className="text-sm text-slate-600">Communication Score</div>
            </div>
          </div>

          {/* Feedback Summary */}
          <div className="mb-6">
            <h5 className="font-semibold text-slate-800 mb-3">Overall Feedback</h5>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-slate-700 leading-relaxed">{lendingResults.feedback}</p>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Key Strengths
              </h5>
              <div className="space-y-3">
                {lendingResults.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-slate-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Areas for Improvement
              </h5>
              <div className="space-y-3">
                {lendingResults.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-slate-700">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <h5 className="font-semibold text-indigo-800 mb-3">Recommended Next Steps</h5>
            <div className="space-y-2">
              {lendingResults.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-sm text-indigo-800">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LendingPlatformExample