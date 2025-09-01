import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function NewsSection() {
  return (
    <section className="py-12 sm:py-16" id="news">
      <div className="container">
        <div className="mx-auto mb-8 sm:mb-12 max-w-[800px] text-center px-4 sm:px-0">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#e6edf3]">
            News & Announcements
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#8b949e]">
            Latest developments and updates about the Potential chess engine.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-[#e6edf3]">Potential 1.0.0 Released</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">April 12, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                The first stable version, Potential 1.0.0, has been released with improved evaluation function and
                search algorithm. This version is approximately 50 ELO stronger than previous beta versions.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="flex items-center gap-1 text-xs sm:text-sm text-[#58a6ff] hover:underline">
                Read More <ArrowRight className="h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-[#e6edf3]">CCRL Rating Milestone</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">March 28, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                Potential has achieved a significant milestone by surpassing the 3000 ELO mark in the Computer Chess
                Rating Lists (CCRL) 40/15 list.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="flex items-center gap-1 text-xs sm:text-sm text-[#58a6ff] hover:underline">
                Read More <ArrowRight className="h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg text-[#e6edf3]">Looking for Contributors</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">March 15, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                The Potential team is looking for C++ developers and people experienced in chess algorithms to
                contribute to the project. Join our open source community!
              </p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="flex items-center gap-1 text-xs sm:text-sm text-[#58a6ff] hover:underline">
                Read More <ArrowRight className="h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-6 sm:mt-8 text-center">
          <Link href="#" className="text-xs sm:text-sm text-[#58a6ff] hover:underline">
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}
