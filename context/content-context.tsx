"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Types for portfolio content
export interface Project {
  title: string
  category: string
  year: string
  thumbnail: string
  images: string[]
  description: string
  timeline: string
  client: string
  deliverables: string[]
}

export interface Experience {
  role: string
  company: string
  period: string
}

export interface Review {
  name: string
  company: string
  rating: number
  text: string
  avatar: string
}

export interface Software {
  name: string
  icon: string
}

export interface HeroContent {
  name: string
  title: string
  tagline: string
  profileImage: string
  email: string
  linkedinUrl: string
  instagramUrl: string
  twitterUrl: string
}

export interface AboutContent {
  bio: string
  secondaryBio: string
  yearsExperience: string
  projectsCompleted: string
  totalClients: string
}

export interface PortfolioContent {
  hero: HeroContent
  about: AboutContent
  expertise: string[]
  software: Software[]
  experience: Experience[]
  projects: Project[]
  reviews: Review[]
}

// Default content matching the current portfolio
const defaultContent: PortfolioContent = {
  hero: {
    name: "Leon C. Tyes",
    title: "Visual Designer & Storyteller",
    tagline: "Crafting stories through branding, motion, and digital experiences that leave lasting impressions.",
    profileImage: "/profile.png",
    email: "hello@leontyes.com",
    linkedinUrl: "#",
    instagramUrl: "#",
    twitterUrl: "#",
  },
  about: {
    bio: "I'm a visual designer with over 6 years of experience crafting brand identities, motion graphics, and digital experiences that tell compelling stories.",
    secondaryBio: "My approach combines strategic thinking with creative execution, ensuring every project not only looks beautiful but achieves its business objectives.",
    yearsExperience: "6+",
    projectsCompleted: "50+",
    totalClients: "30+",
  },
  expertise: [
    "Brand Identity",
    "Motion Design",
    "Digital Experience",
    "Art Direction",
  ],
  software: [
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg" },
    { name: "Illustrator", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" },
    { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
    { name: "Premiere", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg" },
    { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  ],
  experience: [
    { role: "Senior Designer", company: "Studio Nova", period: "2022 — Present" },
    { role: "Visual Designer", company: "Creative Lab", period: "2020 — 2022" },
    { role: "Junior Designer", company: "Design Co.", period: "2018 — 2020" },
  ],
  projects: [
    {
      title: "Cybersecurity Campaign",
      category: "Branding",
      year: "2024",
      thumbnail: "/projects/cyber.jpg",
      images: ["/projects/cyber.jpg", "/projects/cyber-2.jpg", "/projects/cyber-3.jpg"],
      description: "A comprehensive brand identity and awareness campaign for a leading cybersecurity firm. The project included visual identity, motion graphics, and digital assets that communicate trust and protection.",
      timeline: "8 weeks",
      client: "SecureNet Inc.",
      deliverables: ["Brand Identity", "Motion Graphics", "Digital Ads", "Social Media Kit"],
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
      deliverables: ["Logo Design", "Apparel Graphics", "Packaging", "Lookbook"],
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
      deliverables: ["Lower Thirds", "Transitions", "Bumpers", "Full Rebrand Package"],
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
      deliverables: ["App Design", "Brand Identity", "Marketing Website", "Pitch Deck"],
    },
  ],
  reviews: [
    {
      name: "Sarah Chen",
      company: "SecureNet Inc.",
      rating: 5,
      text: "Leon transformed our brand completely. His attention to detail and creative vision exceeded all expectations.",
      avatar: "SC",
    },
    {
      name: "Marcus Thompson",
      company: "Peanut Wear Co.",
      rating: 5,
      text: "Working with Leon was an absolute pleasure. He understood our vision and brought it to life beautifully.",
      avatar: "MT",
    },
    {
      name: "Emily Rodriguez",
      company: "SmartTap Technologies",
      rating: 5,
      text: "Incredible talent and professionalism. Leon delivered beyond what we imagined possible.",
      avatar: "ER",
    },
    {
      name: "David Park",
      company: "National News Network",
      rating: 5,
      text: "The motion graphics package Leon created elevated our entire broadcast presence. Truly exceptional work.",
      avatar: "DP",
    },
  ],
}

// Storage key for localStorage
const STORAGE_KEY = "portfolio-content"

interface ContentContextType {
  content: PortfolioContent
  updateContent: (newContent: PortfolioContent) => void
  resetContent: () => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(defaultContent)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load content from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setContent(parsed)
      }
    } catch (error) {
      console.error("Failed to load content from storage:", error)
    }
    setIsLoaded(true)
  }, [])

  // Save content to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
      } catch (error) {
        console.error("Failed to save content to storage:", error)
      }
    }
  }, [content, isLoaded])

  const updateContent = (newContent: PortfolioContent) => {
    setContent(newContent)
  }

  const resetContent = () => {
    setContent(defaultContent)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider")
  }
  return context
}

export { defaultContent }
