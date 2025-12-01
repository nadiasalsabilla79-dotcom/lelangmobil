"use client"

import { useEffect } from "react"

interface WebVitalsMetric {
  name: string
  id: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return
    }

    const isEnabled = process.env.NODE_ENV === 'development'
    if (!isEnabled) return

    try {
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            const loadTime = navEntry.loadEventEnd - navEntry.loadEventStart
            console.log('⚡ Page Load:', `${loadTime.toFixed(2)}ms`)
          }
          if (entry.entryType === 'paint') {
            console.log(`🎨 ${entry.name}:`, `${entry.startTime.toFixed(2)}ms`)
          }
        }
      })
      navObserver.observe({ entryTypes: ['navigation', 'paint'] })

      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        const lcp = lastEntry.startTime
        const rating = lcp < 2500 ? '✅' : lcp < 4000 ? '⚠️' : '❌'
        console.log(`📊 LCP: ${lcp.toFixed(2)}ms ${rating}`)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      return () => {
        navObserver.disconnect()
        lcpObserver.disconnect()
      }
    } catch (error) {
      console.error('Performance monitoring error:', error)
    }
  }, [])

  return null
}

export function reportWebVitals(metric: WebVitalsMetric) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric)
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_rating: metric.rating,
      non_interaction: true,
    })
  }
}