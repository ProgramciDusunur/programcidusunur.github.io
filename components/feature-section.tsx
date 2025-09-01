import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, GitBranch, Zap, Scale, Layers, Code } from "lucide-react"

export function FeatureSection() {
  return (
    <section className="py-12 sm:py-16" id="features">
      <div className="container">
        <div className="mx-auto mb-8 sm:mb-12 max-w-[800px] text-center px-4 sm:px-0">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#e6edf3]">
            Technical Features
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#8b949e]">
            Potential is a powerful open-source project using classic chess engine technologies.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader className="pb-2">
              <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Handcrafted Evaluation</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">Classic HCE Evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                Precisely tuned evaluation function created with expert chess knowledge for accurate position
                assessment.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader className="pb-2">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Powerful Search Algorithm</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">
                Efficient Position Analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                Optimized search algorithm for single-core processors that provides deep position analysis.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader className="pb-2">
              <Scale className="h-5 w-5 sm:h-6 sm:w-6 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Advanced Search</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">Deep Position Analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                Optimized search algorithm with alpha-beta pruning, null move heuristic, and late move reductions.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader className="pb-2">
              <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Bitboard Architecture</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">
                Efficient Board Representation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                Uses modern bitboard architecture for fast move generation and position evaluation.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader className="pb-2">
              <Code className="h-5 w-5 sm:h-6 sm:w-6 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">UCI Protocol</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">
                Universal Interface Compatibility
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                Full compatibility with all modern chess interfaces through the Universal Chess Interface (UCI)
                protocol.
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader className="pb-2">
              <GitBranch className="h-5 w-5 sm:h-6 sm:w-6 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Open Source</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">Community Development</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                Developed as open source under the GPL license, open to community contributions.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
