"use client"

import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    title: "Research",
    description: "Deep dive into understanding the problem space, audience, and competitive landscape.",
  },
  {
    number: "02",
    title: "Concept",
    description: "Exploring creative directions and developing strategic visual approaches.",
  },
  {
    number: "03",
    title: "Design",
    description: "Crafting pixel-perfect designs with attention to detail and brand consistency.",
  },
  {
    number: "04",
    title: "Storytelling",
    description: "Weaving narrative elements that connect emotionally with the audience.",
  },
  {
    number: "05",
    title: "Delivery",
    description: "Executing with precision and ensuring seamless implementation.",
  },
]

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

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

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  return (
    <section 
      ref={sectionRef}
      id="philosophy" 
      className="py-32 px-6 md:px-12 lg:px-24 relative bg-card"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <div 
          className={`flex items-center gap-8 mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            02
          </span>
          <div className={`h-px bg-border flex-1 ${isVisible ? 'animate-line-expand' : 'w-0'}`} />
          <h2 className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Design Philosophy
          </h2>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Statement */}
          <div 
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
              Every design tells a story. My job is to make it 
              <span className="text-primary"> unforgettable</span>.
            </h3>
            <p className="mt-8 text-muted-foreground leading-relaxed">
              I believe in the power of visual communication to transform brands and create meaningful connections. 
              Through a meticulous process of research, ideation, and execution, I craft experiences that resonate 
              on both aesthetic and emotional levels.
            </p>
          </div>

          {/* Right: Process Steps */}
          <div 
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="space-y-6">
              {steps.map((step, index) => (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-6 rounded-lg border transition-all duration-500 ${
                    activeStep === index 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-transparent border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <span className={`text-xs font-mono transition-colors duration-300 ${
                      activeStep === index ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h4 className={`font-display text-lg font-semibold transition-colors duration-300 ${
                        activeStep === index ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </h4>
                      <p className={`mt-2 text-sm leading-relaxed transition-all duration-500 ${
                        activeStep === index 
                          ? 'opacity-100 max-h-20 text-muted-foreground' 
                          : 'opacity-0 max-h-0 overflow-hidden'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeStep === index ? 'bg-primary scale-100' : 'bg-border scale-75'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-16 flex items-center gap-2">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                index <= activeStep ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
