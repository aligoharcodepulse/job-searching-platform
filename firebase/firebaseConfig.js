// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5b-17zGsXqTC4ic9912XZcxj6ytOmVwU",
  authDomain: "jobsphere-ddad8.firebaseapp.com",
  projectId: "jobsphere-ddad8",
  storageBucket: "jobsphere-ddad8.firebasestorage.app",
  messagingSenderId: "1041184851987",
  appId: "1:1041184851987:web:2aa25677ab88da51f897e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};