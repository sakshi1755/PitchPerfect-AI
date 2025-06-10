 "use client"

import { useState, useCallback, useRef } from "react"

export default function Footer(){ 

return (
<footer className="bg-slate-50 border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">© 2025 PitchPerfect AI. Powered by advanced AI to help entrepreneurs succeed.</p>
            <p className="text-xs text-slate-500 mt-2">
              All scores are based on comprehensive analysis of successful pitch patterns.
            </p>
          </div>
        </div>
      </footer>

)
}