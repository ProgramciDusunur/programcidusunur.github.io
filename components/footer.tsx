"use client"

import Link from "next/link"
import { Github, Twitter, Globe, Linkedin, Mail } from "lucide-react"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  const isPotentialPage = pathname === "/potential"

  return (
    <footer className="border-t border-[#21262d] bg-[#0d1117] py-8 sm:py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-base sm:text-lg font-bold text-[#e6edf3]">Eren Araz</span>
            </div>
            <p className="text-xs sm:text-sm text-[#8b949e]">
              {isPotentialPage
                ? "Powerful, open-source UCI chess engine. Distributed under the GPL license."
                : "Full-stack developer specializing in web applications, AI, and chess engines."}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              {isPotentialPage ? (
                <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="sr-only">Website</span>
                </Link>
              ) : (
                <>
                  <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                  <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          {isPotentialPage ? (
            <>
              <div>
                <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-[#e6edf3]">Project</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Download
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Release Notes
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Roadmap
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-[#e6edf3]">Community</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Discord
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Forum
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Contributing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Code of Conduct
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-[#e6edf3]">Resources</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      UCI Protocol
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Evaluation Function
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Test Suites
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Benchmark Results
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Tournament Results
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-[#e6edf3]">Navigation</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link href="#projects" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link href="#skills" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Skills
                    </Link>
                  </li>
                  <li>
                    <Link href="#certificates" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Certificates
                    </Link>
                  </li>
                  <li>
                    <Link href="/potential" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Potential Chess Engine
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-[#e6edf3]">Projects</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Warehouse
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Tic-Tac-Toe AI
                    </Link>
                  </li>
                  <li>
                    <Link href="/potential" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Potential
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      All Projects
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-[#e6edf3]">Contact</h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Email
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-[#8b949e] hover:text-[#e6edf3]">
                      Twitter
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="mt-8 sm:mt-12 border-t border-[#21262d] pt-4 sm:pt-6 px-4 sm:px-0">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-[10px] sm:text-xs text-[#8b949e]">
              &copy; {new Date().getFullYear()} Eren Araz.
              {isPotentialPage ? " Potential Chess Engine distributed under GPL-3.0 license." : " All rights reserved."}
            </p>
            <div className="flex gap-4 text-[10px] sm:text-xs text-[#8b949e]">
              <Link href="#" className="hover:text-[#e6edf3]">
                {isPotentialPage ? "License" : "Privacy Policy"}
              </Link>
              <Link href="#" className="hover:text-[#e6edf3]">
                {isPotentialPage ? "Privacy" : "Terms of Service"}
              </Link>
              <Link href="#" className="hover:text-[#e6edf3]">
                {isPotentialPage ? "Security" : "Contact"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
