"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isPotentialPage = pathname === "/potential"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#21262d] bg-[#0d1117]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0d1117]/80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-lg sm:text-xl font-bold text-[#e6edf3]">Eren Araz</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6">
            {isPotentialPage ? (
              <>
                <li>
                  <Link href="/potential#features" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/potential#download" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    Download
                  </Link>
                </li>
                <li>
                  <Link href="/potential/play" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    Play Online
                  </Link>
                </li>
                <li>
                  <Link href="/potential#news" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="/potential#development" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="/potential#documentation" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    Documentation
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="#projects" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#skills" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    Skills
                  </Link>
                </li>
                <li>
                  <Link href="#certificates" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    Certificates
                  </Link>
                </li>
                <li>
                  <Link href="/potential" className="text-sm text-[#c9d1d9] hover:text-[#e6edf3]">
                    Potential
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {isPotentialPage && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="hidden border-[#30363d] bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-[#e6edf3] md:flex"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button size="sm" className="bg-[#238636] text-white hover:bg-[#2ea043]">
                Download
              </Button>
            </>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-[#e6edf3]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] border-[#30363d] bg-[#0d1117] text-[#e6edf3] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-[#21262d]">
                  <div className="flex items-center">
                    <span className="text-lg font-bold">Eren Araz</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex-1 p-4">
                  <ul className="space-y-4">
                    {isPotentialPage ? (
                      <>
                        <li>
                          <Link
                            href="/potential#features"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Features
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/potential#download"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Download
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/potential/play"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Play Online
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/potential#news"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            News
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/potential#development"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Development
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/potential#documentation"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Documentation
                          </Link>
                        </li>
                        <li className="pt-4 mt-4 border-t border-[#21262d]">
                          <Link
                            href="/"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Back to Portfolio
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            href="#projects"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Projects
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#skills"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Skills
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#certificates"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Certificates
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/potential"
                            className="block py-2 text-[#c9d1d9] hover:text-[#e6edf3]"
                            onClick={() => setIsOpen(false)}
                          >
                            Potential
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
                {isPotentialPage && (
                  <div className="p-4 border-t border-[#21262d]">
                    <Button
                      className="w-full gap-2 bg-[#238636] text-white hover:bg-[#2ea043]"
                      onClick={() => setIsOpen(false)}
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
