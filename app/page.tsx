import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Code, Database, Cloud, Smartphone, ExternalLink } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0d1117]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-16 md:py-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-5"></div>
          <div className="container relative z-10">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#e6edf3]">
                Eren Araz
              </h1>
              <p className="mb-4 sm:mb-6 text-lg sm:text-xl text-[#c9d1d9]">Full-Stack Developer</p>
              <p className="mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base text-[#8b949e] px-4 sm:px-0">
                Hi, I am a full-stack developer currently working on various projects including chess engines, AI
                applications, and cloud-based solutions.
              </p>
              <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4 px-4 sm:px-0">
                <Button size="lg" className="gap-2 bg-[#238636] text-white hover:bg-[#2ea043]">
                  <ExternalLink className="h-5 w-5" />
                  View Projects
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#e6edf3]"
                >
                  <Github className="h-5 w-5" />
                  GitHub Profile
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-12 sm:py-16 bg-[#161b22]" id="projects">
          <div className="container">
            <div className="mx-auto mb-8 sm:mb-12 max-w-[800px] text-center px-4 sm:px-0">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#e6edf3]">
                Projects
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#8b949e]">
                A selection of my recent work and open-source contributions.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3 px-4 sm:px-0">
              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardHeader className="pb-2">
                  <div className="h-10 w-10 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff] mb-2">
                    <Database className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base sm:text-lg text-[#e6edf3]">Warehouse</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-[#8b949e]">
                    Data Management System
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-[#8b949e]">
                    Powerful and efficient engine for your applications. Built with modern technologies for optimal
                    performance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardHeader className="pb-2">
                  <div className="h-10 w-10 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff] mb-2">
                    <Code className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base sm:text-lg text-[#e6edf3]">Tic-Tac-Toe AI</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-[#8b949e]">
                    Game AI Implementation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-[#8b949e]">
                    Advanced AI technology for intelligent decision-making in the classic game of Tic-Tac-Toe.
                  </p>
                </CardContent>
              </Card>

              <Link href="/potential" className="block group">
                <Card className="border-[#30363d] bg-[#0d1117] shadow-md h-full transition-all duration-300 group-hover:border-[#58a6ff] group-hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <div className="h-10 w-10 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#58a6ff] mb-2">
                      <div className="relative h-6 w-6 rounded-sm overflow-hidden bg-[#0a1929]">
                        <Image
                          src="/images/potential_logo.png"
                          alt="Potential Logo"
                          fill
                          className="object-contain scale-110"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg text-[#e6edf3]">Potential</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-[#8b949e]">Chess Engine</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs sm:text-sm text-[#8b949e]">
                      Strong, Universal Chess Interface supported chess engine with 3000+ ELO rating.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-12 sm:py-16" id="skills">
          <div className="container">
            <div className="mx-auto mb-8 sm:mb-12 max-w-[800px] text-center px-4 sm:px-0">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#e6edf3]">
                Skills
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#8b949e]">
                Technical expertise and professional capabilities.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4 px-4 sm:px-0">
              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Code className="h-10 w-10 text-[#58a6ff] mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-[#e6edf3] mb-2">Coding</h3>
                  <p className="text-xs sm:text-sm text-center text-[#8b949e]">
                    Proficient in various programming languages.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Database className="h-10 w-10 text-[#58a6ff] mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-[#e6edf3] mb-2">Database</h3>
                  <p className="text-xs sm:text-sm text-center text-[#8b949e]">
                    Experienced in database design and management.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Cloud className="h-10 w-10 text-[#58a6ff] mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-[#e6edf3] mb-2">Cloud</h3>
                  <p className="text-xs sm:text-sm text-center text-[#8b949e]">
                    Expertise in cloud-based solutions and deployment.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <Smartphone className="h-10 w-10 text-[#58a6ff] mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-[#e6edf3] mb-2">Mobile</h3>
                  <p className="text-xs sm:text-sm text-center text-[#8b949e]">Proficient in mobile app development.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section className="py-12 sm:py-16 bg-[#161b22]" id="certificates">
          <div className="container">
            <div className="mx-auto mb-8 sm:mb-12 max-w-[800px] text-center px-4 sm:px-0">
              <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#e6edf3]">
                Certificates
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-[#8b949e]">
                Professional certifications and achievements.
              </p>
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-4 px-4 sm:px-0">
              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="h-16 w-16 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center mb-4">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Responsive Web Design Certificate"
                      width={48}
                      height={48}
                    />
                  </div>
                  <h3 className="text-base font-medium text-[#e6edf3] mb-1 text-center">Responsive Web Design</h3>
                  <p className="text-xs text-center text-[#8b949e]">freeCodeCamp</p>
                </CardContent>
              </Card>

              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="h-16 w-16 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center mb-4">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="JavaScript Algorithms Certificate"
                      width={48}
                      height={48}
                    />
                  </div>
                  <h3 className="text-base font-medium text-[#e6edf3] mb-1 text-center">JavaScript Algorithms</h3>
                  <p className="text-xs text-center text-[#8b949e]">freeCodeCamp</p>
                </CardContent>
              </Card>

              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="h-16 w-16 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center mb-4">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Front End Libraries Certificate"
                      width={48}
                      height={48}
                    />
                  </div>
                  <h3 className="text-base font-medium text-[#e6edf3] mb-1 text-center">Front End Libraries</h3>
                  <p className="text-xs text-center text-[#8b949e]">freeCodeCamp</p>
                </CardContent>
              </Card>

              <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="h-16 w-16 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center mb-4">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Data Visualization Certificate"
                      width={48}
                      height={48}
                    />
                  </div>
                  <h3 className="text-base font-medium text-[#e6edf3] mb-1 text-center">Data Visualization</h3>
                  <p className="text-xs text-center text-[#8b949e]">freeCodeCamp</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 sm:py-16">
          <div className="container">
            <div className="mx-auto rounded-lg border border-[#30363d] bg-[#0d1117] p-4 sm:p-6 text-center max-w-3xl">
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-bold text-[#e6edf3]">Get In Touch</h3>
              <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-[#8b949e]">
                Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
              </p>
              <Button size="lg" className="gap-2 bg-[#238636] text-white hover:bg-[#2ea043] text-xs sm:text-sm">
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                Contact Me
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
