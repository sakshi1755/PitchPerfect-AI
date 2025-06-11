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
// API Configuration
const API_BASE_URL = "http://localhost:3001/api"

// API Functions
import ConnectionStatus from "./componets/ConnectionStatus"

 
export default function Header({ showMobileMenu, setShowMobileMenu }){ 
const navigate = useNavigate()
return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between min-w-0">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-lg flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent truncate">
                  PitchPerfect AI
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 hidden sm:block truncate">
                  AI-powered pitch analysis & optimization
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <ConnectionStatus />
              <button
                onClick={() => {
                  navigate("/guide")
                }}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200 whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Examples & Guide</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-1 flex-shrink-0">
              <ConnectionStatus />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowMobileMenu(!showMobileMenu)
                }}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
                aria-label="Toggle mobile menu"
                aria-expanded={showMobileMenu}
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 pb-4 border-t border-slate-200 animate-in slide-in-from-top-2 duration-200 mobile-menu-container">
              <div className="pt-4 space-y-2">
                <button
                  onClick={() => {
                    navigate("/guide")
                    setShowMobileMenu(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200 text-left"
                >
                  <BookOpen className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">Examples & Guide</span>
                  <ArrowRight className="w-4 h-4 ml-auto flex-shrink-0" />
                </button>

                {/* Mobile-only quick actions */}
                <div className="px-4 py-2">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Quick Actions</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        document.querySelector("textarea")?.focus()
                        setShowMobileMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all duration-200 text-left text-sm"
                    >
                      <FileText className="w-4 h-4 flex-shrink-0" />
                      <span>Paste Content</span>
                    </button>
                    <button
                      onClick={() => {
                        fileInputRef.current?.click()
                        setShowMobileMenu(false)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-all duration-200 text-left text-sm"
                    >
                      <Upload className="w-4 h-4 flex-shrink-0" />
                      <span>Upload File</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
)
}