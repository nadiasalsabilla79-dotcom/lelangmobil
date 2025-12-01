"use client"

interface LightweightBackgroundProps {
  theme?: 'blue' | 'purple' | 'green' | 'gradient'
}

const themes = {
  blue: 'bg-gradient-to-br from-blue-50 via-white to-blue-100',
  purple: 'bg-gradient-to-br from-purple-50 via-white to-purple-100', 
  green: 'bg-gradient-to-br from-green-50 via-white to-green-100',
  gradient: 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100'
}

export function LightweightBackground({ theme = 'blue' }: LightweightBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${themes[theme]}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  )
}