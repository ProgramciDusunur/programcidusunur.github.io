import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Terminal, Apple, ComputerIcon as Windows, LaptopIcon as Linux } from "lucide-react"
import { ChessIcon } from "@/components/chess-icon"
import Link from "next/link"

export function DownloadSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#161b22]" id="download">
      <div className="container">
        <div className="mx-auto mb-8 sm:mb-12 max-w-[800px] text-center px-4 sm:px-0">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#e6edf3]">
            Download Options
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#8b949e]">
            Potential has optimized versions for all popular operating systems.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-0">
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader>
              <Windows className="h-6 w-6 sm:h-8 sm:w-8 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Windows</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">64-bit for Windows 10/11</CardDescription>
            </CardHeader>
            <CardContent className="text-[#8b949e]">
              <p className="text-xs sm:text-sm">
                Optimized version for modern Windows systems with AVX2 instruction set support.
              </p>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>8.2 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>April 12, 2023</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 bg-[#238636] text-white hover:bg-[#2ea043] text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                Windows x64
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader>
              <Linux className="h-6 w-6 sm:h-8 sm:w-8 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Linux</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">64-bit for Linux</CardDescription>
            </CardHeader>
            <CardContent className="text-[#8b949e]">
              <p className="text-xs sm:text-sm">
                Optimized version for Linux systems that takes advantage of modern processor features.
              </p>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>7.8 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>April 12, 2023</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 bg-[#238636] text-white hover:bg-[#2ea043] text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                Linux x64
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader>
              <Apple className="h-6 w-6 sm:h-8 sm:w-8 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">macOS</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">Intel and Apple Silicon</CardDescription>
            </CardHeader>
            <CardContent className="text-[#8b949e]">
              <p className="text-xs sm:text-sm">
                Universal Binary version optimized for both Intel and Apple Silicon processors.
              </p>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>9.5 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>April 12, 2023</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 bg-[#238636] text-white hover:bg-[#2ea043] text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                macOS Universal
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md md:col-span-2 lg:col-span-3">
            <CardHeader>
              <Terminal className="h-6 w-6 sm:h-8 sm:w-8 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Build from Source</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">
                Custom build for maximum performance
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[#8b949e]">
              <p className="text-xs sm:text-sm">
                You can build from source for processor-specific optimizations. Use the following commands to compile
                the project:
              </p>
              <pre className="mt-4 overflow-x-auto rounded-md bg-[#161b22] p-2 sm:p-4 text-xs text-[#c9d1d9]">
                <code>
                  {`git clone https://github.com/potential/potential.git
cd potential
make ARCH=x86-64-avx2 -j`}
                </code>
              </pre>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full gap-2 border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#e6edf3] text-xs sm:text-sm"
              >
                <Terminal className="h-3 w-3 sm:h-4 sm:w-4" />
                Build Instructions
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-8 sm:mt-12 rounded-lg border border-[#30363d] bg-[#0d1117] p-4 sm:p-6 text-center mx-4 sm:mx-0">
          <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-bold text-[#e6edf3]">Try Potential Online</h3>
          <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-[#8b949e]">
            Want to test Potential without downloading? Try our online interface where you can play against Potential
            directly in your browser using WebAssembly.
          </p>
          <Link href="/potential/play" passHref>
            <Button size="lg" className="gap-2 bg-[#238636] text-white hover:bg-[#2ea043]">
              <ChessIcon className="h-5 w-5" />
              Play with Potential
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
