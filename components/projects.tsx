"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Cybersecurity Campaign",
    category: "Branding / Digital",
    description: "A comprehensive visual identity for a leading cybersecurity firm, combining trust with cutting-edge innovation.",
    year: "2025",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 2,
    title: "Peanut Wear",
    category: "Apparel Design",
    description: "Playful yet sophisticated apparel branding that bridges streetwear culture with sustainable fashion.",
    year: "2024",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: 3,
    title: "Broadcast Graphics",
    category: "Motion Design",
    description: "Dynamic motion graphics package for a major broadcast network, bringing stories to life on screen.",
    year: "2024",
    color: "from-primary/20 to-emerald-500/20"
  },
  {
    id: 4,
    title: "SmartTap NFC",
    category: "Product / UX",
    description: "Intuitive product design and digital experience for next-generation NFC technology solutions.",
    year: "2023",
    color: "from-rose-500/20 to-pink-500/20"
  },
]

export function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className="py-32 px-6 md:px-12 lg:px-24 relative"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-20">
        <div 
          className={`flex items-center gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            01
          </span>
          <div className={`h-px bg-border flex-1 ${isVisible ? 'animate-line-expand' : 'w-0'}`} />
          <h2 className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
            Selected Work
          </h2>
        </div>
      </div>

      {/* Projects List */}
      <div className="max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <article 
            key={project.id}
            className={`group border-b border-border py-12 md:py-16 transition-all duration-700 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Number */}
              <div className="md:col-span-1 text-muted-foreground text-sm">
                0{project.id}
              </div>

              {/* Title & Category */}
              <div className="md:col-span-5">
                <h3 className="font-display text-2xl md:text-4xl font-bold group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground tracking-wide">
                  {project.category}
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-4">
                <p className={`text-sm text-muted-foreground leading-relaxed transition-all duration-500 ${activeProject === project.id ? 'opacity-100 translate-y-0' : 'md:opacity-0 md:translate-y-2'}`}>
                  {project.description}
                </p>
              </div>

              {/* Year & Arrow */}
              <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-6">
                <span className="text-sm text-muted-foreground">{project.year}</span>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 group-hover:text-primary-foreground transition-colors" />
                </div>
              </div>
            </div>

            {/* Hover gradient */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-3xl`}
            />
          </article>
        ))}
      </div>

      {/* View All Link */}
      <div 
        className={`max-w-6xl mx-auto mt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: '800ms' }}
      >
        <a 
          href="#"
          className="inline-flex items-center gap-4 text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span>View all projects</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}
