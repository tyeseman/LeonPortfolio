// Utility to reset portfolio data to defaults
export function resetPortfolioData() {
  // Clear Firestore
  try {
    const { clearFirestoreData } = require("./firestore-utils")
    clearFirestoreData().catch((err: Error) => {
      console.error("Failed to clear Firestore:", err)
    })
  } catch (err) {
    console.error("Failed to clear Firestore:", err)
  }
  
  // Reload page to reinitialize with defaults
  setTimeout(() => {
    window.location.reload()
  }, 500)
}
