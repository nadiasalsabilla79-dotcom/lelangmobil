import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"
import { Analytics as VercelAnalytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics/tracking"
import { PerformanceMonitor } from "@/components/monitoring/performance"
import "../styles/globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
})
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "LelangMobil - Platform Lelang Mobil Terpercaya di Indonesia",
    template: "%s | LelangMobil",
  },
  description:
    "Platform lelang mobil online terpercaya di Indonesia. Dapatkan mobil impian dengan harga terbaik. Proses aman, transparan, dan mudah.",
  keywords: ["lelang mobil", "auction mobil", "beli mobil bekas", "mobil murah", "lelang online", "mobil second"],
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LelangMobil"
  },
  openGraph: {
    title: "LelangMobil - Platform Lelang Mobil Terpercaya",
    description: "Dapatkan mobil impian dengan harga terbaik melalui lelang online.",
    type: "website",
    locale: "id_ID",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e3a5f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${plusJakarta.variable} ${playfair.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
          <Analytics />
          <PerformanceMonitor />
          <VercelAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
