"use client"

import { ArrowUp } from "lucide-react"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} Leon C. Tyes</span>
            <span className="hidden md:block">•</span>
            <span>Visual Designer</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
              <ArrowUp className="w-4 h-4 group-hover:text-primary-foreground transition-colors" />
            </div>
          </button>
        </div>

        {/* Large name */}
        <div className="mt-16 overflow-hidden">
          <p className="font-display text-6xl md:text-9xl lg:text-[12rem] font-bold text-border/30 leading-none tracking-tighter whitespace-nowrap">
            LEON C. TYES
          </p>
        </div>
      </div>
    </footer>
  )
}
