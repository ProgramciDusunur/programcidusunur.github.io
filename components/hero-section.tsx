import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Github } from "lucide-react"
import { ChessIcon } from "@/components/chess-icon"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-5"></div>

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Logo container with softer rounded corners and solid background */}
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 mb-6 sm:mb-8 rounded-2xl overflow-hidden bg-[#0a1929]">
            <Image src="/images/potential_logo.png" alt="Potential Logo" fill className="object-contain scale-110" />
          </div>

          <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#e6edf3]">
            Potential
          </h1>
          <p className="mb-4 sm:mb-6 text-lg sm:text-xl text-[#c9d1d9]">Powerful, Open Source UCI Chess Engine</p>
          <p className="mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base text-[#8b949e] px-4 sm:px-0">
            Potential is a powerful open-source chess engine optimized for modern CPU architectures. It offers strong
            gameplay through advanced search algorithms and handcrafted evaluation.
          </p>
          <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4 px-4 sm:px-0">
            <Button size="lg" className="gap-2 bg-[#238636] text-white hover:bg-[#2ea043]">
              <Download className="h-5 w-5" />
              Download v1.0.0
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#e6edf3]"
            >
              <Github className="h-5 w-5" />
              Source Code
            </Button>
            <Link href="/potential/play" passHref>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#e6edf3]"
              >
                <ChessIcon className="h-5 w-5" />
                Try Online
              </Button>
            </Link>
          </div>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-[#8b949e] px-4 sm:px-0">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-[#238636]"></div>
              <span>3000+ ELO</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-[#238636]"></div>
              <span>UCI Compatible</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-[#238636]"></div>
              <span>Open Source</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
