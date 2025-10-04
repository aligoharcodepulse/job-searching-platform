// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate Firebase configuration
const isValidConfig =
  firebaseConfig.apiKey &&
  firebaseConfig.authDomain &&
  firebaseConfig.projectId &&
  !firebaseConfig.apiKey.includes("your-") &&
  !firebaseConfig.apiKey.includes("dummy") &&
  !firebaseConfig.apiKey.includes("demo-") &&
  !firebaseConfig.projectId.includes("demo-");

let app, auth, db;

if (isValidConfig) {
  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    // Create mock objects to prevent app crashes
    auth = null;
    db = null;
  }
} else {
  console.warn(
    "🔧 Development mode: Firebase configuration is using demo values. Authentication and database features are disabled."
  );
  console.info(
    "💡 To enable Firebase features, update your .env file with valid Firebase credentials."
  );
  // Create mock objects to prevent app crashes
  auth = null;
  db = null;
}

export { auth, db };
