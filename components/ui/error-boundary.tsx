"use client"

import { Component, ReactNode } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-warning mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Oops! Terjadi Kesalahan</h2>
              <p className="text-muted-foreground">
                Maaf, terjadi kesalahan yang tidak terduga. Tim kami telah diberitahu dan sedang memperbaikinya.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Muat Ulang Halaman
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'} 
                className="w-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </div>

            <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left">
              <p className="text-sm text-muted-foreground mb-2">Bantuan:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Coba muat ulang halaman</li>
                <li>• Periksa koneksi internet Anda</li>
                <li>• Hubungi support jika masalah berlanjut</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export function ErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-800 mb-1">Terjadi Kesalahan</h3>
          <p className="text-sm text-red-700 mb-3">{error.message}</p>
          <Button size="sm" onClick={resetError} variant="outline">
            Coba Lagi
          </Button>
        </div>
      </div>
    </div>
  )
}