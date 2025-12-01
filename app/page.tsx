import type { Metadata } from "next"
import { ModernHeroSection } from "@/components/home/modern-hero-section"
import { ModernStatsSection } from "@/components/home/modern-stats-section"
import { LiveAuctionSection } from "@/components/home/live-auction-section"
import { UpcomingAuctionSection } from "@/components/home/upcoming-auction-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { BrandLogosSection } from "@/components/home/brand-logos-section"
import { BankPartners } from "@/components/home/bank-partners"
import { FAQSection } from "@/components/home/faq-section"
import { CTASection } from "@/components/home/cta-section"
import { NewsUpdates } from "@/components/home/news-updates"
import { MobileAppPromo } from "@/components/home/mobile-app-promo"

export const metadata: Metadata = {
  title: "LelangMobil - Platform Lelang Mobil Online Terpercaya Indonesia",
  description: "Platform lelang mobil online terpercaya di Indonesia. Dapatkan mobil bekas berkualitas dengan harga terbaik melalui sistem lelang yang transparan, aman, dan mudah. Bonus Rp 1.000.000 untuk member baru!",
  keywords: "lelang mobil, lelang mobil online, jual beli mobil bekas, mobil bekas murah, auction mobil, lelang kendaraan, mobil second, platform lelang, mobil bekas terpercaya, lelang mobil indonesia",
  openGraph: {
    title: "LelangMobil - Platform Lelang Mobil Online Terpercaya Indonesia",
    description: "Dapatkan mobil bekas berkualitas dengan harga terbaik melalui sistem lelang online yang transparan dan aman. Bonus Rp 1.000.000 untuk member baru!",
    url: "https://lelangmobil.com",
    siteName: "LelangMobil",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LelangMobil - Platform Lelang Mobil Online",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LelangMobil - Platform Lelang Mobil Online Terpercaya",
    description: "Dapatkan mobil bekas berkualitas dengan harga terbaik melalui sistem lelang online yang transparan dan aman.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://lelangmobil.com",
  },
}

export default function HomePage() {
  return (
    <>
      {/* Structured Data for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "LelangMobil",
            "url": "https://lelangmobil.com",
            "description": "Platform lelang mobil online terpercaya di Indonesia",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://lelangmobil.com/lelang?search={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "publisher": {
              "@type": "Organization",
              "name": "LelangMobil",
              "logo": {
                "@type": "ImageObject",
                "url": "https://lelangmobil.com/logo-lelangmobil.svg"
              }
            }
          })
        }}
      />

      <main className="min-h-screen">
        <ModernHeroSection />
        <ModernStatsSection />
        <LiveAuctionSection />
        <UpcomingAuctionSection />
        <HowItWorksSection />
        <BrandLogosSection />
        <TestimonialsSection />
        <BankPartners />
        <NewsUpdates />
        <MobileAppPromo />
        <FAQSection />
        <CTASection />
      </main>
    </>
  )
}