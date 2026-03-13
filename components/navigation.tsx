"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6 transition-all duration-500 ${
          isScrolled ? 'bg-background/80 backdrop-blur-lg' : ''
        }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">
            LCT
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <li key={item.label}>
                <a 
                  href={item.href}
                  className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[100] bg-background transition-opacity duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-6 flex justify-between items-center">
          <span className="text-sm font-medium tracking-wide">LCT</span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-12">
          {navItems.map((item, index) => (
            <a 
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`text-4xl font-display font-bold hover:text-primary transition-all duration-500 ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
