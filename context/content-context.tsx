"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react"
import { loadContentFromFirestore, saveContentToFirestore, subscribeToContent } from "@/lib/firestore-utils"

interface ContentContextType {
  content: PortfolioContent
  updateContent: (newContent: PortfolioContent) => void
  resetContent: () => void
  isSynced: boolean
  error: string | null
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(defaultContent)
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

export { defaultContent }
