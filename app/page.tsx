"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Mail, Linkedin, Instagram, X, ChevronDown, Star, Clock, User } from "lucide-react"
import { useContent } from "@/context/content-context"
import { TermsDialog } from "@/components/terms-dialog"
import { BackgroundAnimation } from "@/components/background-animation"
import { ImageLightbox } from "@/components/image-lightbox"

const navItems = ["Home", "About", "Work", "Contact"]

export default function Portfolio() {
  const { content } = useContent()
  const [activeSection, setActiveSection] = useState("Home")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [activeReview, setActiveReview] = useState(0)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

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
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-50 bg-background border-b border-border md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
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
            className="flex h-full w-full flex-col overflow-hidden px-4 pt-20 md:px-8 md:pt-16"
          >
            <div className="flex-1 overflow-y-auto pb-16 md:pb-20">
              <div className="flex w-full max-w-6xl flex-col gap-6 md:grid md:grid-cols-12 md:gap-4 mx-auto">
                
                {/* Left Column - Profile (Full width on mobile, 4 cols on desktop) */}
                <div className="flex flex-col justify-center md:col-span-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="flex flex-col items-center text-center md:items-start md:text-left"
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

                    {/* Name */}
                    <div className="mt-2 md:mt-3">
                      <h1 className="font-display text-3xl font-bold tracking-tighter md:text-5xl">
                        {firstName}
                      </h1>
                      <h1 className="font-display text-3xl font-bold tracking-tighter text-primary md:text-5xl">
                        {lastName}
                      </h1>
                    </div>

                    {/* Title */}
                    <p className="mt-1 text-xs text-muted-foreground md:mt-2 md:text-sm">
                      {content.hero.title}
                    </p>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection("Contact")}
                      className="mt-3 flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:mt-4 md:px-6 md:py-3 md:text-sm"
                    >
                      Let&apos;s talk <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                    </motion.button>

                    {/* Social Links */}
                    <div className="mt-4 flex gap-2 md:gap-3">
                      {content.hero.socialLinks.email && (
                        <a href={`mailto:${content.hero.socialLinks.email}`} className="rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:p-2.5">
                          <Mail className="h-4 w-4 md:h-5 md:w-5" />
                        </a>
                      )}
                      {content.hero.socialLinks.linkedin && (
                        <a href={content.hero.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:p-2.5">
                          <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                        </a>
                      )}
                      {content.hero.socialLinks.instagram && (
                        <a href={content.hero.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:p-2.5">
                          <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                        </a>
                      )}
                      {content.hero.socialLinks.twitter && (
                        <a href={content.hero.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:p-2.5">
                          <X className="h-4 w-4 md:h-5 md:w-5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Cards Grid */}
                <div className="flex flex-col gap-3 md:col-span-8 md:gap-4">
                  {/* Bio Cards */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                    className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 md:row-span-2"
                  >
                    {/* Bio Card 1 */}
                    <div className="rounded-xl border border-border bg-card p-4 md:rounded-2xl md:p-5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground md:text-sm">About Me</h3>
                      <p className="mt-2 text-xs leading-relaxed text-foreground/80 md:mt-3 md:text-sm">
                        {content.hero.bio}
                      </p>
                    </div>

                    {/* Bio Card 2 */}
                    <div className="rounded-xl border border-border bg-card p-4 md:rounded-2xl md:p-5">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground md:text-sm">Expertise</h3>
                      <p className="mt-2 text-xs leading-relaxed text-foreground/80 md:mt-3 md:text-sm">
                        {content.hero.expertise}
                      </p>
                    </div>
                  </motion.div>

                  {/* Skills Grid */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="rounded-xl border border-border bg-card p-4 md:rounded-2xl md:p-5"
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground md:text-sm">Skills</h3>
                    <div className="mt-3 flex flex-wrap gap-2 md:mt-3 md:gap-2.5">
                      {content.hero.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary md:px-4 md:py-2 md:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA Card */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection("Work")}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25, duration: 0.6 }}
                    className="group rounded-xl border border-border bg-gradient-to-br from-primary/20 to-primary/5 p-4 transition-all hover:border-primary/50 hover:from-primary/30 hover:to-primary/10 md:rounded-2xl md:p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-primary md:text-sm">Explore My Work</h3>
                        <p className="mt-1 text-xs text-foreground/70 group-hover:text-foreground md:mt-2 md:text-sm">See my latest projects</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 md:h-6 md:w-6" />
                    </div>
                  </motion.button>
                </div>
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
            className="flex h-full w-full flex-col overflow-hidden px-4 pt-20 md:px-8 md:pt-16"
          >
            <div className="mx-auto w-full max-w-5xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display text-2xl font-bold tracking-tight md:text-4xl"
              >
                Selected Work<span className="text-primary">.</span>
              </motion.h2>
            </div>
            
            {/* Scrollable Projects */}
            <div className="mt-4 flex-1 overflow-y-auto pb-16 md:mt-6 md:pb-20">
              <div className="mx-auto w-full max-w-5xl">
                {content.projects.map((project, i) => (
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
                            {project.thumbnailImage && (
                              <img 
                                src={project.thumbnailImage} 
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
                              {/* Project Description */}
                            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground md:mt-3 md:text-sm">
                              {project.description}
                            </p>

                            {/* Detail Images */}
                            {(project.detailImageOne || project.detailImageTwo) && (
                              <div className="mt-4 flex flex-wrap gap-3 md:mt-6 md:gap-4">
                                {project.detailImageOne && (
                                  <button
                                    onClick={() => setLightboxImage(project.detailImageOne)}
                                    className="h-32 w-48 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 md:h-40 md:w-60 cursor-pointer hover:opacity-75 transition-opacity"
                                    aria-label="Enlarge image"
                                  >
                                    <img 
                                      src={project.detailImageOne} 
                                      alt={`${project.title} - Detail 1`}
                                      className="h-full w-full object-cover pointer-events-none"
                                      crossOrigin="anonymous"
                                      referrerPolicy="no-referrer"
                                    />
                                  </button>
                                )}
                                {project.detailImageTwo && (
                                  <button
                                    onClick={() => setLightboxImage(project.detailImageTwo)}
                                    className="h-32 w-48 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 md:h-40 md:w-60 cursor-pointer hover:opacity-75 transition-opacity"
                                    aria-label="Enlarge image"
                                  >
                                    <img 
                                      src={project.detailImageTwo} 
                                      alt={`${project.title} - Detail 2`}
                                      className="h-full w-full object-cover pointer-events-none"
                                      crossOrigin="anonymous"
                                      referrerPolicy="no-referrer"
                                    />
                                  </button>
                                )}
                              </div>
                            )}

                            {/* YouTube Video */}
                            {project.youtubeVideoUrl && (
                              <div className="mt-4 md:mt-6">
                                <div className="max-w-2xl aspect-video overflow-hidden rounded-lg bg-black">
                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${project.youtubeVideoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/) ? project.youtubeVideoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/)[1] : ''}`}
                                    title={`${project.title} Video`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="h-full w-full"
                                  />
                                </div>
                              </div>
                            )}

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
                  ))}
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
            className="flex h-full w-full flex-col overflow-hidden px-4 pt-20 md:px-8 md:pt-16"
          >
            <div className="flex-1 overflow-y-auto pb-16 md:pb-20">
              <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="font-display text-2xl font-bold tracking-tight md:text-4xl"
                >
                  Let&apos;s Connect<span className="text-primary">.</span>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:mt-4 md:text-base"
                >
                  {content.contact.description}
                </motion.p>

                {/* Contact Options */}
                <div className="mt-6 flex flex-col gap-3 md:mt-8 md:gap-4">
                  {content.contact.email && (
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={`mailto:${content.contact.email}`}
                      className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Mail className="h-5 w-5" />
                      {content.contact.email}
                    </motion.a>
                  )}
                </div>

                {/* Social Links */}
                <div className="mt-6 flex gap-3 md:mt-8 md:gap-4">
                  {content.contact.socialLinks?.linkedin && (
                    <a href={content.contact.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-secondary p-3 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:p-3.5">
                      <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
                    </a>
                  )}
                  {content.contact.socialLinks?.instagram && (
                    <a href={content.contact.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="rounded-full bg-secondary p-3 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:p-3.5">
                      <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                    </a>
                  )}
                  {content.contact.socialLinks?.twitter && (
                    <a href={content.contact.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="rounded-full bg-secondary p-3 text-foreground transition-colors hover:bg-primary hover:text-primary-foreground md:p-3.5">
                      <X className="h-5 w-5 md:h-6 md:w-6" />
                    </a>
                  )}
                </div>

                {/* Terms */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  onClick={() => setIsTermsOpen(true)}
                  className="mt-8 text-xs text-muted-foreground hover:text-foreground md:text-sm"
                >
                  Terms & Conditions
                </motion.button>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Terms & Conditions Dialog */}
      <TermsDialog isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      
      {/* Image Lightbox Modal */}
      <ImageLightbox 
        imageUrl={lightboxImage} 
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)} 
      />
    </div>
  )
}
