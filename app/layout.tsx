import type { Metadata } from "next"
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google"
import "./global.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap"
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
})

export const metadata: Metadata = {
  metadataBase: new URL("https://lelangmobil.com"),
  title: {
    default: "LelangMobil - Platform Lelang Mobil Online Terpercaya Indonesia",
    template: "%s | LelangMobil"
  },
  description: "Platform lelang mobil online terpercaya di Indonesia. Dapatkan mobil bekas berkualitas dengan harga terbaik melalui sistem lelang yang transparan, aman, dan mudah. Bonus Rp 1.000.000 untuk member baru!",
  keywords: [
    "lelang mobil",
    "lelang mobil online",
    "jual beli mobil bekas",
    "mobil bekas murah",
    "auction mobil",
    "lelang kendaraan",
    "mobil second",
    "platform lelang",
    "mobil bekas terpercaya",
    "lelang mobil indonesia",
    "toyota avanza bekas",
    "honda civic bekas",
    "mitsubishi pajero bekas",
    "mobil keluarga bekas",
    "lelang mobil jakarta",
    "lelang mobil surabaya",
    "lelang mobil bandung"
  ],
  authors: [{ name: "LelangMobil Team" }],
  creator: "LelangMobil Indonesia",
  publisher: "PT LelangMobil Indonesia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://lelangmobil.com",
    siteName: "LelangMobil",
    title: "LelangMobil - Platform Lelang Mobil Online Terpercaya Indonesia",
    description: "Platform lelang mobil online terpercaya di Indonesia. Dapatkan mobil bekas berkualitas dengan harga terbaik melalui sistem lelang yang transparan, aman, dan mudah.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LelangMobil - Platform Lelang Mobil Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LelangMobil - Platform Lelang Mobil Online Terpercaya",
    description: "Dapatkan mobil bekas berkualitas dengan harga terbaik melalui sistem lelang online yang transparan dan aman.",
    images: ["/og-image.jpg"],
    creator: "@lelangmobil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://lelangmobil.com",
  },
  category: "automotive",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LelangMobil",
              "url": "https://lelangmobil.com",
              "logo": "https://lelangmobil.com/logo-lelangmobil.svg",
              "description": "Platform lelang mobil online terpercaya di Indonesia",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Sudirman No. 123",
                "addressLocality": "Jakarta Pusat",
                "addressRegion": "DKI Jakarta",
                "postalCode": "10220",
                "addressCountry": "ID"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+62-21-12345678",
                "contactType": "customer service",
                "availableLanguage": "Indonesian"
              },
              "sameAs": [
                "https://facebook.com/lelangmobil",
                "https://instagram.com/lelangmobil",
                "https://twitter.com/lelangmobil"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}