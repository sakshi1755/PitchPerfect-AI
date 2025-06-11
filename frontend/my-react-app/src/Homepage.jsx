"use client"
import { useNavigate } from "react-router-dom";
import React, { useEffect} from "react";

import { useState, useCallback, useRef } from "react"
import {
  Upload,
  FileText,
  Sparkles,
  TrendingUp,
  Users,
  Lightbulb,
  X,
  AlertCircle,
  Eye,
  BarChart3,
  Target,
  Zap,
  Trash2,
  RefreshCw,
  ImageIcon,
  FileIcon,
  Info,
  BookOpen,
  ArrowRight,
  Menu,
} from "lucide-react"
import Header from "./Header"
import Footer from "./Footer"
import Features from "./Features";
// API Configuration
const API_BASE_URL = "http://localhost:3001/api"

// API Functions
import ConnectionStatus from "./componets/ConnectionStatus"

// API Configuration

// API Functions
const analyzeContent = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/analysis/analyze`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Analysis failed")
  }

  return response.json()
}

export default function Homepage() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState({})
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisStep, setAnalysisStep] = useState(0)
  const [showFilePreview, setShowFilePreview] = useState(false)
  const fileInputRef = useRef(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [analyzingPitch, setAnalyzingPitch] = useState(false) // Replace 'loading' with this
const [loadingMockPitch, setLoadingMockPitch] = useState(false) // Add this new state

  const analysisSteps = [
    "Processing uploaded content...",
    "Analyzing pitch structure and flow...",
    "Evaluating market positioning and opportunity...",
    "Assessing team credentials and execution plan...",
    "Reviewing financial projections and assumptions...",
    "Generating comprehensive recommendations...",
  ]

  // Enhanced drag handlers with better feedback
  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      validateAndSetFile(droppedFile)
    }
  }, [])

  // Enhanced file validation with preview generation
  const validateAndSetFile = (selectedFile) => {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ]

    if (selectedFile.size > maxSize) {
      setErrors({ file: "File size must be less than 20MB" })
      return
    }

    if (!allowedTypes.includes(selectedFile.type)) {
      setErrors({ file: "Please upload a PDF, PPT, PPTX, JPG, or PNG file" })
      return
    }

    setErrors({})
    setFile(selectedFile)

    // Generate preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => setFilePreview(e.target.result)
      reader.readAsDataURL(selectedFile)
    } else {
      setFilePreview(null)
    }

    // Simulate upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 100)
  }
  const handleMockPitch = () => {
    const trimmedText = text.trim()

    if (!file && !trimmedText) {
      setErrors({ general: "Please upload a file or enter text to start mock pitch" })
      return
    }
    setLoadingMockPitch(true)
    // Create FormData only if needed (for real backend submission — not used in navigate here)
    const formData = new FormData()
    if (file) formData.append("file", file)
    if (trimmedText) formData.append("text", trimmedText)
    formData.append("industry", "Technology")
    formData.append("stage", "Series A")

    // Navigate with only the available values
    const payload = {
      ...(file && { file }),
      ...(trimmedText && { text: trimmedText }),
      industry: "Technology",
      stage: "Series A",
    }

      setTimeout(() => {
          setLoadingMockPitch(false)
          navigate("/mockpitch", { state: { formData: payload } })
        }, 500)
      }
  

  const handleAnalyze = async () => {
    if (!file && !text.trim()) {
      setErrors({ general: "Please upload a file or enter text to analyze" })
      return
    }
    setAnalyzingPitch(true) 
    setErrors({})
    setAnalysisStep(0)

    try {
      // Create FormData for the request
      const formData = new FormData()

      if (file) {
        formData.append("file", file)
      }

      if (text.trim()) {
        formData.append("text", text.trim())
      }

      // Add optional metadata
      formData.append("industry", "Technology") // You can make this dynamic later
      formData.append("stage", "Series A") // You can make this dynamic later

      // Simulate step-by-step analysis for UI
      let stepIndex = 0

      const stepInterval = setInterval(() => {
        setAnalysisStep(stepIndex)
        if (stepIndex < analysisSteps.length - 1) {
          stepIndex++
        }
        // Else, keep showing the last step until analysis finishes
      }, 800)

      // Make API call
      const response = await analyzeContent(formData)

      // Clear the step interval
      clearInterval(stepInterval)

      // Transform backend response to match frontend expectations
      const transformedResult = {
        overallScore: response.analysis.overallScore,
        scores: response.analysis.scores,
        analysis: response.analysis.analysis,
      }

      setResult(transformedResult)
    } catch (error) {
      console.error("Analysis error:", error)
      setErrors({
        general: error.message || "Analysis failed. Please try again.",
      })
    } finally {
      setLoading(false)
      setAnalysisStep(0)
    }
  }

  useEffect(() => {
    if (result) {
      navigate("/result", { state: { result } })
    }
  }, [result, navigate])

  const removeFile = () => {
    setFile(null)
    setFilePreview(null)
    setUploadProgress(0)
    setErrors({})
    setShowFilePreview(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const replaceFile = () => {
    fileInputRef.current?.click()
  }

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileMenu && !event.target.closest(".mobile-menu-container")) {
        setShowMobileMenu(false)
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && showMobileMenu) {
        setShowMobileMenu(false)
      }
    }

    if (showMobileMenu) {
      document.addEventListener("click", handleClickOutside)
      document.addEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
      document.body.style.overflow = "unset"
    }
  }, [showMobileMenu])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced Responsive Header */}
  <Header showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />


      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Responsive Hero Section */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Perfect Your Pitch with
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              AI Intelligence
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 px-4">
            Get instant, actionable feedback on your pitch deck. Our AI analyzes structure, content, and market appeal
            using a comprehensive 10-point scoring system.
          </p>

          {/* Quick Start Guide */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl px-4 sm:px-6 py-2 sm:py-3 mx-4">
            <Info className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-blue-700 font-medium hidden xs:inline">New here?</span>
            <button
              onClick={() => {
                navigate("/guide")
              }}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
            >
              <span className="hidden xs:inline">View Examples & Guide</span>
              <span className="xs:hidden">Guide</span>
              <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Error Display */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{errors.general}</p>
            <button
              onClick={() => setErrors({})}
              className="ml-auto text-red-500 hover:text-red-700"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Enhanced Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden mb-8 hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 sm:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Analyze Your Pitch</h3>
                <p className="text-violet-100">Dual Input Support<br></br>
Easily analyze content by pasting text, uploading files, or both — our system intelligently handles all input formats in one seamless flow.
</p>
              </div>
              <div className="hidden sm:block">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Enhanced File Upload with Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Pitch Deck
                  <span className="text-xs text-slate-500 font-normal">(Max 20MB)</span>
                </label>

                {file && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowFilePreview(!showFilePreview)}
                      className="text-sm text-violet-600 hover:text-violet-700 flex items-center gap-1"
                      disabled={!filePreview}
                    >
                      <Eye className="w-4 h-4" />
                      {showFilePreview ? "Hide" : "Preview"}
                    </button>
                  </div>
                )}
              </div>

              {/* File Preview */}
              {file && showFilePreview && filePreview && (
                <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-slate-700">File Preview</h4>
                    <button onClick={() => setShowFilePreview(false)} className="text-slate-500 hover:text-slate-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="max-w-md mx-auto">
                    <img
                      src={filePreview || "/placeholder.svg"}
                      alt="File preview"
                      className="w-full h-auto rounded-lg shadow-sm border border-slate-200"
                    />
                  </div>
                </div>
              )}

              {/* File Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group ${
                  dragActive
                    ? "border-violet-500 bg-violet-50 scale-[1.02] shadow-lg"
                    : file
                      ? "border-green-500 bg-green-50"
                      : "border-slate-300 hover:border-violet-400 hover:bg-violet-50/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => !file && fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label={file ? "File uploaded" : "Upload file area"}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === " ") && !file) {
                    e.preventDefault()
                    fileInputRef.current?.click()
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => e.target.files[0] && validateAndSetFile(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.ppt,.pptx,.jpg,.jpeg,.png"
                  aria-describedby="file-upload-description"
                />

                <div className="space-y-4">
                  <div
                    className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      file
                        ? "bg-green-100 scale-110"
                        : dragActive
                          ? "bg-violet-100 scale-110"
                          : "bg-slate-100 group-hover:bg-violet-100"
                    }`}
                  >
                    {file ? (
                      file.type.startsWith("image/") ? (
                        <ImageIcon className="w-8 h-8 text-green-600" />
                      ) : (
                        <FileIcon className="w-8 h-8 text-green-600" />
                      )
                    ) : (
                      <Upload
                        className={`w-8 h-8 transition-colors duration-300 ${
                          dragActive ? "text-violet-600" : "text-slate-400 group-hover:text-violet-600"
                        }`}
                      />
                    )}
                  </div>

                  {file ? (
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4 border border-green-200 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              {file.type.startsWith("image/") ? (
                                <ImageIcon className="w-5 h-5 text-green-600" />
                              ) : (
                                <FileIcon className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                            <div className="text-left">
                              <p className="text-green-700 font-semibold text-sm truncate max-w-[200px]">{file.name}</p>
                              <p className="text-xs text-green-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                replaceFile()
                              }}
                              className="p-2 text-slate-500 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all duration-200 hover:scale-110"
                              aria-label="Replace file"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFile()
                              }}
                              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                              aria-label="Remove file"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {uploadProgress < 100 && (
                          <div className="mt-3">
                            <div className="w-full bg-green-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <p className="text-xs text-green-600 mt-1">Uploading... {uploadProgress}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-slate-700 font-semibold text-lg">
                        {dragActive ? "Drop your file here" : "Drop files here, or click to browse"}
                      </p>
                      <p className="text-sm text-slate-500 mt-1" id="file-upload-description">
                        Supports PDF, PPT, PPTX, JPG, PNG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {errors.file && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{errors.file}</p>
                </div>
              )}
            </div>

            {/* Enhanced Text Input */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                 Paste Your Content
              </label>
              <div className="relative">
                <textarea
                  rows="8"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your pitch deck content, executive summary, or key points here..."
                  className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none transition-all duration-200 text-slate-700 placeholder-slate-400 shadow-sm"
                  aria-describedby="text-input-description"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-3">
                  <span className="text-xs text-slate-400" id="text-input-description">
                    {text.length} characters
                  </span>
                  {text.length > 0 && (
                    <button
                      onClick={() => setText("")}
                      className="text-slate-400 hover:text-slate-600 transition-colors duration-200"
                      aria-label="Clear text"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Responsive Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 px-2">
              <button
                onClick={handleAnalyze}
                className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg focus:ring-4 focus:ring-violet-500/25 min-w-0 sm:min-w-[200px] text-sm sm:text-base"
                disabled={analyzingPitch || (!file && !text.trim())}
                aria-describedby="analyze-button-description"
              >
                {analyzingPitch ? (
                  <>
                    <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>Analyze Pitch</span>
                  </>
                )}
              </button>

              <button
                onClick={handleMockPitch}
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg focus:ring-4 focus:ring-green-500/25 min-w-0 sm:min-w-[200px] text-sm sm:text-base"
                disabled={loadingMockPitch || (!file && !text.trim())}
                aria-describedby="mock-pitch-button-description"
              >
                {loadingMockPitch ? (
                  <>
                    <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Users className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="hidden sm:inline">Simulate Mock Pitch</span>
                    <span className="sm:hidden">Mock Pitch</span>
                  </>
                )}
              </button>
            </div>

            {/* Loading Progress */}
            {loading && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">Analysis in Progress</h4>
                    <p className="text-sm text-blue-600">{analysisSteps[analysisStep]}</p>
                  </div>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((analysisStep + 1) / analysisSteps.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-blue-600 mt-2 text-center">
                  Step {analysisStep + 1} of {analysisSteps.length}
                </p>
              </div>
            )}

            <p className="text-center text-xs text-slate-500 mt-2" id="analyze-button-description">
              Analysis typically takes 30-60 seconds
            </p>
          </div>
        </div>

        {/* Enhanced Responsive Features Section */}
       <Features/>
      </main>

      {/* Enhanced Footer */}
  <Footer/>
    </div>
  )
}
