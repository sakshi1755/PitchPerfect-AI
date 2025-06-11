import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  Sparkles,
  MessageCircle,
  Clock,
  TrendingUp,
  CheckCircle,
  XCircle,
  Award,
  AlertCircle,
  RefreshCw,
  Download,
  Minimize2,
  Maximize2
} from 'lucide-react';

// API Configuration
const API_BASE_URL = "https://pitch-perfect-ai-phi.vercel.app/api";

const MockPitch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [pitchStarted, setPitchStarted] = useState(false);
  const [pitchEnded, setPitchEnded] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Get form data from navigation state
  const formData = location.state?.formData;

  useEffect(() => {
    if (!formData) {
      navigate('/');
      return;
    }
    
    setSessionStartTime(new Date());
    initializeMockPitch();
  }, [formData, navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeMockPitch = async () => {
    setIsInitializing(true);
    
    try {
      // Create FormData for API call
      const apiFormData = new FormData();
      
      if (formData.file) {
        apiFormData.append("file", formData.file);
      }
      
      if (formData.text) {
        apiFormData.append("text", formData.text);
      }
      
      apiFormData.append("industry", formData.industry || "Technology");
      apiFormData.append("stage", formData.stage || "Series A");
      apiFormData.append("mode", "mock_pitch");

      const response = await fetch(`${API_BASE_URL}/mockpitch/initialize`, {
        method: "POST",
        body: apiFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to initialize mock pitch");
      }

      const data = await response.json();
      
      // Add initial investor message
      const initialMessage = {
        id: Date.now(),
        type: 'investor',
        content: data.initialMessage || "Hello! I'm excited to hear your pitch. I've reviewed your materials, and I'm ready to discuss your venture. Please go ahead and present your business idea.",
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);
      setPitchStarted(true);
      
    } catch (error) {
      console.error("Error initializing mock pitch:", error);
      setMessages([{
        id: Date.now(),
        type: 'system',
        content: "Sorry, there was an error starting the mock pitch. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsInitializing(false);
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading || pitchEnded) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: userInput.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    setMessageCount(prev => prev + 1);

    try {
      const response = await fetch(`${API_BASE_URL}/mockpitch/respond`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userInput.trim(),
          conversation: messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          messageCount: messageCount + 1
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get investor response");
      }

      const data = await response.json();
      
      const investorMessage = {
        id: Date.now() + 1,
        type: 'investor',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, investorMessage]);

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'system',
        content: "Sorry, there was an error getting the investor's response. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const endPitch = async () => {
    if (pitchEnded) return;
    
    setIsLoading(true);
    setPitchEnded(true);

    try {
      const sessionDuration = sessionStartTime ? 
        Math.round((new Date() - sessionStartTime) / 1000 / 60) : 0;

      const response = await fetch(`${API_BASE_URL}/mockpitch/feedback`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation: messages.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          })),
          sessionDuration,
          messageCount
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get feedback");
      }

      const feedbackData = await response.json();
      setFeedback(feedbackData);

    } catch (error) {
      console.error("Error getting feedback:", error);
      setFeedback({
        overallScore: 7,
        decision: "yes",
        feedback: "Technical error occurred while generating detailed feedback, but based on the conversation, you presented your ideas well.",
        strengths: ["Good communication"],
        improvements: ["Try again for detailed feedback"],
        nextSteps: ["Review your pitch and try the simulation again"]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!formData) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-xl shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Mock Pitch Session
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">Practice with AI Investor</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              {sessionStartTime && !pitchEnded && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span className="hidden sm:inline">{Math.round((new Date() - sessionStartTime) / 1000 / 60)} min</span>
                  <span className="sm:hidden">{Math.round((new Date() - sessionStartTime) / 1000 / 60)}m</span>
                </div>
              )}
              
              {pitchStarted && !pitchEnded && (
                <button
                  onClick={endPitch}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">End Pitch</span>
                  <span className="sm:hidden">End</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col min-h-0">
        {isInitializing ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Preparing Your Mock Pitch</h3>
              <p className="text-slate-600">The AI investor is reviewing your materials...</p>
            </div>
          </div>
        ) : pitchEnded && feedback ? (
          // Feedback Section - Full Screen
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-4 sm:p-6">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4">
                  <h2 className="text-white font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Pitch Feedback & Investment Decision
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  {/* Investment Decision */}
                  <div className="text-center py-6 border-b border-slate-200">
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-lg ${
                      feedback.decision.toLowerCase() === 'yes'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {feedback.decision.toLowerCase() === 'yes' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <XCircle className="w-6 h-6" />
                      )}
                      Investment Decision: {feedback.decision.toUpperCase()}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-slate-800">{feedback.overallScore}/10</div>
                        <div className="text-sm text-slate-600">Overall Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold text-slate-800">{messageCount}</div>
                        <div className="text-sm text-slate-600">Questions Answered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-semibold text-slate-800">
                          {sessionStartTime ? Math.round((new Date() - sessionStartTime) / 1000 / 60) : 0}min
                        </div>
                        <div className="text-sm text-slate-600">Session Duration</div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Feedback */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-2">Overall Feedback</h3>
                      <p className="text-slate-600 leading-relaxed">{feedback.feedback}</p>
                    </div>

                    {feedback.strengths && feedback.strengths.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-green-800 mb-2">Strengths</h3>
                        <ul className="space-y-1">
                          {feedback.strengths.map((strength, index) => (
                            <li key={index} className="text-green-700 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {feedback.improvements && feedback.improvements.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-red-800 mb-2">Areas for Improvement</h3>
                        <ul className="space-y-1">
                          {feedback.improvements.map((improvement, index) => (
                            <li key={index} className="text-red-700 flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {feedback.nextSteps && feedback.nextSteps.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-blue-800 mb-2">Next Steps</h3>
                        <ul className="space-y-1">
                          {feedback.nextSteps.map((step, index) => (
                            <li key={index} className="text-blue-700 flex items-start gap-2">
                              <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => navigate('/')}
                      className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Home
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Chat Interface - Full Screen
          <div className="flex-1 flex flex-col min-h-0 p-4 sm:p-6">
            <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden flex flex-col">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-semibold flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Live Pitch Session
                  </h2>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MessageCircle className="w-4 h-4" />
                    <span>{messages.length} messages</span>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-blue-100' 
                          : message.type === 'investor'
                          ? 'bg-green-100'
                          : 'bg-gray-100'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-blue-600" />
                        ) : message.type === 'investor' ? (
                          <Bot className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : message.type === 'investor'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-2 opacity-70 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">Investor is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {pitchStarted && !pitchEnded && (
                <div className="border-t border-slate-200 p-4 sm:p-6 flex-shrink-0">
                  <div className="flex gap-3">
                    <textarea
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your response to the investor..."
                      className="flex-1 resize-none border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                      rows="3"
                      disabled={isLoading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!userInput.trim() || isLoading}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </div>
                  
                  {/* Mobile-friendly tips */}
                  <div className="mt-2 text-xs text-slate-500 text-center sm:text-left">
                    Press Enter to send • Shift+Enter for new line
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockPitch;
