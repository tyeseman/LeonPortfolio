import { db } from "./firebase"
import { doc, getDoc, setDoc, collection, query, onSnapshot, deleteDoc } from "firebase/firestore"
import type { PortfolioContent } from "@/context/content-context"

const CONTENT_DOC_ID = "portfolio-data"
const CONTENT_COLLECTION = "portfolio"

// Convert old project structure to new one (field migration only, no trimming)
function convertProjectStructure(content: PortfolioContent): PortfolioContent {
  if (!content.projects || content.projects.length === 0) return content
  
  return {
    ...content,
    projects: content.projects.map((project: any) => ({
      title: project.title || "",
      category: project.category || "",
      year: project.year || "",
      thumbnail: project.thumbnail || "",
      image1: project.image1 || project.images?.[0] || "",
      image2: project.image2 || project.images?.[1] || "",
      image3: project.image3 || project.images?.[2] || "",
      youtubeUrl1: project.youtubeUrl1 || "",
      youtubeUrl2: project.youtubeUrl2 || "",
      description: project.description || "",
      timeline: project.timeline || "",
      client: project.client || "",
      deliverables: project.deliverables || []
    }))
  }
}

// Load content from Firestore
export async function loadContentFromFirestore(): Promise<PortfolioContent | null> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data() as PortfolioContent
      // Convert old structure if needed (preserves all projects)
      const convertedData = convertProjectStructure(data)
      return convertedData
    }
    return null
  } catch (error) {
    console.error("Error loading content from Firestore:", error)
    return null
  }
}

// Save content to Firestore
export async function saveContentToFirestore(content: PortfolioContent): Promise<void> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID)
    // Convert structure if needed, but preserve ALL projects
    const convertedContent = convertProjectStructure(content)
    await setDoc(docRef, convertedContent, { merge: true })
  } catch (error) {
    console.error("Error saving content to Firestore:", error)
    throw error
  }
}

// Clear Firestore data and reset to defaults
export async function clearFirestoreData(): Promise<void> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error clearing Firestore data:", error)
    throw error
  }
}

// Subscribe to real-time updates
export function subscribeToContent(
  callback: (content: PortfolioContent) => void,
  onError?: (error: Error) => void
): () => void {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID)
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as PortfolioContent
          const convertedData = convertProjectStructure(data)
          callback(convertedData)
        }
      },
      (error) => {
        console.error("Error subscribing to content:", error)
        if (onError) onError(error as Error)
      }
    )
    
    return unsubscribe
  } catch (error) {
    console.error("Error setting up subscription:", error)
    if (onError) onError(error as Error)
    return () => {}
  }
}
