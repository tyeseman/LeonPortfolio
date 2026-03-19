"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { loadContentFromFirestore, saveContentToFirestore, subscribeToContent } from "@/lib/firestore-utils"

// Types for portfolio content
export interface Project {
  title: string
  category: string
  year: string
  thumbnail: string
  image1: string
  image2: string
  image3: string
  youtubeUrl1: string
  youtubeUrl2: string
  description: string
  timeline: string
  client: string
  deliverables: string[]
}

export interface Experience {
  title: string
  company: string
  year: string
}

export interface Review {
  name: string
  company: string
  text: string
  rating: number
}

export interface Software {
  name: string
  category: string
}

export interface TermsSection {
  title: string
  content: string
}

export interface PortfolioContent {
  profile: {
    name: string
    title: string
    bio: string
    image: string
    email: string
    linkedin: string
    instagram: string
    twitter: string
  }
  about: {
    bio: string
    stats: {
      label: string
      value: string
    }[]
    timeline: Experience[]
    philosophy: string
  }
  projects: Project[]
  reviews: Review[]
  software: Software[]
  contact: {
    headline: string
    cta: string
    email: string
  }
  terms: TermsSection[]
}

// Default content
export const defaultContent: PortfolioContent = {
  profile: {
    name: "Leon C. Tyes",
    title: "Visual Designer",
    bio: "I design visual stories through branding, motion, and digital experiences.",
    image: "/profile.jpg",
    email: "contact@leontyes.com",
    linkedin: "https://linkedin.com/in/leontyes",
    instagram: "https://instagram.com/leontyes",
    twitter: "https://twitter.com/leontyes"
  },
  about: {
    bio: "With 6+ years of experience in visual design and branding, I've worked with leading companies to create compelling visual identities and experiences. My approach combines strategic thinking with creative excellence.",
    stats: [
      { label: "Years Experience", value: "6+" },
      { label: "Projects Completed", value: "50+" },
      { label: "Happy Clients", value: "30+" }
    ],
    timeline: [
      { title: "Senior Designer", company: "Design Studio", year: "2022-Present" },
      { title: "Designer", company: "Creative Agency", year: "2020-2022" },
      { title: "Junior Designer", company: "StartUp Inc", year: "2018-2020" }
    ],
    philosophy: "Great design is invisible. It solves problems elegantly."
  },
  projects: [
    {
      title: "Cybersecurity Campaign",
      category: "Branding",
      year: "2024",
      thumbnail: "/projects/cyber.jpg",
      image1: "/projects/cyber.jpg",
      image2: "/projects/cyber-2.jpg",
      image3: "/projects/cyber-3.jpg",
      youtubeUrl1: "",
      youtubeUrl2: "",
      description: "A comprehensive brand identity and awareness campaign for a leading cybersecurity firm. The project included visual identity, motion graphics, and digital assets that communicate trust and protection.",
      timeline: "8 weeks",
      client: "SecureNet Inc.",
      deliverables: ["Brand Identity", "Motion Graphics", "Digital Ads", "Social Media Kit"],
    },
  ],
  reviews: [
    {
      name: "Sarah Johnson",
      company: "TechCorp",
      text: "Leon's work transformed our brand completely. Highly professional and creative.",
      rating: 5
    },
    {
      name: "Michael Chen",
      company: "StartUp Ventures",
      text: "Excellent attention to detail and communication throughout the project.",
      rating: 5
    },
    {
      name: "Emma Davis",
      company: "Creative Agency",
      text: "A true design professional who understands both aesthetics and business goals.",
      rating: 5
    }
  ],
  software: [
    { name: "Figma", category: "Design" },
    { name: "After Effects", category: "Motion" },
    { name: "Photoshop", category: "Design" },
    { name: "Illustrator", category: "Design" },
    { name: "Premiere Pro", category: "Video" },
    { name: "Cinema 4D", category: "3D" }
  ],
  contact: {
    headline: "Let's create something amazing together.",
    cta: "Get in Touch",
    email: "contact@leontyes.com"
  },
  terms: [
    {
      title: "Terms of Service",
      content: "By using this portfolio website, you agree to abide by these terms of service..."
    },
    {
      title: "Privacy Policy",
      content: "Your privacy is important to us. This policy outlines how we handle your data..."
    }
  ]
}

interface ContentContextType {
  content: PortfolioContent
  updateContent: (newContent: PortfolioContent) => void
  resetContent: () => void
  isSynced: boolean
  error: string | null
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(() => defaultContent)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSynced, setIsSynced] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load content from Firestore on mount
  useEffect(() => {
    let unsubscribe: (() => void) | null = null

    const initializeContent = async () => {
      try {
        // Load from Firestore
        const firestoreContent = await loadContentFromFirestore()
        
        if (firestoreContent) {
          setContent(firestoreContent)
          setIsSynced(true)
        } else {
          // If Firestore is empty, use default content
          setContent(defaultContent)
        }
      } catch (err) {
        console.error("Error loading content from Firestore:", err)
        setError("Failed to load content from Firestore")
        // Fall back to default content
        setContent(defaultContent)
      }

      // Subscribe to real-time updates
      try {
        unsubscribe = subscribeToContent(
          (firestoreContent) => {
            setContent(firestoreContent)
            setIsSynced(true)
            setError(null)
          },
          (err) => {
            console.error("Subscription error:", err)
            setError("Failed to sync with Firestore")
          }
        )
      } catch (err) {
        console.error("Failed to set up subscription:", err)
      }

      setIsLoaded(true)
    }

    initializeContent()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  // Save content to Firestore whenever it changes
  useEffect(() => {
    if (isLoaded && content !== defaultContent) {
      const saveContent = async () => {
        try {
          await saveContentToFirestore(content)
          setIsSynced(true)
          setError(null)
        } catch (err) {
          console.error("Failed to save content to Firestore:", err)
          setError("Failed to save changes to Firestore")
          setIsSynced(false)
        }
      }
      
      saveContent()
    }
  }, [content, isLoaded])

  const updateContent = (newContent: PortfolioContent) => {
    setContent(newContent)
  }

  const resetContent = () => {
    // Reset to defaults with only 1 project
    const cleanContent = {
      ...defaultContent,
      projects: defaultContent.projects.slice(0, 1)
    }
    setContent(cleanContent)
    // Reset in Firestore
    saveContentToFirestore(cleanContent).catch((err) => {
      console.error("Failed to reset Firestore:", err)
    })
  }

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isSynced, error }}>
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
