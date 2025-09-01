import { DownloadSection } from "@/components/download-section"
import { FeatureSection } from "@/components/feature-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { NewsSection } from "@/components/news-section"
import { DevelopmentSection } from "@/components/development-section"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PotentialPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117]">
      <Header />
      <div className="container mt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-[#8b949e] hover:text-[#58a6ff] transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Portfolio
        </Link>
      </div>
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <DownloadSection />
        <NewsSection />
        <DevelopmentSection />
      </main>
      <Footer />
    </div>
  )
}
