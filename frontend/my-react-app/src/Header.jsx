 "use client"

import { useState, useCallback, useRef } from "react"
import {
 
  Sparkles,
  BookOpen,

} from "lucide-react"
 
export default function Header(){ 

return (
  <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  PitchPerfect AI
                </h1>
                <p className="text-sm text-slate-600 hidden sm:block">AI-powered pitch analysis & optimization</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
            
              <button
                onClick={() => setCurrentPage("examples")}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Examples & Guide</span>
              </button>
            
            </div>
          </div>
        </div>
      </header>
)
}