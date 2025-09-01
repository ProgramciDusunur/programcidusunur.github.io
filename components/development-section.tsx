import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, GitPullRequest, Code, Users } from "lucide-react"

export function DevelopmentSection() {
  return (
    <section className="py-12 sm:py-16 bg-[#161b22]" id="development">
      <div className="container">
        <div className="mx-auto mb-8 sm:mb-12 max-w-[800px] text-center px-4 sm:px-0">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#e6edf3]">
            Join Development
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#8b949e]">
            Potential is an open source project and welcomes your contributions.
          </p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 px-4 sm:px-0">
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader>
              <Code className="h-6 w-6 sm:h-8 sm:w-8 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Source Code</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">Open Source on GitHub</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                All of Potential's source code is available on GitHub under the GPL license. You can examine the code,
                create forks, and contribute.
              </p>
              <div className="mt-4 overflow-hidden rounded-md bg-[#161b22] p-2 sm:p-4">
                <pre className="text-xs text-[#c9d1d9]">
                  <code>
                    {`git clone https://github.com/potential/potential.git
cd potential
# Build and explore the project`}
                  </code>
                </pre>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#e6edf3] text-xs sm:text-sm">
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                Visit GitHub Repository
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-[#30363d] bg-[#0d1117] shadow-md">
            <CardHeader>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#58a6ff]" />
              <CardTitle className="mt-2 text-base sm:text-lg text-[#e6edf3]">Community</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-[#8b949e]">Join the Discussions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-[#8b949e]">
                We have an active developer community on our Discord server and GitHub discussions. You can ask
                questions, share ideas, and contribute to the project.
              </p>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[#8b949e]">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#58a6ff]"></div>
                  <span>GitHub Discussions and Issue Tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#58a6ff]"></div>
                  <span>Discord Community</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#58a6ff]"></div>
                  <span>Weekly Developer Meetings</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#58a6ff]"></div>
                  <span>Documentation and Wiki Contributions</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#e6edf3] text-xs sm:text-sm">
                <GitPullRequest className="h-3 w-3 sm:h-4 sm:w-4" />
                Join the Community
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-8 sm:mt-12 rounded-lg border border-[#30363d] bg-[#0d1117] p-4 sm:p-6 text-center mx-4 sm:mx-0">
          <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-bold text-[#e6edf3]">Ready to Contribute?</h3>
          <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-[#8b949e]">
            Potential is a project that grows with community contributions. You can contribute with code, documentation,
            or testing.
          </p>
          <Button size="lg" className="gap-2 bg-[#238636] text-white hover:bg-[#2ea043] text-xs sm:text-sm">
            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
            Get Started on GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}
