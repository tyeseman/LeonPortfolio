// Utility to reset portfolio data to defaults
export function resetPortfolioData() {
  // Clear localStorage
  try {
    localStorage.removeItem("portfolio-content")
    console.log("[v0] Cleared localStorage")
  } catch (err) {
    console.error("[v0] Failed to clear localStorage:", err)
  }
  
  // Clear Firestore (if available)
  try {
    const { clearFirestoreData } = require("./firestore-utils")
    clearFirestoreData().catch((err: Error) => {
      console.error("[v0] Failed to clear Firestore:", err)
    })
  } catch (err) {
    console.warn("[v0] Firestore not available for cleanup")
  }
  
  // Reload page to reinitialize with defaults
  setTimeout(() => {
    window.location.reload()
  }, 500)
}
