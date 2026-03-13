"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
]

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      setMousePosition({ x: x * 0.2, y: y * 0.2 })
    }
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-32 px-6 md:px-12 lg:px-24 relative min-h-screen flex items-center"
    >
      {/* Decorative circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-border/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-border/30 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative">
        {/* Section Header */}
        <div 
          className={`flex items-center gap-8 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            03
          </span>
          <div className={`h-px bg-border flex-1 ${isVisible ? 'animate-line-expand' : 'w-0'}`} />
          <h2 className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Get in Touch
          </h2>
        </div>

        {/* Main content */}
        <div className="text-center">
          <h3 
            className={`font-display text-4xl md:text-6xl lg:text-8xl font-bold leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {"Let's create"}
            <br />
            <span className="text-primary">something great</span>
          </h3>

          <p 
            className={`mt-8 text-lg text-muted-foreground max-w-lg mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            Have a project in mind? {"I'd love to hear about it."}
          </p>

          {/* CTA Button */}
          <div 
            className={`mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <a
              ref={buttonRef}
              href="mailto:hello@leontyes.com"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-primary text-primary-foreground font-medium tracking-wide hover:scale-105 transition-transform duration-300"
              style={{ 
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` 
              }}
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>

          {/* Social Links */}
          <div 
            className={`mt-20 flex flex-wrap items-center justify-center gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '800ms' }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
