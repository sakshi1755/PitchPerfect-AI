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

export default function Features(){ 

return ( <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2">
          {[
            {
              icon: TrendingUp,
              title: "10-Point Scoring",
              description: "Clear, intuitive scoring system from 1-10 for easy understanding and comparison.",
              color: "blue",
              stat: "Easy to Understand",
            },
          
            {
              icon: Users,
              title: "Investor Ready",
              description: "Prepare for tough questions with AI-generated scenarios and response strategies.",
              color: "purple",
              stat: "1000+ Pitches",
            },
            {
              icon: Target,
              title: "Market Analysis",
              description: "Deep dive into market positioning, competitive landscape, and opportunity sizing.",
              color: "orange",
              stat: "Real-time Data",
            },
            {
            icon: Users,
            title: "AI Mock Pitch",
            description: "Practice with our AI investor who asks tough questions, counters your responses, and gives final feedback with Yes/No/Maybe decision.",
            color: "green",
            stat: "Real Scenarios",
          },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-slate-200/60 hover:shadow-lg hover:border-slate-300 transition-all duration-300 group hover:scale-105"
            >
              <div
                className={`bg-${feature.color}-100 w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-5 sm:w-6 h-5 sm:h-6 text-${feature.color}-600`} />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm mb-3 leading-relaxed">{feature.description}</p>
              <div
                className={`text-xs font-semibold text-${feature.color}-600 bg-${feature.color}-50 px-2 py-1 rounded-full inline-block`}
              >
                {feature.stat}
              </div>
            </div>
          ))}
        </div>
)
   }