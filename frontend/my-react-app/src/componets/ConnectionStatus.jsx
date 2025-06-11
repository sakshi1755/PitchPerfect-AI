"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, AlertCircle } from "lucide-react"

const ConnectionStatus = () => {
  const [status, setStatus] = useState("checking") // 'checking', 'connected', 'disconnected', 'error'
  const [lastChecked, setLastChecked] = useState(null)
  const [timeAgo, setTimeAgo] = useState("")

  const getTimeAgo = (date) => {
    if (!date) return ""

    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes}m ago`
    } else {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours}h ago`
    }
  }

  const checkConnection = async () => {
    try {
      setStatus("checking")
      const response = await fetch("https://pitch-perfect-ai-phi.vercel.app/api/health", {
        method: "GET",
        timeout: 5000,
      })

      if (response.ok) {
        setStatus("connected")
      } else {
        setStatus("error")
      }
    } catch (error) {
      setStatus("disconnected")
    } finally {
      const now = new Date()
      setLastChecked(now)
    }
  }

  // Update time ago every minute
  useEffect(() => {
    if (lastChecked) {
      setTimeAgo(getTimeAgo(lastChecked))
      const timeInterval = setInterval(() => {
        setTimeAgo(getTimeAgo(lastChecked))
      }, 60000) // Update every minute

      return () => clearInterval(timeInterval)
    }
  }, [lastChecked])

  useEffect(() => {
    checkConnection()
    const interval = setInterval(checkConnection, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const getStatusConfig = () => {
    switch (status) {
      case "connected":
        return {
          icon: Wifi,
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
          text: "Backend Connected",
          pulse: false,
        }
      case "disconnected":
        return {
          icon: WifiOff,
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
          text: "Backend Disconnected",
          pulse: false,
        }
      case "error":
        return {
          icon: AlertCircle,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "Backend Error",
          pulse: false,
        }
      default:
        return {
          icon: Wifi,
          color: "text-gray-600",
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "Checking...",
          pulse: true,
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <div
      className={`inline-flex items-center gap-2 px-2 py-1.5 sm:px-3 rounded-lg text-xs font-medium ${config.bg} ${config.border} border transition-all duration-200`}
    >
      <Icon className={`w-3 h-3 ${config.color} ${config.pulse ? "animate-pulse" : ""}`} />
      <span className={`${config.color} hidden sm:inline`}>{config.text}</span>
      {timeAgo && status !== "checking" && (
        <span className="text-gray-400 font-normal hidden sm:inline">• {timeAgo}</span>
      )}
    </div>
  )
}

export default ConnectionStatus
