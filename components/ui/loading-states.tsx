"use client"

import { useState, useEffect } from "react"
import { Loader2, Car, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <Loader2 className={cn("animate-spin", sizeClasses[size], className)} />
  )
}

export function AuctionLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="flex justify-between">
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function PageLoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-4">
          <Car className="h-12 w-12 text-navy mx-auto animate-bounce" />
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-2 h-1 bg-navy rounded-full animate-pulse" />
              <div className="w-2 h-1 bg-navy rounded-full animate-pulse animation-delay-200" />
              <div className="w-2 h-1 bg-navy rounded-full animate-pulse animation-delay-400" />
            </div>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-navy mb-2">Memuat LelangMobil</h3>
        <p className="text-muted-foreground">Mohon tunggu sebentar...</p>
      </div>
    </div>
  )
}

export function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = endTime.getTime() - new Date().getTime()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="h-4 w-4 text-warning" />
      <div className="flex gap-1">
        {timeLeft.days > 0 && <span className="bg-navy text-white px-2 py-1 rounded text-xs">{timeLeft.days}h</span>}
        <span className="bg-navy text-white px-2 py-1 rounded text-xs">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="text-muted-foreground">:</span>
        <span className="bg-navy text-white px-2 py-1 rounded text-xs">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="text-muted-foreground">:</span>
        <span className="bg-navy text-white px-2 py-1 rounded text-xs">{timeLeft.seconds.toString().padStart(2, '0')}</span>
      </div>
    </div>
  )
}