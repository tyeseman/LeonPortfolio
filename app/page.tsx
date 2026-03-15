"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Mail, Linkedin, Instagram, X, ChevronDown, Star, Clock, User } from "lucide-react"
import { useContent } from "@/context/content-context"
import { TermsDialog } from "@/components/terms-dialog"
import { BackgroundAnimation } from "@/components/background-animation"

const navItems = ["Home", "About", "Work", "Contact"]

export default function Portfolio() {
  const { content } = useContent()
  const [activeSection, setActiveSection] = useState("Home")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [activeReview, setActiveReview] = useState(0)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Auto-loop reviews every 4 seconds
  useEffect(() => {
    if (content.reviews.length === 0) return
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % content.reviews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [content.reviews.length])

  // Extract first and last name for display
  const nameParts = content.hero.name.split(" ")
  const firstName = nameParts.slice(0, -1).join(" ")
  const lastName = nameParts[nameParts.length - 1]

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Subtle Background Animation */}
      <BackgroundAnimation />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <motion.div 
          className="font-display text-base font-bold tracking-tight md:text-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          LCT
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div 
          className="hidden items-center gap-0.5 md:flex md:gap-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`relative px-2.5 py-1.5 text-xs font-medium transition-colors md:px-3 md:py-2 md:text-sm ${
                activeSection === item 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
              {activeSection === item && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="relative w-5 h-5">
            <span className={`absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-2.5' : 'top-1'}`} />
            <span className={`absolute h-0.5 w-5 bg-foreground transition-all duration-300 top-2.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute h-0.5 w-5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-2.5' : 'bottom-1'}`} />
          </div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 pt-20 md:hidden"
          >
            <div className="flex flex-col gap-2 px-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveSection(item)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`rounded-lg px-4 py-3 text-left font-medium transition-colors ${
                    activeSection === item 
                      ? "bg-primary text-primary-foreground" 
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeSection === "Home" && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex h-full w-full flex-col items-center justify-center overflow-y-auto px-4 pb-12 pt-20 md:overflow-hidden md:px-8 md:pb-0 md:pt-16"
          >
            <div className="flex w-full max-w-6xl flex-col gap-6 md:grid md:grid-cols-12 md:gap-4">
              
              {/* Left Column - Profile (Full width on mobile, half on desktop) */}
              <div className="flex flex-col justify-center md:col-span-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="flex flex-col items-center text-center md:items-start md:text-left mt-8 md:mt-0"
                >
                  {/* Profile Picture - Creative circular design */}
                  <div className="relative mb-3 flex justify-center md:mb-4 md:justify-start">
                    <div className="relative h-32 w-32 md:h-48 md:w-48">
                      {/* Outer decorative ring */}
                      <svg className="absolute inset-0 h-full w-full animate-spin" style={{ animationDuration: '40s' }}>
                        <circle 
                          cx="50%" 
                          cy="50%" 
                          r="48%" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="1" 
                          strokeDasharray="4 6"
                          className="text-primary/40"
                        />
                      </svg>
                      {/* Inner image container */}
                      <div className="absolute inset-2 overflow-hidden rounded-full ring-2 ring-primary/60">
                        <img 
                          src={content.hero.profileImage} 
                          alt={content.hero.name}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      {/* Status indicator */}
                      <div className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-2 border-background bg-emerald-500 md:h-6 md:w-6" />
                    </div>
                  </div>
                  
                  {/* Name and Title */}
                  <h1 className="font-display text-2xl font-bold leading-none tracking-tight md:text-3xl lg:text-4xl">
                    {firstName} <span className="text-primary">{lastName}</span>
                  </h1>
                  <p className="mt-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/70 md:mt-2 md:text-xs">
                    {content.hero.title}
                  </p>
                  
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground md:mt-4 md:text-sm">
                    {content.hero.tagline}
                  </p>
                  
                  <div className="mt-3 flex gap-2 md:mt-4">
                    <button 
                      onClick={() => setActiveSection("Work")}
                      className="group flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:gap-2 md:px-4 md:py-2"
                    >
                      View Work
                      <ArrowUpRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    </button>
                    <button 
                      onClick={() => setActiveSection("Contact")}
                      className="rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary md:px-4 md:py-2"
                    >
                      Contact
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Grid of Cards (Full width on mobile) */}
              <div className="col-span-12 grid grid-cols-6 gap-2 md:col-span-8 md:grid-rows-3 md:gap-3">
                
                {/* Recent Work - spans 6 cols on mobile, 3 cols 2 rows on desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  onClick={() => setActiveSection("Work")}
                  className="group col-span-6 md:col-span-3 md:row-span-2 cursor-pointer rounded-lg border border-border bg-card p-2.5 transition-all hover:border-primary/50 md:rounded-2xl md:p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">Recent Work</h3>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-all group-hover:text-primary md:h-4 md:w-4" />
                  </div>
                  <div className="mt-2 space-y-1.5 md:mt-3 md:space-y-2">
                    {content.projects.slice(0, 3).map((project, i) => {
                      const firstImage = project.images?.[0] || project.thumbnail
                      return (
                        <div key={i} className="flex items-center gap-2 rounded-lg bg-secondary/50 p-1.5 md:gap-3 md:p-2">
                          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/30 to-primary/5 md:h-10 md:w-10">
                            {firstImage && (
                              <img 
                                src={firstImage} 
                                alt={project.title}
                                className="h-full w-full object-cover"
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-xs font-medium md:text-sm">{project.title}</p>
                            <p className="text-[10px] text-muted-foreground md:text-xs">{project.category}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>

                {/* Expertise - spans 6 cols on mobile, 3 cols 1 row on desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="col-span-6 md:col-span-3 md:row-span-1 rounded-lg border border-border bg-card p-2.5 md:rounded-2xl md:p-4"
                >
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">Expertise</h3>
                  <div className="mt-1.5 flex flex-wrap gap-1 md:mt-2 md:gap-1.5">
                    {content.expertise.map((skill, i) => (
                      <span key={i} className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium md:px-2.5 md:py-1 md:text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Software - spans 6 cols on mobile, 3 cols 1 row on desktop */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6 }}
                  className="col-span-6 md:col-span-3 md:row-span-1 rounded-lg border border-border bg-card p-2.5 md:rounded-2xl md:p-4"
                >
                  <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">Software</h3>
                  <div className="mt-1.5 grid grid-cols-6 gap-1.5 md:mt-2 md:gap-2">
                    {content.software.map((tool, i) => (
                      <div key={i} className="flex flex-col items-center gap-0.5 rounded-lg bg-secondary/50 p-1 transition-colors hover:bg-secondary md:gap-1 md:p-1.5">
                        <img src={tool.icon} alt={tool.name} className="h-4 w-4 md:h-5 md:w-5" />
                        <span className="hidden text-[8px] text-muted-foreground md:block md:text-[9px]">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Reviews - spans 6 cols on mobile, 3 cols 1 row on desktop */}
                {content.reviews.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="col-span-6 md:col-span-3 md:row-span-1 rounded-lg border border-border bg-card p-2.5 md:rounded-2xl md:p-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">Reviews</h3>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-2.5 w-2.5 fill-primary text-primary md:h-3 md:w-3" />
                        ))}
                      </div>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeReview}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1.5 md:mt-2"
                      >
                        <p className="line-clamp-2 text-[10px] italic leading-relaxed text-foreground/80 md:text-xs">
                          "{content.reviews[activeReview]?.text}"
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 md:mt-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-[8px] font-bold text-primary md:h-6 md:w-6 md:text-[10px]">
                            {content.reviews[activeReview]?.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-medium md:text-xs">{content.reviews[activeReview]?.name}</p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    <div className="mt-2 flex justify-center gap-1 md:mt-2.5">
                      {content.reviews.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveReview(i)}
                          className={`h-1 rounded-full transition-all ${
                            i === activeReview ? "w-4 bg-primary" : "w-1 bg-border hover:bg-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Experience - spans full width */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  onClick={() => setActiveSection("About")}
                  className="group col-span-6 md:col-span-6 md:row-span-1 cursor-pointer rounded-lg border border-border bg-card p-2.5 transition-all hover:border-primary/50 md:rounded-2xl md:p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">Experience</h3>
                    <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-all group-hover:text-primary md:h-4 md:w-4" />
                  </div>
                  <div className="mt-1.5 grid grid-cols-3 gap-2 md:mt-2 md:gap-4">
                    {content.experience.slice(0, 3).map((exp, i) => (
                      <div key={i} className="min-w-0">
                        <p className="truncate text-xs font-medium md:text-sm">{exp.role}</p>
                        <p className="truncate text-[10px] text-muted-foreground md:text-xs">{exp.company}</p>
                        <p className="text-[10px] text-primary md:text-xs">{exp.period}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.main>
        )}

        {activeSection === "About" && (
          <motion.main
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex h-full w-full flex-col overflow-hidden px-4 pt-20 md:px-8 md:pt-16"
          >
            <div className="mx-auto w-full max-w-5xl">
              {/* Static Header */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl"
              >
                About<span className="text-primary">.</span>
              </motion.h2>
            </div>
            
            {/* Scrollable Content */}
            <div className="mt-4 flex-1 overflow-y-auto pb-16 md:mt-6 md:pb-20">
              <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="flex flex-col"
                >
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {content.about.bio}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {content.about.secondaryBio}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3 md:mt-6 md:gap-4">
                    <div className="rounded-xl bg-card p-3 text-center md:p-4">
                      <p className="font-display text-2xl font-bold text-primary md:text-3xl">{content.about.yearsExperience}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground md:text-xs">Years</p>
                    </div>
                    <div className="rounded-xl bg-card p-3 text-center md:p-4">
                      <p className="font-display text-2xl font-bold text-primary md:text-3xl">{content.about.projectsCompleted}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground md:text-xs">Projects</p>
                    </div>
                    <div className="rounded-xl bg-card p-3 text-center md:p-4">
                      <p className="font-display text-2xl font-bold text-primary md:text-3xl">{content.about.totalClients}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground md:text-xs">Clients</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex flex-col gap-3 md:gap-4"
                >
                  {/* Client Reviews */}
                  {content.reviews.length > 0 && (
                    <div className="rounded-xl border border-border bg-card p-4 md:rounded-2xl md:p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">Client Reviews</h3>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary md:h-3.5 md:w-3.5" />
                          ))}
                        </div>
                      </div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeReview}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3"
                        >
                          <p className="text-xs italic leading-relaxed text-foreground/80 md:text-sm">
                            "{content.reviews[activeReview]?.text}"
                          </p>
                          <div className="mt-2 flex items-center gap-2 md:mt-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary md:h-8 md:w-8 md:text-xs">
                              {content.reviews[activeReview]?.avatar}
                            </div>
                            <div>
                              <p className="text-xs font-medium md:text-sm">{content.reviews[activeReview]?.name}</p>
                              <p className="text-[10px] text-muted-foreground md:text-xs">{content.reviews[activeReview]?.company}</p>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                      <div className="mt-3 flex gap-1.5">
                        {content.reviews.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveReview(i)}
                            className={`h-1 rounded-full transition-all ${
                              i === activeReview ? "w-5 bg-primary" : "w-1 bg-border hover:bg-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Career Timeline */}
                  <div className="rounded-xl border border-border bg-card p-4 md:rounded-2xl md:p-5">
                    <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">Career Timeline</h3>
                    <div className="mt-3 max-h-[200px] space-y-3 overflow-y-auto md:max-h-[250px]">
                      {content.experience.map((exp, i) => (
                        <div key={i} className="relative flex items-start gap-3 pl-3">
                          <div className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-primary md:h-2 md:w-2" />
                          <div className={i < content.experience.length - 1 ? "border-l border-border/50 pb-3 pl-3" : "pl-3"}>
                            <p className="text-xs font-medium md:text-sm">{exp.role}</p>
                            <p className="text-[10px] text-muted-foreground md:text-xs">{exp.company} &bull; {exp.period}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.main>
        )}

        {activeSection === "Work" && (
          <motion.main
            key="work"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex h-full w-full flex-col overflow-y-auto px-4 pt-20 pb-20 md:px-8 md:pt-16 md:pb-24 md:items-start md:justify-center"
          >
            <div className="flex w-full max-w-5xl flex-col">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display text-2xl font-bold tracking-tight md:text-4xl"
              >
                Selected Work<span className="text-primary">.</span>
              </motion.h2>
              
              <div className="mt-4 md:mt-6">
                {content.projects.map((project, i) => {
                  const firstImage = project.images?.[0] || project.thumbnail
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
                      className="border-b border-border"
                    >
                      <button
                        onClick={() => setExpandedProject(expandedProject === i ? null : i)}
                        className="group flex w-full items-center justify-between py-3 transition-colors hover:text-primary md:py-4"
                      >
                        <div className="flex items-center gap-3 md:gap-5">
                          <span className="font-mono text-[10px] text-muted-foreground md:text-xs">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/30 to-primary/5 md:h-14 md:w-14 md:rounded-xl">
                            {firstImage && (
                              <img 
                                src={firstImage} 
                                alt={project.title}
                                className="h-full w-full object-cover"
                                crossOrigin="anonymous"
                                referrerPolicy="no-referrer"
                              />
                            )}
                          </div>
                          <div className="text-left">
                            <h3 className="font-display text-sm font-medium transition-colors group-hover:text-primary md:text-xl">
                              {project.title}
                            </h3>
                            <p className="text-[10px] text-muted-foreground md:text-sm">{project.category} &bull; {project.year}</p>
                          </div>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform md:h-5 md:w-5 ${
                          expandedProject === i ? "rotate-180" : ""
                        }`} />
                      </button>
                      
                      <AnimatePresence>
                        {expandedProject === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-10 md:pl-16">
                              {/* Project Images */}
                              <div className="flex gap-2 overflow-x-auto pb-3 md:gap-3">
                                {project.images && project.images.filter(img => img).length > 0 ? (
                                  project.images.map((imgUrl, imgIndex) => (
                                    imgUrl && (
                                      <div 
                                        key={imgIndex} 
                                        className="h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 md:h-32 md:w-48 md:rounded-xl"
                                      >
                                        <img 
                                          src={imgUrl} 
                                          alt={`${project.title} - Image ${imgIndex + 1}`}
                                          className="h-full w-full object-cover"
                                          crossOrigin="anonymous"
                                          referrerPolicy="no-referrer"
                                        />
                                      </div>
                                    )
                                  ))
                                ) : (
                                  <div className="h-24 w-36 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center md:h-32 md:w-48 md:rounded-xl">
                                    <span className="text-[10px] text-muted-foreground">No images</span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Project Description */}
                            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground md:mt-3 md:text-sm">
                              {project.description}
                            </p>
                            
                            {/* Project Details */}
                            <div className="mt-3 flex flex-wrap gap-3 md:mt-4 md:gap-4">
                              <div className="flex items-center gap-1.5 text-xs md:gap-2">
                                <Clock className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
                                <span className="text-muted-foreground">Timeline:</span>
                                <span className="font-medium">{project.timeline}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs md:gap-2">
                                <User className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
                                <span className="text-muted-foreground">Client:</span>
                                <span className="font-medium">{project.client}</span>
                              </div>
                            </div>
                            
                            {/* Deliverables */}
                            <div className="mt-3 md:mt-4">
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:text-xs">Deliverables</p>
                              <div className="mt-1.5 flex flex-wrap gap-1.5 md:mt-2 md:gap-2">
                                {project.deliverables.map((item, idx) => (
                                  <span 
                                    key={idx}
                                    className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium md:px-3 md:py-1 md:text-xs"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.main>
        )}

        {activeSection === "Contact" && (
          <motion.main
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex h-full w-full flex-col items-center justify-center overflow-y-auto px-4 py-20 pb-20 md:py-0 md:px-8 md:pb-24"
          >
            <div className="flex w-full max-w-3xl flex-col items-center justify-center text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display text-2xl font-bold tracking-tight md:text-5xl lg:text-6xl"
              >
                Let's Create
                <br />
                <span className="text-primary">Together</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-4 max-w-md text-sm text-muted-foreground md:mt-6 md:text-base"
              >
                Have a project in mind? I'd love to hear about it. 
                Let's discuss how we can bring your vision to life.
              </motion.p>

              <motion.a
                href={`mailto:${content.hero.email}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="group mt-6 flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:gap-3 md:mt-8 md:px-8 md:py-4 md:text-base"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
                {content.hero.email}
                <ArrowUpRight className="h-4 w-4 md:h-5 md:w-5" />
              </motion.a>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 flex items-center gap-4 md:mt-8 md:gap-6"
              >
                <a href={content.hero.linkedinUrl} className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground md:text-sm">
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden md:inline">LinkedIn</span>
                </a>
                <a href={content.hero.instagramUrl} className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground md:text-sm">
                  <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden md:inline">Instagram</span>
                </a>
                <a href={content.hero.twitterUrl} className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground md:text-sm">
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden md:inline">Twitter</span>
                </a>
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer with Terms & Conditions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-border bg-background/95 backdrop-blur px-4 py-2 text-[10px] text-muted-foreground md:px-8 md:py-3 md:text-xs">
        <span>&copy; 2024 {content.hero.name}</span>
        <button 
          onClick={() => setIsTermsOpen(true)}
          className="text-muted-foreground/60 transition-colors hover:text-muted-foreground hover:underline"
        >
          Terms & Conditions
        </button>
        <span>{content.hero.title.split("&")[0].trim()}</span>
      </div>

      {/* Terms & Conditions Dialog */}
      <TermsDialog isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </div>
  )
}
