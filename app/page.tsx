"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Mail, Linkedin, Instagram, X } from "lucide-react"

const navItems = ["Home", "About", "Work", "Contact"]

const projects = [
  { title: "Cybersecurity Campaign", category: "Branding", year: "2024" },
  { title: "Peanut Wear", category: "Apparel Design", year: "2024" },
  { title: "Broadcast Graphics", category: "Motion", year: "2023" },
  { title: "SmartTap NFC", category: "Digital Experience", year: "2023" },
]

const expertise = [
  "Brand Identity",
  "Motion Design", 
  "Digital Experience",
  "Art Direction",
  "Visual Systems",
  "Typography"
]

const software = [
  "Figma",
  "After Effects",
  "Illustrator",
  "Photoshop",
  "Cinema 4D",
  "Premiere Pro"
]

const experience = [
  { role: "Senior Designer", company: "Studio Nova", period: "2022 — Present" },
  { role: "Visual Designer", company: "Creative Lab", period: "2020 — 2022" },
  { role: "Junior Designer", company: "Design Co.", period: "2018 — 2020" },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("Home")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <div className="h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6">
        <motion.div 
          className="font-display text-lg font-bold tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          LCT
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-1 md:gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item)}
              className={`relative px-3 py-2 text-sm font-medium transition-colors md:px-4 ${
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
      </nav>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeSection === "Home" && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex h-full w-full items-center justify-center px-6 md:px-12"
          >
            <div className="grid h-full w-full max-w-7xl grid-cols-1 gap-4 py-20 md:grid-cols-12 md:gap-6 md:py-24">
              {/* Profile Section */}
              <div className="col-span-1 flex flex-col justify-center md:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <h1 className="font-display text-4xl font-bold leading-none tracking-tight md:text-6xl lg:text-7xl">
                    Leon C.
                    <br />
                    <span className="text-primary">Tyes</span>
                  </h1>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
                    Visual designer crafting stories through branding, motion, and digital experiences. 
                    I transform ideas into memorable visual narratives.
                  </p>
                  <div className="mt-6 flex gap-4 md:mt-8">
                    <button 
                      onClick={() => setActiveSection("Work")}
                      className="group flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:gap-3"
                    >
                      View Work
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                    <button 
                      onClick={() => setActiveSection("Contact")}
                      className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                    >
                      Get in Touch
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Info Cards Grid */}
              <div className="col-span-1 grid grid-cols-2 gap-3 md:col-span-7 md:gap-4">
                {/* Recent Work Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  onClick={() => setActiveSection("Work")}
                  className="group col-span-2 cursor-pointer rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-card/80 md:col-span-1 md:p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Recent Work</h3>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="mt-3 space-y-2 md:mt-4">
                    {projects.slice(0, 3).map((project, i) => (
                      <div key={i} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
                        <span className="text-sm font-medium">{project.title}</span>
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Expertise Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="col-span-1 rounded-2xl border border-border bg-card p-4 md:p-5"
                >
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Expertise</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5 md:mt-4 md:gap-2">
                    {expertise.map((skill, i) => (
                      <span 
                        key={i} 
                        className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Software Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="col-span-1 rounded-2xl border border-border bg-card p-4 md:p-5"
                >
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Software</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5 md:mt-4 md:gap-2">
                    {software.map((tool, i) => (
                      <span 
                        key={i} 
                        className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  onClick={() => setActiveSection("About")}
                  className="group col-span-2 cursor-pointer rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-card/80 md:p-5"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Experience</h3>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-2 md:mt-4 md:grid-cols-3 md:gap-4">
                    {experience.map((exp, i) => (
                      <div key={i}>
                        <p className="text-sm font-medium">{exp.role}</p>
                        <p className="text-xs text-muted-foreground">{exp.company}</p>
                        <p className="text-xs text-primary">{exp.period}</p>
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
            className="flex h-full w-full items-center justify-center px-6 md:px-12"
          >
            <div className="grid h-full w-full max-w-6xl grid-cols-1 gap-8 py-20 md:grid-cols-2 md:gap-16 md:py-24">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="flex flex-col justify-center"
              >
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                  About
                  <span className="text-primary">.</span>
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                  I'm a visual designer with over 6 years of experience crafting brand identities, 
                  motion graphics, and digital experiences that tell compelling stories.
                </p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                  My approach combines strategic thinking with creative execution, ensuring every 
                  project not only looks beautiful but also achieves its intended goals.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-display text-3xl font-bold text-primary md:text-4xl">6+</p>
                    <p className="mt-1 text-xs text-muted-foreground md:text-sm">Years Experience</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-primary md:text-4xl">50+</p>
                    <p className="mt-1 text-xs text-muted-foreground md:text-sm">Projects Completed</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-primary md:text-4xl">30+</p>
                    <p className="mt-1 text-xs text-muted-foreground md:text-sm">Happy Clients</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col justify-center gap-4"
              >
                <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Philosophy</h3>
                  <p className="mt-4 font-display text-xl font-medium leading-snug md:text-2xl">
                    "Design is not just what it looks like — it's how it makes people feel and act."
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Career Timeline</h3>
                  <div className="mt-4 space-y-4">
                    {experience.map((exp, i) => (
                      <div key={i} className="relative flex gap-4 pl-4">
                        <div className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary" />
                        <div className={i < experience.length - 1 ? "border-l border-border/50 pb-4 pl-4" : "pl-4"}>
                          <p className="text-sm font-medium">{exp.role}</p>
                          <p className="text-xs text-muted-foreground">{exp.company} • {exp.period}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
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
            className="flex h-full w-full items-center justify-center px-6 md:px-12"
          >
            <div className="flex h-full w-full max-w-6xl flex-col justify-center py-20 md:py-24">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display text-4xl font-bold tracking-tight md:text-5xl"
              >
                Selected Work<span className="text-primary">.</span>
              </motion.h2>
              
              <div className="mt-8 flex-1 md:mt-12">
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                    onMouseEnter={() => setHoveredProject(i)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group relative cursor-pointer border-b border-border py-4 transition-colors hover:border-primary/50 md:py-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 md:gap-8">
                        <span className="font-mono text-xs text-muted-foreground md:text-sm">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-xl font-medium transition-colors group-hover:text-primary md:text-3xl">
                          {project.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 md:gap-8">
                        <span className="hidden text-sm text-muted-foreground md:block">{project.category}</span>
                        <span className="text-xs text-muted-foreground md:text-sm">{project.year}</span>
                        <ArrowUpRight className={`h-4 w-4 transition-all md:h-5 md:w-5 ${
                          hoveredProject === i 
                            ? "text-primary translate-x-1 -translate-y-1" 
                            : "text-muted-foreground"
                        }`} />
                      </div>
                    </div>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: hoveredProject === i ? 1 : 0 }}
                      className="absolute bottom-0 left-0 h-px w-full origin-left bg-primary"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-6 text-sm text-muted-foreground md:mt-8"
              >
                Click on any project to view case study
              </motion.p>
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
            className="flex h-full w-full items-center justify-center px-6 md:px-12"
          >
            <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
              >
                Let's Create
                <br />
                <span className="text-primary">Together</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-6 max-w-md text-base text-muted-foreground md:text-lg"
              >
                Have a project in mind? I'd love to hear about it. 
                Let's discuss how we can bring your vision to life.
              </motion.p>

              <motion.a
                href="mailto:hello@leontyes.com"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="group mt-8 flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-all hover:gap-4 md:mt-10"
              >
                <Mail className="h-5 w-5" />
                hello@leontyes.com
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-10 flex items-center gap-6 md:mt-12"
              >
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="hidden md:inline">LinkedIn</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="hidden md:inline">Instagram</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                  <span className="hidden md:inline">Twitter</span>
                </a>
              </motion.div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4 text-xs text-muted-foreground md:px-12 md:py-6">
        <span>&copy; 2024 Leon C. Tyes</span>
        <span>Visual Designer</span>
      </div>
    </div>
  )
}
