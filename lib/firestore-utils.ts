import { db } from "./firebase"
import { doc, getDoc, setDoc, onSnapshot, deleteDoc } from "firebase/firestore"
import type { PortfolioContent } from "@/context/content-context"

const CONTENT_DOC_ID = "portfolio-data"
const CONTENT_COLLECTION = "portfolio"

// Load content from Firestore
export async function loadContentFromFirestore(): Promise<PortfolioContent | null> {
  try {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data() as PortfolioContent
      return data
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
    await setDoc(docRef, content, { merge: true })
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
          callback(data)
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
