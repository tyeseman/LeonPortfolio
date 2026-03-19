import { initializeApp } from "firebase/app"
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_vcRTymXiRZVWwHcNQTZIrCpxcBY_s_I",
  authDomain: "leon-portfolio-267d3.firebaseapp.com",
  projectId: "leon-portfolio-267d3",
  storageBucket: "leon-portfolio-267d3.firebasestorage.app",
  messagingSenderId: "643007056683",
  appId: "1:643007056683:web:83a5e8445a4549b7f8936e"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore with persistence cache
const db = typeof window !== "undefined" 
  ? initializeFirestore(app, {
      cache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
      })
    })
  : getFirestore(app)

export { app, db }
