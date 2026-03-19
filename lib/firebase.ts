import { initializeApp } from "firebase/app"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"

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

// Initialize Firestore
const db = getFirestore(app)

// Enable offline persistence
if (typeof window !== "undefined") {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      console.log("Multiple tabs open, persistence can only be enabled in one tab at a time.")
    } else if (err.code === "unimplemented") {
      console.log("The current browser does not support all of the features required to enable persistence")
    }
  })
}

export { app, db }
