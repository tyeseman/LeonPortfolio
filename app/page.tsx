"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Mail, Linkedin, Instagram, X, ChevronDown, Star, Calendar, Clock } from "lucide-react"

const navItems = ["Home", "About", "Work", "Contact"]

const projects = [
  { 
    title: "Cybersecurity Campaign", 
    category: "Branding", 
    year: "2024",
    thumbnail: "/projects/cyber.jpg",
    images: ["/projects/cyber.jpg", "/projects/cyber-2.jpg", "/projects/cyber-3.jpg"],
    description: "A comprehensive brand identity and awareness campaign for a leading cybersecurity firm. The project included visual identity, motion graphics, and digital assets that communicate trust and protection.",
    timeline: "8 weeks",
    client: "SecureNet Inc.",
    deliverables: ["Brand Identity", "Motion Graphics", "Digital Ads", "Social Media Kit"]
  },
  { 
    title: "Peanut Wear", 
    category: "Apparel Design", 
    year: "2024",
    thumbnail: "/projects/peanut.jpg",
    images: ["/projects/peanut.jpg", "/projects/peanut-2.jpg"],
    description: "Brand identity and apparel design for a streetwear brand targeting Gen-Z audiences. Created a playful yet sophisticated visual language.",
    timeline: "6 weeks",
    client: "Peanut Wear Co.",
    deliverables: ["Logo Design", "Apparel Graphics", "Packaging", "Lookbook"]
  },
  { 
    title: "Broadcast Graphics", 
    category: "Motion", 
    year: "2023",
    thumbnail: "/projects/broadcast.jpg",
    images: ["/projects/broadcast.jpg", "/projects/broadcast-2.jpg"],
    description: "Dynamic motion graphics package for a national news network. Designed lower thirds, transitions, and animated elements.",
    timeline: "12 weeks",
    client: "National News Network",
    deliverables: ["Lower Thirds", "Transitions", "Bumpers", "Full Rebrand Package"]
  },
  { 
    title: "SmartTap NFC", 
    category: "Digital Experience", 
    year: "2023",
    thumbnail: "/projects/smarttap.jpg",
    images: ["/projects/smarttap.jpg", "/projects/smarttap-2.jpg"],
    description: "UX/UI design and branding for an innovative NFC-based digital business card platform.",
    timeline: "10 weeks",
    client: "SmartTap Technologies",
    deliverables: ["App Design", "Brand Identity", "Marketing Website", "Pitch Deck"]
  },
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
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
  { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
  { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
  { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg" },
  { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
]

const experience = [
  { role: "Senior Designer", company: "Studio Nova", period: "2022 — Present" },
  { role: "Visual Designer", company: "Creative Lab", period: "2020 — 2022" },
  { role: "Junior Designer", company: "Design Co.", period: "2018 — 2020" },
]

const reviews = [
  {
    name: "Sarah Chen",
    company: "SecureNet Inc.",
    rating: 5,
    text: "Leon transformed our brand completely. His attention to detail and creative vision exceeded all expectations.",
    avatar: "SC"
  },
  {
    name: "Marcus Thompson",
    company: "Peanut Wear Co.",
    rating: 5,
    text: "Working with Leon was an absolute pleasure. He understood our vision and brought it to life beautifully.",
    avatar: "MT"
  },
  {
    name: "Emily Rodriguez",
    company: "SmartTap Technologies",
    rating: 5,
    text: "Incredible talent and professionalism. Leon delivered beyond what we imagined possible.",
    avatar: "ER"
  },
  {
    name: "David Park",
    company: "National News Network",
    rating: 5,
    text: "The motion graphics package Leon created elevated our entire broadcast presence. Truly exceptional work.",
    avatar: "DP"
  },
]

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("Home")
  const [expandedProject, setExpandedProject] = useState<number | null>(null)
  const [activeReview, setActiveReview] = useState(0)

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
                  className="flex flex-col"
                >
                  {/* Profile Picture - Above Name */}
                  <div className="relative mb-4 md:mb-6">
                    <div className="relative h-24 w-24 md:h-32 md:w-32">
                      {/* Decorative ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-spin" style={{ animationDuration: '20s' }} />
                      {/* Inner image container */}
                      <div className="absolute inset-2 overflow-hidden rounded-full border-2 border-primary/50">
                        <img 
                          src="/profile.png" 
                          alt="Leon C. Tyes"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      {/* Online indicator */}
                      <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-background bg-primary md:h-5 md:w-5" />
                    </div>
                  </div>
                  
                  {/* Name and Title */}
                  <div>
                    <h1 className="font-display text-3xl font-bold leading-none tracking-tight md:text-5xl lg:text-6xl">
                      Leon C.
                      <br />
                      <span className="text-primary">Tyes</span>
                    </h1>
                    <p className="mt-2 text-sm font-medium tracking-widest uppercase text-primary/80 md:mt-3 md:text-base">
                      Visual Designer & Storyteller
                    </p>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                >
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:mt-5 md:text-lg">
                    Visual designer crafting stories through branding, motion, and digital experiences. 
                    I transform ideas into memorable visual narratives.
                  </p>
                  <div className="mt-5 flex gap-4 md:mt-6">
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
                      <div key={i} className="flex items-center gap-3 border-b border-border/50 pb-2 last:border-0 last:pb-0">
                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-secondary">
                          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
                        </div>
                        <div className="flex flex-1 items-center justify-between">
                          <span className="text-sm font-medium">{project.title}</span>
                          <span className="text-xs text-muted-foreground">{project.year}</span>
                        </div>
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

                {/* Software Card with Logos */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="col-span-1 rounded-2xl border border-border bg-card p-4 md:p-5"
                >
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Software</h3>
                  <div className="mt-3 grid grid-cols-3 gap-2 md:mt-4 md:gap-3">
                    {software.map((tool, i) => (
                      <div 
                        key={i} 
                        className="flex flex-col items-center gap-1.5 rounded-xl bg-secondary/50 p-2 transition-colors hover:bg-secondary"
                      >
                        <img 
                          src={tool.icon} 
                          alt={tool.name}
                          className="h-5 w-5 md:h-6 md:w-6"
                        />
                        <span className="text-[10px] font-medium text-muted-foreground md:text-xs">{tool.name}</span>
                      </div>
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
            className="flex h-full w-full items-center justify-center overflow-y-auto px-6 md:px-12"
          >
            <div className="grid h-full w-full max-w-6xl grid-cols-1 gap-6 py-20 md:grid-cols-2 md:gap-12 md:py-24">
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
                <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                  I'm a visual designer with over 6 years of experience crafting brand identities, 
                  motion graphics, and digital experiences that tell compelling stories.
                </p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                  My approach combines strategic thinking with creative execution, ensuring every 
                  project not only looks beautiful but also achieves its intended goals.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4">
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
                {/* Client Reviews Card */}
                <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Client Reviews</h3>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeReview}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="text-sm leading-relaxed text-foreground italic">
                          "{reviews[activeReview].text}"
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                            {reviews[activeReview].avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{reviews[activeReview].name}</p>
                            <p className="text-xs text-muted-foreground">{reviews[activeReview].company}</p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    <div className="mt-4 flex gap-2">
                      {reviews.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveReview(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === activeReview ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Career Timeline */}
                <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
                  <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Career Timeline</h3>
                  <div className="mt-4 space-y-4">
                    {experience.map((exp, i) => (
                      <div key={i} className="relative flex gap-4 pl-4">
                        <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary" />
                        <div className={i < experience.length - 1 ? "border-l border-border/50 pb-4 pl-4" : "pl-4"}>
                          <p className="text-sm font-medium">{exp.role}</p>
                          <p className="text-xs text-muted-foreground">{exp.company} &bull; {exp.period}</p>
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
            className="flex h-full w-full items-start justify-center overflow-y-auto px-6 md:px-12"
          >
            <div className="flex w-full max-w-6xl flex-col py-20 md:py-24">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="font-display text-4xl font-bold tracking-tight md:text-5xl"
              >
                Selected Work<span className="text-primary">.</span>
              </motion.h2>
              
              <div className="mt-6 md:mt-10">
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                    className="border-b border-border"
                  >
                    <button
                      onClick={() => setExpandedProject(expandedProject === i ? null : i)}
                      className="group flex w-full items-center justify-between py-4 transition-colors hover:text-primary md:py-5"
                    >
                      <div className="flex items-center gap-4 md:gap-6">
                        <span className="font-mono text-xs text-muted-foreground md:text-sm">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-secondary md:h-16 md:w-16">
                          <div className="h-full w-full bg-gradient-to-br from-primary/30 to-primary/5" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-display text-lg font-medium transition-colors group-hover:text-primary md:text-2xl">
                            {project.title}
                          </h3>
                          <p className="text-xs text-muted-foreground md:text-sm">{project.category} &bull; {project.year}</p>
                        </div>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform md:h-6 md:w-6 ${
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
                          <div className="pb-6 pl-12 md:pl-20">
                            {/* Project Images */}
                            <div className="flex gap-3 overflow-x-auto pb-4">
                              {[1, 2, 3].map((_, imgIndex) => (
                                <div 
                                  key={imgIndex} 
                                  className="h-32 w-48 shrink-0 overflow-hidden rounded-xl bg-secondary md:h-40 md:w-60"
                                >
                                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-primary/5" />
                                </div>
                              ))}
                            </div>
                            
                            {/* Project Description */}
                            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                              {project.description}
                            </p>
                            
                            {/* Project Details */}
                            <div className="mt-4 flex flex-wrap gap-4 md:gap-6">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">Timeline:</span>
                                <span className="font-medium">{project.timeline}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="text-muted-foreground">Client:</span>
                                <span className="font-medium">{project.client}</span>
                              </div>
                            </div>
                            
                            {/* Deliverables */}
                            <div className="mt-4">
                              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Deliverables</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {project.deliverables.map((item, idx) => (
                                  <span 
                                    key={idx}
                                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
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
