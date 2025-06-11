"use client"
import { useState } from "react"
import {steps,examples, BestPitchPractices} from './config/exampleGuideConfig'
import {ArrowLeft,CheckCircle,Lightbulb,BookOpen, Zap} from "lucide-react"
import { useNavigate } from "react-router-dom"
import MockPitchExample from "./egmock"
export default function ExampleGuide({ onBack, onLoadSample }) {
  const navigate=useNavigate()
  const [activeExample, setActiveExample] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

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
              onClick={() => {
                navigate("/"); 
              }}
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

        {/* Interactive Demo 
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
        </div> */}

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
          <div className="h-12"></div>
          <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">AI Lending Platform Mock Pitch Session</h3>
            <p className="text-slate-600">See how our AI investor simulation analyzes an lending startup's pitch and provides detailed feedback</p>
          </div>
          <MockPitchExample/>
          </div>
        </div>
        {/* Best Practices */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Best Practices</h3>
            <p className="text-slate-600">Key principles for creating compelling investor pitches</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BestPitchPractices.map((practice, index) => (
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
                onClick={() => {
                  navigate("/"); 
                }}
                className="bg-white text-violet-600 px-8 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-200 hover:scale-105"
              >
                Start Analyzing Your Pitch
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
