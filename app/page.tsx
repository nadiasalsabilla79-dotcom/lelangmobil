import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"
import { BannerSlider } from "@/components/home/banner-slider"
import { StatsSection } from "@/components/home/stats-section"
import { BrandLogosSection } from "@/components/home/brand-logos-section"
import { LiveAuctionSection } from "@/components/home/live-auction-section"
import { UpcomingAuctionSection } from "@/components/home/upcoming-auction-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { BankPartners } from "@/components/home/bank-partners"
import { NewsUpdates } from "@/components/home/news-updates"
import { FAQSection } from "@/components/home/faq-section"
import { MobileAppPromo } from "@/components/home/mobile-app-promo"
import { CTASection } from "@/components/home/cta-section"
import { LiveChat } from "@/components/support/live-chat"

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <BannerSlider />
          <StatsSection />
          <BrandLogosSection />
          <LiveAuctionSection />
          <UpcomingAuctionSection />
          <HowItWorksSection />
          <TestimonialsSection />
          <BankPartners />
          <NewsUpdates />
          <FAQSection />
          <MobileAppPromo />
          <CTASection />
        </main>
        <Footer />
        <LiveChat />
      </div>
    </>
  )
}
