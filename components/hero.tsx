"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Decorative elements */}
      <div 
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
      />
      <div 
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-2xl transition-transform duration-700 ease-out"
        style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
      />
      
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-border/30" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-border/30" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-border/30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Label */}
        <div 
          className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Visual Designer
          </span>
        </div>

        {/* Name */}
        <h1 
          className={`font-display text-5xl md:text-7xl lg:text-9xl font-bold leading-[0.9] tracking-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="block">Leon C.</span>
          <span className="block text-primary">Tyes</span>
        </h1>

        {/* Statement */}
        <p 
          className={`mt-12 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          I design visual stories through branding, motion, and digital experiences.
        </p>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-12 left-0 flex items-center gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="w-px h-16 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-primary animate-pulse" />
          </div>
          <a 
            href="#work" 
            className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors group"
          >
            <span>Scroll to explore</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Year */}
        <div 
          className={`absolute bottom-12 right-0 text-right transition-all duration-1000 hidden md:block ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Portfolio 2026
          </span>
        </div>
      </div>
    </section>
  )
}
